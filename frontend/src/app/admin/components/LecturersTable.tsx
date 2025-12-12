"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Edit, Users, Search } from "lucide-react";

import EditLecturerModal from "./LecturerEditModal";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import {
  getAllLecturers,
  updateLecturerProfile,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../../../lib/lecturer";

export type EducationHistory = {
  id?: number;
  degree: string;
  university: string;
  major: string;
};

export type Lecturer = {
  id: number;
  name: string;
  email: string;
  studyProgram: string;
  specialization: string;
  imageUrl?: string;
  educationHistory: EducationHistory[];
};

export default function LecturersTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // =============================================================
  // LOAD ALL LECTURERS
  // =============================================================
  async function loadLecturers() {
    try {
      const res = await getAllLecturers();
      const list = Array.isArray(res) ? res : [];

      const formatted = list.map((item: any) => {
        const profile = item.lecturerprofile || {};

        return {
          id: item.id,
          name: item.name || "-",
          email: item.email || "-",
          studyProgram: profile.studyProgram || "-",
          specialization: profile.specialization || "-",
          imageUrl: profile.imageUrl
            ? `http://localhost:4000${profile.imageUrl}`
            : "/no-photo.png",
          educationHistory: Array.isArray(profile.educationhistory)
            ? profile.educationhistory
            : [],
        };
      });

      setLecturers(formatted);
    } catch (err) {
      console.error("LOAD ERROR:", err);
      alert("Gagal memuat data dosen");
    }
  }

  useEffect(() => {
    loadLecturers();
  }, []);

  // =============================================================
  // EDIT HANDLER — FIXED TOTAL
  // =============================================================
  const handleEditLecturer = async (updated: Lecturer) => {
    try {
      // 1️⃣ UPDATE PROFILE (studyProgram + specialization)
      await updateLecturerProfile(
        updated.id,
        JSON.stringify({
          studyProgram: updated.studyProgram,
          specialization: updated.specialization,
        })
      );

      const original = lecturers.find((l) => l.id === updated.id);

      // 2️⃣ DELETE EDUCATION THAT WAS REMOVED
      if (original) {
        for (const edu of original.educationHistory) {
          const stillExists = updated.educationHistory.some((e) => e.id === edu.id);
          if (!stillExists && edu.id) {
            await deleteEducation(edu.id);
          }
        }
      }

      // 3️⃣ ADD OR UPDATE EDUCATION
      for (const edu of updated.educationHistory) {
        // Skip empty rows
        if (!edu.degree && !edu.university && !edu.major) continue;

        if (!edu.id) {
          await addEducation(updated.id, {
            degree: edu.degree,
            university: edu.university,
            major: edu.major,
          });
        } else {
          await updateEducation(edu.id, {
            degree: edu.degree,
            university: edu.university,
            major: edu.major,
          });
        }
      }

      await loadLecturers();
      setIsEditOpen(false);
      setSelectedLecturer(null);
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Gagal menyimpan perubahan riwayat dosen.");
    }
  };

  // =============================================================
  // SEARCH & PAGINATION
  // =============================================================
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 40);
    }
  }, [isSearchOpen]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return lecturers;

    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.studyProgram.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
    );
  }, [lecturers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, searchTerm]);

  const toggleExpand = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  // =============================================================
  // UI RENDER
  // =============================================================
  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main
          className={`flex-1 transition-all duration-300 px-8 py-6 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          } mt-[85px]`}
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black uppercase">
              Kelola Riwayat Pendidikan Dosen
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola Riwayat dosen — cari, lihat detail, dan edit.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full flex justify-end mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                {!isSearchOpen && (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center 
                    bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm z-20"
                  >
                    <Search size={18} />
                  </button>
                )}

                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Cari nama / prodi / email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={() => {
                    if (!searchTerm.trim()) setIsSearchOpen(false);
                  }}
                  className={`transition-all duration-300 rounded-md border bg-white text-sm 
                    ${
                      isSearchOpen
                        ? "w-64 pl-10 pr-3 py-2 opacity-100 z-30"
                        : "w-10 opacity-0 pointer-events-none"
                    }`}
                />
              </div>

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="text-black bg-white rounded-md px-5 py-2"
              >
                {[10, 20, 30].map((n) => (
                  <option key={n}>{n} /  halaman</option>
                ))}
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-visible">
            <table className="min-w-full text-sm text-gray-800 border-collapse">
              <thead className="bg-[#eaf0fa] font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 w-16">No</th>
                  <th className="py-3 px-4 border border-gray-300">Nama</th>
                  <th className="py-3 px-4 border border-gray-300">Program Studi</th>
                  <th className="py-3 px-4 border border-gray-300">Email</th>
                  <th className="py-3 px-4 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((lect, i) => {
                  const indexNumber = startIndex + i + 1;

                  return (
                    <React.Fragment key={lect.id}>
                      <tr className="border border-gray-300 hover:bg-blue-50">
                        <td className="py-3 px-4 text-center">{indexNumber}</td>

                        <td className="py-3.5 px-4 flex items-center gap-3 border border-gray-200">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border">
                            <img
                              src={lect.imageUrl}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div>
                            <div className="font-semibold">{lect.name}</div>
                            <div className="text-xs text-gray-500">
                              {lect.specialization}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 border border-gray-300">{lect.studyProgram}</td>
                        <td className="py-3 px-4 border border-gray-300">{lect.email}</td>

                        <td className="py-3 px-4 text-center border border-gray-300">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => toggleExpand(lect.id)}
                              className="px-3 py-1 bg-blue-100 rounded-md text-blue-700 flex gap-1"
                            >
                              <Users className="pt-1" size={15} />
                              Detail
                            </button>

                            <button
                              onClick={() => {
                                setSelectedLecturer(lect);
                                setIsEditOpen(true);
                              }}
                              className="px-3 py-1 bg-yellow-500 text-white rounded-md flex gap-1"
                            >
                              <Edit className="pt-1" size={15} />
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED DETAIL */}
                      {expandedId === lect.id && (
                        <tr>
                          <td colSpan={5} className="p-0 border border-gray-300">
                            <div className="p-6 bg-[#f5f7fb]">
                              {/* Card Informasi Pribadi */}
                              <div className="bg-white p-6 rounded-lg shadow border mb-6">
                                <div className="flex items-center gap-6">
                                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 bg-white">
                                    <img
                                      src={lect.imageUrl}
                                      alt={lect.name}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>

                                  <div>
                                    <h2 className="text-2xl font-bold text-[#0a3b91]">
                                      {lect.name}
                                    </h2>
                                    <p className="text-gray-700 text-lg font-semibold">
                                      Dosen
                                    </p>

                                    <div className="mt-3 space-y-1 text-gray-700 text-sm">
                                      <p><strong>Program Studi:</strong> {lect.studyProgram}</p>
                                      <p><strong>Email:</strong> {lect.email}</p>
                                      <p><strong>Bidang Spesialis:</strong> {lect.specialization}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Riwayat Pendidikan */}
                              <div className="bg-white p-6 rounded-lg shadow border">
                                <h3 className="text-xl font-bold mb-3 text-[#0a3b91]">
                                  Riwayat Pendidikan
                                </h3>

                                <table className="w-full text-sm border bg-white rounded">
                                  <thead className="bg-blue-100 font-semibold">
                                    <tr>
                                      <th className="border px-3 py-2">Jenjang</th>
                                      <th className="border px-3 py-2">Universitas</th>
                                      <th className="border px-3 py-2">Jurusan</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {lect.educationHistory.length > 0 ? (
                                      lect.educationHistory.map((edu, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50">
                                          <td className="border px-3 py-2">{edu.degree}</td>
                                          <td className="border px-3 py-2">{edu.university}</td>
                                          <td className="border px-3 py-2">{edu.major}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan={3}
                                          className="text-center py-4 text-gray-500 italic"
                                        >
                                          Tidak ada riwayat pendidikan
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {isEditOpen && selectedLecturer && (
            <EditLecturerModal
              isOpen={isEditOpen}
              onClose={() => {
                setIsEditOpen(false);
                setSelectedLecturer(null);
              }}
              defaultData={selectedLecturer}
              onSubmit={handleEditLecturer}
            />
          )}
        </main>
      </div>
    </div>
  );
}
