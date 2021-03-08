import express, { Router } from 'express';
import { router as simpleRouter } from './simple';
import { router as diskStrageRouter } from './disk_strage';
import { router as memoryStrageRouter } from './memory_strage';
import { router as streamRouter } from './stream';

const app = express();
const router = Router();
const port = 3000;

app.use(router);
router.use('/simple', simpleRouter);
router.use('/disk_strage', diskStrageRouter);
router.use('/memory_strage', memoryStrage);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
