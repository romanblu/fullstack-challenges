import SortableList from "./SortableList.jsx";

export default function ImageGrid({ images, setImages, onDelete }) {

    return (
        <div className="mt-6">
            <SortableList items={images} onChange={setImages} onDelete={onDelete}/>
        </div>
    )
}