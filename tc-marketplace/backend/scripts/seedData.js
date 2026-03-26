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
// Read JSON helper
// ------------------------------
const readJSON = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// ------------------------------
// Clean data before insert
// ------------------------------
const prepare = (docs) =>
  docs.map(({ _id, ...rest }) => ({
    ...rest,
  }));

// ------------------------------
// Seed function
// ------------------------------
const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" Connected to DB");

    const basePath = path.resolve("./../seed-data");

    const products = readJSON(path.join(basePath, "products.json"));
    const blogPosts = readJSON(path.join(basePath, "blogPosts.json"));
    const users = readJSON(path.join(basePath, "users.json"));
    const stores = readJSON(path.join(basePath, "stores.json"));

    // ⚠️ Prevent accidental production wipe
    if (process.env.NODE_ENV === "production") {
      throw new Error("Seeding not allowed in production");
    }

    console.log(" Clearing existing data...");
    await Product.deleteMany();
    await BlogPost.deleteMany();
    await User.deleteMany();
    await Store.deleteMany();

    console.log(" Inserting products...");
    await Product.insertMany(prepare(products));

    console.log(" Inserting blog posts...");
    await BlogPost.insertMany(prepare(blogPosts));

    console.log(" Inserting users...");
    await User.insertMany(prepare(users));

    console.log(" Inserting stores...");
    await Store.insertMany(prepare(stores));
    
    console.log(" Seeding completed successfully");

    process.exit();
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};

seedData();