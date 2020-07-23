import { Application, Request, Response } from "express";

export class myRoutes {
  public route(app: Application) {
    app.get("/test", (req: Request, res: Response) => {
      res.status(200).json({ msg: "Get request successfull" });
    });

    app.post("/test", (req: Request, res: Response) => {
      res.status(200).json({ msg: "POST request successfull" });
    });
  }
}
