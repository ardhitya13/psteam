import { Router } from "express";
import {
  getUsers,
  createUser,
  createManyUsers,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/bulk", createManyUsers);
router.delete("/:id", deleteUser);

export default router;
