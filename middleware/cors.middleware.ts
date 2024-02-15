import cors, { CorsOptions } from "cors";
import { Application, Request } from "express";
import StandardError from "../utils/constants/standard-error";

const origin = [
  "http://localhost:3000",
  "http://localhost:5001",
  "http://localhost:3001",
  "http://localhost:8080",
  "https://folklof.com",
  "https://admin.folklof.com",
];

const corsOptionsDelegate = (
  req: Request | any,
  callback: (err: Error | null, options?: CorsOptions) => void
) => {
  const clientOrigin = origin.includes(req.header("Origin"));

  if (req.method === "OPTIONS") {
    callback(null, {
      origin: clientOrigin,
      methods: "GET,POST,DELETE,PUT,OPTIONS,HEAD",
    });
  } else if (clientOrigin) {
    callback(null, {
      origin: true,
      methods: "GET,POST,DELETE,PUT,OPTIONS,HEAD",
    });
  } else {
    callback(
      new StandardError({
        success: false,
        message: "Not allowed by CORS",
        status: 403,
      })
    );
  }
};

const corsMiddleware = (app: Application) => {
  app.use(cors());
};

export default corsMiddleware;
