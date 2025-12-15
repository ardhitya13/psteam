"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Logincard() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    if (!role || !email || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    // 🔥 FIX PENTING: BERSIHKAN SESSION LAMA
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
        setError(data.error || "Login gagal");
        return;
      }

      // SIMPAN SESSION BARU
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

      if (data.user.role === "admin" || data.user.role === "superadmin") {
        router.replace("/admin");
        return;
      }

      if (data.user.role === "dosen") {
        router.replace("/lecturer/profil");
        return;
      }

      router.replace("/login");
    } catch {
      setError("Server tidak merespons");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img src="/logopsteam1.png" alt="Logo Polibatam" className="w-28 mb-3" />

      <h1 className="text-center text-[15px] text-gray-700 font-medium leading-tight mb-6">
        Polibatam Software Team <br /> Politeknik Negeri Batam
      </h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Pilih Jenis User</option>
            <option value="admin">Admin</option>
            <option value="dosen">Dosen</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="mb-2 relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute top-2 right-3 text-gray-600"
          >
            {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md text-sm"
        >
          {loading ? "Loading..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
