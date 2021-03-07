import parse from 'csv-parse/lib/sync';
import { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

export const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'memory_strage.html'));
});

// TODO: limit memory extention
router.post('/', upload.single('upfile'), (req: Request, res: Response) => {
  console.log('uploaded: ', req.file);
  const csv: {}[] = parse(req.file.buffer.toString(), {
    columns: true,
    fromLine: 1,
  });
  console.log(csv);
  res.status(204).end();
});
