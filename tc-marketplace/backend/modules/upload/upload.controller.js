import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const uploadSuccess = (req, res) => {
    const files = req.files.map(f => ({
        key: f.key,
        url: f.location || f.path, 
    }));

    res.json({ files });
};

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