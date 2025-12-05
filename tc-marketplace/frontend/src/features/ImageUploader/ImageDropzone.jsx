import { useDropzone } from "react-dropzone";

export default function ImageDropzone({ onFilesAdded }) {
    const onDrop = (acceptedFiles) => {
        onFilesAdded(acceptedFiles);  
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        multiple: true,
        onDrop,
    });

    return (
        <div 
            {...getRootProps()} 
            className="p-6 border-2 border-dashed rounded-md text-center cursor-pointer"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop images here…</p>
            ) : (
                <p>Drag & drop or click to upload images</p>
            )}
        </div>
    );
}