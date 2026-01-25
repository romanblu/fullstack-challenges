import express from "express";
import { upload } from "./upload.utils.js";
import { uploadSingle, getPresignedUrlUpload } from "./upload.controller.js";
import { protect, requireRole } from '../../middleware/auth.js';

const router = express.Router();

// router.post(
//   "/upload",
//   protect, 
//   requireRole('seller'),
//   upload.single("image"),
//   uploadSingle
// );

router.get('/presigned-url', protect, requireRole('seller'), getPresignedUrlUpload )

export default router;