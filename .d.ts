// Declaration margin to extend the request object in express
// import { Request } from "express";

declare namespace Express {
  export interface Request {
    user: any;
  }
}
