import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Email, password, dan role wajib diisi" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "Email tidak terdaftar" });
        }

        // cek password -> wajib hash
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ error: "Password salah" });
        }

        if (
            user.role === "superadmin" &&
            role === "admin"
        ) {
        }
        else if (user.role !== role) {
            return res.status(401).json({ error: "Role tidak sesuai!" });
        }

        return res.json({
            message: "Login sukses",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};
