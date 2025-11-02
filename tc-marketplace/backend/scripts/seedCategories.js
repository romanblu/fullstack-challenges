import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";
import fs from "fs";


const categoriesData = JSON.parse(
  fs.readFileSync("./scripts/categories.json", "utf-8")
);
dotenv.config();

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // First, insert all categories WITHOUT parent field
    const categoriesWithoutParents = categoriesData.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      parent: null
    }));

    const inserted = await Category.insertMany(categoriesWithoutParents);

    // Build a lookup table: slug → ObjectId
    const slugMap = {};
    inserted.forEach(cat => {
      slugMap[cat.slug] = cat._id;
    });

    // Now update parents using slugMap
    const updateOps = [];

    for (const cat of categoriesData) {
      if (cat.parent) {
        updateOps.push(
          Category.updateOne(
            { slug: cat.slug },
            { parent: slugMap[cat.parent] }
          )
        );
      }
    }

    await Promise.all(updateOps);

    console.log("Categories seeded successfully");
    process.exit(0);

  } catch (err) {
    console.error("Error seeding categories:", err);
    process.exit(1);
  }
};

seedCategories();