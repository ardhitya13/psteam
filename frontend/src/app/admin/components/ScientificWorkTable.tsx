"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Users, Edit } from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import {
  getAllLecturers,
  addScientificWork,
  updateScientificWork,
  deleteScientificWork,
} from "../../../lib/lecturer";

import EditScientificWorkCard from "./ScientificWorkEditCard";

/* =========================
   TYPES
========================= */
type ScientificWorkItem = {
  id?: number;
  title: string;
  type: string;
  year: number;
};

type Lecturer = {
  id: number;
  name: string;
  email: string;
  studyProgram?: string;
  specialization?: string;
  imageUrl?: string;
  scientificwork: ScientificWorkItem[];
};

export default function ScientificWorkTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  /* SEARCH */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* FILTER JENIS KARYA (DETAIL — TETAP ADA, TAPI DETAIL DIKOSONGKAN) */
  const [filterType, setFilterType] = useState("Semua");

  /* PAGINATION */
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageGroup, setPageGroup] = useState<number>(0);

  /* EDIT MODAL */
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayload, setEditPayload] = useState<{
    lecId: number;
    scientificworkList: ScientificWorkItem[];
    lecturer_name: string;
    email: string;
    studyProgram: string;
    specialization: string;
  } | null>(null);

  /* =========================
     LOAD DATA
  ========================= */
  async function loadLecturers() {
    try {
      const res = await getAllLecturers();

      const formatted = (res || []).map((lec: any) => {
        const profile = lec.lecturerprofile || {};

        return {
          id: lec.id,
          name: lec.name || "-",
          email: lec.email || "-",
          studyProgram: profile.studyProgram || "-",
          specialization: profile.specialization || "-",
          imageUrl: profile.imageUrl
            ? `http://localhost:4000${profile.imageUrl}`
            : "/no-photo.png",
          scientificwork: Array.isArray(profile.scientificwork)
            ? profile.scientificwork
            : [],
        } as Lecturer;
      });

      setLecturers(formatted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data karya ilmiah.");
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLecturers();
  }, []);

  /* =========================
     CRUD HANDLER
  ========================= */
  async function handleUpdateScientificWork(payload: {
    lecId: number;
    scientificworkList: ScientificWorkItem[];
  }) {
    const { lecId, scientificworkList } = payload;

    try {
      const lecturer = lecturers.find((l) => l.id === lecId);
      const original = lecturer?.scientificwork || [];

      for (const old of original) {
        const stillExist = scientificworkList.some(
          (s) => s.id === old.id
        );
        if (!stillExist && old.id) {
          await deleteScientificWork(old.id);
        }
      }

      for (const item of scientificworkList) {
        if (!item.title.trim()) continue;

        if (!item.id) {
          await addScientificWork(lecId, item);
        } else {
          await updateScientificWork(item.id, item);
        }
      }

      await loadLecturers();
    } catch (err) {
      console.error("UPDATE SCIENTIFIC WORK ERROR:", err);
      alert("Gagal menyimpan karya ilmiah.");
    }
  }

  /* =========================
     SEARCH FILTER (SAMA POLA)
  ========================= */
  const filteredLecturers = useMemo(() => {
    if (!searchQuery.trim()) return lecturers;
    const q = searchQuery.toLowerCase();
    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.studyProgram || "").toLowerCase().includes(q)
    );
  }, [searchQuery, lecturers]);

  /* =========================
     PAGINATION LOGIC
  ========================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLecturers.length / itemsPerPage)
  );

  const startIndex = currentPage * itemsPerPage - itemsPerPage;
  const paginated = filteredLecturers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchQuery, itemsPerPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  const emptyItem = (): ScientificWorkItem => ({
    title: "",
    type: "Artikel Ilmiah",
    year: new Date().getFullYear(),
  });

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
            }`}
        >
          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase">
              Daftar Karya Ilmiah Dosen
            </h1>
            <p className="text-gray-600 text-sm">
              Detail karya ilmiah dosen — edit melalui modal.
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex justify-end mb-6">
            <div className="relative flex items-center h-10">
              {!searchOpen && (
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(
                      () =>
                        document
                          .getElementById("searchInput")
                          ?.focus(),
                      50
                    );
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-md absolute left-0"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery.trim()) setSearchOpen(false);
                }}
                placeholder="Cari nama / prodi / email..."
                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 ${searchOpen
                    ? "w-56 pl-10 pr-3 opacity-100"
                    : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
              className="ml-3 text-black bg-white rounded-md px-6 py-2"
            >
              {[10, 20, 30].map((n) => (
                <option key={n}>{n} / halaman</option>
              ))}
            </select>
          </div>

          {/* TABLE */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-blue-50 font-semibold uppercase">
                <tr>
                  <th className="border px-4 py-3 border-gray-300 w-16">No</th>
                  <th className="border px-4 py-3 border-gray-300">Nama</th>
                  <th className="border px-4 py-3 border-gray-300">Program Studi</th>
                  <th className="border px-4 py-3 border-gray-300">Email</th>
                  <th className="border px-4 py-3 border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((lec, index) => {
                  const indexNumber = startIndex + index + 1;

                  return (
                    <React.Fragment key={lec.id}>
                      <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {index + 1}
                        </td>

                        <td className="border border-gray-300 px-4 py-3 flex items-center gap-3">
                          <img
                            src={lec.imageUrl}
                            className="w-10 h-10 rounded-full border object-cover"
                          />
                          <div>
                            <div className="font-semibold">{lec.name}</div>
                            <div className="text-xs text-gray-500">
                              {lec.specialization}
                            </div>
                          </div>
                        </td>

                        <td className="border border-gray-300 px-4 py-3">
                          {lec.studyProgram}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {lec.email}
                        </td>

                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md flex gap-1"
                              onClick={() =>
                                setExpandedId(
                                  expandedId === lec.id ? null : lec.id
                                )
                              }
                            >
                              <Users className="pt-1" size={15} /> Detail
                            </button>

                            <button
                              className="px-3 py-1 bg-yellow-500 text-white rounded-md flex gap-1"
                              onClick={() => {
                                setEditPayload({
                                  lecId: lec.id,
                                  scientificworkList:
                                    lec.scientificwork.length > 0
                                      ? lec.scientificwork
                                      : [emptyItem()],
                                  lecturer_name: lec.name,
                                  email: lec.email,
                                  studyProgram: lec.studyProgram || "",
                                  specialization: lec.specialization || "",
                                });
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="pt-1" size={15} /> Edit
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* DETAIL */}
                      {expandedId === lec.id && (
                        <tr>
                          <td colSpan={5} className="p-0 border border-gray-300 bg-[#f5f7fb]">
                            <div className="p-6">
                              <div className="bg-white p-6 rounded-lg shadow border mb-6">
                                <div className="flex items-center gap-6">
                                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300">
                                    <img src={lec.imageUrl} className="object-cover w-full h-full" />
                                  </div>
                                  <div>
                                    <h2 className="text-2xl font-bold text-[#0a3b91]">{lec.name}</h2>
                                    <p className="text-gray-700 text-lg font-semibold">Dosen</p>
                                    <div className="mt-3 space-y-1 text-gray-700 text-sm">
                                      <p><strong>Program Studi:</strong> {lec.studyProgram}</p>
                                      <p><strong>Email:</strong> {lec.email}</p>
                                      <p><strong>Bidang Spesialis:</strong> {lec.specialization}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white p-6 rounded-lg shadow border">
                                <h3 className="text-xl font-bold mb-3">
                                  Karya Ilmiah Dosen
                                </h3>

                                <table className="w-full text-sm border">
                                  <thead className="bg-blue-100">
                                    <tr>
                                      <th className="border px-3 py-2">Judul</th>
                                      <th className="border px-3 py-2 w-80">
                                        <div className="flex items-center justify-center gap-2">
                                          <span>Jenis Karya</span>
                                          <select
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="border rounded px-2 py-1 text-xs bg-white"
                                          >
                                            <option value="Semua">Semua</option>
                                            <option value="Artikel Ilmiah">Artikel Ilmiah</option>
                                            <option value="Jurnal Nasional">Jurnal Nasional</option>
                                            <option value="Jurnal Nasional Terakreditasi">Jurnal Nasional Terakreditasi</option>
                                            <option value="Jurnal Internasional">Jurnal Internasional</option>
                                            <option value="Jurnal Internasional Terakreditasi">Jurnal Internasional Terakreditasi</option>
                                            <option value="Lain-lain">Lain-lain</option>
                                          </select>
                                        </div>
                                      </th>
                                      <th className="border px-3 py-2 w-32">Tahun</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {lec.scientificwork
                                      .filter((s) =>
                                        filterType === "Semua"
                                          ? true
                                          : s.type === filterType
                                      )
                                      .map((s) => (
                                        <tr key={s.id}>
                                          <td className="border px-3 py-2">{s.title}</td>
                                          <td className="border px-3 py-2">{s.type}</td>
                                          <td className="border px-3 py-2 text-center">{s.year}</td>
                                        </tr>
                                      ))}

                                    {lec.scientificwork.length === 0 && (
                                      <tr>
                                        <td colSpan={3} className="text-center py-4 text-gray-500 italic">
                                          Tidak ada karya ilmiah.
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

            {/* PAGINATION */}
            <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((prev) => prev - 1);
                    setPageGroup(
                      Math.floor((currentPage - 2) / 3)
                    );
                  }
                }}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded border text-xs ${currentPage === 1
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-300"
                  }`}
              >
                &lt;
              </button>

              {Array.from({ length: 3 }, (_, i) => {
                const pageNum = pageGroup * 3 + (i + 1);
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 py-1 rounded text-xs border ${currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-300"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage((prev) => prev + 1);
                    setPageGroup(Math.floor(currentPage / 3));
                  }
                }}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded border text-xs ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-300"
                  }`}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* MODAL */}
          <EditScientificWorkCard
            isOpen={isEditOpen}
            defaultData={editPayload}
            onClose={() => {
              setIsEditOpen(false);
              setEditPayload(null);
            }}
            onSubmit={handleUpdateScientificWork}
          />
        </main>
      </div>
    </div>
  );
}


