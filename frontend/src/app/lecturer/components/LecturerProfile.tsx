"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, BookOpen, Users, ShieldCheck, Briefcase } from "lucide-react";

import NavbarLecturer from "./NavbarLecturer";
import SidebarLecturer from "./SidebarLecturer";
import EditLecturerProfileModal from "./EditLecturerProfileModal";
import AddEducationModal from "./AddEducationModal";
import EditEducationModal from "./EditEducationModal";

import {
  getLecturerProfile,
  updateLecturerProfile,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../../../lib/lecturer";

const BACKEND_URL = "http://localhost:4000";

export default function LecturerProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEduOpen, setIsAddEduOpen] = useState(false);
  const [isEditEduOpen, setIsEditEduOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [userId, setUserId] = useState<number | null>(null);

  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    studyProgram: "",
    specialization: "",
    photo: "/images/default-user.png",
  });

  const [education, setEducation] = useState<any[]>([]);

  /* ================= STATISTIK AKADEMIK ================= */
  const [stats, setStats] = useState({
    research: 0,
    communityService: 0,
    intellectualProperty: 0,
    scientificWork: 0,
  });

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const user = JSON.parse(stored);
    if (!user?.id) return;

    setUserId(user.id);
    loadProfile(user.id);
  }, []);

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async (uid: number) => {
  try {
    const prof = await getLecturerProfile(uid);

    /* FOTO */
    let photoUrl = "/images/default-user.png";
    if (prof?.imageUrl) {
      photoUrl = prof.imageUrl.startsWith("/uploads")
        ? `${BACKEND_URL}${prof.imageUrl}`
        : prof.imageUrl;
    }

    /* 🔥 AMBIL LANGSUNG DARI DATABASE */
    setProfile({
      name: prof.user?.name ?? "",
      email: prof.user?.email ?? "",
      studyProgram: prof.studyProgram ?? "",
      specialization: prof.specialization ?? "",
      photo: photoUrl,
    });

    /* SIMPAN UNTUK NAVBAR (OPSIONAL) */
    localStorage.setItem("userName", prof.user?.name ?? "");
    localStorage.setItem("userEmail", prof.user?.email ?? "");
    localStorage.setItem("userStudyProgram", prof.studyProgram ?? "");
    localStorage.setItem("userPhoto", photoUrl);

    setEducation(
      Array.isArray(prof.educationhistory)
        ? prof.educationhistory
        : []
    );

    /* STATISTIK AKADEMIK */
    setStats({
      research: prof.research?.length ?? 0,
      communityService: prof.communityservice?.length ?? 0,
      intellectualProperty: prof.intellectualproperty?.length ?? 0,
      scientificWork: prof.scientificwork?.length ?? 0,
    });
  } catch (err) {
    console.error("LOAD PROFILE ERROR:", err);
  }
};

  /* ================= SAVE PROFILE ================= */
  const handleSave = async (updated: any) => {
    if (!userId) return;

    try {
      const formData = new FormData();
      formData.append("studyProgram", updated.studyProgram);
      formData.append("specialization", updated.specialization);

      if (updated.photoFile) {
        formData.append("photo", updated.photoFile);
      }

      await updateLecturerProfile(userId, formData);
      loadProfile(userId);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Gagal update profil");
    }
  };

  /* ================= EDUCATION CRUD ================= */
  const handleAddEducation = async (newEdu: any) => {
    if (!userId) return;
    const added = await addEducation(userId, newEdu);
    setEducation((prev) => [...prev, added]);
    setIsAddEduOpen(false);
  };

  const handleUpdateEducation = async (updatedEdu: any) => {
    if (editingIndex === null) return;
    const target = education[editingIndex];
    const updated = await updateEducation(target.id, updatedEdu);
    setEducation((prev) =>
      prev.map((item, idx) => (idx === editingIndex ? updated : item))
    );
    setIsEditEduOpen(false);
  };

  const handleDeleteEducation = async (index: number) => {
    const target = education[index];
    if (!target) return;
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    await deleteEducation(target.id);
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <NavbarLecturer toggle={() => setIsSidebarOpen((s) => !s)} />
      <SidebarLecturer
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen((s) => !s)}
      />

      <main
        className={`transition-all duration-300 pt-4 px-6 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[80px]`}
      >
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a3b91] text-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-6">
            <img
              src={profile.photo}
              alt="Foto Profil"
              onError={(e) => (e.currentTarget.src = "/images/default-user.png")}
              className="w-28 h-28 rounded-full border-4 border-[#facc15] object-cover shadow"
            />

            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-sm text-blue-200">{profile.studyProgram}</p>

              <div className="flex items-center gap-2 mt-2 text-sm text-blue-200">
                <Mail size={16} />
                <span>{profile.email}</span>
              </div>

              <p className="text-sm text-blue-200 mt-1">
                Spesialisasi: {profile.specialization}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#facc15] hover:bg-yellow-400 text-[#0a3b91] font-semibold px-4 py-2 rounded-xl shadow"
          >
            Edit Profil
          </button>
        </motion.div>

        {/* ================= INFO + AKTIVITAS ================= */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informasi Pribadi */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-black font-semibold mb-4">Informasi Pribadi</h2>
            <ul className="text-gray-700 text-sm space-y-3">
              <li><strong className="inline-block w-36">Nama:</strong> {profile.name}</li>
              <li><strong className="inline-block w-36">Program Studi:</strong> {profile.studyProgram}</li>
              <li><strong className="inline-block w-36">Email:</strong> {profile.email}</li>
              <li><strong className="inline-block w-36">Spesialisasi:</strong> {profile.specialization}</li>
            </ul>
          </motion.div>

          {/* Aktivitas Akademik */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-black font-semibold mb-4">Aktivitas Akademik</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: "Penelitian", value: stats.research },
                { icon: Users, label: "Pengabdian", value: stats.communityService },
                { icon: Briefcase, label: "Karya Ilmiah", value: stats.scientificWork },
                { icon: ShieldCheck, label: "HKI / Paten", value: stats.intellectualProperty },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#f6f8fc] border rounded-xl p-4 text-center shadow-sm hover:bg-[#eef3ff] transition"
                >
                  <item.icon className="text-[#0a3b91] mx-auto mb-2" size={22} />
                  <p className="font-bold text-black">{item.value}</p>
                  <p className="text-xs text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================= RIWAYAT PENDIDIKAN ================= */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white border rounded-2xl p-6 shadow-sm mt-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-black font-semibold text-lg">Riwayat Pendidikan</h2>
            <button
              onClick={() => setIsAddEduOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-xl shadow text-sm"
            >
              + Tambah
            </button>
          </div>

          <div className="rounded-2xl border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#dbe7ff] text-black">
                  <th className="p-4 text-center">Jenjang</th>
                  <th className="p-4 text-center">Universitas</th>
                  <th className="p-4 text-center">Jurusan</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {education.map((e, i) => (
                  <tr key={e.id ?? i} className="hover:bg-[#f3f6ff] text-black">
                    <td className="p-4 text-center">{e.degree}</td>
                    <td className="p-4 text-center">{e.university}</td>
                    <td className="p-4 text-center">{e.major}</td>
                    <td className="p-4 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditingIndex(i);
                          setIsEditEduOpen(true);
                        }}
                        className="px-4 py-1.5 bg-yellow-400 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(i)}
                        className="px-4 py-1.5 bg-red-500 text-white rounded-lg"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {education.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center italic text-gray-500">
                      Belum ada riwayat pendidikan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* ================= MODALS ================= */}
      <EditLecturerProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultData={profile}
        onSubmit={handleSave}
      />

      <AddEducationModal
        isOpen={isAddEduOpen}
        onClose={() => setIsAddEduOpen(false)}
        onSubmit={handleAddEducation}
      />

      <EditEducationModal
        isOpen={isEditEduOpen}
        onClose={() => setIsEditEduOpen(false)}
        defaultData={editingIndex !== null ? education[editingIndex] : null}
        onSubmit={handleUpdateEducation}
      />
    </div>
  );
}
