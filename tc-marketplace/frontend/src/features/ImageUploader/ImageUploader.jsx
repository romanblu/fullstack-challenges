import { useRef, useState } from "react";
import ImageDropzone from "../ImageUploader/ImageDropzone.jsx";
import ImageGrid from "../ImageUploader/ImageGrid.jsx";
import { uploadSingleImage } from "../../services/upload.js";
import { useAuth } from "../../context/useAuth.js";

export default function ImageUploader({ productId, sessionId }) {
    const [images, setImages] = useState([]);
    const { user } = useAuth();
    

    const updateImage = (id, updates) => {
        setImages(prev =>
            prev.map(img =>
            img.id === id ? { ...img, ...updates } : img
            )
        );
    };

    const handleFilesAdded = async (newFiles) => {
        const previewObjects = newFiles.map(file => ({
            id: crypto.randomUUID(), 
            file,
            previewUrl: URL.createObjectURL(file),
            uploadStatus: 'idle',
            uploadedUrl: null,
            uploadedKey: null
        }));

        setImages(prev => [...prev, ...previewObjects]);
    };

    const handleUpload = async () => {
        for (let img of images) {
            if (img.uploadStatus === 'uploaded') continue; // skip already uploaded images

            try {
                updateImage(img.id, { uploadStatus: "uploading" });
                const res = await uploadSingleImage(img.file, {
                    storeId: user.store,
                    productId: productId ,
                    sessionId: sessionId.current
                });

                
                if(res.success) {
                    updateImage(img.id, { 
                        uploadStatus: 'uploaded',
                        uploadedKey: res.key,
                        uploadedUrl: res.url
                    })
                }

            } catch (err) {
                updateImage(img.id, { uploadStatus: 'error' });
                console.error("Error uploading image:", err);
            }
        }
    }
    console.log("Images: ",images)
    const handleDeleteImage = (imageToDelete) => {
        setImages(prevImages => prevImages.filter(img => img.id !== imageToDelete.id));
    }

    return (
        <div>
            <ImageDropzone onFilesAdded={handleFilesAdded}/>
            <ImageGrid images={images} setImages={setImages} onDelete={handleDeleteImage}/>
            <button type="button" onClick={handleUpload} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md mt-4 px-2">
                Upload Images
            </button>
        </div>
    )
}