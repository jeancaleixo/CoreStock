import { Router } from "express";
import {
  createUser,
  editUser,
  getAllUsers,
  getUserById,
} from "../Controllers/User.js";

const router = Router();
router.post("/users", createUser);
router.patch("/edit-user/:id", editUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

export default router;
