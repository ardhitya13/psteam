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
} from "recharts";

export default function DosenPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ============================
  // DYNAMIC NAMA DOSEN
  // ============================
  const [lecturerName, setLecturerName] = useState("Dosen Polibatam");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setLecturerName(storedName);
  }, []);

  // ============================  
  // CARD DASHBOARD  
  // ============================
  const cards = [
    {
      title: "Penelitian",
      value: 20,
      percent: 80,
      color: "bg-blue-600",
      icon: <Users className="text-blue-700" />,
      path: "/lecturer/research",
    },
    {
      title: "Pengabdian",
      value: 15,
      percent: 65,
      color: "bg-green-500",
      icon: <BookOpen className="text-green-600" />,
      path: "/lecturer/communityservice",
    },
    {
      title: "Karya Ilmiah",
      value: 30,
      percent: 90,
      color: "bg-yellow-500",
      icon: <FileText className="text-yellow-600" />,
      path: "/lecturer/scientificwork",
    },
    {
      title: "HKI / Paten",
      value: 12,
      percent: 50,
      color: "bg-purple-600",
      icon: <ShieldCheck className="text-purple-700" />,
      path: "/lecturer/intellectualproperty",
    },
  ];

  const dataBar = [
    { bulan: "Jan", nilai: 5 },
    { bulan: "Feb", nilai: 8 },
    { bulan: "Mar", nilai: 6 },
    { bulan: "Apr", nilai: 9 },
    { bulan: "Mei", nilai: 7 },
    { bulan: "Jun", nilai: 10 },
    { bulan: "Jul", nilai: 9 },
  ];

  const dataPie = [
    { name: "Selesai", value: 80 },
    { name: "Proses", value: 20 },
  ];

  const COLORS = ["#1E3A8A", "#E5E7EB"];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-6 space-y-8 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >

        {/* ============================
          CARD SELAMAT DATANG DOSEN
        ============================ */}
        <div className="relative overflow-hidden bg-[#0a3b91] text-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center transition-all duration-500">

          {/* Kiri */}
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

              {/* Tanggal */}
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#facc15]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Nama dosen (dinamis) */}
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#facc15]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.607 6.879 1.683M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{lecturerName}</span>
              </div>

            </div>
          </div>

          {/* Kanan */}
          <div className="mt-8 md:mt-0 z-10 flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col items-center shadow-lg">
              <div className="h-14 w-14 flex items-center justify-center bg-white/20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#facc15]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0-7a4 4 0 004-4m-4 4a4 4 0 01-4-4" />
                </svg>
              </div>
              <p className="text-sm text-center font-medium mt-3 text-[#facc15]">
                Polibatam Software Team
              </p>
              <p className="text-xs text-blue-100">Dashboard Akademik</p>
            </div>
          </div>

          {/* Efek background */}
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#facc15]/10 rounded-full blur-3xl opacity-10"></div>
          </div>
        </div>

        {/* ============================
            CARD STATISTIK
        ============================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              onClick={() => router.push(card.path)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-800 font-semibold text-base">
                  {card.title}
                </h2>
                {card.icon}
              </div>

              <p className="text-3xl font-bold text-gray-900">{card.value}</p>

              <div className="mt-3">
                <div className="flex justify-between mb-1 text-xs text-gray-500">
                  <span>{card.percent}%</span>
                  <span>Selesai</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className={`h-2.5 rounded-full ${card.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${card.percent}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================
            GRAFIK
        ============================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-gray-900 text-base font-semibold mb-4">
              Update Data Bulanan Penelitian & Proyek
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nilai" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-gray-900 text-base font-semibold mb-4">
              Total Data Tahunan
            </h3>
            <div className="relative flex justify-center items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dataPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {dataPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <p className="text-2xl font-semibold text-gray-900">80%</p>
                <p className="text-sm text-gray-700">Selesai</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
