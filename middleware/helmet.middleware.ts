import { Application } from "express";
import helmet from "helmet";

const helmetMiddleware = (app: Application) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "avicena.dev"],
        },
      },
      dnsPrefetchControl: { allow: false },
      frameguard: { action: "deny" },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      xssFilter: true,
    })
  );
  app.disable("x-powered-by");
};

export default helmetMiddleware;
