import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function SortableList({ items, onChange, onDelete }) {

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    onChange(reordered); 
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)} 
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, index) => (
            <SortableItem key={item.id} index={index} item={item} id={item.id} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}