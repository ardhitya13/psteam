import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db";

// GET ALL USERS
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: { role: "superadmin" }
            },
            orderBy: { id: "desc" },
        });

        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE SINGLE USER (dipakai AddModal)
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // cek email sudah dipakai atau belum
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: "Email sudah terdaftar" });
        }

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
                role,
            },
        });

        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// BULK CREATE (kalau mau pakai Postman array)
export const createManyUsers = async (req: Request, res: Response) => {
    try {
        const users = req.body as {
            name: string;
            email: string;
            password: string;
            role: string;
        }[];

        const data = await Promise.all(
            users.map(async (u) => ({
                name: u.name,
                email: u.email,
                password: await bcrypt.hash(u.password, 10),
                role: u.role,
            }))
        );

        const created = await prisma.user.createMany({
            data,
            skipDuplicates: true,
        });

        res.json({
            message: "Bulk users created",
            count: created.count,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }

        // BLOCK hapus superadmin
        if (user.role === "superadmin") {
            return res
                .status(403)
                .json({ error: "Superadmin tidak boleh dihapus" });
        }

        await prisma.user.delete({ where: { id } });

        res.json({ message: "User deleted" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
