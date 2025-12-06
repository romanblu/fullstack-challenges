import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { uploadSingleImageToS3 } from "./upload.service.js";

export const uploadSuccess = (req, res) => {
    const files = req.files.map(f => ({
        key: f.key,
        url: f.location || f.path, 
    }));

    res.json({ files });
};

export async function uploadSingle(req, res) {
  try {
    const { storeId, productSlug } = req.body;
    
    if(storeId == null || productSlug == null) {
      return res.status(400).json({
        success: false,
        message: "storeId and product-slug are required in the request body",
      });
    }

    const folderPath = `stores/${storeId}/products/${productSlug}`;

    const result = await uploadSingleImageToS3(req.file, folderPath);

    return res.status(200).json({
      success: true,
      url: result.url,
      key: result.key,
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
}

export const deleteFile = async (req, res) => {
    try {
        const { key } = req.body;

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
            })
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete" });
    }
};