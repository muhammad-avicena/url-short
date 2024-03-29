import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message:
      'URL Shortener API is running. Please refer `/api-docs` to the documentation for usage.',
    developedBy: 'Muhammad Avicena'
  });
});

export default router;
