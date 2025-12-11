import { Router } from "express";
import { login, changePassword } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.put("/change-password", changePassword);

export default router;
