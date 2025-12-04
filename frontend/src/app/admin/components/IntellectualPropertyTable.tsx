// admin/components/IntellectualPropertyTable.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Users,
  Edit,
  Trash2,
  ChevronDown,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AddIntellectualPropertyCard from "./IntellectualPropertyAddCard";
import EditIntellectualPropertyCard from "./IntellectualPropertyEditCard";

/* ---------------------------
   Types
----------------------------*/
type IPItem = {
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
  intellectualProperty: IPItem[];
};

/* ---------------------------
   Categories
----------------------------*/
const kategoriHKI = [
  "Hak cipta nasional",
  "Hak cipta internasional",
  "Paten nasional",
  "Paten internasional",
  "Desain industri",
  "Merek dagang",
  "Lain-lain",
];

/* ---------------------------
   Button style constants
   (disamakan dengan ResearchTable)
----------------------------*/
const BTN =
  "inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium shadow-sm";
const BTN_PRIMARY = BTN + " bg-blue-600 hover:bg-blue-700 text-white";
const BTN_OUTLINE =
  BTN +
  " border bg-white border-gray-300 hover:bg-gray-100 text-gray-700";

/* ---------------------------
   Component
----------------------------*/
export default function IntellectualPropertyTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* ---------------------------
     Dummy / initial data
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
      intellectualProperty: [
        {
          id: 1,
          title: "Keamanan API Menggunakan JSON WEB TOKEN",
          type: "Hak cipta nasional",
          year: 2024,
        },
        {
          id: 2,
          title:
            "Rekomendasi Pilihan Program Studi Menggunakan Recurrent Neural Network",
          type: "Hak cipta nasional",
          year: 2024,
        },
        {
          id: 3,
          title: "Website Company Profile PT. ADE MESTAKUNG ABADI",
          type: "Hak cipta nasional",
          year: 2023,
        },
        {
          id: 4,
          title: "Penerapan Stack Dalam Pemetaan Barang Di Gudang",
          type: "Hak cipta nasional",
          year: 2023,
        },
        {
          id: 5,
          title: "Website Media Promosi Wisata Pulau Mubut",
          type: "Hak cipta nasional",
          year: 2023,
        },
        {
          id: 6,
          title: "Sistem Informasi Organisasi Mahasiswa (SIOMA)",
          type: "Hak cipta nasional",
          year: 2022,
        },
        {
          id: 7,
          title: "Sistem Informasi Pelatihan Karyawan Baru",
          type: "Hak cipta nasional",
          year: 2022,
        },
        {
          id: 8,
          title: "Poster “Aplikasi Polibatam Guest”",
          type: "Hak cipta nasional",
          year: 2022,
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
      intellectualProperty: [
        {
          id: 1,
          title: "Bracket Penempatan Sensor pada Trem Otonom",
          type: "Paten nasional",
          year: 2024,
        },
      ],
    },
  ]);

  /* ---------------------------
       UI State (search, pagination, modals)
  ----------------------------*/
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [initialLecturer, setInitialLecturer] = useState<string | null>(null);
  const [editPayload, setEditPayload] = useState<{
    lecId: number;
    item: IPItem;
    lecturer_name: string;
  } | null>(null);

  /* ---------------------------
       Search + Filter logic
       (disamakan behaviour dengan ResearchTable)
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
       CRUD HANDLERS
  ----------------------------*/
  function addIPToLecturer(name: string, item: Omit<IPItem, "id">) {
    setLecturers((prev) =>
      prev.map((lec) =>
        lec.name === name
          ? {
              ...lec,
              intellectualProperty: [
                {
                  id: lec.intellectualProperty.length
                    ? Math.max(...lec.intellectualProperty.map((p) => p.id)) + 1
                    : 1,
                  ...item,
                },
                ...lec.intellectualProperty,
              ],
            }
          : lec
      )
    );
  }

  function updateIP(lecId: number, item: IPItem) {
    setLecturers((prev) =>
      prev.map((lec) =>
        lec.id === lecId
          ? {
              ...lec,
              intellectualProperty: lec.intellectualProperty.map((p) =>
                p.id === item.id ? item : p
              ),
            }
          : lec
      )
    );
  }

  function deleteIP(lecId: number, id: number) {
    if (!confirm("Hapus HKI ini?")) return;

    setLecturers((prev) =>
      prev.map((lec) =>
        lec.id === lecId
          ? {
              ...lec,
              intellectualProperty: lec.intellectualProperty.filter(
                (p) => p.id !== id
              ),
            }
          : lec
      )
    );
  }

  /* ---------------------------
       Subcomponent — Lecturer IP List
       (UI disamakan format ResearchTable)
  ----------------------------*/
  function LecturerIPList({ lecturer }: { lecturer: Lecturer }) {
    const [filterYear, setFilterYear] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("");
    const [page, setPage] = useState(1);
    const per = 10;

    const yearOptions = useMemo(() => {
      return [
        ...new Set(lecturer.intellectualProperty.map((p) => p.year)),
      ].sort((a, b) => b - a);
    }, [lecturer]);

    const filtered = useMemo(() => {
      let list = lecturer.intellectualProperty;
      if (filterType) list = list.filter((p) => p.type === filterType);
      if (filterYear) list = list.filter((p) => p.year === Number(filterYear));
      return list;
    }, [lecturer, filterType, filterYear]);

    const total = Math.max(1, Math.ceil(filtered.length / per));
    const visible = filtered.slice((page - 1) * per, page * per);

    useEffect(() => setPage(1), [filterType, filterYear]);

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-gray-800">Daftar HKI ({filtered.length})</h4>

          <div className="flex items-center gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 py-2 border border-[#DDE1E5] rounded bg-white text-sm"
            >
              <option value="">Semua Tipe</option>
              {kategoriHKI.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
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
        </div>

        {/* TABLE LIST HKI */}
        <div className="overflow-x-auto bg-white rounded-md border border-[#DDE1E5]">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border border-[#DDE1E5]">No</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">Judul</th>
                <th className="px-4 py-3 border border-[#DDE1E5]">Tipe</th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-24">Tahun</th>
                <th className="px-4 py-3 border border-[#DDE1E5] text-center w-36">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {visible.length ? (
                visible.map((it, idx) => (
                  <tr key={it.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">{(page - 1) * per + idx + 1}</td>

                    <td className="px-4 py-3 border border-[#DDE1E5]">{it.title}</td>

                    <td className="px-4 py-3 border border-[#DDE1E5]">{it.type}</td>

                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">{it.year}</td>

                    <td className="px-4 py-3 border border-[#DDE1E5] text-center">
                      <div className="flex justify-center gap-2">
                        {/* EDIT */}
                        <button
                          className="bg-yellow-400 text-white px-3 py-1 rounded text-sm inline-flex items-center gap-2"
                          onClick={() => {
                            setEditPayload({
                              lecId: lecturer.id,
                              item: it,
                              lecturer_name: lecturer.name,
                            });
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit size={14} /> Edit
                        </button>

                        {/* DELETE */}
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm inline-flex items-center gap-2"
                          onClick={() => deleteIP(lecturer.id, it.id)}
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500 border border-[#DDE1E5]">Tidak ada HKI.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION LIST HKI */}
        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            disabled={page === 1}
            className="px-3 py-1 border border-[#DDE1E5] rounded bg-white hover:bg-gray-100"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm">Halaman {page} / {total}</span>

          <button
            disabled={page === total}
            className="px-3 py-1 border border-[#DDE1E5] rounded bg-white hover:bg-gray-100"
            onClick={() => setPage((p) => Math.min(total, p + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

    /* ---------------------------
       MAIN RENDER (TABLE UTAMA)
       UI = memakai format dari ResearchTable
  ----------------------------*/
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
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
            <h1 className="text-3xl font-bold text-black uppercase">Daftar HKI Dosen</h1>
            <p className="text-gray-600 text-sm">Kelola daftar Hak Kekayaan Intelektual dosen PSTeam.</p>
          </div>

          {/* SEARCH & FILTER */}
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

            {/* ADD HKI */}
            <button
              onClick={() => {
                setInitialLecturer(null);
                setIsAddOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow"
            >
              <Plus size={18} /> Tambah HKI
            </button>
          </div>

          {/* TABLE LIST DOSEN */}
          <div className="bg-white border border-[#DDE1E5] rounded-lg shadow">
            <table className="w-full border-collapse text-sm text-gray-700 border border-[#DDE1E5]">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-[#DDE1E5] px-4 py-3 text-center w-14">No</th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Nama Dosen</th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Program Studi</th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Pendidikan</th>
                  <th className="border border-[#DDE1E5] px-4 py-3">Email</th>
                  <th className="border border-[#DDE1E5] px-4 py-3 text-center w-48">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((lec, idx) => (
                  <React.Fragment key={lec.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-[#DDE1E5] px-4 py-3 text-center">{(currentPage - 1) * perPage + idx + 1}</td>

                      <td className="border border-[#DDE1E5] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={lec.imageUrl} alt={lec.name} className="w-10 h-10 rounded-full border border-[#DDE1E5] object-cover" />
                          <div>
                            <div className="font-semibold">{lec.name}</div>
                            <div className="text-xs text-gray-500">{lec.position}</div>
                          </div>
                        </div>
                      </td>

                      <td className="border border-[#DDE1E5] px-4 py-3">{lec.program}</td>

                      <td className="border border-[#DDE1E5] px-4 py-3">{lec.educationLevel}</td>

                      <td className="border border-[#DDE1E5] px-4 py-3">{lec.email}</td>

                      {/* BUTTON DETAIL & ADD */}
                      <td className="border border-[#DDE1E5] px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button className={BTN_OUTLINE + " bg-sky-100 text-sky-700"} onClick={() => setExpandedId(expandedId === lec.id ? null : lec.id)}>
                            <Users size={14} /> {expandedId === lec.id ? "Tutup" : "Detail"}{" "}
                            <ChevronDown size={14} className={expandedId === lec.id ? "rotate-180" : ""} />
                          </button>

                          <button className={BTN_PRIMARY} onClick={() => {
                            setInitialLecturer(lec.name);
                            setIsAddOpen(true);
                          }}>
                            <Plus size={14} /> Tambah HKI
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED DETAIL */}
                    {expandedId === lec.id && (
                      <tr>
                        <td colSpan={6} className="border border-[#DDE1E5] bg-gray-50 p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* PROFILE */}
                            <div className="flex items-start gap-4">
                              <img src={lec.imageUrl} alt={lec.name} className="w-36 h-36 rounded-full border-4 border-blue-100 object-cover" />
                              <div>
                                <h3 className="text-xl font-semibold">{lec.name}</h3>
                                <p className="text-sm text-gray-600">{lec.position}</p>

                                <div className="text-sm text-gray-700 mt-2 space-y-1">
                                  <p><b>Program Studi:</b> {lec.program}</p>
                                  <p><b>Pendidikan Terakhir:</b> {lec.educationLevel}</p>
                                  <p><b>Email:</b> <span className="text-gray-800">{lec.email}</span></p>
                                  <p><b>Spesialis:</b> {lec.specialization}</p>
                                </div>
                              </div>
                            </div>

                            {/* LIST HKI */}
                            <div className="md:col-span-2">
                              <LecturerIPList lecturer={lec} />
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
              {filteredLecturers.length === 0 ? 0 : (currentPage - 1) * perPage + 1} -{" "}
              {Math.min(currentPage * perPage, filteredLecturers.length)} dari {filteredLecturers.length}
            </div>

            <div className="flex items-center gap-2">
              {/* PREV */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 border border-[#DDE1E5] rounded bg-white"
              >
                &lt;
              </button>

              {/* PAGE NUMBERS */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-3 py-2 rounded border border-[#DDE1E5] ${currentPage === p ? "bg-blue-600 text-white" : "bg-white"}`}
                >
                  {p}
                </button>
              ))}

              {/* NEXT */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-2 border border-[#DDE1E5] rounded bg-white"
              >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* MODALS */}
      <AddIntellectualPropertyCard
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setInitialLecturer(null);
        }}
        lecturers={lecturers}
        initialLecturerName={initialLecturer ?? undefined}
        kategoriHKI={kategoriHKI}
        onSubmit={(payload: { lecturer_name: string; title: string; type: string; year: number }) => {
          const found = lecturers.find((l) => l.name === payload.lecturer_name);

          if (!found) {
            alert("Nama dosen tidak ditemukan.");
            return;
          }

          addIPToLecturer(payload.lecturer_name, {
            title: payload.title,
            type: payload.type,
            year: payload.year,
          });

          setIsAddOpen(false);
        }}
      />

      <EditIntellectualPropertyCard
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditPayload(null);
        }}
        defaultData={editPayload}
        kategoriHKI={kategoriHKI}
        onSubmit={({ lecId, item }: { lecId: number; item: IPItem }) => {
          if (typeof lecId !== "number" || !item) {
            alert("Data tidak valid.");
            return;
          }

          updateIP(lecId, item);
          setIsEditOpen(false);
          setEditPayload(null);
        }}
      />
    </div>
  );
}
