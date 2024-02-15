import {
  createShortUrl,
  updateShortUrlByID,
  getAllShortUrls,
  deleteShortUrlByID,
} from "../controller/url-short.controller";
import { Router } from "express";

const router = Router();

router.get("/", getAllShortUrls);
router.put("/:ID", updateShortUrlByID);
router.post("/", createShortUrl);
router.delete("/:ID", deleteShortUrlByID);

export default router;
