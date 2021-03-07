import express, { Router } from 'express';
import { router as simpleRouter } from './simple';

const app = express();
const router = Router();
const port = 3000;

app.use(router);
router.use('/simple', simpleRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
