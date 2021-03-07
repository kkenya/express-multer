import { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

export const router = Router();

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'memory_strage.html'));
});

router.post(
  '/',
  upload.array('upfile'),
  (req: Request, res: Response) => {
    console.log(req.files);
    console.log(req.body);
    res.status(204).end();
  }
);

