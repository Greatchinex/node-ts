import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import User from "../models/user";
import { IGetUserAuthInfoRequest } from "../services/defs";

dotenv.config();

interface IPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const auth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IPayload;

    const user = await User.findById(decoded.userId).select({ password: 0 });

    if (!user) {
      throw new Error(); // Fires the code in the catch block
    }

    req.user = user;
    // console.log(req);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Not Authorized" });
  }
};
