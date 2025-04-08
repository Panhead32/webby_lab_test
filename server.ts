import express, { Application } from "express";
import dotenv from "dotenv";
import Server from "./src/index";

dotenv.config();
const app: Application = express();
const server: Server = new Server(app);
const APP_PORT: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 8000;

app
  .listen(APP_PORT, "0.0.0.0", function () {
    console.log(`Server is running on port ${APP_PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
