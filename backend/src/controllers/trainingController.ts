import { Request, Response } from "express";
import { prisma } from "../db";

// ============================================================
// GET ALL (HANYA UNTUK DEBUG / ADMIN PENUH)
// ============================================================
export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      orderBy: { id: "desc" },
    });

    return res.json(regs);
  } catch (err) {
    console.error("getRegistrations error:", err);
    return res.status(500).json({ error: "Failed to fetch registrations" });
  }
};

// ============================================================
// GET ONLY PENDING (HALAMAN VERIFIKASI)
// ============================================================
export const getPendingRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      where: { status: "pending" },
      orderBy: { id: "desc" },
    });

    return res.json(regs);
  } catch (err) {
    console.error("getPendingRegistrations error:", err);
    return res.status(500).json({ error: "Failed to fetch pending registrations" });
  }
};

// ============================================================
// GET ONLY APPROVED (HALAMAN PESERTA)
// ============================================================
export const getApprovedRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      where: { status: "approved" },
      orderBy: { id: "desc" },
    });

    return res.json(regs);
  } catch (err) {
    console.error("getApprovedRegistrations error:", err);
    return res.status(500).json({ error: "Failed to fetch approved registrations" });
  }
};

// ============================================================
// CREATE REGISTRATION
// ============================================================
export const createRegistration = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const reg = await prisma.trainingregistration.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        trainingTitle: data.trainingTitle,
        trainingType: data.trainingType,
        batch: data.batch,
        notes: data.notes || "",
        status: "pending",
      },
    });

    return res.status(201).json(reg);
  } catch (err) {
    console.error("createRegistration error:", err);
    return res.status(500).json({ error: "Failed to create registration" });
  }
};

// ============================================================
// UPDATE STATUS (APPROVED / REJECTED)
// ============================================================
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await prisma.trainingregistration.update({
      where: { id },
      data: { status },
    });

    return res.json(updated);
  } catch (err) {
    console.error("updateStatus error:", err);
    return res.status(500).json({ error: "Failed to update status" });
  }
};

// ============================================================
// DELETE REGISTRATION
// ============================================================
export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.trainingregistration.delete({
      where: { id }
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("deleteRegistration error:", err);
    return res.status(500).json({ error: "Failed to delete registration" });
  }
};

