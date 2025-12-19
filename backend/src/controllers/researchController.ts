import { Request, Response } from "express";
import { prisma } from "../db";

/* =============================================================
   GET ALL RESEARCH BY LECTURER
   ============================================================= */
export const getResearchByLecturer = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    // ambil lecturerProfile berdasarkan userId
    const profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: { research: true },
    });

    if (!profile) {
      return res.json({ data: [] });
    }

    return res.json({ data: profile.research });
  } catch (err) {
    console.error("GET RESEARCH ERR:", err);
    res.status(500).json({ error: "Failed to fetch research data" });
  }
};

/* =============================================================
   ADD RESEARCH
   ============================================================= */
export const addResearch = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    // cari lecturerProfile
    let profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
    });

    // kalau belum ada → buat dulu
    if (!profile) {
      profile = await prisma.lecturerprofile.create({
        data: { userId },
      });
    }

    const research = await prisma.research.create({
      data: {
        lecturerId: profile.id,
        title: req.body.title,
        year: Number(req.body.year),
      },
    });

    return res.json({ message: "Success", data: research });
  } catch (err) {
    console.error("ADD RESEARCH ERR:", err);
    res.status(500).json({ error: "Failed to add research" });
  }
};

/* =============================================================
   UPDATE RESEARCH
   ============================================================= */
export const updateResearch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.research.update({
      where: { id },
      data: {
        title: req.body.title,
        year: Number(req.body.year),
      },
    });

    return res.json({ message: "Updated", data: updated });
  } catch (err) {
    console.error("UPDATE RESEARCH ERR:", err);
    res.status(500).json({ error: "Failed to update research" });
  }
};

/* =============================================================
   DELETE RESEARCH
   ============================================================= */
export const deleteResearch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.research.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE RESEARCH ERR:", err);
    res.status(500).json({ error: "Failed to delete research" });
  }
};
