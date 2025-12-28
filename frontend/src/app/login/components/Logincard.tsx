"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

export default function Logincard() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    /* =========================
       VALIDASI BERURUTAN (FIX)
    ========================= */

    if (!role) {
      Swal.fire({
        icon: "warning",
        title: "Role belum dipilih",
        text: "Silakan pilih jenis user terlebih dahulu.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email belum diisi",
        text: "Silakan masukkan email Anda.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: "warning",
        title: "Kata sandi belum diisi",
        text: "Silakan masukkan kata sandi Anda.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    /* =========================
       RESET SESSION LAMA
    ========================= */
    localStorage.clear();
    document.cookie = "token=; path=/;";
    document.cookie = "role=; path=/;";

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Login gagal",
          text: data?.error || "Email atau kata sandi salah.",
          confirmButtonColor: "#dc2626",
        });
        return;
      }

      /* =========================
         SIMPAN SESSION
      ========================= */
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        })
      );

      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `role=${data.user.role}; path=/`;

      /* =========================
         ALERT + REDIRECT
      ========================= */
      if (data.user.role === "admin" || data.user.role === "superadmin") {
        const displayName =
          data.user.role === "superadmin"
            ? "Super Admin"
            : data.user.name; // 🔥 NAMA DARI DATABASE

        await Swal.fire({
          icon: "success",
          title: `Halo, ${displayName} 👋`,
          text: "Selamat datang di Dashboard Admin.",
          timer: 1500,
          showConfirmButton: false,
        });

        router.replace("/admin");
        return;
      }
      if (data.user.role === "dosen") {
        await Swal.fire({
          icon: "success",
          title: `Halo, ${data.user.name}`,
          text: "Selamat datang di Dashboard Dosen.",
          timer: 1500,
          showConfirmButton: false,
        });

        router.replace("/lecturer/profil");
        return;
      }

      router.replace("/login");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Server tidak merespons. Coba lagi nanti.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src="/logopsteam1.png"
        alt="Logo PSTEAM"
        className="w-28 mb-3"
      />

      <h1 className="text-center text-[15px] text-gray-700 font-medium mb-6">
        Polibatam Software Team <br />
        Politeknik Negeri Batam
      </h1>

      <form onSubmit={handleSubmit} className="w-full">
        {/* ROLE */}
        <div className="mb-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white border border-gray-300 text-black rounded-md px-3 py-2 text-sm"
          >
            <option value="">Pilih Jenis User</option>
            <option value="admin">Admin</option>
            <option value="dosen">Dosen</option>
          </select>
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-gray-300 text-black rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2 relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-300 text-black rounded-md px-3 py-2 text-sm pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute top-2 right-3 text-gray-600"
          >
            {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-md text-sm mt-4"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
