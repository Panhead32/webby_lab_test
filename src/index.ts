import express, { Application } from "express";
import path from "path";
import cors from "cors";
import Routes from "./routes";
import database from "./database";
import { errorHandler } from './middlewares';
export default class Server {
  constructor(app: Application) {
    this._initializeDatabase();
    this._config(app);
    new Routes(app);
    this._errorHandler(app);
  }

  private _config(app: Application): void {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public")));
  }

  private _errorHandler(app: Application): void {
    app.use(errorHandler);
  }


  private async _initializeDatabase(): Promise<void> {
    await database.initialize();
  }
}
