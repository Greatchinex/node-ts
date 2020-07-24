// Declaration margin to extend the request object in express
declare module Express {
  export interface Request {
    user: object;
  }
}
