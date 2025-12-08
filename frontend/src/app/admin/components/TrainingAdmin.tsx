"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  PlusCircle,
  ChevronDown,
  Eye,
  Trash,
  Edit,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import AddTrainingModal from "./TrainingAddModal";
import EditTrainingModal from "./TrainingEditModal";
import DetailTrainingModal from "./TrainingDetailModal"; // adjust import name if file different

import {
  getAllTraining,
  createTraining,
  updateTraining,
  deleteTraining,
} from "../../../lib/apiTraining"; // pastikan path ini sesuai proyekmu

export type Training = {
  id: number;
  title: string;
  shortDescription?: string;
  excerpt?: string;
  specification?: string;
  type: "web" | "mobile" | "iot" | "ai" | string;
  price: number;
  thumbnail?: string;
  description?: string;
  costDetails?: string[];
  requirements?: string[];
  schedule?: { batchName: string; startDate: string; endDate: string }[];
  rundown?: { day: string; activity: string }[];
  organizer?: string;
  duration?: string;
  location?: string;
  certificate?: string;
  instructor?: string;
  created_at?: string;
  updated_at?: string;
};

export default function TrainingAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState<Training | null>(null);
  const [detailData, setDetailData] = useState<Training | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<Training | null>(null);

  // LOAD FROM API
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTraining();
        // ensure arrays are proper and fallback fields exist
        const normalized = (data || []).map((d: any) => ({
          ...d,
          costDetails: d.costDetails || [],
          requirements: d.requirements || [],
          schedule: d.schedule || [],
          rundown: d.rundown || [],
        }));
        setTrainings(normalized);
      } catch (err) {
        console.error("Failed fetching trainings:", err);
        setTrainings([]); // fallback
      }
    })();
  }, []);

  // ADD TRAINING (connect to API)
  const handleAdd = async (data: Training) => {
    try {
      const payload = {
        title: data.title,
        shortDescription: data.shortDescription,
        excerpt: (data.description ?? "").slice(0, 300),
        specification: null,
        type: data.type,
        price: data.price,
        thumbnail: data.thumbnail,
        description: data.description,
        costDetails: data.costDetails,
        requirements: data.requirements,
        schedule: data.schedule,
        rundown: data.rundown,
        organizer: data.organizer,
        duration: data.duration,
        location: data.location,
        certificate: data.certificate,
        instructor: data.instructor,
      };

      const created = await createTraining(payload);

      // masukkan ke tabel
      setTrainings((prev) => [created, ...prev]);

      // ❗ JANGAN tutup modal di sini
      // setIsAddOpen(false);   <-- DIHAPUS
    } catch (err) {
      console.error("create training error:", err);
      alert("Gagal membuat pelatihan. Cek console backend/frontend.");
    }
  };



  // UPDATE TRAINING (connect to API)
  const handleUpdate = async (update: Training) => {
    try {
      const payload = {
        title: update.title,
        shortDescription: update.shortDescription,
        excerpt: update.excerpt,
        specification: update.specification,
        type: update.type,
        price: update.price,
        thumbnail: update.thumbnail,
        description: update.description,
        costDetails: update.costDetails,
        requirements: update.requirements,
        schedule: update.schedule,
        rundown: update.rundown,
        organizer: update.organizer,
        duration: update.duration,
        location: update.location,
        certificate: update.certificate,
        instructor: update.instructor,
      };

      const updated = await updateTraining(update.id, payload);
      setTrainings((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("update training error:", err);
      alert("Gagal memperbarui pelatihan. Cek console.");
    }
  };

  // DELETE TRAINING (connect to API)
  const deleteNow = async (id: number) => {
    try {
      await deleteTraining(id);
      setTrainings((prev) => prev.filter((t) => t.id !== id));
      setConfirmDelete(null);
    } catch (err) {
      console.error("delete training error:", err);
      alert("Gagal menghapus pelatihan.");
    }
  };

  // FILTERING (safe: handle undefined title)
  const filtered = trainings.filter((t) =>
    (t.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PAGINATION
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
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
            <h1 className="text-3xl font-bold text-black uppercase">
              Daftar Pelatihan
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola daftar pelatihan akademi PSTeam.
            </p>
          </div>

          {/* SEARCH & CONTROLS */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
            <div className="relative flex items-center h-10">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => {
                      document.getElementById("searchInput")?.focus();
                    }, 50);
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md absolute left-0"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => {
                  if (searchTerm.trim() === "") setIsSearchOpen(false);
                }}
                placeholder="Cari pelatihan..."
                className={`transition-all duration-300 border border-gray-300 bg-white 
                  rounded-md shadow-sm text-sm h-10
                  ${isSearchOpen
                    ? "w-56 pl-10 pr-3 opacity-100"
                    : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
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

            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow"
            >
              <PlusCircle size={18} /> Tambah Pelatihan
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-visible">
            <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
              <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 w-16">No</th>
                  <th className="py-3 px-4 border border-gray-300">Thumbnail</th>
                  <th className="py-3 px-4 border border-gray-300">Judul</th>
                  <th className="py-3 px-4 border border-gray-300">Tipe</th>
                  <th className="py-3 px-4 border border-gray-300">Harga</th>
                  <th className="py-3 px-4 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 italic text-gray-500">
                      Tidak ada pelatihan ditemukan.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((t, i) => {
                    const thumb = t.thumbnail && t.thumbnail.trim() !== "" ? t.thumbnail : "/default-thumb.png";

                    return (
                      <tr key={t.id} className="border border-gray-300 hover:bg-blue-50 transition">
                        <td className="border border-gray-300 px-4 py-3">{startIndex + i + 1}</td>

                        <td className="border border-gray-300 px-4 py-3">
                          <img src={thumb} alt={t.title || "thumbnail"} className="w-24 h-14 rounded object-cover" />
                        </td>

                        <td className="border border-gray-300 px-4 py-3">
                          {t.title}
                          <div className="text-xs text-gray-500">{t.shortDescription}</div>
                        </td>

                        <td className="border border-gray-300 px-4 py-3">{t.type}</td>

                        <td className="border border-gray-300 px-4 py-3">Rp {Number(t.price || 0).toLocaleString()}</td>

                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => setDetailData(t)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md flex items-center gap-1">
                              <Eye size={14} /> Detail
                            </button>

                            <button onClick={() => setEditData(t)} className="bg-yellow-400 text-white px-3 py-1 rounded-md flex items-center gap-1">
                              <Edit size={14} /> Edit
                            </button>

                            <button onClick={() => setConfirmDelete(t)} className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-1">
                              <Trash size={14} /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-end items-center gap-2 px-4 py-4">
              <button disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="w-10 h-10 border rounded bg-white hover:bg-gray-100 disabled:opacity-50">
                {"<"}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 border rounded ${safeCurrentPage === page ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}>
                  {page}
                </button>
              ))}

              <button disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="w-10 h-10 border rounded bg-white hover:bg-gray-100 disabled:opacity-50">
                {">"}
              </button>
            </div>
          </div>

          {/* MODALS */}
          {isAddOpen && <AddTrainingModal onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />}

          {editData && <EditTrainingModal data={editData} onClose={() => setEditData(null)} onUpdate={handleUpdate} />}

          {detailData && <DetailTrainingModal data={detailData} onClose={() => setDetailData(null)} />}
        </main>
      </div>

      {/* DELETE CONFIRM */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-3 text-red-600">Konfirmasi Hapus</h3>

            <p className="text-sm text-gray-700 mb-6">Hapus pelatihan <b>{confirmDelete.title}</b>?</p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-gray-300 rounded text-sm">Batal</button>

              <button onClick={() => deleteNow(confirmDelete.id)} className="px-4 py-2 bg-red-600 text-white rounded text-sm">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
