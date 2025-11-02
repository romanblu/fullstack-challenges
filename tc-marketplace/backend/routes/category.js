import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryTree
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/tree", getCategoryTree);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;