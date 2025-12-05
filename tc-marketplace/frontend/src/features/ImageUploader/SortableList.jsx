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

export default function SortableList({ items, onChange }) {
  // Needed for drag activation
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    onChange(reordered); // return reordered list to parent
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)} // dnd-kit requires ID array
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-3">
          {items.map((item) => (
            <SortableItem key={item.id} item={item} id={item.id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}