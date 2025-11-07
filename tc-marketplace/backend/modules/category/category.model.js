import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  description: String,
  image: String,
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);