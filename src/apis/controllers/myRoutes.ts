import { Request, Response } from "express";

import User from "../../models/user";

export class myControllers {
  public testGetRoute(req: Request, res: Response) {
    res.status(200).json({ msg: "Get request successfull" });
  }

  public async testPostRoute(req: Request, res: Response) {
    // console.log(req.body);
    const newUser = new User({
      full_name: req.body.fullname,
      email: req.body.email,
      phone_number: req.body.phone_number,
      age: req.body.age
    });

    // console.log(newUser);

    const savedUser = await newUser.save();

    res.status(200).json({
      msg: "Post request successfull",
      user: savedUser
    });
  }
}
