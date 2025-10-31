"use client";

import TataCaraPengajuan from "./components/TataCaraPengajuan";
import FormPengajuan from "./components/FormPengajuan";

export default function PengajuanPage() {
  return (
    // ✅ Mengikuti background default layout (tanpa warna abu-abu)
    <main className="relative min-h-screen overflow-hidden py-16 px-6 text-white">
      {/* 🔹 Overlay lembut agar nyatu sama tema layout */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1B55]/30 via-[#00143A]/15 to-transparent -z-10"></div>

      {/* 🔹 Efek cahaya lembut di bawah */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-blue-400/10 blur-3xl opacity-40 -z-10"></div>

      {/* 🔹 Konten Utama */}
      <div className="max-w-5xl mx-auto space-y-16">
        <TataCaraPengajuan />
        <FormPengajuan />
      </div>
    </main>
  );
}
