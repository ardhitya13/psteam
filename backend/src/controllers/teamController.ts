// src/controllers/teamController.ts
import { Request, Response } from "express";
import { prisma } from "../db";
import fs from "fs";
import path from "path";

// upload directory -- same as your middleware destination
const uploadDir = path.join(process.cwd(), "uploads", "team");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// return public path for saved multer file
function getPublicPathForMulterFile(file: Express.Multer.File | undefined): string | null {
  if (!file) return null;
  // multer.diskStorage saved file on disk; file.filename is set
  // return path that frontend can use: /uploads/team/<filename>
  return `/uploads/team/${file.filename}`;
}

// GET ALL PROJECTS
export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.teamproject.findMany({
      include: { teammember: true },
      orderBy: { id: "desc" },
    });

    const normalized = teams.map((t) => ({ ...t, teamMembers: t.teammember }));
    return res.json(normalized);
  } catch (err) {
    console.error("getTeams error:", err);
    return res.status(500).json({ error: "Failed to fetch teams" });
  }
};

// CREATE PROJECT + MEMBERS (WITH FILE UPLOAD)
export const createTeam = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // multer -> req.files (array)
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];

    // teamMembers sent as JSON string from frontend
    const members = typeof data.teamMembers === "string" ? JSON.parse(data.teamMembers) : data.teamMembers || [];

    const savedMembers = members.map((m: any, i: number) => {
      const file = files[i];
      const publicPath = getPublicPathForMulterFile(file);

      return {
        ...m,
        email: m.email == null ? "" : m.email,
        image: publicPath || null,
      };
    });

    const project = await prisma.teamproject.create({
      data: {
        teamTitle: data.teamTitle,
        teammember: {
          create: savedMembers.map((m: any) => ({
            name: m.name,
            role: m.role,
            email: m.email,
            image: m.image,
            github: m.github ?? null,
            linkedin: m.linkedin ?? null,
            facebook: m.facebook ?? null,
            instagram: m.instagram ?? null,
            website: m.website ?? null,
            category: m.category,
            studyProgram: m.studyProgram ?? null,
            education: m.education ?? null,
            specialization: m.specialization ?? null,
          })),
        },
      },
      include: { teammember: true },
    });

    res.json({ ...project, teamMembers: project.teammember });
  } catch (err) {
    console.error("createTeam error:", err);
    return res.status(500).json({ error: "Failed to create team" });
  }
};

// ADD MEMBER (WITH FILE)
export const addMember = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    const data = req.body;

    // If multer.diskStorage was used, file is already on disk and file.filename exists
    const file = req.file as Express.Multer.File | undefined;
    const savedPath = getPublicPathForMulterFile(file);

    const emailSafe = data.email == null ? "" : data.email;

    const member = await prisma.teammember.create({
      data: {
        projectId,
        name: data.name,
        role: data.role,
        email: emailSafe,
        image: savedPath,
        github: data.github ?? null,
        linkedin: data.linkedin ?? null,
        facebook: data.facebook ?? null,
        instagram: data.instagram ?? null,
        website: data.website ?? null,
        category: data.category,
        studyProgram: data.studyProgram ?? null,
        education: data.education ?? null,
        specialization: data.specialization ?? null,
      },
    });

    return res.json(member);
  } catch (err) {
    console.error("addMember error:", err);
    return res.status(500).json({ error: "Failed to add member" });
  }
};

// UPDATE MEMBER (WITH FILE SUPPORT)
export const updateMember = async (req: Request, res: Response) => {
  try {
    const memberId = Number(req.params.memberId);
    const data = req.body;

    if (isNaN(memberId)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    let imagePath = data.image || null;
    if (req.file) {
      imagePath = getPublicPathForMulterFile(req.file as Express.Multer.File);
    }

    const updateData: any = {};

    if (typeof data.name !== "undefined") updateData.name = data.name;
    if (typeof data.email !== "undefined" && data.email !== null) updateData.email = data.email;
    updateData.github = typeof data.github !== "undefined" ? (data.github || null) : undefined;
    updateData.linkedin = typeof data.linkedin !== "undefined" ? (data.linkedin || null) : undefined;
    updateData.facebook = typeof data.facebook !== "undefined" ? (data.facebook || null) : undefined;
    updateData.instagram = typeof data.instagram !== "undefined" ? (data.instagram || null) : undefined;
    updateData.website = typeof data.website !== "undefined" ? (data.website || null) : undefined;
    updateData.studyProgram = typeof data.studyProgram !== "undefined" ? (data.studyProgram || null) : undefined;
    updateData.education = typeof data.education !== "undefined" ? (data.education || null) : undefined;
    updateData.specialization = typeof data.specialization !== "undefined" ? (data.specialization || null) : undefined;

    if (imagePath) updateData.image = imagePath;

    Object.keys(updateData).forEach((k) => updateData[k] === undefined && delete updateData[k]);

    const updated = await prisma.teammember.update({
      where: { id: memberId },
      data: updateData,
    });

    return res.json(updated);
  } catch (err) {
    console.error("updateMember error:", err);
    return res.status(500).json({ error: "Failed to update member" });
  }
};

// DELETE & DELETE PROJECT left unchanged...


// =====================================================
// DELETE MEMBER
// =====================================================
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const memberId = Number(req.params.memberId);

    await prisma.teammember.delete({ where: { id: memberId } });

    return res.json({ message: "Member deleted" });
  } catch (err) {
    console.error("deleteMember error:", err);
    return res.status(500).json({ error: "Failed to delete member" });
  }
};

// =====================================================
// DELETE PROJECT + ALL MEMBERS
// =====================================================
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.teammember.deleteMany({ where: { projectId: id } });
    await prisma.teamproject.delete({ where: { id } });

    return res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("deleteProject error:", err);
    return res.status(500).json({ error: "Failed to delete project" });
  }
};
