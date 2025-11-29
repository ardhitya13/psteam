"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

// BACKEND kamu pakai prefix `/api`
const API_URL = "http://localhost:4000/api/team";

export default function DashboardTeamCard() {
  const [totalTeam, setTotalTeam] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  // ================================
  // LOAD DATA
  // ================================
  const loadData = async () => {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data)) {
        // Total Project
        setTotalTeam(data.length);

        // FIX: dukung 2 field => teamMembers & members
        const memberCount = data.reduce((sum: number, project: any) => {
          const membersArray =
            project.teamMembers ??
            project.members ??
            []; // fallback aman

          return sum + membersArray.length;
        }, 0);

        setTotalMembers(memberCount);
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  // ================================
  // AUTO REFRESH PER 5 DETIK
  // ================================
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // ================================
  // CARD UI
  // ================================
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-transform duration-200 ease-out"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-semibold text-base">
          Tim Pengembang
        </h2>
        <div className="bg-blue-100 p-3 rounded-full">
          <Users className="text-blue-700 w-6 h-6" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-gray-900">{totalTeam}</p>
          <p className="text-gray-600 text-sm">Total Proyek</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">
            {totalMembers}
          </p>
          <p className="text-gray-600 text-sm">Total Anggota</p>
        </div>
      </div>
    </motion.div>
  );
}
