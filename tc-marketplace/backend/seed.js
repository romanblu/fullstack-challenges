import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tc-marketplace";

async function seedProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // clear old data
    await Product.deleteMany({});

    const products = [];

    for (let i = 0; i < 20; i++) {
      products.push({
        name: faker.commerce.productName(),
        species: faker.lorem.word(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 5, max: 100 }),
        quantity: faker.number.int({ min: 1, max: 50 }),
        image: faker.image.urlPicsumPhotos(),
        seller: faker.company.name(),
      });
    }

    await Product.insertMany(products);
    console.log("✅ 20 fake products added!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedProducts();