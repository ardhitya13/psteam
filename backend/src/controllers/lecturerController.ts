import { Request, Response } from "express";
import { prisma } from "../db";

/* =============================================================
   GET ALL LECTURERS
   ============================================================= */
export const getAllLecturers = async (req: Request, res: Response) => {
  try {
    const lecturers = await prisma.user.findMany({
      where: { role: "dosen" },
      include: {
        lecturerprofile: {
          include: {
            educationhistory: true,
            research: true,
            communityservice: true,
            scientificwork: true,
            intellectualproperty: true,
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

/* =============================================================
   GET ONE LECTURER PROFILE
   ============================================================= */
export const getLecturerProfile = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: {
        educationhistory: true,
        research: true,
        communityservice: true,
        scientificwork: true,
        intellectualproperty: true,
      },
    });

    // CREATE PROFILE IF NOT EXISTS
    if (!profile) {
      profile = await prisma.lecturerprofile.create({
        data: {
          userId,
          studyProgram: "",
          specialization: "",
          imageUrl: null,
        },
        include: {
          educationhistory: true,
          research: true,
          communityservice: true,
          scientificwork: true,
          intellectualproperty: true,
        },
      });
    }

    return res.json({ user, profile });
  } catch (err) {
    console.error("GET PROFILE ERR:", err);
    return res.status(500).json({ error: "Failed to get profile" });
  }
};

/* =============================================================
   UPDATE PROFILE
   ============================================================= */
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

/* =============================================================
   ADD EDUCATION (TIDAK DIUBAH)
   ============================================================= */
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

/* =============================================================
   UPDATE EDUCATION
   ============================================================= */
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

/* =============================================================
   DELETE EDUCATION
   ============================================================= */
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

/* =============================================================
   ADD RESEARCH
   ============================================================= */
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

    const research = await prisma.research.create({
      data: {
        lecturerId: profile.id, 
        title: req.body.title,
        year: Number(req.body.year),
      },
    });

    return res.json(research);
  } catch (err) {
    console.error("ADD RESEARCH ERR:", err);
    return res.status(500).json({ error: "Failed to add research" });
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

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE RESEARCH ERR:", err);
    return res.status(500).json({ error: "Failed to update research" });
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
    return res.status(500).json({ error: "Failed to delete research" });
  }
};

/* =============================================================
   ADD COMMUNITY SERVICE
   ============================================================= */
export const addCommunityService = async (req: Request, res: Response) => {
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

    const cs = await prisma.communityservice.create({
      data: {
        lecturerId: profile.id,
        title: req.body.title,
        year: Number(req.body.year),
      },
    });

    return res.json(cs);
  } catch (err) {
    console.error("ADD COMMUNITY SERVICE ERR:", err);
    return res.status(500).json({ error: "Failed to add community service" });
  }
};

/* =============================================================
   UPDATE COMMUNITY SERVICE
   ============================================================= */
export const updateCommunityService = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.communityservice.update({
      where: { id },
      data: {
        title: req.body.title,
        year: Number(req.body.year),
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE COMMUNITY SERVICE ERR:", err);
    return res.status(500).json({ error: "Failed to update community service" });
  }
};

/* =============================================================
   DELETE COMMUNITY SERVICE
   ============================================================= */
export const deleteCommunityService = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.communityservice.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE COMMUNITY SERVICE ERR:", err);
    return res.status(500).json({ error: "Failed to delete community service" });
  }
};

/* =========================
   ADD SCIENTIFIC WORK
========================= */
export const addScientificWork = async (req: Request, res: Response) => {
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

    const sw = await prisma.scientificwork.create({
      data: {
        lecturerId: profile.id,
        title: req.body.title,
        type: req.body.type,
        year: Number(req.body.year),
      },
    });

    return res.json(sw);
  } catch (err) {
    console.error("ADD SCIENTIFIC WORK ERR:", err);
    return res.status(500).json({ error: "Failed to add scientific work" });
  }
};

/* =========================
   UPDATE SCIENTIFIC WORK
========================= */
export const updateScientificWork = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.scientificwork.update({
      where: { id },
      data: {
        title: req.body.title,
        type: req.body.type,
        year: Number(req.body.year),
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE SCIENTIFIC WORK ERR:", err);
    return res.status(500).json({ error: "Failed to update scientific work" });
  }
};

/* =========================
   DELETE SCIENTIFIC WORK
========================= */
export const deleteScientificWork = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.scientificwork.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE SCIENTIFIC WORK ERR:", err);
    return res.status(500).json({ error: "Failed to delete scientific work" });
  }
};

/* =============================================================
   ADD INTELLECTUAL PROPERTY
   ============================================================= */
export const addIntellectualProperty = async (req: Request, res: Response) => {
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

    const ip = await prisma.intellectualproperty.create({
      data: {
        lecturerId: profile.id,
        title: req.body.title,
        type: req.body.type,
        year: Number(req.body.year),
      },
    });

    return res.json(ip);
  } catch (err) {
    console.error("ADD INTELLECTUAL PROPERTY ERR:", err);
    return res.status(500).json({ error: "Failed to add intellectual property" });
  }
};

/* =============================================================
   UPDATE INTELLECTUAL PROPERTY
   ============================================================= */
export const updateIntellectualProperty = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.intellectualproperty.update({
      where: { id },
      data: {
        title: req.body.title,
        type: req.body.type,
        year: Number(req.body.year),
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("UPDATE INTELLECTUAL PROPERTY ERR:", err);
    return res.status(500).json({ error: "Failed to update intellectual property" });
  }
};

/* =============================================================
   DELETE INTELLECTUAL PROPERTY
   ============================================================= */
export const deleteIntellectualProperty = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.intellectualproperty.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE INTELLECTUAL PROPERTY ERR:", err);
    return res.status(500).json({ error: "Failed to delete intellectual property" });
  }
};
