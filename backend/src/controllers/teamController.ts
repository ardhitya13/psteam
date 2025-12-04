// controllers/teamController.ts
import { Request, Response } from "express";
import { prisma } from "../db";
import fs from "fs";
import path from "path";

// =====================================================
// FOLDER UPLOAD TIM
// =====================================================
const uploadDir = path.join(process.cwd(), "uploads", "team");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =====================================================
// FUNCTION: SAVE BASE64 IMAGE → FILE
// =====================================================
function saveBase64Image(base64: string | undefined): string | null {
  if (!base64 || base64.trim() === "") return null;

  // contoh: data:image/png;base64,xxxxxx
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return null;

  const ext = matches[1].split("/")[1]; // png, jpg, jpeg
  const data = matches[2];

  const filename = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${ext}`;

  const filePath = path.join(uploadDir, filename);

  fs.writeFileSync(filePath, Buffer.from(data, "base64"));

  return `/uploads/team/${filename}`;
}

// ==========================================
// GET ALL PROJECTS
// ==========================================
export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.teamproject.findMany({
      include: { teammember: true },
      orderBy: { id: "desc" },
    });

    const normalized = teams.map((t) => ({
      ...t,
      teamMembers: t.teammember,
    }));

    return res.json(normalized);
  } catch (err) {
    console.error("getTeams error:", err);
    return res.status(500).json({ error: "Failed to fetch teams" });
  }
};

// ==========================================
// CREATE PROJECT + MEMBERS
// ==========================================
export const createTeam = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const members = (data.teamMembers || []).map((m: any) => ({
      ...m,
      image: saveBase64Image(m.image), // 🔥 simpan file → return path
    }));

    const project = await prisma.teamproject.create({
      data: {
        teamTitle: data.teamTitle,
        teammember: {
          create: members.map((m: any) => ({
            name: m.name,
            role: m.role,
            email: m.email,
            image: m.image,
            github: m.github,
            linkedin: m.linkedin,
            facebook: m.facebook,
            instagram: m.instagram,
            website: m.website,
            category: m.category,
            studyProgram: m.studyProgram,
            education: m.education,
            specialization: m.specialization,
          })),
        },
      },
      include: { teammember: true },
    });

    return res.json({
      ...project,
      teamMembers: project.teammember,
    });
  } catch (err) {
    console.error("createTeam error:", err);
    return res.status(500).json({ error: "Failed to create team" });
  }
};

// ==========================================
// ADD MEMBER
// ==========================================
export const addMember = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    const data = req.body;

    const savedImage = saveBase64Image(data.image); // 🔥 convert base64 → file path

    const member = await prisma.teammember.create({
      data: {
        projectId,
        name: data.name,
        role: data.role,
        email: data.email,
        image: savedImage,
        github: data.github,
        linkedin: data.linkedin,
        facebook: data.facebook,
        instagram: data.instagram,
        website: data.website,
        category: data.category,
        studyProgram: data.studyProgram,
        education: data.education,
        specialization: data.specialization,
      },
    });

    return res.json(member);
  } catch (err) {
    console.error("addMember error:", err);
    return res.status(500).json({ error: "Failed to add member" });
  }
};

// ==========================================
// UPDATE MEMBER (FINAL FIX — 100% WORKING)
// ==========================================
export const updateMember = async (req: Request, res: Response) => {
  try {
    const memberId = Number(req.params.memberId);
    const data = req.body;

    if (isNaN(memberId)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    let imageValue: any = data.image;

    // CASE 1 — NEW BASE64 IMAGE
    if (typeof imageValue === "string" && imageValue.startsWith("data:image")) {
      imageValue = saveBase64Image(imageValue);
    }

    // CASE 2 — IMAGE IS FULL URL → convert to relative path
    if (typeof imageValue === "string" && imageValue.startsWith("http")) {
      try {
        const url = new URL(imageValue);
        imageValue = url.pathname;
      } catch {}
    }

    // BUILD UPDATE DATA
    const updateData: any = {
      name: data.name,
      email: data.email ?? null,
      github: data.github ?? null,
      linkedin: data.linkedin ?? null,
      facebook: data.facebook ?? null,
      instagram: data.instagram ?? null,
      website: data.website ?? null,
      studyProgram: data.studyProgram ?? null,
      education: data.education ?? null,
      specialization: data.specialization ?? null,
    };

    // ONLY INCLUDE IMAGE IF CHANGED
    if (imageValue !== undefined && imageValue !== null && imageValue !== "") {
      updateData.image = imageValue;
    }

    // ROLE & CATEGORY TIDAK BOLEH DIHAPUS!
    // JANGAN delete role/category di backend

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



// ==========================================
// DELETE MEMBER
// ==========================================
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

// ==========================================
// DELETE PROJECT + ALL MEMBERS
// ==========================================
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
