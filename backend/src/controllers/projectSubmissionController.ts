import { Request, Response } from "express";
import { prisma } from "../db";

/* =====================================================
   CREATE SUBMISSION (PUBLIC — TANPA LOGIN)
===================================================== */
export const createSubmission = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      projectTitle,
      projectDescription,
      projectType,
    } = req.body;

    // ================= VALIDATION =================
    const missingFields: string[] = [];

    if (!fullName?.trim()) missingFields.push("Nama Lengkap");
    if (!email?.trim()) missingFields.push("Email");
    if (!phoneNumber?.trim()) missingFields.push("Nomor Telepon");
    if (!projectTitle?.trim()) missingFields.push("Judul Proyek");
    if (!projectDescription?.trim()) missingFields.push("Deskripsi Proyek");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Data belum lengkap",
        missingFields,
      });
    }

    // ================= CREATE =================
    const submission = await prisma.projectsubmission.create({
      data: {
        fullName,
        email,
        phoneNumber,
        projectTitle,
        projectDescription,
        projectType: projectType || null,
        status: "pending", // 🔒 PENTING
      },
    });

    return res.status(201).json({
      message: "Pengajuan proyek berhasil dikirim",
      data: submission,
    });
  } catch (err) {
    console.error("createSubmission error:", err);
    return res.status(500).json({
      message: "Terjadi kesalahan saat mengirim pengajuan",
    });
  }
};

/* =====================================================
   GET APPROVED + FINISHED (ADMIN)
===================================================== */
export const getApprovedSubmissions = async (_: Request, res: Response) => {
  try {
    const submissions = await prisma.projectsubmission.findMany({
      where: {
        status: {
          in: ["approved", "finished"],
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(submissions);
  } catch (err) {
    console.error("getApprovedSubmissions error:", err);
    return res.status(500).json({
      message: "Gagal mengambil data proyek",
    });
  }
};

/* =====================================================
   GET PENDING (ADMIN)
===================================================== */
export const getPendingSubmissions = async (_: Request, res: Response) => {
  try {
    const submissions = await prisma.projectsubmission.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
    });

    return res.json(submissions);
  } catch (err) {
    console.error("getPendingSubmissions error:", err);
    return res.status(500).json({
      message: "Gagal mengambil data pengajuan",
    });
  }
};

/* =====================================================
   APPROVE SUBMISSION (ADMIN)
===================================================== */
export const approveSubmission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const existing = await prisma.projectsubmission.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
    }

    const updated = await prisma.projectsubmission.update({
      where: { id },
      data: { status: "approved" },
    });

    return res.json({
      message: "Pengajuan berhasil disetujui",
      data: updated,
    });
  } catch (err) {
    console.error("approveSubmission error:", err);
    return res.status(500).json({
      message: "Gagal menyetujui pengajuan",
    });
  }
};

/* =====================================================
   REJECT SUBMISSION (ADMIN)
===================================================== */
export const rejectSubmission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { adminNote } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const existing = await prisma.projectsubmission.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
    }

    const updated = await prisma.projectsubmission.update({
      where: { id },
      data: {
        status: "rejected",
        adminNote: adminNote?.trim() || null,
      },
    });

    return res.json({
      message: "Pengajuan berhasil ditolak",
      data: updated,
    });
  } catch (err) {
    console.error("rejectSubmission error:", err);
    return res.status(500).json({
      message: "Gagal menolak pengajuan",
    });
  }
};

/* =====================================================
   UPDATE STATUS (ADMIN — MANUAL EDIT)
===================================================== */
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const ALLOWED_STATUS = ["pending", "approved", "rejected", "finished"];

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        message: "Status tidak valid",
        allowed: ALLOWED_STATUS,
      });
    }

    const updated = await prisma.projectsubmission.update({
      where: { id },
      data: { status },
    });

    return res.json({
      message: "Status proyek berhasil diperbarui",
      data: updated,
    });
  } catch (err) {
    console.error("updateSubmissionStatus error:", err);
    return res.status(500).json({
      message: "Gagal memperbarui status proyek",
    });
  }
};
