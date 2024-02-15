import "dotenv/config";
import express, { Application } from "express";
import routes from "./routes";
import middleware from "./middleware";
import errorHandlerMiddleware from "./middleware/error-handler.middleware";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

// Implement Middleware
middleware(app);

// Implement Router
app.use(routes);

// Implement Error Handler Middleware
app.use(errorHandlerMiddleware);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
