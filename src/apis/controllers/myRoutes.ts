import { Request, Response } from "express";

export class myControllers {
  public testGetRoute(req: Request, res: Response) {
    res.status(200).json({ msg: "Get request successfull" });
  }

  public testPostRoute(req: Request, res: Response) {
    console.log(req.body);
    res.status(200).json({ msg: "Post request successfull" });
  }
}
