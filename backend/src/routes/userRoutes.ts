import { Router } from "express";
import {
  getUsers,
  createUser,
  createManyUsers,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);
router.post("/bulk", authMiddleware, createManyUsers);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
