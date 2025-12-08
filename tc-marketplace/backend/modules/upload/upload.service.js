import { PutObjectCommand, GetObjectCommand  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
  
  const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      }),
      { expiresIn: 60 * 60 * 24 * 7 } 
    );
  
  return {
    key,
    url
  };
}