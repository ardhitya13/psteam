"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, BookOpen, Users, ShieldCheck } from "lucide-react";
import NavbarDosen from "../components/NavbarDosen";
import SidebarDosen from "../components/SidebarDosen";
import { useState } from "react";

export default function ProfilDosenPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar */}
      <SidebarDosen isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Konten Utama */}
      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        {/* Header Profil */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a3b91] text-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <img
              src="/images/profile-dosen.jpg" // Ganti dengan path gambar kamu
              alt="Foto Profil"
              className="w-28 h-28 rounded-full border-4 border-[#facc15] shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold mb-1">Ardhitya Danur Siswondo</h1>
              <p className="text-blue-100">Dosen Teknik Informatika</p>
              <div className="flex items-center gap-2 text-sm text-blue-200 mt-2">
                <Mail size={16} />
                <span>ardhitya13@polibatam.ac.id</span>
              </div>
            </div>
          </div>

          <button className="mt-6 md:mt-0 bg-[#facc15] hover:bg-yellow-400 text-[#0a3b91] font-semibold px-5 py-2.5 rounded-xl shadow transition">
            Edit Profil
          </button>
        </motion.div>

        {/* Informasi Detail */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-[#0a3b91] font-semibold mb-4 text-lg">
              Informasi Pribadi
            </h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>
                <strong className="text-gray-800 w-32 inline-block">Nama:</strong>
                Ardhitya Danur Siswondo
              </li>
              <li>
                <strong className="text-gray-800 w-32 inline-block">NIDN:</strong>
                11022025
              </li>
              <li>
                <strong className="text-gray-800 w-32 inline-block">Program Studi:</strong>
                D3 Teknik Informatika
              </li>
              <li>
                <strong className="text-gray-800 w-32 inline-block">Email:</strong>
                ardhitya13@polibatam.ac.id
              </li>
              <li>
                <strong className="text-gray-800 w-32 inline-block">Nomor HP:</strong>
                +62 812-3456-7890
              </li>
            </ul>
          </motion.div>

          {/* Aktivitas Akademik */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-[#0a3b91] font-semibold mb-4 text-lg">
              Aktivitas Akademik
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: "Penelitian", value: 8 },
                { icon: Users, label: "Pengabdian", value: 5 },
                { icon: ShieldCheck, label: "HKI", value: 3 },
                { icon: Briefcase, label: "Karya Ilmiah", value: 10 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f5f7fa] border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition"
                >
                  <item.icon className="mx-auto text-[#0a3b91] mb-2" size={24} />
                  <p className="font-semibold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
