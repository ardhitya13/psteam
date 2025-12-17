import { Router } from "express";
import { login, changePassword } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/login", login);
router.put("/change-password", authMiddleware, changePassword);

export default router;
