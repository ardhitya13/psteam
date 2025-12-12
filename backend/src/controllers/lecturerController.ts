// controllers/lecturerController.ts
import { Request, Response } from "express";
import { prisma } from "../db";

// =============================================================
// GET ALL LECTURERS
// =============================================================
export const getAllLecturers = async (req: Request, res: Response) => {
  try {
    const lecturers = await prisma.user.findMany({
      where: { role: "dosen" },
      include: {
        lecturerprofile: {
          include: {
            educationhistory: true,
            research: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });

    return res.json(lecturers);
  } catch (err) {
    console.error("GET ALL LECTURERS ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch lecturers" });
  }
};

// =============================================================
// GET ONE LECTURER PROFILE
// =============================================================
export const getLecturerProfile = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    let profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: { educationhistory: true, research: true },
    });

    // CREATE EMPTY PROFILE IF NOT EXISTS
    if (!profile) {
      await prisma.lecturerprofile.create({
        data: {
          userId,
          studyProgram: "",
          specialization: "",
          imageUrl: null,
        },
      });

      profile = await prisma.lecturerprofile.findUnique({
        where: { userId },
        include: { educationhistory: true, research: true },
      });
    }

    return res.json({ user, profile });
  } catch (err) {
    console.error("GET PROFILE ERR:", err);
    return res.status(500).json({ error: "Failed to get profile" });
  }
};

// =============================================================
// UPDATE PROFILE
// =============================================================
export const updateLecturerProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = `/uploads/lecturer/${req.file.filename}`;
    }

    const updated = await prisma.lecturerprofile.upsert({
      where: { userId },
      update: {
        studyProgram: req.body.studyProgram,
        specialization: req.body.specialization,
        ...(imageUrl && { imageUrl }),
      },
      create: {
        userId,
        studyProgram: req.body.studyProgram,
        specialization: req.body.specialization,
        imageUrl: imageUrl ?? null,
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE PROFILE ERR:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  }
};

// =============================================================
// ADD EDUCATION
// =============================================================
export const addEducationHistory = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    let profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.lecturerprofile.create({
        data: { userId },
      });
    }

    const edu = await prisma.educationhistory.create({
      data: {
        lecturerId: profile.id,
        degree: req.body.degree,
        university: req.body.university,
        major: req.body.major,
      },
    });

    return res.json(edu);
  } catch (err) {
    console.error("ADD EDUCATION ERR:", err);
    return res.status(500).json({ error: "Failed to add education" });
  }
};

// =============================================================
// UPDATE EDUCATION
// =============================================================
export const updateEducationHistory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.educationhistory.update({
      where: { id },
      data: {
        degree: req.body.degree,
        university: req.body.university,
        major: req.body.major,
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE EDUCATION ERR:", err);
    return res.status(500).json({ error: "Failed to update education" });
  }
};

// =============================================================
// DELETE EDUCATION
// =============================================================
export const deleteEducationHistory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.educationhistory.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE EDUCATION ERR:", err);
    return res.status(500).json({ error: "Failed to delete education" });
  }
};

// =============================================================
// ADD RESEARCH
// =============================================================
export const addResearch = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    let profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.lecturerprofile.create({
        data: { userId },
      });
    }

    const r = await prisma.research.create({
      data: {
        lecturerId: profile.id,
        title: req.body.title,
        year: Number(req.body.year),
      },
    });

    return res.json(r);
  } catch (err) {
    console.error("ADD RESEARCH ERR:", err);
    return res.status(500).json({ error: "Failed to add research" });
  }
};

// =============================================================
// UPDATE RESEARCH
// =============================================================
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

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE RESEARCH ERR:", err);
    return res.status(500).json({ error: "Failed to update research" });
  }
};

// =============================================================
// DELETE RESEARCH
// =============================================================
export const deleteResearch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.research.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE RESEARCH ERR:", err);
    return res.status(500).json({ error: "Failed to delete research" });
  }
};
