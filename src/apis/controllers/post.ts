import { Request, Response } from "express";

//======== Models ===============//
import User from "../../models/user";
import Post from "../../models/post";

//======== Services =======//
import { IGetUserAuthInfoRequest } from "../../services/defs";

export class postControllers {
  public async createPost(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { _id } = req.user;
      const { title, content, category } = req.body;

      const newPost = new Post({
        title,
        content,
        category,
        creator: _id
      });

      const savedPost = await newPost.save();

      await User.findByIdAndUpdate(
        _id,
        { $push: { created_posts: savedPost }, $inc: { no_of_posts: +1 } },
        { new: true }
      );

      res.json({
        msg: "Post created successfully"
      });
    } catch (err) {
      res.status(401).json({ msg: err });
    }
  }

  // Comment on post
  public async postComment(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { postId } = req.params;
      const { _id } = req.user;
      const { message } = req.body;

      const findPost = await Post.findById(postId);

      if (!findPost) {
        return res.json({ msg: "Post not found" });
      }

      await Post.findByIdAndUpdate(
        postId,
        {
          $push: { comments: { creator: _id, message } },
          $inc: { no_of_comments: 1 }
        },
        { new: true }
      );

      res.json({
        msg: "Comment Posted Successfully"
      });
    } catch (err) {
      res.status(401).json({ msg: err });
    }
  }
}
