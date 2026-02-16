import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/user/user.routes.js";
import productRoutes from "./modules/product/product.routes.js";
// import orderRoutes from "./routes/orders.js";
import authRoutes from "./modules/auth/auth.routes.js";
import blogRoutes from "./modules/blog/blog.routes.js";
import sellerRoutes from "./modules/store/store.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import variantRoutes from "./modules/variant/variant.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import { testS3 } from "./modules/upload/upload.utils.js";
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

//testS3();
app.use(cookieParser());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/store", sellerRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));