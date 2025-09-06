import express from "express";
import { addProduct, listProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authenticateToken, addProduct);
router.get("/", listProducts);
router.get("/:id", getProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);
export default router;
