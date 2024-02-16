import { Router } from 'express';
import ApiDocsRouter from './api-docs.routes';
import HomeRouter from './home.routes';
import UrlRouter from './url.routes';
import RedirectUrlRouter from './redirect-url.routes';

const router = Router();

router.use('/api-docs', ApiDocsRouter);
router.use('/', HomeRouter);
router.use('/r', RedirectUrlRouter);
router.use('/api/v1/url-shorten', UrlRouter);

export default router;
