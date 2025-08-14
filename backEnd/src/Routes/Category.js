import { Router } from "express";
import { createCategory, deletCategory, editCategory, getAllCategorys, getCategoryById} from "../Controllers/Category.js";

const router = Router()
router.post("/categorys", createCategory);
router.delete("/categorys/:id",deletCategory)
router.patch("/edit-category/:id", editCategory)
router.get("/categorys", getAllCategorys)
router.get("/categorys/:id", getCategoryById)

export default router