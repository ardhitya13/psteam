// admin/components/LecturersTable.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  PlusCircle,
  Edit,
  ChevronDown,
  ChevronUp,
  Users,
  Search,
} from "lucide-react";
import AddLecturerModal from "./LecturerAddModal";
import EditLecturerModal from "./LecturerEditModal";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export type EducationHistory = {
  degree: string;
  university: string;
  major: string;
};

export type Lecturer = {
  id: number;
  name: string;
  position: string;
  program: string;
  educationLevel: string;
  email: string;
  specialization: string;
  imageUrl?: string;
  educationHistory: EducationHistory[];
};

export default function LecturersTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // sample data (replace with API data when ready)
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
      educationHistory: [
        {
          degree: "Sarjana (S1)",
          university: "Universitas Khatolik Santo Thomas Sumatera Utara",
          major: "Teknik Informatika",
        },
        {
          degree: "Magister (S2)",
          university: "Universitas Sumatera Utara",
          major: "Ilmu dan Teknologi",
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
      educationHistory: [
        { degree: "Sarjana (S1)", university: "Institut Teknologi Bandung", major: "Teknik Informatika" },
        { degree: "Magister (S2)", university: "Institut Teknologi Bandung", major: "Informatika" },
        { degree: "Doktor (S3)", university: "Institut Teknologi Bandung", major: "Teknik Elektro Informatika" },
      ],
    },
  ]);

  // modals & selection
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);

  // UI: expand detail per lecturer
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggleExpand = (id: number) => setExpandedId((prev) => (prev === id ? null : id));

  // Search UI (animated icon style like example)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  // pagination / page size
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // 10/20/30/40/50
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // focus search when opened
    if (isSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 40);
    }
  }, [isSearchOpen]);

  // filter logic
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return lecturers;
    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.program.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
    );
  }, [lecturers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  // handlers
  const handleAddLecturer = (data: Omit<Lecturer, "id">) => {
    setLecturers((prev) => [...prev, { ...data, id: prev.length + 1 }]);
    // after add, navigate to last page
    setCurrentPage(Math.ceil((filtered.length + 1) / itemsPerPage));
  };

  const handleEditLecturer = (updated: Lecturer) => {
    setLecturers((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // When searching or changing page size, reset page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  // small helper for pagination controls
  function goPage(n: number) {
    setCurrentPage(Math.max(1, Math.min(totalPages, n)));
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      {/* NAVBAR */}
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className={`flex-1 transition-all duration-300 px-8 py-6 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          } mt-[85px]`}
          style={{ minHeight: "calc(100vh - 85px)" }}
        >
          {/* header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black uppercase">Daftar Dosen</h1>
            <p className="text-gray-600 text-sm">Kelola data dosen — cari, filter, tambah, dan edit.</p>
          </div>

          {/* control bar (search, filter, add) */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              {/* animated search like example */}
              <div className="relative">
                {!isSearchOpen && (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm z-20"
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
                  onBlur={() => { if (searchTerm.trim() === "") setIsSearchOpen(false); }}
                  className={`transition-all duration-300 rounded-md border border-gray-300 bg-white text-sm placeholder-gray-400
                    ${isSearchOpen ? "w-64 pl-10 pr-3 py-2 opacity-100 z-30" : "w-10 pl-0 pr-0 py-2 opacity-0 pointer-events-none z-10"}`}
                />

                {isSearchOpen && <Search size={16} className="absolute left-3 top-2.5 text-gray-500 pointer-events-none z-40" />}
              </div>

              {/* items per page select (styled) */}
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer"
                  style={{ appearance: "none" }}
                >
                  {[10, 20, 30, 40, 50].map((n) => (
                    <option key={n} value={n}>{n} / halaman</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* add button */}
            <div>
              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium shadow-sm text-sm"
              >
                <PlusCircle className="w-4 h-4" /> Tambah Dosen
              </button>
            </div>
          </div>

          {/* table wrapper */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-visible">
            <table className="min-w-full text-sm text-gray-800 border-collapse">
              <thead className="bg-[#eaf0fa] text-gray-800 text-sm font-semibold uppercase border border-gray-300">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 w-16">No</th>
                  <th className="py-3 px-4 border border-gray-300">Nama</th>
                  <th className="py-3 px-4 border border-gray-300">Program Studi</th>
                  <th className="py-3 px-4 border border-gray-300">Pendidikan</th>
                  <th className="py-3 px-4 border border-gray-300">Email</th>
                  <th className="py-3 px-4 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((lect, i) => {
                    const globalIndex = startIndex + i + 1;
                    return (
                      <React.Fragment key={lect.id}>
                        {/* main row */}
                        <tr className="border border-gray-300 hover:bg-blue-50 transition">
                          <td className="py-3 px-4 border border-gray-300 font-medium text-center">{globalIndex}</td>

                          <td className="py-3 px-4 border border-gray-300 text-left">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border">
                                {lect.imageUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={lect.imageUrl} alt={lect.name} className="object-cover w-full h-full" />
                                ) : (
                                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">-</div>
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{lect.name}</div>
                                <div className="text-xs text-gray-500">{lect.position}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 border border-gray-300">{lect.program}</td>
                          <td className="py-3 px-4 border border-gray-300">{lect.educationLevel}</td>
                          <td className="py-3 px-4 border border-gray-300">{lect.email}</td>

                          <td className="py-3 px-4 border border-gray-300 text-center relative">
                            <div className="flex items-center justify-center gap-2">
                              {/* Detail expand */}
                              <button
                                onClick={() => toggleExpand(lect.id)}
                                className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm font-semibold
                                  ${expandedId === lect.id ? "bg-blue-600 text-white" : "bg-[#DBEAFE] text-blue-700 hover:bg-[#BFDBFE]"}`}
                              >
                                <Users size={14} />
                                {expandedId === lect.id ? "Tutup" : "Detail"}
                                {expandedId === lect.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => { setSelectedLecturer(lect); setIsEditOpen(true); }}
                                className="px-3 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium flex items-center gap-2"
                              >
                                <Edit size={14} /> Edit
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* expanded detail row */}
                        {expandedId === lect.id && (
                          <tr>
                            <td colSpan={6} className="p-0 border border-gray-300">
                              <div className="p-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* photo and name */}
                                  <div className="flex flex-col items-center">
                                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-300 bg-white">
                                      {lect.imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={lect.imageUrl} alt={lect.name} className="object-cover w-full h-full" />
                                      ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Photo</div>
                                      )}
                                    </div>
                                    <p className="font-semibold mt-3">{lect.name}</p>
                                    <p className="text-xs text-gray-500">{lect.position}</p>
                                  </div>

                                  {/* main info */}
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Informasi Dosen</h3>
                                    <p><strong>Nama:</strong> {lect.name}</p>
                                    <p><strong>Email:</strong> {lect.email}</p>
                                    <p><strong>Program Studi:</strong> {lect.program}</p>
                                    <p><strong>Spesialisasi:</strong> {lect.specialization}</p>
                                  </div>

                                  {/* education table */}
                                  <div className="md:col-span-3 mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Riwayat Pendidikan</h3>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-sm border bg-white rounded shadow">
                                        <thead className="bg-blue-100 font-semibold">
                                          <tr>
                                            <th className="border px-3 py-2">Jenjang</th>
                                            <th className="border px-3 py-2">Universitas</th>
                                            <th className="border px-3 py-2">Jurusan</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {lect.educationHistory.map((eh, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50">
                                              <td className="border px-3 py-2">{eh.degree}</td>
                                              <td className="border px-3 py-2">{eh.university}</td>
                                              <td className="border px-3 py-2">{eh.major}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500 italic">Tidak ada data ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* pagination footer */}
            <div className="flex justify-between items-center px-4 py-4">
              <div className="text-sm text-gray-600">
                Menampilkan <strong>{filtered.length === 0 ? 0 : startIndex + 1}</strong> - <strong>{Math.min(startIndex + paginated.length, filtered.length)}</strong> dari <strong>{filtered.length}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goPage(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center ${safeCurrentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
                >
                  {"<"}
                </button>

                {/* show up to 7 page buttons with ellipsis if necessary */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  if (totalPages > 7) {
                    if (p === 1 || p === totalPages || (p >= safeCurrentPage - 1 && p <= safeCurrentPage + 1)) {
                      return (
                        <button key={p} onClick={() => goPage(p)} className={`w-10 h-10 rounded-md border ${safeCurrentPage === p ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
                          {p}
                        </button>
                      );
                    }
                    if (p === 2 && safeCurrentPage > 4) return <span key={p} className="px-2">…</span>;
                    if (p === totalPages - 1 && safeCurrentPage < totalPages - 3) return <span key={p} className="px-2">…</span>;
                    return null;
                  }
                  return (
                    <button key={p} onClick={() => goPage(p)} className={`w-10 h-10 rounded-md border ${safeCurrentPage === p ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
                      {p}
                    </button>
                  );
                })}

                <button
                  onClick={() => goPage(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center ${safeCurrentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* Modals */}
          {isAddOpen && (
            <AddLecturerModal
              isOpen={isAddOpen}
              onClose={() => setIsAddOpen(false)}
              onSubmit={handleAddLecturer}
            />
          )}

          {isEditOpen && selectedLecturer && (
            <EditLecturerModal
              isOpen={isEditOpen}
              onClose={() => { setIsEditOpen(false); setSelectedLecturer(null); }}
              defaultData={selectedLecturer}
              onSubmit={handleEditLecturer}
            />
          )}
        </main>
      </div>
    </div>
  );
}
