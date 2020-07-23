import { Application, Request, Response } from "express";
import { myControllers } from "../controllers/myRoutes";

export class myRoutes {
  public secretController: myControllers = new myControllers();

  public route(app: Application) {
    app.route("/test").get(this.secretController.testGetRoute);
    app.route("/test").post(this.secretController.testPostRoute);

    /* If a route has get, post and delete it can just be defined once
        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    
    */
  }
}
