import { rateLimit } from "express-rate-limit";
import { Application } from "express";

const limiterMiddleware = (app: Application) => {
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 50, // Limit each IP to 50 requests per `window` (here, per 1 minute).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  });

  app.use(limiter);
};

export default limiterMiddleware;
