import express from 'express';
import { createUrl, deleteUrl, getAllUrl, getUrl } from '../controller/shortUrl';

const router = express.Router();

router.post("/",createUrl);
router.get("/",getAllUrl);
router.get("/:id",getUrl);
router.delete("/:id",deleteUrl);

export default router;