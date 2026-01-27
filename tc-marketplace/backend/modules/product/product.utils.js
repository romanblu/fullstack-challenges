import Product from "./product.model.js";
import dotenv from "dotenv";

dotenv.config();

export const parseDuplicateError = (err) => {
  if (err.code !== 11000) return null;

  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  if (field === "name") return `Product name "${value}" already exists.`;
  if (field === "slug") return `Product slug "${value}" already exists.`;
  if (field === "sku")  return `Variant SKU "${value}" already exists.`;

  return {field, message: `${field} already exists`};
};

export const moveImagesMeta = async (productId, movedImages) => {
  if (!movedImages || movedImages.length === 0) return;

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const cdn = process.env.CLOUD_FRONTEND_URL ;

  product.images = product.images.map(img => {
    const moved = movedImages.find(m => m.oldKey === img.key);

    if (!moved) return img;

    return {
      ...img.toObject(),
      key: moved.newKey,
      url: `${cdn}/${moved.newKey}`,
      uploadedAt: new Date()
    };
  });

  await product.save();

  return product.images;
};