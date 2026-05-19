// Upload route for files or pasted text.
import express from 'express';
import { uploadSource } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// One endpoint handles both multipart file upload and pasted text.
router.post('/' , protect , upload.single('file'), uploadSource);
export default router;
