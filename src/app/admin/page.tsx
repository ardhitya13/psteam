"use client";

import { useState } from "react";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import DashboardCard from "./components/DashboardCard";
import {
  CheckCircle,
  FolderKanban,
  BookOpen,
  FileText,
  ShieldCheck,
  Lightbulb,
  UserCog,
} from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 3 Card Utama
  const topCards = [
    {
      title: "Verifikasi Proyek",
      value: 12,
      color: "bg-blue-600",
      icon: <CheckCircle className="text-blue-700" />,
      showProgress: true,
      percent: 80,
      path: "/admin/project/verification",
    },
    {
      title: "Kelola Daftar Proyek",
      value: 45,
      color: "bg-green-500",
      icon: <FolderKanban className="text-green-600" />,
      showProgress: true,
      percent: 90,
      path: "/admin/project",
    },
    {
      title: "Kelola Daftar Pelatihan",
      value: 22,
      color: "bg-yellow-500",
      icon: <Lightbulb className="text-yellow-600" />,
      showProgress: true,
      percent: 70,
      path: "/admin/training",
    },
  ];

  // 4 Card Portofolio Dosen
  const bottomCards = [
    {
      title: "Penelitian Dosen",
      value: 20,
      color: "bg-blue-600",
      icon: <BookOpen className="text-blue-700" />,
      path: "/admin/portofolio/research",
    },
    {
      title: "Pengabdian Dosen",
      value: 15,
      color: "bg-green-500",
      icon: <FileText className="text-green-600" />,
      path: "/admin/portofolio/communityservice"
    },
    {
      title: "Karya Ilmiah Dosen",
      value: 30,
      color: "bg-yellow-500",
      icon: <ShieldCheck className="text-yellow-600" />,
      path: "/admin/portofolio/scientificwork"
    },
    {
      title: "HKI Dosen",
      value: 12,
      color: "bg-purple-600",
      icon: <UserCog className="text-purple-700" />,
      path: "/admin/portofolio/intellectualproperty"
    },
  ];

  

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Konten Utama */}
      <main
        className={`transition-all duration-300 pt-0 px-8 pb-6 space-y-8 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        {/* 🟦 Header Card Selamat Datang */}
        <div className="relative overflow-hidden bg-[#0a3b91] text-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center">
          <div className="z-10 max-w-lg">
            <h1 className="text-3xl font-bold mb-2">
              Selamat Datang,{" "}
              <span className="text-[#facc15]">Admin PSTEAM 👋</span>
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Kelola seluruh data sistem akademik, termasuk{" "}
              <span className="font-semibold text-white">
                verifikasi proyek, daftar pelatihan, dan portofolio dosen.
              </span>
            </p>
          </div>

          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#facc15]/10 rounded-full blur-3xl opacity-10"></div>
          </div>
        </div>

        {/* Grid 3 Card Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCards.map((card, i) => (
            <DashboardCard key={i} {...card} />
          ))}
        </div>

        {/* Grid 4 Card Portofolio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomCards.map((card, i) => (
            <DashboardCard key={i} {...card} showProgress={false} />
          ))}
        </div>
      </main>
    </div>
  );
}
