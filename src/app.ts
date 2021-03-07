import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;

app.get('/single', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'single_input.html'));
});

app.post('/single', upload.single('avatar'), (req: Request, res: Response) => {
  console.log(req.file);
  console.log(req.body);
  res.status(204).end();
});

app.get('/multi', (_req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, '..', 'assets', 'single_input_multiple.html')
  );
});

app.post('/multi', upload.array('photos', 3), (req: Request, res: Response) => {
  // 複数形になる
  // req.files[0] -> File
  // req.files[1] -> File
  // req.files[2] -> File
  // maxCountを超えた場合は MulterError: Unexpected field
  console.log(req.files);
  // { nspeakers: 'dddd' }
  console.log(req.body);
  res.status(204).end();
});

app.get('/multi_input', (_req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, '..', 'assets', 'multi_input.html')
  );
});

const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
]);
app.post('/multi_input', cpUpload, (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
