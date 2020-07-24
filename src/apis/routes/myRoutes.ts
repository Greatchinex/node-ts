import { Application, Request, Response } from "express";
import { userControllers } from "../controllers/myRoutes";

import { auth } from "../../config/middleware";

export class userRoutes {
  public secretController: userControllers = new userControllers();

  public route(app: Application) {
    app.route("/profile").get(auth, this.secretController.userProfile);
    app.route("/create-user").post(this.secretController.createUser);
    app.route("/login").post(this.secretController.userLogin);

    /* If a route has get, 
    post and delete it can just be defined once
        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    
    */
  }
}
