import SortableList from "./SortableList.jsx";

export default function ImageGrid({ images, setImages }) {
    const handleDeleteImage = (imageToDelete) => {
        setImages(prevImages => prevImages.filter(img => img.id !== imageToDelete.id));
    }

    return (
        <div className="mt-6">
            <SortableList items={images} onChange={setImages} onDelete={handleDeleteImage}/>
            <button className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md mt-4 px-2">
                Upload Images
            </button>
        </div>
    )
}