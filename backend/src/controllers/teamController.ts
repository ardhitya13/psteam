// controllers/teamController.ts
import { Request, Response } from "express";
import { prisma } from "../db";

// ==========================================
// GET ALL PROJECTS
// ==========================================
export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.teamProject.findMany({
      include: { members: true },
      orderBy: { id: "desc" },
    });

    return res.json(teams);
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

    const project = await prisma.teamProject.create({
      data: {
        teamTitle: data.teamTitle,
        members: {
          create: (data.members || []).map((m: any) => ({
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
      include: { members: true },
    });

    return res.json(project);
  } catch (err) {
    console.error("createTeam error:", err);
    return res.status(500).json({ error: "Failed to create team" });
  }
};

// ==========================================
// ADD NEW MEMBER
// ==========================================
export const addMember = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const data = req.body;

    const member = await prisma.teamMember.create({
      data: {
        projectId,
        name: data.name,
        role: data.role,
        email: data.email,
        image: data.image,
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
// UPDATE MEMBER
// ==========================================
export const updateMember = async (req: Request, res: Response) => {
  try {
    const memberId = Number(req.params.memberId);
    if (isNaN(memberId)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    const data = req.body;

    const updated = await prisma.teamMember.update({
      where: { id: memberId },
      data,
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
    if (isNaN(memberId)) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    await prisma.teamMember.delete({ where: { id: memberId } });

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
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    await prisma.teamMember.deleteMany({ where: { projectId: id } });

    await prisma.teamProject.delete({ where: { id } });

    return res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("deleteProject error:", err);
    return res.status(500).json({ error: "Failed to delete project" });
  }
};
