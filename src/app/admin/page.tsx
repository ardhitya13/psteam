"use client";

import { useState } from "react";
import NavbarAdmin from "./components/NavbarAdmin";
import SidebarAdmin from "./components/SidebarAdmin";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
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

export default function AdminPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const cards = [
    { title: "Proyek yang di Publikasi", value: 20, path: "/admin/keloka/proyek" },
    { title: "Penelitian yang di Publikasi", value: 30, path: "/admin/penelitian-publikasi" },
    { title: "Kelola Pelatihan", value: 15, path: "/admin/kelola/pelatihan" },
    { title: "Kelola Profil Umum Dosen", value: 14, path: "/admin/kelola-dosen" },
    { title: "Proyek yang belum di Publikasi", value: 12, path: "/admin/proyek-belum-publikasi" },
    { title: "Penelitian yang belum di Publikasi", value: 8, path: "/admin/penelitian-belum-publikasi" },
  ];

  // Data untuk grafik batang
  const dataBar = [
    { bulan: "Jan", nilai: 5 },
    { bulan: "Feb", nilai: 8 },
    { bulan: "Mar", nilai: 6 },
    { bulan: "Apr", nilai: 9 },
    { bulan: "Mei", nilai: 7 },
    { bulan: "Jun", nilai: 10 },
    { bulan: "Jul", nilai: 9 },
  ];

  // Data untuk grafik pie
  const dataPie = [
    { name: "Selesai", value: 80 },
    { name: "Proses", value: 20 },
  ];

  const COLORS = ["#1E3A8A", "#E5E7EB"];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar */}
      <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Konten utama */}
      <main
        className={`transition-all duration-300 pt-0 px-8 pb-6 space-y-8 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        {/* Card utama */}
        <div className="bg-blue-700 text-white rounded-2xl shadow-lg p-6 md:p-10">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang Admin</h1>
          <p className="text-base">
            Anda memiliki akses mengelola data-data yang ada di Polibatam Software Team
          </p>
        </div>

        {/* Grid card kecil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-md transition-transform duration-300 will-change-transform"
              onClick={() => router.push(card.path)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-800 font-semibold">{card.title}</h2>
                <Users className="text-gray-900" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grafik Batang */}
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

          {/* Grafik Pie */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-gray-800 text-base font-semibold mb-4">Total Data Tahunan</h3>
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
                <p className="text-sm text-gray-900">Selesai</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
