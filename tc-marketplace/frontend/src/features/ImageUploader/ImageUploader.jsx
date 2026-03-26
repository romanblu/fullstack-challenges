import { useState } from "react";
import ImageDropzone from "../ImageUploader/ImageDropzone.jsx";
import ImageGrid from "../ImageUploader/ImageGrid.jsx";
import { uploadFile } from "../../services/upload.js";
import { useAuth } from "../../context/useAuth.js";
import { useEffect } from "react";

export default function ImageUploader({ storeId, productId, sessionId, onReady }) {
    const [images, setImages] = useState([]);
    const { user } = useAuth();
    
    const [imageUrl, setImageUrl] = useState("");
    const [urlError, setUrlError] = useState("");
    
    useEffect(() => {
        if(onReady) {
            onReady(images);
        }
    }, [images, onReady]);

    const updateImage = (id, updates) => {
        setImages(prev =>
            prev.map(img =>
            img.id === id ? { ...img, ...updates } : img
            )
        );
    };
    
    const handleFilesAdded = async (newFiles) => {
        const startOrder = images.length

        const previewObjects = newFiles.map((file, index )=> {

            const base = {
                id: crypto.randomUUID(), 
                file: file,
                storeId: storeId,
                previewUrl: URL.createObjectURL(file),
                uploadStatus: 'idle',
                url: null,
                key: null,
                order: startOrder + index,
            }

            if (productId) {
                base.productId = productId;
            } else {
                base.sessionId = sessionId.current;
            }
            return base
        });

        setImages(prev => [...prev, ...previewObjects]);
    };

    const handleUpload = async () => {
        
        for (let img of images) {
            if (img.uploadStatus === 'uploaded') continue; // skip already uploaded images

            if (!img.file) continue; // skip URL images

            updateImage(img.id, { uploadStatus: "uploading" });

            try {
                const base = {
                    storeId: user.store,
                    order:  img.order
                }
             if(productId) {
                    base.productId = productId;
                } else {
                    base.sessionId = sessionId.current;
                }

                const res = await uploadFile({file: img.file, storeId, productId, sessionId: sessionId.current});

                if(res.success) {
                    updateImage(img.id, { 
                        uploadStatus: 'uploaded',
                        key: res.key,
                        url: res.publicUrl
                    })
             }

            } catch (err) {
                updateImage(img.id, { uploadStatus: 'error' });
                console.error("Error uploading image:", err);
            }
        }
    }
    
    const handleDeleteImage = (imageToDelete) => {
        setImages(prevImages => prevImages.filter(img => img.id !== imageToDelete.id));
    }

    // upload image from url
    const handleAddImageFromUrl = () => {
        if (!imageUrl) return;

        try {
            new URL(imageUrl);
        } catch {
            setUrlError("Invalid URL");
            return;
        }

        const newImage = {
            id: crypto.randomUUID(),
            file: null, // no file
            storeId: storeId,
            previewUrl: imageUrl,
            uploadStatus: "uploaded", 
            url: imageUrl,
            key: "url-upload-" + crypto.randomUUID(),
            order: images.length,
        };

        if (productId) {
            newImage.productId = productId;
        } else {
            newImage.sessionId = sessionId.current;
        }

        setImages(prev => [...prev, newImage]);
        setImageUrl("");
        setUrlError("");
    };

    console.log("Current images state:", images);

    return (
        <div>
            <ImageDropzone onFilesAdded={handleFilesAdded}/>
            <ImageGrid images={images} setImages={setImages} onDelete={handleDeleteImage}/>
            <button type="button" onClick={handleUpload} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md mt-4 px-2">
                Upload Images
            </button>
            <div className="mt-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={handleAddImageFromUrl}
                        className="bg-gray-200 px-3 rounded"
                    >
                        Add
                    </button>
                </div>

                {urlError && (
                    <p className="text-red-500 text-sm mt-1">{urlError}</p>
                )}
            </div>
        </div>
    )
}