"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarDays, BookOpen, FileText, ShieldCheck } from "lucide-react";

export default function WelcomeCard() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(formatted);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row justify-between items-center"
    >
      {/* Kiri - Sapaan */}
      <div className="z-10">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang,{" "}
          <span className="text-yellow-300">Dosen</span> 👋
        </h1>
        <p className="text-sm text-blue-100 mb-3">
          Anda memiliki akses untuk mengelola data akademik di{" "}
          <span className="font-semibold text-white">Polibatam Software Team</span>.
        </p>

        <div className="flex items-center gap-2 text-sm text-blue-200">
          <CalendarDays size={16} />
          <span>{date}</span>
        </div>
      </div>

      {/* Kanan - Statistik Ringkas */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 md:mt-0 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-inner z-10"
      >
        <h2 className="text-sm font-semibold text-blue-100 mb-3 text-center">
          Statistik Singkat
        </h2>
        <div className="grid grid-cols-2 gap-3 text-center text-white">
          <div className="flex flex-col items-center">
            <BookOpen size={22} className="mb-1 text-yellow-300" />
            <span className="text-xl font-bold">20</span>
            <span className="text-xs text-blue-100">Penelitian</span>
          </div>
          <div className="flex flex-col items-center">
            <FileText size={22} className="mb-1 text-green-300" />
            <span className="text-xl font-bold">15</span>
            <span className="text-xs text-blue-100">Karya Ilmiah</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={22} className="mb-1 text-pink-300" />
            <span className="text-xl font-bold">12</span>
            <span className="text-xs text-blue-100">HKI / Paten</span>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen size={22} className="mb-1 text-cyan-300" />
            <span className="text-xl font-bold">10</span>
            <span className="text-xs text-blue-100">Pengabdian</span>
          </div>
        </div>
      </motion.div>

      {/* Ornamen Latar (Glow efek) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-20"></div>
    </motion.div>
  );
}
