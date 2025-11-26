"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Plus,
  Users,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AddResearchCard from "./AddResearchCard";
import EditResearchCard from "./EditResearchCard";

/* ---------------------------
   Types
----------------------------*/
type ResearchItem = {
  id: number;
  title: string;
  year: number;
};

type Lecturer = {
  id: number;
  name: string;
  position: string;
  program: string;
  educationLevel: string;
  email: string;
  specialization: string;
  imageUrl: string;
  research: ResearchItem[];
};

/* ---------------------------
   Button Style Constants
----------------------------*/
const BTN =
  "inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium shadow-sm";
const BTN_PRIMARY = BTN + " bg-blue-600 hover:bg-blue-700 text-white";
const BTN_OUTLINE =
  BTN + " border bg-white border-gray-300 hover:bg-gray-100 text-gray-700";

/* ---------------------------
   Component
----------------------------*/
export default function ResearchTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dummy data
  const [lecturers, setLecturers] = useState<Lecturer[]>([
    {
      id: 1,
      name: "Swono Sibagariang, S.Kom., M.Kom",
      position: "Dosen",
      program: "Teknik Informatika",
      educationLevel: "Magister (S2)",
      email: "swono@polibatam.ac.id",
      specialization: "Software Development",
      imageUrl: "/dosen/swono_sibagariang.png",
      research: [
        {
          id: 1,
          title:
            "Integrasi Teknologi Active Liveness Detection Dan Face Recognition Dalam Aplikasi Pembayaran Mobile Untuk Keamanan Otentikasi",
          year: 2025,
        },
        {
          id: 2,
          title:
            "Model Klasifikasi Calon Mahasiswa Baru untuk Rekomendasi Program Studi menggunakan Recurrent Neural Network",
          year: 2024,
        },
        {
          id: 3,
          title:
            "Rancang Bangun Aplikasi Pembukuan Laporan Keuangan Menggunakan Teknologi Web Service",
          year: 2023,
        },
      ],
    },

    {
      id: 2,
      name: "Dr. Ari Wibowo, S.T., M.T.",
      position: "Dosen",
      program: "Teknologi Rekayasa Multimedia",
      educationLevel: "Doktor (S3)",
      email: "wibowo@polibatam.ac.id",
      specialization: "AI, Computer Vision, Autonomous System",
      imageUrl: "/dosen/ari_wibowo.png",
      research: [
        { id: 1, title: "PROGRAM RISET PPMI STEI - GURU BESAR", year: 2025 },
        {
          id: 2,
          title:
            "Pengembangan Sistem Otonomi dengan Menggunakan Kecerdasan Artificial untuk Trem",
          year: 2023,
        },
      ],
    },
  ]);

  /* ---------------------------
     UI STATE
  ----------------------------*/
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [initialLecturer, setInitialLecturer] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayload, setEditPayload] =
    useState<{ lecId: number; item: ResearchItem; lecturer_name: string } | null>(
      null
    );

  /* ---------------------------
     FILTER LECTURER
  ----------------------------*/
  const filteredLecturers = useMemo(() => {
    if (!searchQuery.trim()) return lecturers;

    const q = searchQuery.toLowerCase();
    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.program.toLowerCase().includes(q)
    );
  }, [searchQuery, lecturers]);

  const totalPages = Math.max(1, Math.ceil(filteredLecturers.length / perPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginated = filteredLecturers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  /* ---------------------------
     EDIT / DELETE LOGIC
  ----------------------------*/
  function addResearchToLecturer(name: string, item: Omit<ResearchItem, "id">) {
    setLecturers((prev) =>
      prev.map((lec) =>
        lec.name === name
          ? {
              ...lec,
              research: [
                {
                  id: lec.research.length
                    ? Math.max(...lec.research.map((r) => r.id)) + 1
                    : 1,
                  ...item,
                },
                ...lec.research,
              ],
            }
          : lec
      )
    );
  }

  function updateResearch(lecId: number, item: ResearchItem) {
    setLecturers((prev) =>
      prev.map((lec) =>
        lec.id === lecId
          ? {
              ...lec,
              research: lec.research.map((r) =>
                r.id === item.id ? item : r
              ),
            }
          : lec
      )
    );
  }

  function deleteResearch(lecId: number, rid: number) {
    if (!confirm("Hapus karya ilmiah ini?")) return;

    setLecturers((prev) =>
      prev.map((lec) =>
        lec.id === lecId
          ? {
              ...lec,
              research: lec.research.filter((r) => r.id !== rid),
            }
          : lec
      )
    );
  }

  /* ---------------------------
     Lecturer Research List
  ----------------------------*/
  function LecturerResearchList({ lecturer }: { lecturer: Lecturer }) {
    const [filterYear, setFilterYear] = useState<string>("");
    const [page, setPage] = useState(1);

    const per = 10;

    const yearOptions = useMemo(
      () => [...new Set(lecturer.research.map((r) => r.year))].sort((a, b) => b - a),
      [lecturer]
    );

    const filtered = useMemo(() => {
      if (!filterYear) return lecturer.research;
      return lecturer.research.filter((r) => r.year === Number(filterYear));
    }, [filterYear, lecturer]);

    const visible = filtered.slice((page - 1) * per, page * per);
    const totalPage = Math.max(1, Math.ceil(filtered.length / per));

    useEffect(() => setPage(1), [filterYear, lecturer.id]);

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-gray-800">
            Daftar Penelitian ({filtered.length})
          </h4>

          <select
            value={filterYear}
            onChange={(e) => {
              setFilterYear(e.target.value);
              setPage(1);
            }}
            className="px-6 py-2 border border-[#DDE1E5] rounded bg-white text-sm"
          >
            <option value="">Semua Tahun</option>
            {yearOptions.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-white rounded-md border border-[#DDE1E5]">
          <table className="w-full text-sm border-collapse border border-[#DDE1E5]">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border border-[#DDE1E5]">No</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">Judul</th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-24">
                  Tahun
                </th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-36">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {visible.length ? (
                visible.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                      {(page - 1) * per + idx + 1}
                    </td>

                    <td className="border border-[#DDE1E5] px-4 py-3">
                      {r.title}
                    </td>

                    <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                      {r.year}
                    </td>

                    <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-yellow-400 text-white px-3 py-1 rounded text-sm inline-flex items-center gap-2"
                          onClick={() => {
                            setEditPayload({
                              lecId: lecturer.id,
                              item: r,
                              lecturer_name: lecturer.name,
                            });
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm inline-flex items-center gap-2"
                          onClick={() => deleteResearch(lecturer.id, r.id)}
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 border border-[#DDE1E5]"
                  >
                    Tidak ada karya ilmiah.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            disabled={page === 1}
            className="px-3 py-1 border border-[#DDE1E5] rounded bg-white hover:bg-gray-100"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm">
            Halaman {page} / {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            className="px-3 py-1 border border-[#DDE1E5] rounded bg-white hover:bg-gray-100"
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------
     MAIN RENDER
  ----------------------------*/
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminNavbar
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
        >
          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black uppercase">
              Daftar Penelitian Dosen
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola daftar publikasi ilmiah dosen PSTeam.
            </p>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
            {/* Search */}
            <div className="relative flex items-center h-10">
              {!searchOpen && (
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(() => {
                      document.getElementById("searchInput")?.focus();
                    }, 50);
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-md absolute left-0"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                onBlur={() => {
                  if (searchQuery.trim() === "") setSearchOpen(false);
                }}
                placeholder="Cari nama / prodi..."
                className={`transition-all duration-300 border border-[#DDE1E5] bg-white 
                  rounded-md shadow-sm text-sm h-10
                  ${
                    searchOpen
                      ? "w-56 pl-10 pr-3 opacity-100"
                      : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            {/* ITEMS PER PAGE */}
            <div className="relative">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-[#DDE1E5] bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
              >
                {[5, 10, 20, 30].map((n) => (
                  <option key={n} value={n}>
                    {n} Halaman
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
              />
            </div>

            {/* ADD RESEARCH */}
            <button
              onClick={() => {
                setInitialLecturer(null);
                setIsAddOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow"
            >
              <Plus size={18} /> Tambah Penelitian
            </button>
          </div>

          {/* TABLE (LECTURER LIST) */}
          <div className="bg-white border border-[#DDE1E5] rounded-lg shadow">
            <table className="w-full border-collapse text-sm text-gray-700 border border-[#DDE1E5]">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-[#DDE1E5] px-4 py-3 text-center w-14">
                    No
                  </th>
                  <th className="border border-[#DDE1E5] px-4 py-3">
                    Nama Dosen
                  </th>
                  <th className="border border-[#DDE1E5] px-4 py-3">
                    Program Studi
                  </th>
                  <th className="border border-[#DDE1E5] px-4 py-3">
                    Pendidikan
                  </th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Email</th>
                  <th className="border border-[#DDE1E5] px-4 py-3 text-center w-48">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((lec, idx) => (
                  <React.Fragment key={lec.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                        {(currentPage - 1) * perPage + idx + 1}
                      </td>

                      <td className="border border-[#DDE1E5] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={lec.imageUrl}
                            alt={lec.name}
                            className="w-10 h-10 rounded-full border border-[#DDE1E5] object-cover"
                          />
                          <div>
                            <div className="font-semibold">{lec.name}</div>
                            <div className="text-xs text-gray-500">
                              {lec.position}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#DDE1E5] px-4 py-3">
                        {lec.program}
                      </td>
                      <td className="border border-[#DDE1E5] px-4 py-3">
                        {lec.educationLevel}
                      </td>
                      <td className="border border-[#DDE1E5] px-4 py-3">
                        {lec.email}
                      </td>

                      <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className={
                              BTN_OUTLINE +
                              " bg-sky-100 text-sky-700"
                            }
                            onClick={() =>
                              setExpandedId(
                                expandedId === lec.id ? null : lec.id
                              )
                            }
                          >
                            <Users size={14} />{" "}
                            {expandedId === lec.id ? "Tutup" : "Detail"}{" "}
                            <ChevronDown
                              size={14}
                              className={
                                expandedId === lec.id
                                  ? "rotate-180"
                                  : ""
                              }
                            />
                          </button>

                          <button
                            className={BTN_PRIMARY}
                            onClick={() => {
                              setInitialLecturer(lec.name);
                              setIsAddOpen(true);
                            }}
                          >
                            <Plus size={14} /> Tambah Penelitian
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedId === lec.id && (
                      <tr>
                        <td
                          colSpan={6}
                          className="border border-[#DDE1E5] bg-gray-50 p-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* PROFILE */}
                            <div className="flex items-start gap-4">
                              <img
                                src={lec.imageUrl}
                                alt={lec.name}
                                className="w-36 h-36 rounded-full border-4 border-blue-100 object-cover"
                              />
                              <div>
                                <h3 className="text-xl font-semibold">
                                  {lec.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {lec.position}
                                </p>

                                <div className="text-sm text-gray-700 mt-2 space-y-1">
                                  <p>
                                    <b>Program Studi:</b> {lec.program}
                                  </p>
                                  <p>
                                    <b>Pendidikan Terakhir:</b>{" "}
                                    {lec.educationLevel}
                                  </p>
                                  <p>
                                    <b>Email:</b>{" "}
                                    <span className="text-gray-800">
                                      {lec.email}
                                    </span>
                                  </p>
                                  <p>
                                    <b>Spesialis:</b> {lec.specialization}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* RESEARCH LIST */}
                            <div className="md:col-span-2">
                              <LecturerResearchList lecturer={lec} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAWAH */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
            <div>
              Menampilkan{" "}
              {filteredLecturers.length === 0
                ? 0
                : (currentPage - 1) * perPage + 1}{" "}
              -{" "}
              {Math.min(
                currentPage * perPage,
                filteredLecturers.length
              )}{" "}
              dari {filteredLecturers.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                className="px-3 py-2 border border-[#DDE1E5] rounded bg-white"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-2 rounded border border-[#DDE1E5] ${
                      currentPage === p
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-2 border border-[#DDE1E5] rounded bg-white"
              >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* MODALS */}
      <AddResearchCard
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setInitialLecturer(null);
        }}
        lecturers={lecturers}
        initialLecturerName={initialLecturer || undefined}
        onSubmit={(payload: {
          lecturer_name: string;
          title: string;
          year: number;
        }) => {
          const found = lecturers.find(
            (l) => l.name === payload.lecturer_name
          );
          if (!found) {
            alert("Nama dosen tidak ditemukan.");
            return;
          }
          addResearchToLecturer(payload.lecturer_name, {
            title: payload.title,
            year: payload.year,
          });
          setIsAddOpen(false);
        }}
      />

      <EditResearchCard
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditPayload(null);
        }}
        defaultData={editPayload}
        onSubmit={(payload: {
          lecId: number;
          item: ResearchItem;
        }) => {
          if (!payload) return;
          updateResearch(payload.lecId, payload.item);
          setIsEditOpen(false);
          setEditPayload(null);
        }}
      />
    </div>
  );
}
