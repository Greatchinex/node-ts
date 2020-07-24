import { Application, Request, Response } from "express";

import { postControllers } from "../controllers/post";

import { auth } from "../../config/middleware";

export class postRoutes {
  public post_controller: postControllers = new postControllers();

  public route(app: Application) {
    app.route("/create-post").post(auth, this.post_controller.createPost);
    app.route("/comment/:postId").post(auth, this.post_controller.postComment);
  }
}
