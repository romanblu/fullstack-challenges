import express from "express";
import {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant
} from "../controllers/variantController.js";

const router = express.Router();

router.post("/", createVariant);
router.get("/", getVariants);
router.patch("/:id", updateVariant);
router.delete("/:id", deleteVariant);

export default router;