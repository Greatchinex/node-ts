import { Request, Response } from "express";

//======== Models ===============//
import User from "../../models/user";

//======== Services =======//
import { IGetUserAuthInfoRequest } from "../../services/defs";

export class userControllers {
  public userProfile(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      res.status(200).json({
        user: req.user
      });
    } catch (err) {
      res.status(401).json({ msg: err });
    }
  }

  // Create new user
  public async createUser(req: Request, res: Response) {
    try {
      const { full_name, email, phone_number, age, password } = req.body;
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        return res.json({ msg: "User with email already exist" });
      }

      const newUser = new User({
        full_name,
        email,
        phone_number,
        age,
        password
      });

      const savedUser = await newUser.save();

      const token = await savedUser.jwtToken();

      res.status(200).json({
        msg: "user created successfull",
        token,
        user: savedUser
      });
    } catch (err) {
      res.status(401).json({ msg: err });
    }
  }

  // User login
  public async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ email });

      if (!findUser) {
        return res.json({ msg: "Incorrect login details" });
      }

      const isMatch = await findUser.verifyPass(password);

      if (!isMatch) {
        return res.json({ msg: "Incorrect login details" });
      }

      const token = await findUser.jwtToken();

      res.status(200).json({
        token,
        user: findUser
      });
    } catch (err) {
      res.status(401).json({ msg: err });
    }
  }
}
