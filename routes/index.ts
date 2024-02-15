import { Router } from "express";
import HomeRouter from "./home.routes";
import UrlRouter from "./url.routes";

const router = Router();

router.use("/", HomeRouter);
router.use("/api/v1/url-shorten", UrlRouter);

export default router;
