import { Response } from "express";
import { prisma } from "../db";
import { AuthRequest } from "../middleware/authMiddleware";

/* =============================================================
   HELPER: CEK AKSES DOSEN
============================================================= */
function forbidIfNotOwner(
  req: AuthRequest,
  targetUserId: number,
  res: Response
) {
  if (req.user?.role === "dosen" && req.user.id !== targetUserId) {
    res.status(403).json({ error: "Forbidden" });
    return true;
  }
  return false;
}

/* =============================================================
   GET ALL LECTURERS (ADMIN / SUPERADMIN)
============================================================= */
export const getAllLecturers = async (_req: AuthRequest, res: Response) => {
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
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch lecturers" });
  }
};

/* =============================================================
   GET LECTURER PROFILE
============================================================= */
export const getLecturerProfile = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  let profile = await prisma.lecturerprofile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      educationhistory: true,
      research: true,
      communityservice: true,
      scientificwork: true,
      intellectualproperty: true,
    },
  });

  // 🔥 INI KUNCI UTAMANYA
  if (!profile) {
    profile = await prisma.lecturerprofile.create({
      data: {
        userId,
        studyProgram: "",
        specialization: "",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        educationhistory: true,
        research: true,
        communityservice: true,
        scientificwork: true,
        intellectualproperty: true,
      },
    });
  }

  return res.json(profile);
};


/* =============================================================
   UPDATE PROFILE
============================================================= */
export const updateLecturerProfile = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

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
};

/* =============================================================
   RESEARCH
============================================================= */
export const getResearchByLecturer = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  const profile = await prisma.lecturerprofile.findUnique({
    where: { userId },
    include: { research: true },
  });

  return res.json(profile?.research || []);
};

export const addResearch = async (req: AuthRequest, res: Response) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

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
};

export const updateResearch = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  const research = await prisma.research.findUnique({
    where: { id },
    include: { lecturer: true },
  });

  if (
    req.user?.role === "dosen" &&
    research?.lecturer.userId !== req.user.id
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updated = await prisma.research.update({
    where: { id },
    data: {
      title: req.body.title,
      year: Number(req.body.year),
    },
  });

  return res.json(updated);
};

export const deleteResearch = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  const research = await prisma.research.findUnique({
    where: { id },
    include: { lecturer: true },
  });

  if (
    req.user?.role === "dosen" &&
    research?.lecturer.userId !== req.user.id
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await prisma.research.delete({ where: { id } });
  return res.json({ message: "Deleted" });
};

/* =============================================================
   EDUCATION HISTORY
============================================================= */
export const addEducationHistory = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
  if (!profile) profile = await prisma.lecturerprofile.create({ data: { userId } });

  const edu = await prisma.educationhistory.create({
    data: {
      lecturerId: profile.id,
      degree: req.body.degree,
      university: req.body.university,
      major: req.body.major,
    },
  });

  return res.json(edu);
};

export const updateEducationHistory = async (
  req: AuthRequest,
  res: Response
) => {
  const id = Number(req.params.id);

  const updated = await prisma.educationhistory.update({
    where: { id },
    data: {
      degree: req.body.degree,
      university: req.body.university,
      major: req.body.major,
    },
  });

  return res.json(updated);
};

export const deleteEducationHistory = async (
  req: AuthRequest,
  res: Response
) => {
  await prisma.educationhistory.delete({
    where: { id: Number(req.params.id) },
  });
  return res.json({ message: "Deleted" });
};

/* =============================================================
   COMMUNITY SERVICE
============================================================= */
export const getCommunityServiceByLecturer = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  const profile = await prisma.lecturerprofile.findUnique({
    where: { userId },
    include: { communityservice: true },
  });

  return res.json(profile?.communityservice || []);
};

export const addCommunityService = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
  if (!profile) profile = await prisma.lecturerprofile.create({ data: { userId } });

  const cs = await prisma.communityservice.create({
    data: {
      lecturerId: profile.id,
      title: req.body.title,
      year: Number(req.body.year),
    },
  });

  return res.json(cs);
};

export const updateCommunityService = async (
  req: AuthRequest,
  res: Response
) => {
  const updated = await prisma.communityservice.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  return res.json(updated);
};

export const deleteCommunityService = async (
  req: AuthRequest,
  res: Response
) => {
  await prisma.communityservice.delete({
    where: { id: Number(req.params.id) },
  });
  return res.json({ message: "Deleted" });
};

/* =============================================================
   SCIENTIFIC WORK (BULK)
============================================================= */
export const getScientificWorkByLecturer = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  const profile = await prisma.lecturerprofile.findUnique({
    where: { userId },
    include: { scientificwork: true },
  });

  return res.json(profile?.scientificwork || []);
};

export const saveScientificWorkBulk = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);
  if (forbidIfNotOwner(req, userId, res)) return;

  const { scientificworkList, mode } = req.body;
  // mode: "replace" | "append"

  let profile = await prisma.lecturerprofile.findUnique({ where: { userId } });
  if (!profile) {
    profile = await prisma.lecturerprofile.create({ data: { userId } });
  }

  // 🔒 DEFAULT = APPEND (AMAN)
  if (mode === "replace") {
    await prisma.scientificwork.deleteMany({
      where: { lecturerId: profile.id },
    });
  }

  if (scientificworkList?.length) {
    await prisma.scientificwork.createMany({
      data: scientificworkList.map((i: any) => ({
        lecturerId: profile.id,
        title: i.title,
        type: i.type,
        year: Number(i.year),
      })),
    });
  }

  return res.json({ message: "Saved" });
};

export const updateScientificWork = async (
  req: AuthRequest,
  res: Response
) => {
  const id = Number(req.params.id);

  const scientificWork = await prisma.scientificwork.findUnique({
    where: { id },
    include: {
      lecturer: {
        select: { userId: true },
      },
    },
  });

  if (!scientificWork) {
    return res.status(404).json({ error: "Scientific work not found" });
  }

  if (
    req.user?.role === "dosen" &&
    scientificWork.lecturer.userId !== req.user.id
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updated = await prisma.scientificwork.update({
    where: { id },
    data: {
      title: req.body.title,
      type: req.body.type,
      year: Number(req.body.year),
    },
  });

  return res.json(updated);
};

export const deleteScientificWork = async (
  req: AuthRequest,
  res: Response
) => {
  await prisma.scientificwork.delete({
    where: { id: Number(req.params.id) },
  });
  return res.json({ message: "Deleted" });
};

/* =============================================================
   INTELLECTUAL PROPERTY
============================================================= */
export const getIntellectualPropertyByLecturer = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);

  if (req.user?.role === "dosen" && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const profile = await prisma.lecturerprofile.findUnique({
    where: { userId },
    include: { intellectualproperty: true },
  });

  return res.json(profile?.intellectualproperty || []);
};

export const addIntellectualProperty = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = Number(req.params.userId);

  if (req.user?.role === "dosen" && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

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
};

export const updateIntellectualProperty = async (
  req: AuthRequest,
  res: Response
) => {
  const id = Number(req.params.id);

  const ip = await prisma.intellectualproperty.findUnique({
    where: { id },
    include: {
      lecturer: { select: { userId: true } },
    },
  });

  if (!ip) {
    return res.status(404).json({ error: "Intellectual property not found" });
  }

  if (req.user?.role === "dosen" && ip.lecturer.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updated = await prisma.intellectualproperty.update({
    where: { id },
    data: {
      title: req.body.title,
      type: req.body.type,
      year: Number(req.body.year),
    },
  });

  return res.json(updated);
};

export const deleteIntellectualProperty = async (
  req: AuthRequest,
  res: Response
) => {
  const id = Number(req.params.id);

  await prisma.intellectualproperty.delete({ where: { id } });

  return res.json({ message: "Deleted" });
};

/* =============================================================
   ADMIN ADD RESEARCH (BY LECTURER ID)
============================================================= */
export const addResearchByAdmin = async (
  req: AuthRequest,
  res: Response
) => {
  if (req.user?.role === "dosen") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const userId = Number(req.params.userId);

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
};
