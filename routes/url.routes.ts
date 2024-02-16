import {
  createShortUrl,
  updateShortUrlByID,
  getAllShortUrls,
  getUrlShortByCustomAlias,
  deleteShortUrlByID
} from '../controller/url-short.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllShortUrls);
router.get('/:customAlias', getUrlShortByCustomAlias);
router.put('/:ID', updateShortUrlByID);
router.post('/', createShortUrl);
router.delete('/:ID', deleteShortUrlByID);

export default router;
