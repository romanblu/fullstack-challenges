import { useState } from "react";
import ImageDropzone from "../ImageUploader/ImageDropzone.jsx";
import ImageGrid from "../ImageUploader/ImageGrid.jsx";

export default function ImageUploader() {
    const [images, setImages] = useState([]);
    
    const handleFilesAdded = async (newFiles) => {
        const previewObjects = newFiles.map(file => ({
            id: Math.random(),    // temporary ID
            file,
            previewUrl: URL.createObjectURL(file),
            uploadStatus: 'uploading'
        }));

        setImages(prev => [...prev, ...previewObjects]);
        
    };
    console.log(images)

    const handleUpload = () => {
        for (let file of newFiles) {
            // await uploadImageToBackend(file);
        }
    }

    const handleDeleteImage = (imageToDelete) => {
        setImages(prevImages => prevImages.filter(img => img.id !== imageToDelete.id));
    }

    return (
        <div>
            <ImageDropzone onFilesAdded={handleFilesAdded}/>
            <ImageGrid images={images} setImages={setImages} onDelete={handleDeleteImage}/>
            <button onClick={handleUpload} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md mt-4 px-2">
                Upload Images
            </button>
        </div>
    )
}