import { Router } from "express";
import {
  getRegistrations,
  getApprovedRegistrations,
  getPendingRegistrations,
  createRegistration,
  updateStatus,
} from "../controllers/trainingController";

const router = Router();

router.get("/pending", getPendingRegistrations);
router.get("/approved", getApprovedRegistrations);
router.get("/", getRegistrations);
router.post("/", createRegistration);
router.put("/:id/status", updateStatus);

export default router;
