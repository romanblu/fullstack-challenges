import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contactEmail: String,
    contactPhone: String,
    logo: String,
    banner: String,
    location: String,
    description: String,
    category: String,
    tags: [String],
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("Store", storeSchema);