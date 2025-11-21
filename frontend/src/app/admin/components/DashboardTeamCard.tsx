"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const API_URL = "http://localhost:4000/team";

export default function DashboardTeamCard() {
  const [totalTeam, setTotalTeam] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  // ===== LOAD REALTIME =====
  const loadData = async () => {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data)) {
        setTotalTeam(data.length);

        // Hitung total semua anggota dari semua tim
        const memberCount = data.reduce(
          (sum: number, project: any) => sum + project.members.length,
          0
        );

        setTotalMembers(memberCount);
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  useEffect(() => {
    loadData(); // load pertama

    const interval = setInterval(loadData, 5000); // realtime update 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-transform duration-200 ease-out"
    >
      {/* Header Card */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-semibold text-base">Tim Pengembang</h2>
        <div className="bg-blue-100 p-3 rounded-full">
          <Users className="text-blue-700 w-6 h-6" />
        </div>
      </div>

      {/* Nilai */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-gray-900">{totalTeam}</p>
          <p className="text-gray-600 text-sm">Total Proyek</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">{totalMembers}</p>
          <p className="text-gray-600 text-sm">Total Anggota</p>
        </div>
      </div>
    </motion.div>
  );
}
