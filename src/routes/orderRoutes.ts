import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";
import { CreateOrderDto, GetOrderByIdDto } from "../dtos/order.dto";
import { Body, Param } from "../middleware/validate-dto";

const router = express.Router();

router.post("/", authMiddleware(["CLIENT"]), Body(CreateOrderDto), createOrder);
router.get("/", authMiddleware(["ADMIN", "CLIENT"]), getOrders);
router.get("/:id", authMiddleware(["ADMIN", "CLIENT"]), Param(GetOrderByIdDto), getOrderById);

export default router;
