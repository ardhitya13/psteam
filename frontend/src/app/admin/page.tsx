"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import DashboardCard from "./components/DashboardCard";
import DashboardTeamCard from "./components/DashboardTeamCard";

import {
  CheckCircle,
  FolderKanban,
  Lightbulb,
  BookOpen,
  FileText,
  ShieldCheck,
  UserCog,
} from "lucide-react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchDashboardData } from "@/lib/apiDashboard";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [displayName, setDisplayName] = useState("Admin");

  /* =========================
     LOAD DASHBOARD DATA
  ========================= */
  useEffect(() => {
    fetchDashboardData().then(setStats);
  }, []);

  /* =========================
     LOAD USER NAME (FINAL FIX)
     -> AMBIL LANGSUNG DARI LOCALSTORAGE
     -> PASTI SESUAI DATABASE
  ========================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const user = JSON.parse(stored);
      if (user?.name) {
        setDisplayName(user.name);
      }
    } catch {
      setDisplayName("Admin");
    }
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memuat dashboard…
      </div>
    );
  }

  /* =========================
     PORTOFOLIO META (WARNA KONSISTEN)
  ========================= */
  const PORTFOLIO = [
    {
      key: "research",
      label: "Penelitian",
      value: stats.research,
      color: "#2563eb",
      border: "border-blue-600",
      text: "text-blue-700",
      icon: <BookOpen size={18} />,
    },
    {
      key: "community",
      label: "Pengabdian",
      value: stats.communityService,
      color: "#16a34a",
      border: "border-green-600",
      text: "text-green-700",
      icon: <FileText size={18} />,
    },
    {
      key: "scientific",
      label: "Karya Ilmiah",
      value: stats.scientificWork,
      color: "#ca8a04",
      border: "border-yellow-500",
      text: "text-yellow-600",
      icon: <ShieldCheck size={18} />,
    },
    {
      key: "hki",
      label: "HKI",
      value: stats.intellectualProperty,
      color: "#7c3aed",
      border: "border-purple-600",
      text: "text-purple-700",
      icon: <UserCog size={18} />,
    },
  ];

  const PROJECT_STATUS = [
    { name: "Pending", value: stats.pendingProjects, color: "#facc15" },
    { name: "Approved", value: stats.approvedProjects, color: "#22c55e" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 px-8 pb-10 space-y-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          } mt-[85px]`}
      >
        {/* =========================
           HEADER
        ========================= */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-3xl shadow-xl p-10">
          <h1 className="text-3xl font-bold mb-2">
            Halo <span className="text-yellow-300">{displayName}</span> 👋
          </h1>
          <p className="text-blue-100 text-sm max-w-2xl">
            Dashboard ini digunakan untuk mengelola verifikasi proyek, pelatihan,
            tim pengembang, portofolio dosen, manajemen user, dan data akademik
            PSTEAM secara terpusat.
          </p>
        </div>

        {/* =========================
           KPI CARDS
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Pending Proyek"
            value={stats.pendingProjects}
            color="bg-yellow-500"
            icon={<CheckCircle className="text-yellow-600" />}
          />

          <DashboardCard
            title="Total Proyek"
            value={stats.totalProjects}
            color="bg-green-600"
            icon={<FolderKanban className="text-green-700" />}
          />

          <DashboardCard
            title="Pelatihan"
            value={stats.trainings.total}   // ✅ FIX
            color="bg-blue-600"
            icon={<Lightbulb className="text-blue-700" />}
          />

          <DashboardCard
            title="User"
            value={stats.users.total}       // ✅ FIX
            color="bg-purple-600"
            icon={<UserCog className="text-purple-700" />}
          />
        </div>

        {/* =========================
           PORTOFOLIO COLORED CARDS
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO.map((item) => (
            <div
              key={item.key}
              className={`bg-white p-5 rounded-xl shadow border-l-4 ${item.border}`}
            >
              <div className={`flex items-center gap-2 font-semibold ${item.text}`}>
                {item.icon} {item.label}
              </div>
              <p className="text-3xl font-bold text-black mt-1">
                {item.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Total {item.label.toLowerCase()}
              </p>
            </div>
          ))}
        </div>

        {/* =========================
           CHARTS
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* BAR */}
          <div className="bg-white p-6 rounded-xl shadow border text-black">
            <h3 className="font-semibold mb-4">Statistik Portofolio</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={PORTFOLIO}>
                <XAxis dataKey="label" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Bar dataKey="value">
                  {PORTFOLIO.map((item, i) => (
                    <Cell key={i} fill={item.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
              {PORTFOLIO.map((item) => (
                <span key={item.key} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label} ({item.value})
                </span>
              ))}
            </div>
          </div>

          {/* PIE */}
          <div className="bg-white p-6 rounded-xl shadow border text-black">
            <h3 className="font-semibold mb-4">Status Proyek</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={PROJECT_STATUS}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={95}
                >
                  {PROJECT_STATUS.map((item, i) => (
                    <Cell key={i} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex gap-6 justify-center mt-4 text-sm">
              {PROJECT_STATUS.map((s) => (
                <span key={s.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.name} ({s.value})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =========================
           TEAM
        ========================= */}
        <DashboardTeamCard />
      </main>
    </div>
  );
}
