import { useDropzone } from "react-dropzone";

export default function ImageDropzone({ onFilesSelected }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => onFilesSelected(acceptedFiles)
  });

  return (
    <div
      {...getRootProps()}
      className={
        "border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition " +
        (isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300")
      }
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">
        {isDragActive ? "Drop files…" : "Click or drag images to upload"}
      </p>
    </div>
  );
}