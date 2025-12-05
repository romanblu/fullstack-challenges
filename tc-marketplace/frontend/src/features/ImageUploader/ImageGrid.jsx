import SortableList from "./SortableList.jsx";

export default function ImageGrid({ images, setImages }) {
    return (
        <div className="mt-6">
            <SortableList items={images} onChange={setImages}/>
            <button className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md mt-4 px-2">
                Upload Images
            </button>
        </div>
    )
}