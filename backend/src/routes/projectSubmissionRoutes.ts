import { Router } from "express";
import { 
  createSubmission, getApprovedSubmissions,
  getPendingSubmissions, approveSubmission, 
  rejectSubmission, updateSubmissionStatus
} from "../controllers/projectSubmissionController";

const router = Router();

router.post("/", createSubmission);
router.get("/approved", getApprovedSubmissions);
router.get("/pending", getPendingSubmissions);
router.patch("/:id/approve", approveSubmission);
router.patch("/:id/reject", rejectSubmission);
router.patch("/:id/update-status", updateSubmissionStatus);


export default router;
