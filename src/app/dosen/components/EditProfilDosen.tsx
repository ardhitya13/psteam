"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  BookOpen,
  Users,
  ShieldCheck,
  Briefcase,
  Instagram,
  Facebook,
  Github,
} from "lucide-react";
import NavbarDosen from "./NavbarDosen";
import SidebarDosen from "./SidebarDosen";
import EditProfilDosenModal from "./EditProfilDosenModal";

export default function EditProfilDosen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === Load dari localStorage (jika ada) ===
  const [profile, setProfile] = useState({
    Nama: "Arifah Husaini",
    NIDN: "11022025",
    Prodi: "D3 Teknik Informatika",
    Email: "arifah@polibatam.ac.id",
    Phone: "+62 812-3456-7890",
    Instagram: "arifaa_",
    Facebook: "arifaa",
    Github: "arifa336",
    Foto: "/images/profile-dosen.jpg",
  });

  // saat pertama kali mount, ambil data dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dosenProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  // fungsi untuk menyimpan ke localStorage
  const saveToLocalStorage = (data: any) => {
    localStorage.setItem("dosenProfile", JSON.stringify(data));
  };

  const handleSave = (updated: any) => {
    setProfile(updated);
    saveToLocalStorage(updated); // ✅ simpan ke localStorage
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarDosen toggle={() => setIsSidebarOpen((s) => !s)} />
      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen((s) => !s)}
      />

      <main
        className={`transition-all duration-300 pt-4 px-6 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[80px]`}
      >
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a3b91] text-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src={profile.Foto}
              alt="Foto Profil"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#facc15] object-cover shadow"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{profile.Nama}</h1>
              <p className="text-sm text-blue-100">Dosen Teknik Informatika</p>
              <div className="flex items-center gap-2 text-sm text-blue-200 mt-2">
                <Mail size={16} />
                <span>{profile.Email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0a3b91] font-semibold px-4 py-2 rounded-xl shadow"
            >
              Edit Profil
            </button>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-[#0a3b91] font-semibold mb-4">Informasi Pribadi</h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li><strong className="inline-block w-36">Nama:</strong> {profile.Nama}</li>
              <li><strong className="inline-block w-36">NIDN:</strong> {profile.NIDN}</li>
              <li><strong className="inline-block w-36">Program Studi:</strong> {profile.Prodi}</li>
              <li><strong className="inline-block w-36">Email:</strong> {profile.Email}</li>
              <li><strong className="inline-block w-36">Nomor HP:</strong> {profile.Phone}</li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <Instagram size={18} className="text-pink-500" />
                <span>@{profile.Instagram}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <Facebook size={18} className="text-blue-600" />
                <span>{profile.Facebook}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <Github size={18} className="text-gray-800" />
                <span>{profile.Github}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-[#0a3b91] font-semibold mb-4">Aktivitas Akademik</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{ icon: BookOpen, label: "Penelitian", value: 8 },
                { icon: Users, label: "Pengabdian", value: 5 },
                { icon: ShieldCheck, label: "HKI", value: 3 },
                { icon: Briefcase, label: "Karya Ilmiah", value: 10 }
              ].map((item, i) => (
                <div key={i} className="bg-[#f5f7fa] border rounded-xl p-4 text-center">
                  <item.icon className="mx-auto text-[#0a3b91] mb-2" size={22} />
                  <p className="font-semibold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* === Modal === */}
      <EditProfilDosenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultData={profile}
        onSubmit={handleSave}
      />
    </div>
  );
}
