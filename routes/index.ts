import { Router } from 'express';
import HomeRouter from './home.routes';

const router = Router();

router.use('/', HomeRouter);

export default router;
