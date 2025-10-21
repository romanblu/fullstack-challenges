import multer from 'multer';
import path from 'path';
import fs from 'fs';
const UPLOADS = process.env.UPLOADS_DIR || 'uploads';
if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'-'))
});
export const upload = multer({ storage });