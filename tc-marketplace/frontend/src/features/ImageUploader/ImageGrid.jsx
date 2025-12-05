import SortableList from "./SortableList.jsx";

export default function ImageGrid({ images, setImages }) {
    return (
        <div className="mt-6">
            <SortableList items={images} onChange={setImages}/>
        </div>
    )
}