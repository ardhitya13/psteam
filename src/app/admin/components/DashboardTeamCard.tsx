"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface DashboardTeamCardProps {
  totalTeam: number;
  totalMembers: number;
}

export default function DashboardTeamCard({
  totalTeam,
  totalMembers,
}: DashboardTeamCardProps) {
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
