import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./upload.utils.js"
import { uploadSuccess, deleteFile } from "./upload.controller.js";

import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
        key: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
});

router.post("/upload", upload.array("images"), uploadSuccess);
router.post("/delete", deleteFile);

export default router;