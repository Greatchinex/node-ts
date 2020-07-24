import * as express from "express";

//====== DB Connection ==========//
import { dBConnect } from "./db";

//========= Routes =========//
import { userRoutes } from "../apis/routes/myRoutes";
import { postRoutes } from "../apis/routes/post";
// import * as bodyParser from "body-parser";

// import { allRoutes } from "../apis/routes";

class App {
  public app: express.Application;
  public myDb: dBConnect = new dBConnect();
  // Routers
  public userRouters: userRoutes = new userRoutes();
  public postRouters: postRoutes = new postRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.myDb.dbConnection();
    // Routers
    this.userRouters.route(this.app);
    this.postRouters.route(this.app);
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
