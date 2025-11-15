export const parseDuplicateError = (err) => {
  if (err.code !== 11000) return null;

  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  if (field === "name") return `Product name "${value}" already exists.`;
  if (field === "slug") return `Product slug "${value}" already exists.`;
  if (field === "sku")  return `Variant SKU "${value}" already exists.`;

  return {field, message: `${field} already exists`};
};