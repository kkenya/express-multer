import { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

export const router = Router();
// destにアップロードしたファイルを配置
const upload = multer({ dest: 'uploads/' });

router.get('/single', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'single.html'));
});

router.post(
  '/single',
  // 特定のファイルを受け取る
  upload.single('avatar'),
  (req: Request, res: Response) => {
    console.log(req.file);
    console.log(req.body);
    res.status(204).end();
  }
);

router.get('/single_multi_file', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'single_multi_file.html'));
});

router.post(
  '/single_multi_file',
  // 特定のファイルをmultipartで受け取る
  upload.array('photos', 3),
  (req: Request, res: Response) => {
    // 複数形になる
    // req.files[0] -> File
    // req.files[1] -> File
    // req.files[2] -> File
    // maxCountを超えた場合は MulterError: Unexpected field
    console.log(req.files);
    // { nspeakers: 'dddd' }
    console.log(req.body);
    res.status(204).end();
  }
);

router.get('/multi', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'multi.html'));
});

// 複数のファイルを許可する
const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
]);
router.post('/multi', cpUpload, (req: Request, res: Response) => {
  if (Array.isArray(req.files)) {
    throw new Error('invalid request');
  }
  //  req.files['avatar'][0] -> File
  //  req.files['avatar'][1] -> File
  console.log(req.files['avatar']);
  //  req.files['gallery'] -> Array
  console.log(req.files['gallery']);
  res.status(204).end();
});

router.get('/text_only', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'text_only.html'));
});

router.post(
  '/text_only',
  // text fieldのみを許可する
  upload.none(),
  (req: Request, res: Response) => {
    // fileを送信した場合 MulterError: Unexpected field
    console.log(req.files);
    res.status(204).end();
  }
);

router.get('/any', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'any.html'));
});

router.post(
  '/any',
  // 全てのファイルを許可する
  upload.any(),
  (req: Request, res: Response) => {
    console.log(req.files);
    res.status(204).end();
  }
);
