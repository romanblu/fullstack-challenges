export function diffObjects(original, updated){
    const changes = {}

    for(const key in updated){
     const originalValue = original[key];
    const updatedValue = updated[key];

    if (Array.isArray(updatedValue)) {
      if (JSON.stringify(originalValue) !== JSON.stringify(updatedValue)) {
        changes[key] = updatedValue;
      }
    } else if (typeof updatedValue === "object" && updatedValue !== null) {
      const nested = diffObjects(originalValue || {}, updatedValue);
      if (Object.keys(nested).length > 0) {
        changes[key] = nested;
      }
    } else {
      if (originalValue !== updatedValue) {
        changes[key] = updatedValue;
      }
    }
  }

  return changes;
}