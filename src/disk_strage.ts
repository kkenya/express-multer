import { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

export const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '/tmp');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'disk_strage.html'));
});

router.post('/', upload.array('upfile'), (req: Request, res: Response) => {
  console.log(req.files);
  console.log(req.body);
  res.status(204).end();
});
