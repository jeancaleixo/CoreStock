import { Router } from "express";
import { createProduct } from "../Controllers/Product.js";

const router = Router();
router.post("/products", createProduct);

export default router;
