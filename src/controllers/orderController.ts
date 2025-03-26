import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      const error: ErrorResponse = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const order = await prisma.order.create({
      data: { userId, productId },
    });

    res.status(201).json({ message: "Orden creada", order });
  } catch (error) {
    next(error); 
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orders;

    if (req.user.role === "ADMIN") {
      orders = await prisma.order.findMany({ include: { user: true, product: true } });
    } else {
      orders = await prisma.order.findMany({
        where: { userId: req.user.id },
        include: { product: true },
      });
    }

    res.json(orders);
  } catch (error) {
    next(error); 
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { user: true, product: true },
    });

    if (!order) {
      const error: ErrorResponse = new Error("Orden no encontrada");
      error.statusCode = 404;
      throw error;
    }

    if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
      const error: ErrorResponse = new Error("No tienes permiso para ver esta orden");
      error.statusCode = 403;
      throw error;
    }

    res.json(order);
  } catch (error) {
    next(error); 
  }
};