import express from "express";
import {
  getRegistrations,
  getPendingRegistrations,
  getApprovedRegistrations,
  createRegistration,
  updateStatus,
  deleteRegistration,
} from "../controllers/trainingController";

const router = express.Router();

// Create new registration
router.post("/", createRegistration);

// Get all registrations
router.get("/", getRegistrations);

// Get only pending registrations
router.get("/pending", getPendingRegistrations);

// Get only approved registrations
router.get("/approved", getApprovedRegistrations);

// Update registration status (approve/reject)
router.put("/:id/status", updateStatus);

// Delete registration
router.delete("/:id", deleteRegistration);

export default router;
