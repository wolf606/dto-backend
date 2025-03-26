import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { CreateProductDto, UpdateProductDto, IdDto } from "../dtos/product.dto";
import { Body, Param } from "../middleware/validate-dto";

const router = express.Router();

router.post("/", authMiddleware(["ADMIN"]), Body(CreateProductDto), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware(["ADMIN"]), Param(IdDto), Body(UpdateProductDto), updateProduct);
router.delete("/:id", authMiddleware(["ADMIN"]), Param(IdDto), deleteProduct);

export default router;
