export function diffVariants(initialVariants, finalVariants) {
  const toUpdate = [];
  const toCreate = [];
  const toDelete = [];

  const initialMap = new Map(initialVariants.map(v => [v._id, v]));

  // Detect create & update
  for (const v of finalVariants) {
    if (!v._id) {
      toCreate.push(v);
    } else {
      const initial = initialMap.get(v._id);
      if (JSON.stringify(initial) !== JSON.stringify(v)) {
        toUpdate.push(v);
      }
      initialMap.delete(v._id);
    }
  }

  // Anything left in initialMap was removed
  for (const removedId of initialMap.keys()) {
    toDelete.push(removedId);
  }

  return { toCreate, toUpdate, toDelete };
}