import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import User from "../models/user";

dotenv.config();

interface IPayload {
  userId: string;
  iat: number;
  exp: number;
}

// export class Auth {
//   public async prtotectRoute(req: Request, res: Response, next: NextFunction) {
//     try {
//       const token: String = req.header("Authorization").split(" ")[1];

//       const decoded: IPayload = jwt.verify(token, process.env.JWT_SECRET);

//       const user = await User.findById(decoded.userId).select({ password: 0 });

//       if (!user) {
//         throw new Error(); // Fires the code in the catch block
//       }

//       req.user = user;
//       next();
//     } catch (err) {
//       res.status(401).json({ msg: "Not Authorized" });
//     }
//   }
// }

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token: String = req.header("Authorization").split(" ")[1];

    const decoded: IPayload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select({ password: 0 });

    if (!user) {
      throw new Error(); // Fires the code in the catch block
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Not Authorized" });
  }
};
