import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import sellerRoutes from "./routes/store.js";
import categoryRoutes from "./routes/category.js";
import variantRoutes from "./routes/variant.js";

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from "morgan";
import logger from "./utils/logger.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

app.use(express.json());

// Connect Morgan to Winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

// app.use(morgan('combined', { stream }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/store", sellerRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/variants", variantRoutes);

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));