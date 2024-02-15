import bodyParserMiddleware from "./body-parser.middleware";
import corsMiddleware from "./cors.middleware";
import databaseMiddleware from "./database.middleware";
import helmetMiddleware from "./helmet.middleware";
import { Application } from "express";
import morganMiddleware from "./morgan.middleware";

const middleware = (app: Application) => {
  morganMiddleware(app);
  bodyParserMiddleware(app);
  corsMiddleware(app);
  helmetMiddleware(app);
  app.use(databaseMiddleware);
};

export default middleware;
