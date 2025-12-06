import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from './upload.utils.js';
import dotenv from "dotenv";

dotenv.config();

export async function uploadSingleImageToS3(file, folderPath) {
  if (!file) throw new Error("File required");

  const fileName = `${Date.now()}-${file.originalname}`;
  const key = `${folderPath}/${fileName}`;
  
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return {
    key,
    url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
}