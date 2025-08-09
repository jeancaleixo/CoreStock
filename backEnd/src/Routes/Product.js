import { Router } from "express";
import { createProduct, deletProduct, editProduct, getAllProducts, getProductById } from "../Controllers/Product.js";

const router = Router();
router.post("/products", createProduct);
router.delete("/products/:id",deletProduct)
router.patch("/edit-product/:id", editProduct)
router.get("/products", getAllProducts)
router.get("/products/:id", getProductById)

export default router;
