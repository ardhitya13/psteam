import { Request, Response } from "express";
import { prisma } from "../db";

/* =============================================================
   GET ALL LECTURERS (UNTUK PORTOFOLIO / LIST)
   ============================================================= */
export const getAllLecturers = async (_req: Request, res: Response) => {
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

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: {
        educationhistory: true,
        research: true,
        communityservice: true,
        scientificwork: true,
        intellectualproperty: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
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
  const userId = Number(req.params.userId);

  try {
    const imageUrl = req.file
      ? `/uploads/lecturer/${req.file.filename}`
      : undefined;

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
   ========== RESEARCH ==========================================
   ============================================================= */

export const getResearchByLecturer = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
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
    return res.status(500).json({ error: "Failed to fetch research" });
  }
};

export const addResearch = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.lecturerprofile.create({ data: { userId } });
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

export const deleteResearch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.research.delete({ where: { id } });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE RESEARCH ERR:", err);
    return res.status(500).json({ error: "Failed to delete research" });
  }
};

/* =============================================================
   ========== EDUCATION HISTORY ================================
   ============================================================= */

export const addEducationHistory = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.lecturerprofile.create({ data: { userId } });
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

export const deleteEducationHistory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.educationhistory.delete({ where: { id } });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE EDUCATION ERR:", err);
    return res.status(500).json({ error: "Failed to delete education" });
  }
};

/* =============================================================
   ========== COMMUNITY SERVICE ================================
   ============================================================= */

export const getCommunityServiceByLecturer = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId);

  try {
    const profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: { communityservice: true },
    });

    if (!profile) {
      return res.json({ data: [] });
    }

    return res.json({ data: profile.communityservice });
  } catch (err) {
    console.error("GET CS ERR:", err);
    return res.status(500).json({ error: "Failed to fetch community service" });
  }
};

export const addCommunityService = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.lecturerprofile.create({ data: { userId } });
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
    console.error("ADD CS ERR:", err);
    return res.status(500).json({ error: "Failed to add community service" });
  }
};

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
    console.error("UPDATE CS ERR:", err);
    return res.status(500).json({ error: "Failed to update community service" });
  }
};

export const deleteCommunityService = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.communityservice.delete({ where: { id } });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE CS ERR:", err);
    return res.status(500).json({ error: "Failed to delete community service" });
  }
};


/* =============================================================
   ========== SCIENTIFIC WORK ==================================
   ============================================================= */

/* =============================================================
   ========== SCIENTIFIC WORK (BULK REPLACE)
   ============================================================= */

export const getScientificWorkByLecturer = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId);

  try {
    const profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: { scientificwork: true },
    });

    return res.json({
      data: profile?.scientificwork || [],
    });
  } catch (err) {
    console.error("GET SCIENTIFIC WORK ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch scientific work" });
  }
};

export const saveScientificWorkBulk = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId);
  const { scientificworkList } = req.body;

  if (!userId || !Array.isArray(scientificworkList)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    // pastikan profile ada
    let profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.lecturerprofile.create({
        data: { userId },
      });
    }

    // hapus semua data lama
    await prisma.scientificwork.deleteMany({
      where: { lecturerId: profile.id },
    });

    // insert ulang (bulk)
    if (scientificworkList.length > 0) {
      await prisma.scientificwork.createMany({
        data: scientificworkList.map((item: any) => ({
          lecturerId: profile.id,
          title: item.title,
          type: item.type,
          year: Number(item.year),
        })),
      });
    }

    return res.json({
      message: "Scientific work saved successfully",
    });
  } catch (err) {
    console.error("SAVE SCIENTIFIC WORK BULK ERROR:", err);
    return res.status(500).json({
      error: "Failed to save scientific work",
    });
  }
};

export const deleteScientificWork = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    await prisma.scientificwork.delete({
      where: { id },
    });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE SCIENTIFIC WORK ERROR:", err);
    return res.status(500).json({
      error: "Failed to delete scientific work",
    });
  }
};


/* =============================================================
   ========== INTELLECTUAL PROPERTY ============================
   ============================================================= */

export const getIntellectualPropertyByLecturer = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId);

  try {
    const profile = await prisma.lecturerprofile.findUnique({
      where: { userId },
      include: { intellectualproperty: true },
    });

    if (!profile) {
      return res.json({ data: [] });
    }

    return res.json({ data: profile.intellectualproperty });
  } catch (err) {
    console.error("GET IP ERR:", err);
    return res.status(500).json({ error: "Failed to fetch intellectual property" });
  }
};

export const addIntellectualProperty = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.lecturerprofile.create({ data: { userId } });
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
    console.error("ADD IP ERR:", err);
    return res.status(500).json({ error: "Failed to add IP" });
  }
};

export const updateIntellectualProperty = async (
  req: Request,
  res: Response
) => {
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
    console.error("UPDATE IP ERR:", err);
    return res.status(500).json({ error: "Failed to update intellectual property" });
  }
};

export const deleteIntellectualProperty = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    await prisma.intellectualproperty.delete({ where: { id } });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE IP ERR:", err);
    return res.status(500).json({ error: "Failed to delete intellectual property" });
  }
};
