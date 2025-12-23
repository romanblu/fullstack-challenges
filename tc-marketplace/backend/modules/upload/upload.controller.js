import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { uploadProductImage } from "./upload.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const uploadSuccess = (req, res) => {
    const files = req.files.map(f => ({
        key: f.key,
        url: f.location || f.path, 
    }));

    res.json({ files });
};

export const uploadSingle = asyncHandler(async(req, res) =>{
  try {
    const { storeId, productId, sessionId, order } = req.body;

    if(storeId == null ) {
      return res.status(400).json({
        success: false,
        message: "storeId is required in the request body",
      });
    }

    if (!productId && !sessionId) {
      return res.status(400).json({
        success: false,
        message: "productId or sessionId required",
      });
    }

    if (productId && sessionId) {
      return res.status(400).json({
        success: false,
        message: "Provide only one of productId or sessionId",
      });
    }

    const image = await uploadProductImage({
      file: req.file,
      storeId,
      productId,
      sessionId,
      order

    });

    return res.status(200).json({
      success: true,
      url: image.url,
      key: image.key,
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
})

export const deleteFile = asyncHandler(async (req, res) => {
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
})