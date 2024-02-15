import { getRedirectUrl } from "../controller/url-short.controller";
import { Router } from "express";

const router = Router();

router.get("/:customAlias", getRedirectUrl);

export default router;
