import express from "express";
import { checkout, previousPurchases } from "../controllers/purchaseController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", authenticateToken, checkout);
router.get("/previous", authenticateToken, previousPurchases);

export default router;
