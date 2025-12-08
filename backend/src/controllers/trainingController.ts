import { Request, Response } from "express";
import { prisma } from "../db";


// ============================================================
// CREATE TRAINING
// ============================================================
export const createTraining = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const training = await prisma.training.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription ?? null,
        type: data.type,
        price: data.price,
        thumbnail: data.thumbnail ?? null,
        description: data.description ?? null,
        costDetails: data.costDetails ?? [],
        requirements: data.requirements ?? [],
        schedule: data.schedule ?? [],
        rundown: data.rundown ?? [],
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

// UPDATE TRAINING
export const updateTraining = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const updated = await prisma.training.update({
      where: { id },
      data: {
        title: data.title,
        shortDescription: data.shortDescription ?? null,
        type: data.type,
        price: data.price,
        thumbnail: data.thumbnail ?? null,
        description: data.description ?? null,
        costDetails: data.costDetails ?? [],
        requirements: data.requirements ?? [],
        schedule: data.schedule ?? [],
        rundown: data.rundown ?? [],
        organizer: data.organizer ?? "PSTeam Academy",
        duration: data.duration ?? null,
        location: data.location ?? null,
        certificate: data.certificate ?? null,
        instructor: data.instructor ?? null,
      }
    });

    return res.json(updated);
  } catch (err) {
    console.error("updateTraining error:", err);
    return res.status(500).json({ error: "Failed to update training" });
  }
};


// DELETE TRAINING
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


// ============================================================

// data di atas untuk pembuatan pelatihan baru

// di bawah ini controller untuk data pelatihan

// ============================================================



// GET ALL TRAININGS
export const getAllTraining = async (req: Request, res: Response) => {
  try {
    const data = await prisma.training.findMany({
      orderBy: { id: "desc" },
    });
    res.json(data);
  } catch (err) {
    console.error("getAllTraining error:", err);
    res.status(500).json({ error: "Failed to fetch trainings" });
  }
};

// GET ALL REGISTRATIONS
export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      orderBy: { id: "desc" },
    });

    res.json(regs);
  } catch (err) {
    console.error("getRegistrations error:", err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};

// GET ONLY PENDING
export const getPendingRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      where: { status: "pending" },
      orderBy: { id: "desc" },
    });

    res.json(regs);
  } catch (err) {
    console.error("getPendingRegistrations error:", err);
    res.status(500).json({ error: "Failed to fetch pending registrations" });
  }
};

// GET ONLY APPROVED
export const getApprovedRegistrations = async (req: Request, res: Response) => {
  try {
    const regs = await prisma.trainingregistration.findMany({
      where: { status: "approved" },
      orderBy: { id: "desc" },
    });

    res.json(regs);
  } catch (err) {
    console.error("getApprovedRegistrations error:", err);
    res.status(500).json({ error: "Failed to fetch approved registrations" });
  }
};

// CREATE REGISTRATION
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

    res.status(201).json(reg);
  } catch (err) {
    console.error("createRegistration error:", err);
    res.status(500).json({ error: "Failed to create registration" });
  }
};

// UPDATE STATUS
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

// DELETE REGISTRATION
export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.trainingregistration.delete({
      where: { id }
    });

    res.json({ success: true });
  } catch (err) {
    console.error("deleteRegistration error:", err);
    res.status(500).json({ error: "Failed to delete registration" });
  }
};
