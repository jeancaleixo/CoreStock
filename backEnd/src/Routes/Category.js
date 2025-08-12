import { Router } from "express";
import { createCategory } from "../Controllers/Category.js";

const router = Router()
router.post("/categorys", createCategory);

export default router