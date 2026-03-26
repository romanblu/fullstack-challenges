import mongoose from "mongoose";
import fs from "fs";
import path from "path";

import Product from "../modules/product/product.model.js";
import BlogPost from "../modules/blog/blog.model.js";
import User from "../modules/user/user.model.js";
import Store from "../modules/store/store.model.js";

import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// ------------------------------
// Clean Mongo fields
// ------------------------------
const clean = (docs) =>
  docs.map((doc) => {
    const { _id, __v, ...rest } = doc;

    return {
      ...rest,
      // keep id as string (optional, useful for relations)
      _id: _id.toString(),
    };
  });

// ------------------------------
// Ensure output folder exists
// ------------------------------
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// ------------------------------
// Export function
// ------------------------------
const exportData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    // fetch clean objects
    const products = await Product.find().lean();
    const blogPosts = await BlogPost.find().lean();
    const users = await User.find().lean();
    const stores = await Store.find().lean();
    // clean data
    const cleanProducts = clean(products);
    const cleanBlogPosts = clean(blogPosts);
    const cleanUsers = clean(users);
    const cleanStores = clean(stores);

    const outputDir = path.resolve("../seed-data");
    ensureDir(outputDir);

    // write files
    fs.writeFileSync(
      path.join(outputDir, "products.json"),
      JSON.stringify(cleanProducts, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "blogPosts.json"),
      JSON.stringify(cleanBlogPosts, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "users.json"),
      JSON.stringify(cleanUsers, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "stores.json"),
      JSON.stringify(cleanStores, null, 2)
    );

    console.log(" Data exported to /seed-data");

    process.exit();
  } catch (error) {
    console.error(" Export failed:", error);
    process.exit(1);
  }
};

exportData();