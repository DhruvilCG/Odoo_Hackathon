import express from "express";
import { addToCart, viewCart, removeFromCart } from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authenticateToken, addToCart);
router.get("/", authenticateToken, viewCart);
router.delete("/:id", authenticateToken, removeFromCart);
export default router;
