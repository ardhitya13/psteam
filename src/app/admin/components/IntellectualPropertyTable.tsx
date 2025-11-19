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
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AddIntellectualPropertyCard from "./AddIntellectualPropertyCard";
import EditIntellectualPropertyCard from "./EditIntellectualPropertyCard";

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

// kategori HKI (lengkap)
const kategoriHKI = [
  "Hak cipta nasional",
  "Hak cipta internasional",
  "Paten nasional",
  "Paten internasional",
  "Desain industri",
  "Merek dagang",
  "Lain-lain",
];

export default function IntellectualPropertyTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // sample data (dari user)
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
        { id: 1, title: "Keamanan API Menggunakan JSON WEB TOKEN", type: "Hak cipta nasional", year: 2024 },
        { id: 2, title: "Rekomendasi Pilihan Program Studi Menggunakan Recurrent Neural Network", type: "Hak cipta nasional", year: 2024 },
        { id: 3, title: "Website Company Profile PT. ADE MESTAKUNG ABADI", type: "Hak cipta nasional", year: 2023 },
        { id: 4, title: "Penerapan Stack Dalam Pemetaan Barang Di Gudang", type: "Hak cipta nasional", year: 2023 },
        { id: 5, title: "Website Media Promosi Wisata Pulau Mubut", type: "Hak cipta nasional", year: 2023 },
        { id: 6, title: "Sistem Informasi Organisasi Mahasiswa (SIOMA)", type: "Hak cipta nasional", year: 2022 },
        { id: 7, title: "SIstem Informasi Pelatihan Karyawan Baru", type: "Hak cipta nasional", year: 2022 },
        { id: 8, title: "Poster “Aplikasi Polibatam Guest”", type: "Hak cipta nasional", year: 2022 },
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
        { id: 1, title: "Bracket Penempatan Sensor pada Trem Otonom", type: "Paten nasional", year: 2024 },
      ],
    },
  ]);

  /* UI states */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  /* Modals */
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addInitialLecturerName, setAddInitialLecturerName] = useState<string | undefined>(undefined);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayload, setEditPayload] = useState<{ lecId: number; item: IPItem; lecturer_name: string } | null>(null);

  /* suggestions */
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return lecturers.filter((l) => l.name.toLowerCase().includes(q) || l.program.toLowerCase().includes(q));
  }, [lecturers, searchQuery]);

  /* filtered lecturers */
  const filteredLecturers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return lecturers;
    return lecturers.filter((l) => l.name.toLowerCase().includes(q) || l.program.toLowerCase().includes(q));
  }, [lecturers, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredLecturers.length / perPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginated = filteredLecturers.slice((currentPage - 1) * perPage, currentPage * perPage);

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  /* CRUD handlers (IP) */
  function addIPToLecturer(lecturerName: string, newItem: Omit<IPItem, "id">) {
    setLecturers((prev) =>
      prev.map((l) =>
        l.name === lecturerName
          ? {
              ...l,
              intellectualProperty: [
                { id: (l.intellectualProperty.length ? Math.max(...l.intellectualProperty.map((p) => p.id)) : 0) + 1, ...newItem },
                ...l.intellectualProperty,
              ],
            }
          : l
      )
    );
  }

  function updateIP(lecId: number, updated: IPItem) {
    setLecturers((prev) =>
      prev.map((l) =>
        l.id === lecId ? { ...l, intellectualProperty: l.intellectualProperty.map((p) => (p.id === updated.id ? updated : p)) } : l
      )
    );
  }

  function deleteIP(lecId: number, id: number) {
    if (!confirm("Yakin ingin menghapus data HKI ini?")) return;
    setLecturers((prev) => prev.map((l) => (l.id === lecId ? { ...l, intellectualProperty: l.intellectualProperty.filter((p) => p.id !== id) } : l)));
  }

  /* Subcomponent: list of IP inside expanded row */
  function LecturerIPList({ lecturer }: { lecturer: Lecturer }) {
    const [filterType, setFilterType] = useState<string>("");
    const [filterYear, setFilterYear] = useState<string>("");
    const [page, setPage] = useState(1);
    const per = 8;

    const yearOptions = useMemo(() => {
      return [...new Set(lecturer.intellectualProperty.map((p) => p.year))].sort((a, b) => b - a);
    }, [lecturer]);

    const filtered = useMemo(() => {
      let list = lecturer.intellectualProperty;
      if (filterType) list = list.filter((p) => p.type === filterType);
      if (filterYear) list = list.filter((p) => p.year === Number(filterYear));
      return list;
    }, [lecturer, filterType, filterYear]);

    useEffect(() => setPage(1), [filterType, filterYear, lecturer.id]);

    const visible = filtered.slice((page - 1) * per, page * per);
    const total = Math.max(1, Math.ceil(filtered.length / per));

    return (
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-semibold">Daftar HKI ({lecturer.intellectualProperty.length})</h4>

          <div className="flex items-center gap-3">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 rounded border border-[#DDE1E5] bg-white text-sm">
              <option value="">Semua Tipe</option>
              {kategoriHKI.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>

            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="px-3 py-2 rounded border border-[#DDE1E5] bg-white text-sm">
              <option value="">Semua Tahun</option>
              {yearOptions.map((y) => (
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
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400 text-white text-sm"
                          onClick={() => {
                            setEditPayload({ lecId: lecturer.id, item: it, lecturer_name: lecturer.name });
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white text-sm" onClick={() => deleteIP(lecturer.id, it.id)}>
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Belum ada HKI.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 mt-3">
          <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border border-[#DDE1E5] bg-white hover:bg-gray-50">
            <ChevronLeft size={16} />
          </button>
          <div className="text-sm px-2">Halaman {page} / {total}</div>
          <button disabled={page === total} onClick={() => setPage((p) => Math.min(total, p + 1))} className="px-3 py-1 rounded border border-[#DDE1E5] bg-white hover:bg-gray-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  /* MAIN RENDER */
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-300 pt-6 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"} mt-[85px]`}>
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">DAFTAR HAK KEKAYAAN INTELEKTUAL (HKI)</h1>

        {/* controls */}
        <div className="flex items-center justify-end gap-3 mb-4 flex-wrap">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white" onClick={() => { setAddInitialLecturerName(undefined); setIsAddOpen(true); }}>
            <Plus size={16} /> Tambah HKI
          </button>

          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-6 py-2 border border-[#DDE1E5] rounded-lg bg-white text-black">
            {[10, 20, 30, 40, 50].map((n) => (<option key={n} value={n}>{n} Halaman</option>))}
          </select>

          <div className={`relative flex items-center border border-[#DDE1E5] rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${searchOpen ? "w-72" : "w-11"}`}>
            {searchOpen && (
              <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="flex-grow px-3 py-2 text-sm text-gray-900 placeholder-gray-400" placeholder="Cari nama dosen / prodi..." />
            )}
            <button onClick={() => setSearchOpen((s) => !s)} className="bg-blue-600 text-white px-3 py-3">
              <Search size={16} />
            </button>

            {searchOpen && suggestions.length > 0 && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#DDE1E5] rounded shadow z-50 max-h-56 overflow-auto">
                {suggestions.map((s) => (
                  <div key={s.id} onClick={() => { setSearchQuery(s.name); setCurrentPage(1); }} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500">— {s.program}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* main table */}
        <div className="bg-white shadow-md rounded-lg border border-[#DDE1E5] overflow-visible">
          <table className="w-full text-sm text-gray-800 border-collapse border border-[#DDE1E5]">
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
                    <td className="border border-[#DDE1E5] px-4 py-3 text-center">{(currentPage - 1) * perPage + idx + 1}</td>
                    <td className="border border-[#DDE1E5] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={lec.imageUrl} alt={lec.name} className="w-10 h-10 rounded-full border border-[#DDE1E5] object-cover" />
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
                        <button className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-700" onClick={() => toggleExpand(lec.id)}>
                          <Users size={14} /> {expandedId === lec.id ? "Tutup" : "Detail"}
                        </button>

                        <button className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white" onClick={() => { setAddInitialLecturerName(lec.name); setIsAddOpen(true); }}>
                          <Plus size={14} /> Tambah HKI
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedId === lec.id && (
                    <tr>
                      <td colSpan={6} className="border border-[#DDE1E5] bg-gray-50 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-start gap-4">
                            <img src={lec.imageUrl} alt={lec.name} className="w-36 h-36 rounded-full border-4 border-blue-100 object-cover" />
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{lec.name}</h3>
                              <p className="text-sm text-gray-600">{lec.position}</p>
                              <div className="text-sm text-gray-700 mt-3 space-y-1">
                                <p><b>Program Studi:</b> {lec.program}</p>
                                <p><b>Pendidikan Terakhir:</b> {lec.educationLevel}</p>
                                <p><b>Email:</b> <span className="text-gray-800">{lec.email}</span></p>
                                <p><b>Bidang Spesialis:</b> {lec.specialization}</p>
                              </div>
                            </div>
                          </div>

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

          {/* footer */}
          <div className="py-3 px-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Menampilkan {filteredLecturers.length === 0 ? 0 : (currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, filteredLecturers.length)} dari {filteredLecturers.length}
            </div>

            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-2 border border-[#DDE1E5] rounded bg-white hover:bg-gray-50">&lt;</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-2 rounded border border-[#DDE1E5] ${currentPage === p ? "bg-blue-600 text-white" : "bg-white"}`}>{p}</button>
              ))}

              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-2 rounded border border-[#DDE1E5] bg-white hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>

        {/* MODALS */}
        <AddIntellectualPropertyCard
          isOpen={isAddOpen}
          onClose={() => { setIsAddOpen(false); setAddInitialLecturerName(undefined); }}
          initialLecturerName={addInitialLecturerName}
          lecturers={lecturers}
          kategoriHKI={kategoriHKI}
          onSubmit={(payload: { lecturer_name: string; title: string; type: string; year: number }) => {
            const found = lecturers.find((l) => l.name === payload.lecturer_name);
            if (!found) {
              alert("Nama dosen tidak ditemukan. Pilih dari daftar atau ketik nama persis.");
              return;
            }
            addIPToLecturer(payload.lecturer_name, { title: payload.title, type: payload.type, year: payload.year });
          }}
        />

        <EditIntellectualPropertyCard
          isOpen={isEditOpen}
          onClose={() => { setIsEditOpen(false); setEditPayload(null); }}
          defaultData={editPayload}
          kategoriHKI={kategoriHKI}
          onSubmit={(payload: { lecId: number; item: IPItem }) => {
            if (!payload || typeof payload.lecId !== "number" || !payload.item) {
              alert("Data tidak valid.");
              return;
            }
            updateIP(payload.lecId, payload.item);
          }}
        />
      </main>
    </div>
  );
}
