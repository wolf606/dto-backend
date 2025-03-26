import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(["CLIENT"]), createOrder);
router.get("/", authMiddleware(["ADMIN", "CLIENT"]), getOrders);
router.get("/:id", authMiddleware(["ADMIN", "CLIENT"]), getOrderById);

export default router;
