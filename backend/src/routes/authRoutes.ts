import { Router } from "express";
import { register, login, changePassword } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// REGISTER USER
router.post("/register", register);

// LOGIN USER
router.post("/login", login);

// CHANGE PASSWORD
router.put("/change-password", authMiddleware, changePassword);

export default router;
