import express from "express";
import { upload } from "./upload.utils.js";
import { uploadSingle } from "./upload.controller.js";
import { protect, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.post(
  "/upload",
  protect, 
  requireRole('seller'),
  upload.single("image"),
  uploadSingle
);

export default router;