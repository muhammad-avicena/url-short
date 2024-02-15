import { Application } from "express";
import bodyParserMiddleware from "./body-parser.middleware";
import corsMiddleware from "./cors.middleware";
import databaseMiddleware from "./database.middleware";
import helmetMiddleware from "./helmet.middleware";
import morganMiddleware from "./morgan.middleware";
import limiterMiddleware from "./rate-limiter.middleware";

const middleware = (app: Application) => {
  morganMiddleware(app);
  limiterMiddleware(app);
  bodyParserMiddleware(app);
  corsMiddleware(app);
  helmetMiddleware(app);
  app.use(databaseMiddleware);
};

export default middleware;
