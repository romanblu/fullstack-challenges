import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ImageItem from "./ImageItem";

export default function SortableItem({ item, id, onDelete }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-full h-32 overflow-hidden rounded  cursor-move"
    >
      {/* <img src={item.previewUrl} className="object-cover w-full h-full" /> */}
        <ImageItem image={item} onDelete={onDelete}/>
        
    </div>
  );
}