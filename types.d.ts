// Declaration margin to extend the request object in express
declare namespace Express {
  export interface Request {
    user: object;
  }
}
