"use client";

import React, { useState, useEffect } from "react";
import ModalWrapper from "../../components/ModalWrapper";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2"; // ✅ TAMBAHAN


// =========================
// VALIDASI PASSWORD
// =========================
function isStrongPassword(password: string) {
  return password.length >= 8;
}



export default function UserAddModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
}) {
  const [loggedRole, setLoggedRole] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "dosen",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return;

    try {
      const parsed = JSON.parse(user);
      setLoggedRole(parsed.role);
    } catch {
      setLoggedRole("");
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

 const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  // =========================
  // VALIDASI PASSWORD
  // =========================
  if (!isStrongPassword(form.password)) {
    Swal.fire({
      icon: "warning",
      title: "Password Terlalu Pendek",
      text: "Password harus terdiri dari minimal 8 karakter.",
      confirmButtonColor: "#2563eb",
    });
    return;
  }

  try {
    await onSubmit(form);

    // 🔥 TUTUP MODAL DULU (PENTING)
    onClose();

    // 🔥 RESET FORM SETELAH MODAL DITUTUP
    setForm({
      name: "",
      role: "dosen",
      email: "",
      password: "",
    });

    // =========================
    // ALERT SUKSES (DI DEPAN)
    // =========================
    await Swal.fire({
      icon: "success",
      title: "User Berhasil Ditambahkan",
      html: `
        <div style="text-align:left; margin-top:8px">
          <p><b>Nama</b> : ${form.name}</p>
          <p><b>Email</b> : ${form.email}</p>
          <p><b>Role</b> : ${form.role === "admin" ? "Admin" : "Dosen"}</p>
        </div>
      `,
      confirmButtonText: "OK",
      confirmButtonColor: "#2563eb",
      allowOutsideClick: false,
      allowEscapeKey: false,
      backdrop: true,
      customClass: {
        popup: "z-[9999]",
      },
    });
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Gagal Menambahkan User",
      text: err.message || "Terjadi kesalahan pada server.",
      confirmButtonColor: "#dc2626",
    });
  }
};


  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} width="max-w-2xl">
      <h2 className="text-xl font-bold mb-8 text-black">Tambah User</h2>

      <form onSubmit={submit} className="space-y-8">
        {/* BARIS 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-black">
              Nama Lengkap
            </label>
            <input
              required
              placeholder="Nama lengkap"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-2 w-full border rounded-lg px-4 py-3 text-sm bg-white text-black"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-black">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              disabled={loggedRole !== "superadmin"}
              className="mt-2 w-full border rounded-lg px-4 py-3 text-sm bg-white text-black"
            >
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
            </select>

            {loggedRole !== "superadmin" && (
              <p className="text-xs text-gray-500 mt-1">
                Hanya Superadmin yang dapat mengubah role.
              </p>
            )}
          </div>
        </div>

        {/* BARIS 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-black">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="email@gmail.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="mt-2 w-full border rounded-lg px-4 py-3 text-sm bg-white text-black"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-black">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter (huruf & angka)"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`mt-2 w-full border rounded-lg px-4 py-3 text-sm pr-12 bg-white text-black ${form.password && !isStrongPassword(form.password)
                    ? "border-red-500"
                    : ""
                  }`}
              />
              {form.password && !isStrongPassword(form.password) && (
                <p className="text-xs text-red-500 mt-1">
                  Password minimal 8 karakter dan harus mengandung huruf serta angka.
                </p>
              )}


              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-gray-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg text-black"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Tambah User
          </button>
        </div>
      </form>

    
    </ModalWrapper>
  );
}
