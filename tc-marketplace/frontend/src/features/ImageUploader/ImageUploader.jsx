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
        
        for (let file of newFiles) {
            // await uploadImageToBackend(file);
        }
    };
    console.log(images)
    return (
        <div>
            <ImageDropzone onFilesAdded={handleFilesAdded}/>
            <ImageGrid images={images} setImages={setImages}/>
        </div>
    )
}