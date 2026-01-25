import { PutObjectCommand, GetObjectCommand  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from './upload.utils.js';
import dotenv from "dotenv";
import ProductImage from "../product/image.model.js";
dotenv.config();

// export async function uploadSingleImageToS3(file, folderPath) {
//   if (!file) throw new Error("File required");

//   const fileName = `${Date.now()}-${file.originalname}`;

//   const key = `${folderPath}/${fileName}`;
  
//   const uploadParams = {
//     Bucket: process.env.AWS_S3_BUCKET,
//     Key: key,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   };

//   await s3.send(new PutObjectCommand(uploadParams));
  
//   const url = await getSignedUrl(
//       s3,
//       new GetObjectCommand({
//         Bucket: process.env.AWS_S3_BUCKET,
//         Key: key,
//       }),
//       { expiresIn: 60 * 60 * 24 * 7 } 
//     );
  
//   return {
//     key,
//     url
//   };
// }


 export async function uploadProductImage({file, storeId, productId, sessionId, order}) {
//   if(!file) throw new Error("File required");

//   const folderPath = productId
//   ? `stores/${storeId}/products/${productId}`
//   : `stores/${storeId}/temp/${sessionId}`;

//   const { key, url } = await uploadSingleImageToS3(file, folderPath);

//   const image = ProductImage.create({
//     storeId,
//     productId: productId || null,
//     sessionId: sessionId || null,
//     key,
//     url,
//     order
//   })

//   return image
// }

// export async function moveImageInS3(oldKey, newKey) {

// }

// export async function deteleImageFromS3 (key) {
  
 }


export async function getUploadUrl( {storeId, productId, sessionId, fileName, fileType}){
  const folderPath = productId
    ? `stores/${storeId}/products/${productId}`
    : `stores/${storeId}/temp/${sessionId}`;

  const key = `${folderPath}/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  const publicUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;

  return { uploadUrl, publicUrl, key}
}