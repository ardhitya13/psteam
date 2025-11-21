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
import AddScientificWorkCard from "./AddScientificWorkCard";
import EditScientificWorkCard from "./EditScientificWorkCard";

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

/* ---------------------------
   Component
----------------------------*/
export default function ScientificWorkTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // sample data sesuai format yang kamu kirim
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
        { id: 1, title: "Interpretable Machine Learning for Job Placement Prediction: A SHAP-Based Feature Analysis", type: "Jurnal nasional terakreditasi", year: 2025 },
        { id: 2, title: "Penerapan Teknologi Raspberry Pi dalam Monitoring Kehadiran dan Pelanggaran Siswa berbasis Website", type: "Jurnal nasional", year: 2025 },
        { id: 3, title: "Classification of Alzheimer Disease from MRI Image Using Combination Naïve Bayes and Invariant Moment", type: "Prosiding seminar internasional", year: 2023 },
        { id: 4, title: "Rancang Bangun Aplikasi Point Of Sales Menggunakan Framework Codeigniter", type: "Jurnal nasional terakreditasi", year: 2023 },
        { id: 5, title: "Sistem Informasi Pemesanan Menu di Early Coffee menggunakan QR code Berbasis Website", type: "Jurnal nasional terakreditasi", year: 2023 },
        { id: 6, title: "Sistem Informasi Persediaan Dry Lens Untuk Lensa Kontak Berbasis WEB", type: "Jurnal nasional terakreditasi", year: 2022 },
        { id: 7, title: "Classification of Alzheimer Disease from MRI Image Using Combination Naïve Bayes and Invariant Moment", type: "Artikel ilmiah", year: 2022 },
        { id: 8, title: "Rancang Bangun Aplikasi Sistem Informasi Organisasi Mahasiswa (SIOMAH)", type: "Jurnal nasional terakreditasi", year: 2021 },
        { id: 9, title: "Usability Testing Situs Web Politeknik Negeri Batam Menggunakan Metode Eye Tracking", type: "Jurnal nasional terakreditasi", year: 2021 },
        { id: 10, title: "Features Extraction of Mamographic Image using Zoning Method", type: "Lain-lain", year: 2020 },
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
        { id: 1, title: "MIRSA+YOLOV7MOD: A Robust Object Detection Framework for Adverse Weather Conditions in Autonomous Vehicles", type: "Jurnal internasional", year: 2024 },
        { id: 2, title: "Object Detection in Dense and Mixed Traffic for Autonomous Vehicles With Modified Yolo", type: "Jurnal internasional bereputasi", year: 2023 },
        { id: 3, title: "Effect of Annealing Holding Time on Microstructure Changes in Steel Structures of S690QL and S235JR", type: "Jurnal nasional terakreditasi", year: 2021 },
      ],
    },
  ]);

  /* ---------------------------
     UI states
  ----------------------------*/
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addInitialLecturerName, setAddInitialLecturerName] = useState<string | undefined>(undefined);

  const [isEditOpen, setIsEditOpen] = useState(false);
  // editPayload contains lecturer id, the item being edited, and lecturer_name for showing disabled name in modal
  const [editPayload, setEditPayload] = useState<{ lecId: number; item: ScientificWorkItem; lecturer_name: string } | null>(null);

  /* ---------------------------
     Filtering + pagination
  ----------------------------*/
  const filteredLecturers = useMemo(() => {
    let list = lecturers;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((l) => l.name.toLowerCase().includes(q) || l.program.toLowerCase().includes(q));
    }
    return list;
  }, [lecturers, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredLecturers.length / perPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const paginated = filteredLecturers.slice((currentPage - 1) * perPage, currentPage * perPage);

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  /* ---------------------------
     CRUD handlers
  ----------------------------*/
  function addScientificWorkToLecturer(lecturerName: string, newItem: Omit<ScientificWorkItem, "id">) {
    setLecturers((prev) =>
      prev.map((l) =>
        l.name === lecturerName
          ? {
            ...l,
            // newest on top
            scientificwork: [{ id: (l.scientificwork.length ? Math.max(...l.scientificwork.map((p) => p.id)) : 0) + 1, ...newItem }, ...l.scientificwork],
          }
          : l
      )
    );
  }

  function updateScientificWork(lecId: number, updated: ScientificWorkItem) {
    setLecturers((prev) =>
      prev.map((l) =>
        l.id === lecId
          ? { ...l, scientificwork: l.scientificwork.map((p) => (p.id === updated.id ? updated : p)) }
          : l
      )
    );
  }

  function deleteScientificWork(lecId: number, id: number) {
    if (!confirm("Hapus karya ilmiah ini?")) return;
    setLecturers((prev) => prev.map((l) => (l.id === lecId ? { ...l, scientificwork: l.scientificwork.filter((p) => p.id !== id) } : l)));
  }

  /* ---------------------------
     Subcomponent: list of scientific works for a lecturer
  ----------------------------*/
  function LecturerScientificList({ lecturer }: { lecturer: Lecturer }) {
    const [filterYear, setFilterYear] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("");
    const [page, setPage] = useState(1);
    const per = 8;

    const years = useMemo(() => [...new Set(lecturer.scientificwork.map((s) => s.year))].sort((a, b) => b - a), [lecturer]);
    const types = useMemo(() => [...new Set(lecturer.scientificwork.map((s) => s.type))], [lecturer]);

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
          <h4 className="text-lg font-semibold">Daftar Karya Ilmiah ({lecturer.scientificwork.length})</h4>

          <div className="flex items-center gap-3">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 rounded border bg-white text-sm">
              <option value="">Semua Tipe</option>
              {kategoriScientificWork.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>

            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="px-3 py-2 rounded border bg-white text-sm">
              <option value="">Semua Tahun</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-md border border-[#DDE1E5] mt-3">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-12">No</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">Judul</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">Tipe</th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-24">Tahun</th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-36">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {visible.length ? (
                visible.map((w, idx) => (
                  <tr key={w.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      {(page - 1) * per + idx + 1}
                    </td>

                    <td className="px-4 py-3 border border-[#DDE1E5]">{w.title}</td>

                    <td className="px-4 py-3 border border-[#DDE1E5]">{w.type}</td>

                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      {w.year}
                    </td>

                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400 text-white text-sm"
                          onClick={() => {
                            setEditPayload({ lecId: lecturer.id, item: w, lecturer_name: lecturer.name });
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white text-sm"
                          onClick={() => deleteScientificWork(lecturer.id, w.id)}
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

        <div className="flex items-center justify-end gap-2 mt-3">
          <button disabled={page === 1} onClick={() => setPage((s) => Math.max(1, s - 1))} className="px-3 py-1 rounded border bg-white hover:bg-gray-50">
            <ChevronLeft size={16} />
          </button>
          <div className="text-sm px-2">
            Halaman {page} / {total}
          </div>
          <button disabled={page === total} onClick={() => setPage((s) => Math.min(total, s + 1))} className="px-3 py-1 rounded border bg-white hover:bg-gray-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------
     Render main table
  ----------------------------*/
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-300 pt-6 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"} mt-[85px]`}>
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">DAFTAR KARYA ILMIAH</h1>

        {/* controls */}
        <div className="flex items-center justify-end gap-3 mb-4 flex-wrap">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
            onClick={() => {
              setAddInitialLecturerName(undefined);
              setIsAddOpen(true);
            }}
          >
            <Plus size={16} /> Tambah Karya Ilmiah
          </button>

          <div>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-6 py-2 border border-black rounded-lg bg-white text-black"
            >
              {[8, 10, 15, 20].map((n) => (
                <option key={n} value={n}>
                  {n} Halaman
                </option>
              ))}
            </select>
          </div>

          <div className={`relative flex items-center border rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${searchOpen ? "w-72" : "w-11"}`}>
            {searchOpen && (
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-grow px-3 py-2 text-sm text-gray-900 placeholder-gray-400"
                placeholder="Cari nama / prodi..."
              />
            )}
            <button onClick={() => setSearchOpen((s) => !s)} className="bg-blue-600 text-white px-3 py-3">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* table */}
        <div className="bg-white shadow-md rounded-lg border border-[#DDE1E5] overflow-visible">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-blue-50 text-gray-800">
              <tr>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-14">NO</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">NAMA DOSEN</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">PROGRAM STUDI</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">PENDIDIKAN</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">EMAIL</th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-48">AKSI</th>
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
                          <div className="font-semibold text-gray-900">{lec.name}</div>
                          <div className="text-xs text-gray-500">{lec.position}</div>
                        </div>
                      </div>
                    </td>

                    <td className="border border-[#DDE1E5] px-4 py-3">{lec.program}</td>
                    <td className="border border-[#DDE1E5] px-4 py-3">{lec.educationLevel}</td>
                    <td className="border border-[#DDE1E5] px-4 py-3">{lec.email}</td>

                    <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-700"
                          onClick={() => toggleExpand(lec.id)}
                        >
                          <Users size={14} /> {expandedId === lec.id ? "Tutup" : "Detail"}
                        </button>

                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white"
                          onClick={() => {
                            setAddInitialLecturerName(lec.name);
                            setIsAddOpen(true);
                          }}
                        >
                          <Plus size={14} /> Tambah Karya Ilmiah
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedId === lec.id && (
                    <tr>
                      <td colSpan={6} className="border border-[#DDE1E5] bg-gray-50 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={lec.imageUrl}
                              alt={lec.name}
                              className="w-36 h-36 rounded-full border-4 border-blue-100 object-cover"
                            />
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{lec.name}</h3>
                              <p className="text-sm text-gray-600">{lec.position}</p>
                              <div className="text-sm text-gray-700 mt-3 space-y-1">
                                <p><b>Program Studi:</b> {lec.program}</p>
                                <p><b>Pendidikan Terakhir:</b> {lec.educationLevel}</p>
                                <p><b>Email:</b> {lec.email}</p>
                                <p><b>Bidang Spesialis:</b> {lec.specialization}</p>
                              </div>
                            </div>
                          </div>

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



          {/* footer pagination */}
          <div className="py-3 px-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Menampilkan {filteredLecturers.length === 0 ? 0 : (currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, filteredLecturers.length)} dari {filteredLecturers.length}
            </div>

            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-2 border rounded bg-white hover:bg-gray-50">&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-2 rounded border ${currentPage === p ? "bg-blue-600 text-white" : "bg-white"}`}>{p}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-2 rounded border bg-white hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddScientificWorkCard
          isOpen={isAddOpen}
          onClose={() => {
            setIsAddOpen(false);
            setAddInitialLecturerName(undefined);
          }}
          initialLecturerName={addInitialLecturerName}
          lecturers={lecturers}
          kategoriScientificWork={kategoriScientificWork}
          onSubmit={(payload: { lecturer_name: string; title: string; type: string; year: number }) => {
            const found = lecturers.find((l) => l.name === payload.lecturer_name);
            if (!found) {
              alert("Nama dosen tidak ditemukan. Pilih dari daftar atau ketik nama persis.");
              return;
            }
            addScientificWorkToLecturer(payload.lecturer_name, { title: payload.title, type: payload.type, year: payload.year });
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
          onSubmit={(payload: { lecId: number; item: ScientificWorkItem }) => {
            if (!payload || typeof payload.lecId !== "number" || !payload.item) {
              alert("Data tidak valid.");
              return;
            }
            updateScientificWork(payload.lecId, payload.item);
          }}
        />
      </main>
    </div>
  );
}
