// controllers/projectSubmissionController.ts

import { Request, Response } from "express";
import { prisma } from "../db";

// ==============================
// CREATE SUBMISSION
// ==============================
export const createSubmission = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const submission = await prisma.projectsubmission.create({
      data,
    });

    return res.status(201).json(submission);
  } catch (err) {
    console.error("createSubmission error:", err);
    return res.status(500).json({ error: "Failed to create submission" });
  }
};

// ==============================
// GET APPROVED + FINISHED SUBMISSIONS (FIXED)
// ==============================
export const getApprovedSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await prisma.projectsubmission.findMany({
      where: {
        status: {
          in: ["approved", "finished"],  // <— FIX PALING PENTING
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(submissions);
  } catch (err) {
    console.error("getApprovedSubmissions error:", err);
    return res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

// ==============================
// GET PENDING SUBMISSIONS
// ==============================
export const getPendingSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await prisma.projectsubmission.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
    });

    return res.json(submissions);
  } catch (err) {
    console.error("getPendingSubmissions error:", err);
    return res.status(500).json({ error: "Failed to fetch pending submissions" });
  }
};

// ==============================
// APPROVE SUBMISSION
// ==============================
export const approveSubmission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.projectsubmission.update({
      where: { id },
      data: { status: "approved" },
    });

    return res.json({
      message: "Submission approved",
      data: updated,
    });
  } catch (err) {
    console.error("approveSubmission error:", err);
    return res.status(500).json({ error: "Failed to approve submission" });
  }
};

// ==============================
// REJECT SUBMISSION
// ==============================
export const rejectSubmission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { adminNote } = req.body;

    const updated = await prisma.projectsubmission.update({
      where: { id },
      data: {
        status: "rejected",
        adminNote: adminNote || null,
      },
    });

    return res.json({
      message: "Submission rejected",
      data: updated,
    });
  } catch (err) {
    console.error("rejectSubmission error:", err);
    return res.status(500).json({ error: "Failed to reject submission" });
  }
};

// ==============================
// UPDATE STATUS (ADMIN EDIT — FINISH INCLUDED)
// ==============================
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updated = await prisma.projectsubmission.update({
      where: { id },
      data: { status }, // bisa "approved", "finished", dll
    });

    return res.json({
      message: "Status proyek berhasil diperbarui",
      data: updated,
    });
  } catch (err) {
    console.error("updateSubmissionStatus error:", err);
    return res.status(500).json({ error: "Failed to update status" });
  }
};
