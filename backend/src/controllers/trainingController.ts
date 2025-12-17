import { Request, Response } from "express";
import { prisma } from "../db";
import path from "path";
import fs from "fs";

// Ensure upload folder exists
const uploadDir = path.join(process.cwd(), "uploads", "training");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function getPublicPath(file?: Express.Multer.File | undefined) {
  return file ? `/uploads/training/${file.filename}` : null;
}

/* ===========================
   HELPERS: safe serialize/parse
   =========================== */
function safeStringifyArray(val: any) {
  // If val already string (assume serialized), return as-is
  if (typeof val === "string") return val;
  // If val is array/object, stringify
  try {
    return JSON.stringify(val ?? []);
  } catch (e) {
    return JSON.stringify([]);
  }
}

function safeParseMaybeJSON(val: any) {
  if (val == null) return [];
  // If already array -> return
  if (Array.isArray(val)) return val;
  // If string -> try parse
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      // fallback: try to split by pipe (if you used that)
      if (val.includes("|")) return val.split("|").map((s) => s.trim());
      return [val];
    }
  }
  // any other -> wrap into array
  return [val];
}

/* ============================================================
   CREATE TRAINING
   - Serialize array-like fields to JSON strings when saving
   ============================================================ */
export const createTraining = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const file = req.file as Express.Multer.File | undefined;

    const training = await prisma.training.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription ?? null,
        type: data.type,
        price: Number(data.price || 0),

        // store thumbnail path
        thumbnail: getPublicPath(file),

        description: data.description ?? null,

        // IMPORTANT: store as JSON strings (so reading is consistent)
        costDetails: data.costDetails ? safeStringifyArray(data.costDetails) : null,
        requirements: data.requirements ? safeStringifyArray(data.requirements) : null,
        schedule: data.schedule ? safeStringifyArray(data.schedule) : null,
        rundown: data.rundown ? safeStringifyArray(data.rundown) : null,

        organizer: data.organizer ?? "PSTeam Academy",
        duration: data.duration ?? null,
        location: data.location ?? null,
        certificate: data.certificate ?? null,
        instructor: data.instructor ?? null,
      },
    });

    return res.status(201).json(training);
  } catch (err) {
    console.error("createTraining error:", err);
    return res.status(500).json({ error: "Failed to create training" });
  }
};

/* ============================================================
   UPDATE TRAINING
   - Only update thumbnail if new file uploaded
   - Serialize array fields to JSON strings
   ============================================================ */
export const updateTraining = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const file = req.file as Express.Multer.File | undefined;

    const updated = await prisma.training.update({
      where: { id },
      data: {
        title: data.title,
        shortDescription: data.shortDescription ?? null,
        type: data.type,
        price: Number(data.price || 0),

        // Only update thumbnail if file exists
        ...(file ? { thumbnail: getPublicPath(file) } : {}),

        description: data.description ?? null,

        // If frontend sends JSON strings already (like when using form-data),
        // we accept string or array and always store string.
        costDetails: data.costDetails ? safeStringifyArray(data.costDetails) : null,
        requirements: data.requirements ? safeStringifyArray(data.requirements) : null,
        schedule: data.schedule ? safeStringifyArray(data.schedule) : null,
        rundown: data.rundown ? safeStringifyArray(data.rundown) : null,

        organizer: data.organizer ?? null,
        duration: data.duration ?? null,
        location: data.location ?? null,
        certificate: data.certificate ?? null,
        instructor: data.instructor ?? null,
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("updateTraining error:", err);
    return res.status(500).json({ error: "Failed to update training" });
  }
};

/* ============================================================
   DELETE TRAINING
   ============================================================ */
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

/* ============================================================
   GET ALL TRAINING
   - parse JSON safely, but tolerate already-array values
   ============================================================ */
export const getAllTraining = async (req: Request, res: Response) => {
  try {
    const all = await prisma.training.findMany({
      orderBy: { id: "desc" },
    });

    const parsed = all.map((t) => ({
      ...t,
      costDetails: safeParseMaybeJSON(t.costDetails),
      requirements: safeParseMaybeJSON(t.requirements),
      schedule: safeParseMaybeJSON(t.schedule),
      rundown: safeParseMaybeJSON(t.rundown),
    }));

    return res.json(parsed);
  } catch (err) {
    console.error("getAllTraining error:", err);
    return res.status(500).json({ error: "Failed to fetch trainings" });
  }
};

/* ============================================================
   TRAINING REGISTRATION CONTROLLERS
   ============================================================ */

export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      orderBy: { id: "desc" },
      include: { training: true },
    });

    res.json(regs);
  } catch (err) {
    console.error("getRegistrations error:", err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};

export const getPendingRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      where: { status: "pending" },
      orderBy: { id: "desc" },
      include: { training: true },
    });

    res.json(regs);
  } catch (err) {
    console.error("getPendingRegistrations error:", err);
    res.status(500).json({ error: "Failed to fetch pending registrations" });
  }
};

export const getApprovedRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      where: { status: "approved" },
      orderBy: { id: "desc" },
      include: { training: true },
    });

    res.json(regs);
  } catch (err) {
    console.error("getApprovedRegistrations error:", err);
    res.status(500).json({ error: "Failed to fetch approved registrations" });
  }
};

export const createRegistration = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const reg = await prisma.trainingregistration.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        trainingId: Number(data.trainingId),
        batch: data.batch,
        notes: data.notes || "",
        status: "pending",
      },
    });

    res.status(201).json(reg);
  } catch (err) {
    console.error("createRegistration error:", err);
    res.status(500).json({ error: "Failed to create registration" });
  }
};

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

    res.json(updated);
  } catch (err) {
    console.error("updateStatus error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.trainingregistration.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("deleteRegistration error:", err);
    res.status(500).json({ error: "Failed to delete registration" });
  }
};

export const getTrainingById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const t = await prisma.training.findUnique({
      where: { id },
    });

    if (!t) return res.status(404).json({ error: "Training not found" });

    // Parse JSON fields
    const training = {
      ...t,
      costDetails: safeParseMaybeJSON(t.costDetails),
      requirements: safeParseMaybeJSON(t.requirements),
      schedule: safeParseMaybeJSON(t.schedule),
      rundown: safeParseMaybeJSON(t.rundown),
    };

    res.json(training);
  } catch (err) {
    console.error("getTrainingById error:", err);
    res.status(500).json({ error: "Failed to fetch training detail" });
  }
};
