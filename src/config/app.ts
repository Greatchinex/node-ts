import * as express from "express";
import { myRoutes } from "../apis/routes/myRoutes";
// import * as bodyParser from "body-parser";

class App {
  public app: express.Application;
  public allRouters: myRoutes = new myRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.allRouters.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    // this.app.use(bodyParser.json());
    // //support application/x-www-form-urlencoded post data
    // this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default new App().app;