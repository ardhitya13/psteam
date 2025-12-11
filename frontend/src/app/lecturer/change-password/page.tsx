"use client";

import { useState } from "react";
import NavbarLecturer from "../components/NavbarLecturer";
import SidebarLecturer from "../components/SidebarLecturer";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";

export default function ChangePasswordPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirm) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (newPassword !== confirm) {
      alert("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch("http://localhost:4000/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal mengganti password");

      alert("Password berhasil diperbarui!");
      setOldPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <NavbarLecturer toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarLecturer
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 pt-6 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <KeyRound size={32} className="text-[#0a3b91]" />
            <h1 className="text-2xl font-bold text-[#0a3b91]">
              Ganti Password
            </h1>
          </div>

          {/* Old Password */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">
              Password Lama
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a3b91]"
              placeholder="Masukkan password lama"
            />
          </div>

          {/* New Password */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a3b91]"
              placeholder="Masukkan password baru"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-7">
            <label className="text-sm font-medium text-gray-700">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a3b91]"
              placeholder="Konfirmasi password baru"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="w-full bg-[#0a3b91] hover:bg-blue-800 text-white py-3 rounded-xl font-semibold shadow-md transition"
          >
            {loading ? "Memproses..." : "Update Password"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
