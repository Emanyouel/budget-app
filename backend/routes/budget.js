import express from "express";
import { getBudgets, addBudget } from "../controllers/budgetController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getBudgets);
router.post("/", verifyToken, isAdmin, addBudget);

export default router;
