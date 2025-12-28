"use client";

import { useState, useEffect } from "react";
import NavbarDosen from "./components/NavbarLecturer";
import SidebarDosen from "./components/SidebarLecturer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, BookOpen, FileText, ShieldCheck } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* =========================
   HELPER
========================= */
function getUserId(): number {
  if (typeof window === "undefined") return 0;
  const token = localStorage.getItem("token");
  if (!token) return 0;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
}

const API = "http://localhost:4000/api/lecturer";

export default function DosenPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* =========================
     NAMA DOSEN (JANGAN DIUBAH)
  ========================= */
  const [lecturerName, setLecturerName] = useState("Dosen Polibatam");

  /* =========================
     STATISTIK REAL
  ========================= */
  const [statistik, setStatistik] = useState({
    penelitian: 0,
    pengabdian: 0,
    karyaIlmiah: 0,
    hki: 0,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setLecturerName(storedName);

    const userId = getUserId();
    if (!userId) return;

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    async function loadStatistik() {
      try {
        const [penelitian, pengabdian, karya, hki] = await Promise.all([
          fetch(`${API}/${userId}/research`, { headers }).then(r => r.json()),
          fetch(`${API}/${userId}/community-service`, { headers }).then(r => r.json()),
          fetch(`${API}/${userId}/scientific-work`, { headers }).then(r => r.json()),
          fetch(`${API}/${userId}/intellectual-property`, { headers }).then(r => r.json()),
        ]);

        setStatistik({
          penelitian: penelitian?.length || 0,
          pengabdian: pengabdian?.length || 0,
          karyaIlmiah: karya?.length || 0,
          hki: hki?.length || 0,
        });
      } catch (err) {
        console.error("Gagal load statistik", err);
      }
    }

    loadStatistik();
  }, []);

  /* =========================
     CARD STATISTIK
  ========================= */
  const cards = [
    {
      title: "Penelitian",
      value: statistik.penelitian,
      icon: <Users className="text-blue-600" />,
      path: "/lecturer/research",
    },
    {
      title: "Pengabdian",
      value: statistik.pengabdian,
      icon: <BookOpen className="text-green-600" />,
      path: "/lecturer/communityservice",
    },
    {
      title: "Karya Ilmiah",
      value: statistik.karyaIlmiah,
      icon: <FileText className="text-yellow-500" />,
      path: "/lecturer/scientificwork",
    },
    {
      title: "HKI / Paten",
      value: statistik.hki,
      icon: <ShieldCheck className="text-purple-600" />,
      path: "/lecturer/intellectualproperty",
    },
  ];

  const dataBar = [
    { name: "Penelitian", total: statistik.penelitian, color: "#2563eb" },
    { name: "Pengabdian", total: statistik.pengabdian, color: "#16a34a" },
    { name: "Karya Ilmiah", total: statistik.karyaIlmiah, color: "#eab308" },
    { name: "HKI / Paten", total: statistik.hki, color: "#9333ea" },
  ];

  const dataPie = dataBar.map(d => ({
    name: d.name,
    value: d.total,
    color: d.color,
  }));

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* ⬇⬇⬇ FIX UTAMA: main RELATIVE */}
      <main
        className={`relative transition-all duration-300 pt-0 px-8 pb-6 space-y-8 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >

        {/* ============================
            CARD SELAMAT DATANG DOSEN
            ⚠️ TIDAK DIUBAH 1 KATA PUN
        ============================ */}
        <div className="relative z-10 overflow-hidden bg-[#0a3b91] text-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center transition-all duration-500">
          <div className="z-10 max-w-lg">
            <h1 className="text-3xl font-bold mb-2">
              Selamat Datang,{" "}
              <span className="text-[#facc15]">{lecturerName} 👋</span>
            </h1>

            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Akses dashboard ini untuk mengelola data{" "}
              <span className="font-semibold text-white">
                Penelitian, Pengabdian, Karya Ilmiah, dan HKI/Paten
              </span>{" "}
              yang terintegrasi dalam sistem PSTEAM.
            </p>

            <div className="flex items-center gap-3 text-blue-100 text-sm">
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span>
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span>{lecturerName}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 z-10 flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col items-center shadow-lg">
              <p className="text-sm text-center font-medium mt-3 text-[#facc15]">
                Polibatam Software Team
              </p>
              <p className="text-xs text-blue-100">Dashboard Akademik</p>
            </div>
          </div>
        </div>

        {/* ============================
            CARD STATISTIK
        ============================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl shadow p-6 cursor-pointer"
              onClick={() => router.push(card.path)}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">{card.title}</h3>
                {card.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">Total data</p>
            </motion.div>
          ))}
        </div>

        {/* ============================
            GRAFIK
        ============================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow border">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total">
                  {dataBar.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={dataPie} dataKey="value" outerRadius={90} label>
                  {dataPie.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
