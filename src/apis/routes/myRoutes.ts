import { Application, Request, Response } from "express";
import { myControllers } from "../controllers/myRoutes";

import { auth } from "../../config/middleware";

export class myRoutes {
  public secretController: myControllers = new myControllers();

  public route(app: Application) {
    app.route("/profile").get(auth, this.secretController.testGetRoute);
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
