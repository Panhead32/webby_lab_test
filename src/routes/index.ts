import { Application } from "express";
import movieRoutes from "./movie.routes";
import userRoutes from "./user.routes";
import sessionsRoutes from "./sessions.routes";
import { Router } from 'express';
const router = Router();

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/movies", movieRoutes);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/sessions", sessionsRoutes);
    app.use(router);
  }
}
