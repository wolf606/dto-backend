import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price } = req.body;

    const product = await prisma.product.create({
      data: { name, description, price },
    });

    res.json({ message: "Producto creado", product });
  } catch (error) {
    next(error); 
  }
};

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    next(error); 
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      const error: ErrorResponse = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    res.json(product);
  } catch (error) {
    next(error); 
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price },
    });

    res.json({ message: "Producto actualizado", updatedProduct });
  } catch (error) {
    next(error); 
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    next(error); 
  }
};