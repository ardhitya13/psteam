import { Router } from "express";
import {
  createLecturerAccount,
  getLecturerAccounts,
  deleteLecturerAccount,
} from "../controllers/lecturerAccountController";

const router = Router();

router.post("/", createLecturerAccount);
router.get("/", getLecturerAccounts);
router.delete("/:id", deleteLecturerAccount);

export default router;
