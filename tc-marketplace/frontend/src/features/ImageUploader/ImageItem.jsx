import { MdDelete } from "react-icons/md";


export default function ImageItem({ image, onDelete }) {

    return (
        <div className={`relative w-full h-32 overflow-hidden rounded border-3 
                ${image.uploadStatus === 'uploading' ? 'border-yellow-500 animate-pulse' : image.uploadStatus === 'uploaded' 
                ? 'border-green-500' : 'border-gray-300' 
                ? image.uploadStatus === 'error' : 'border-red-600' } cursor-pointer`}>

            <img src={image.previewUrl} className="object-cover w-full h-full" />
            <MdDelete size={28} color="red" className=" absolute top-1 right-1 opacity-60 hover:opacity-100 transition cursor-pointer" onClick={()=> onDelete(image)}/>
        </div>
    )

}