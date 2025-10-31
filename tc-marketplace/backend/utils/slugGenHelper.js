import slugify from "slugify";

export default function generateAutoSlug(base) {
  const clean = slugify(base, { lower: true, strict: true });
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${clean}-${random}`;
}