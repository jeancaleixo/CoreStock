import { Router } from "express";
import { createUser } from "../Controllers/User.js";

const router = Router();
router.post("/users", createUser);

export default router;
