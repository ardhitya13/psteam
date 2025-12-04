// admin/components/ScientificWorkTable.tsx
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
import AddScientificWorkCard from "./ScientificWorkAddCard";
import EditScientificWorkCard from "./ScientificWorkEditCard";

/* ---------------------------
   Types
----------------------------*/
export type ScientificWorkItem = {
  id: number;
  title: string;
  type: string;
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
  scientificwork: ScientificWorkItem[];
};

/* ---------------------------
   Constants
----------------------------*/
const kategoriScientificWork = [
  "Artikel ilmiah",
  "Jurnal nasional",
  "Jurnal nasional terakreditasi",
  "Jurnal internasional bereputasi",
  "Jurnal internasional",
  "Prosiding seminar nasional",
  "Prosiding seminar internasional",
  "Lain-lain",
];

/* =======================================================================
   Component
======================================================================= */
export default function ScientificWorkTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* ---------------------------
       SAMPLE DATA
  ----------------------------*/
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
      scientificwork: [
        {
          id: 1,
          title:
            "Interpretable Machine Learning for Job Placement Prediction: A SHAP-Based Feature Analysis",
          type: "Jurnal nasional terakreditasi",
          year: 2025,
        },
        {
          id: 2,
          title:
            "Penerapan Teknologi Raspberry Pi dalam Monitoring Kehadiran dan Pelanggaran Siswa berbasis Website",
          type: "Jurnal nasional",
          year: 2025,
        },
        {
          id: 3,
          title:
            "Classification of Alzheimer Disease from MRI Image Using Combination Naïve Bayes and Invariant Moment",
          type: "Prosiding seminar internasional",
          year: 2023,
        },
        {
          id: 4,
          title:
            "Rancang Bangun Aplikasi Point Of Sales Menggunakan Framework Codeigniter",
          type: "Jurnal nasional terakreditasi",
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
      scientificwork: [
        {
          id: 1,
          title: "MIRSA+YOLOV7MOD: A Robust Object Detection Framework",
          type: "Jurnal internasional",
          year: 2024,
        },
        {
          id: 2,
          title: "Object Detection in Dense and Mixed Traffic With Modified YOLO",
          type: "Jurnal internasional bereputasi",
          year: 2023,
        },
      ],
    },
  ]);

  /* ---------------------------
       UI STATE
  ----------------------------*/
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addInitialLecturerName, setAddInitialLecturerName] =
    useState<string | undefined>(undefined);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayload, setEditPayload] = useState<{
    lecId: number;
    item: ScientificWorkItem;
    lecturer_name: string;
  } | null>(null);

  /* ---------------------------
       FILTER + PAGINATION
  ----------------------------*/
  const filteredLecturers = useMemo(() => {
    let list = lecturers;
    const q = searchQuery.trim().toLowerCase();

    if (q) {
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.program.toLowerCase().includes(q)
      );
    }

    return list;
  }, [lecturers, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLecturers.length / perPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const paginated = filteredLecturers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const toggleExpand = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  /* ---------------------------
       CRUD HANDLERS
  ----------------------------*/
  function addScientificWorkToLecturer(
    lecturerName: string,
    newItem: Omit<ScientificWorkItem, "id">
  ) {
    setLecturers((prev) =>
      prev.map((l) =>
        l.name === lecturerName
          ? {
              ...l,
              scientificwork: [
                {
                  id:
                    (l.scientificwork.length
                      ? Math.max(...l.scientificwork.map((p) => p.id))
                      : 0) + 1,
                  ...newItem,
                },
                ...l.scientificwork,
              ],
            }
          : l
      )
    );
  }

  function updateScientificWork(
    lecId: number,
    updated: ScientificWorkItem
  ) {
    setLecturers((prev) =>
      prev.map((l) =>
        l.id === lecId
          ? {
              ...l,
              scientificwork: l.scientificwork.map((p) =>
                p.id === updated.id ? updated : p
              ),
            }
          : l
      )
    );
  }

  function deleteScientificWork(lecId: number, id: number) {
    if (!confirm("Hapus karya ilmiah ini?")) return;

    setLecturers((prev) =>
      prev.map((l) =>
        l.id === lecId
          ? {
              ...l,
              scientificwork: l.scientificwork.filter(
                (p) => p.id !== id
              ),
            }
          : l
      )
    );
  }

  /* ---------------------------
       SUBCOMPONENT: LIST DETAIL
  ----------------------------*/
  function LecturerScientificList({ lecturer }: { lecturer: Lecturer }) {
    const [filterYear, setFilterYear] = useState("");
    const [filterType, setFilterType] = useState("");
    const [page, setPage] = useState(1);

    const per = 8;

    const years = useMemo(
      () =>
        [...new Set(lecturer.scientificwork.map((s) => s.year))].sort(
          (a, b) => b - a
        ),
      [lecturer]
    );

    const filtered = useMemo(() => {
      return lecturer.scientificwork.filter((s) => {
        if (filterYear && String(s.year) !== filterYear) return false;
        if (filterType && s.type !== filterType) return false;
        return true;
      });
    }, [lecturer, filterYear, filterType]);

    const total = Math.max(1, Math.ceil(filtered.length / per));

    useEffect(() => setPage(1), [filterYear, filterType, lecturer.id]);

    const visible = filtered.slice((page - 1) * per, page * per);

    return (
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-semibold">
            Daftar Karya Ilmiah ({filtered.length})
          </h4>

          <div className="flex items-center gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 rounded border border-[#DDE1E5] bg-white text-sm"
            >
              <option value="">Semua Tipe</option>
              {kategoriScientificWork.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 rounded border border-[#DDE1E5] bg-white text-sm"
            >
              <option value="">Semua Tahun</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-md border border-[#DDE1E5] mt-3">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-12">
                  No
                </th>
                <th className="px-4 py-3 border border-[#DDE1E5]">
                  Judul
                </th>
                <th className="px-4 py-3 border border-[#DDE1E5]">
                  Tipe
                </th>
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
                visible.map((w, idx) => (
                  <tr key={w.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      {(page - 1) * per + idx + 1}
                    </td>

                    <td className="px-4 py-3 border border-[#DDE1E5]">
                      {w.title}
                    </td>

                    <td className="px-4 py-3 border border-[#DDE1E5]">
                      {w.type}
                    </td>

                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      {w.year}
                    </td>

                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400 text-white text-sm"
                          onClick={() => {
                            setEditPayload({
                              lecId: lecturer.id,
                              item: w,
                              lecturer_name: lecturer.name,
                            });
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white text-sm"
                          onClick={() =>
                            deleteScientificWork(lecturer.id, w.id)
                          }
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
                    colSpan={5}
                    className="p-6 text-center text-gray-500 border border-[#DDE1E5]"
                  >
                    Belum ada karya ilmiah.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION LIST DETAIL */}
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((s) => Math.max(1, s - 1))}
            className="px-3 py-1 rounded border border-[#DDE1E5] bg-white hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="text-sm px-2">
            Halaman {page} / {total}
          </div>

          <button
            disabled={page === total}
            onClick={() => setPage((s) => Math.min(total, s + 1))}
            className="px-3 py-1 rounded border border-[#DDE1E5] bg-white hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================================
       MAIN PAGE — TABLE + PAGINATION UTAMA ADA DI PART 2
  ======================================================================= */

    /* =======================================================================
       MAIN PAGE RENDER
  ======================================================================= */
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

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
              Daftar Karya Ilmiah Dosen
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola daftar karya ilmiah dosen PSTeam.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">

            {/* SEARCH */}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (searchQuery.trim() === "") setSearchOpen(false);
                }}
                placeholder="Cari nama / prodi..."
                className={`transition-all duration-300 border border-[#DDE1E5] bg-white rounded-md shadow-sm text-sm h-10 ${
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
                {[8, 10, 15, 20].map((n) => (
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

            {/* ADD */}
            <button
              onClick={() => {
                setAddInitialLecturerName(undefined);
                setIsAddOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow"
            >
              <Plus size={18} /> Tambah Karya Ilmiah
            </button>

          </div>

          {/* MAIN TABLE */}
          <div className="bg-white border border-[#DDE1E5] rounded-lg shadow overflow-hidden">
            <table className="w-full border-collapse text-sm text-gray-700">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-[#DDE1E5] px-4 py-3 text-center w-14">
                    No
                  </th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Nama Dosen</th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Program Studi</th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Pendidikan</th>
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

                      {/* DOSEN PROFILE */}
                      <td className="border border-[#DDE1E5] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={lec.imageUrl}
                            alt={lec.name}
                            className="w-10 h-10 rounded-full border border-[#DDE1E5] object-cover"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {lec.name}
                            </div>
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
                            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-700"
                            onClick={() => toggleExpand(lec.id)}
                          >
                            <Users size={14} />{" "}
                            {expandedId === lec.id ? "Tutup" : "Detail"}
                            <ChevronDown
                              size={14}
                              className={expandedId === lec.id ? "rotate-180" : ""}
                            />
                          </button>

                          <button
                            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white"
                            onClick={() => {
                              setAddInitialLecturerName(lec.name);
                              setIsAddOpen(true);
                            }}
                          >
                            <Plus size={14} /> Tambah
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED DETAIL */}
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
                                <h3 className="text-xl font-semibold text-gray-800">
                                  {lec.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {lec.position}
                                </p>

                                <div className="text-sm text-gray-700 mt-3 space-y-1">
                                  <p>
                                    <b>Program Studi:</b> {lec.program}
                                  </p>
                                  <p>
                                    <b>Pendidikan Terakhir:</b>{" "}
                                    {lec.educationLevel}
                                  </p>
                                  <p>
                                    <b>Email:</b> {lec.email}
                                  </p>
                                  <p>
                                    <b>Bidang Spesialis:</b>{" "}
                                    {lec.specialization}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* KARYA ILMIAH LIST */}
                            <div className="md:col-span-2">
                              <LecturerScientificList lecturer={lec} />
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

          {/* ===================== PAGINATION UTAMA (DIPISAH) ===================== */}
          <div className="py-3 px-4 flex items-center justify-between text-sm text-gray-600 mt-3">
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
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 border border-[#DDE1E5] rounded bg-white hover:bg-gray-50"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-2 border border-[#DDE1E5] rounded bg-white hover:bg-gray-50"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* ===================== MODALS ===================== */}
          <AddScientificWorkCard
            isOpen={isAddOpen}
            onClose={() => {
              setIsAddOpen(false);
              setAddInitialLecturerName(undefined);
            }}
            initialLecturerName={addInitialLecturerName}
            lecturers={lecturers}
            kategoriScientificWork={kategoriScientificWork}
            onSubmit={({ lecturer_name, title, type, year }) => {
              const found = lecturers.find(
                (l) => l.name === lecturer_name
              );
              if (!found) {
                alert("Nama dosen tidak ditemukan.");
                return;
              }

              addScientificWorkToLecturer(lecturer_name, {
                title,
                type,
                year,
              });

              setIsAddOpen(false);
            }}
          />

          <EditScientificWorkCard
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setEditPayload(null);
            }}
            defaultData={editPayload}
            kategoriScientificWork={kategoriScientificWork}
            onSubmit={({ lecId, item }) => {
              if (!lecId || !item) {
                alert("Data tidak valid.");
                return;
              }

              updateScientificWork(lecId, item);
              setIsEditOpen(false);
              setEditPayload(null);
            }}
          />

        </main>
      </div>
    </div>
  );
}
