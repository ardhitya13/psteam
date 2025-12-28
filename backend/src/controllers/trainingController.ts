import { Request, Response } from "express";
import { prisma } from "../db";
import path from "path";
import fs from "fs";

/* ============================================================
   UPLOAD DIR
============================================================ */
const uploadDir = path.join(process.cwd(), "uploads", "training");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function getPublicPath(file: any) {
  return file ? `/uploads/training/${file.filename}` : null;
}

/* ============================================================
   HELPERS
============================================================ */
function safeStringify(val: any) {
  if (val == null) return null;
  if (typeof val === "string") return val;
  try {
    return JSON.stringify(val);
  } catch {
    return JSON.stringify([]);
  }
}

function safeParse(val: any) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }
  return [];
}

/* ============================================================
   TRAINING CRUD
============================================================ */
export const createTraining = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const file = req.file as any;

    const training = await prisma.training.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription || null,
        type: data.type || "web",
        price: Number(data.price || 0),
        thumbnail: getPublicPath(file),
        description: data.description || null,

        costDetails: safeStringify(data.costDetails),
        requirements: safeStringify(data.requirements),
        schedule: safeStringify(data.schedule),
        rundown: safeStringify(data.rundown),

        organizer: data.organizer || "PSTeam Academy",
        duration: data.duration || null,
        location: data.location || null,
        certificate: data.certificate || null,
        instructor: data.instructor || null,
      },
    });

    return res.status(201).json(training);
  } catch (err) {
    console.error("createTraining error:", err);
    return res.status(500).json({ error: "Failed to create training" });
  }
};

export const updateTraining = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const file = req.file as any;

    const updated = await prisma.training.update({
      where: { id },
      data: {
        title: data.title,
        shortDescription: data.shortDescription || null,
        type: data.type || "web",
        price: Number(data.price || 0),
        ...(file ? { thumbnail: getPublicPath(file) } : {}),
        description: data.description || null,

        costDetails: safeStringify(data.costDetails),
        requirements: safeStringify(data.requirements),
        schedule: safeStringify(data.schedule),
        rundown: safeStringify(data.rundown),

        organizer: data.organizer || null,
        duration: data.duration || null,
        location: data.location || null,
        certificate: data.certificate || null,
        instructor: data.instructor || null,
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("updateTraining error:", err);
    return res.status(500).json({ error: "Failed to update training" });
  }
};

export const deleteTraining = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.training.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteTraining error:", err);
    return res.status(500).json({ error: "Failed to delete training" });
  }
};

export const getAllTraining = async (_req: Request, res: Response) => {
  try {
    const list = await prisma.training.findMany({
      orderBy: { id: "desc" },
    });

    const parsed = list.map((t) => ({
      ...t,
      costDetails: safeParse(t.costDetails),
      requirements: safeParse(t.requirements),
      schedule: safeParse(t.schedule),
      rundown: safeParse(t.rundown),
    }));

    return res.json(parsed);
  } catch (err) {
    console.error("getAllTraining error:", err);
    return res.status(500).json({ error: "Failed to fetch trainings" });
  }
};

export const getTrainingById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid training ID" });
  }

  const t = await prisma.training.findUnique({
    where: { id },
  });

  if (!t) {
    return res.status(404).json({ error: "Training not found" });
  }

  return res.json({
    ...t,
    costDetails: safeParse(t.costDetails),
    requirements: safeParse(t.requirements),
    schedule: safeParse(t.schedule),
    rundown: safeParse(t.rundown),
  });
};
/* ============================================================
   REGISTRATION
============================================================ */
export const createRegistration = async (req: Request, res: Response) => {
  try {
    const d = req.body;

    const reg = await prisma.trainingregistration.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone,
        trainingId: Number(d.trainingId),
        batch: d.batch,
        notes: d.notes || "",
        status: "pending",
      },
    });

    return res.status(201).json(reg);
  } catch (err) {
    console.error("createRegistration error:", err);
    return res.status(500).json({ error: "Failed to create registration" });
  }
};

export const getRegistrations = async (_req: Request, res: Response) => {
  const data = await prisma.trainingregistration.findMany({
    include: { training: true },
    orderBy: { id: "desc" },
  });
  res.json(data);
};

export const getPendingRegistrations = async (_req: Request, res: Response) => {
  const data = await prisma.trainingregistration.findMany({
    where: { status: "pending" },
    include: { training: true },
  });
  res.json(data);
};

export const getApprovedRegistrations = async (_req: Request, res: Response) => {
  const data = await prisma.trainingregistration.findMany({
    where: { status: "approved" },
    include: { training: true },
  });
  res.json(data);
};

export const updateStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const updated = await prisma.trainingregistration.update({
    where: { id },
    data: { status },
  });

  res.json(updated);
};

export const deleteRegistration = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.trainingregistration.delete({ where: { id } });
  res.json({ success: true });
};
