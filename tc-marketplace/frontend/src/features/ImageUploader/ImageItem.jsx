import { MdDelete } from "react-icons/md";


export default function ImageItem({ image }) {
    return (
        <div className="relative w-full h-32 overflow-hidden rounded border">
            <img src={image.previewUrl} className="object-cover w-full h-full" />
            <MdDelete size={28} color="red" className=" absolute top-1 right-1 opacity-60 hover:opacity-100 transition cursor-pointer" onClick={()=> console.log("DELETE item: " , image)}/>
        </div>
    )

}