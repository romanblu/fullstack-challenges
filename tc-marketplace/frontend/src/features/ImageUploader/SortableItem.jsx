import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ImageItem from "./ImageItem";

export default function SortableItem({ item, id, onDelete, index }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isMain = index === 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-full h-32 overflow-hidden rounded  cursor-move"
    >
      {isMain && (
        <div className="absolute top-1 left-1 bg-lime-500 z-10 pl-1 pr-1 rounded opacity-80">
          MAIN IMAGE
        </div>
      )}
        <ImageItem image={item} onDelete={onDelete}/>
       
        
    </div>
  );
}