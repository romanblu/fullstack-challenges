import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

dotenv.config();

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint:`https://s3.${process.env.AWS_REGION}.amazonaws.com`,
   forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});


export const testS3 = async () => {
  const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });


  const sts = new STSClient({ region: process.env.AWS_REGION });
  const identity = await sts.send(new GetCallerIdentityCommand({}));
  try{
      const response = await s3.send(new CopyObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        CopySource: encodeURIComponent( process.env.AWS_S3_BUCKET + '/stores/68ff8f0f0cc1600b94d9193a/temp/bd6bd64c-c08a-4f27-a848-d800b2fbdcaf/1769425227351-winkie.jpg'),
        Key: 'stores/68ff8f0f0cc1600b94d9193a/new/bd6bd64c-c08a-4f27-a848-d800b2fbdcaf/1769425227351-winkie.jpg'
      }));

      console.log("S3 CopyObjectCommand response:", response);
    } catch (error){
      console.error("Error moving image in S3:", error);
    }
  console.log("Backend identity:", identity);

}