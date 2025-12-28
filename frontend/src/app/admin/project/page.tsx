"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, ChevronDown, FileText, Edit as IconEdit, Trash2 } from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import EditProjectModal from "../components/ProjectEditModal";
import DetailProjectModal from "../components/ProjectDetailModal";

// ===============================
// NORMALIZER TIPE PROYEK
// ===============================
function normalizeType(str: string) {
  if (!str) return "";
  const s = str.toLowerCase().trim();

  if (s.includes("web")) return "web";
  if (s.includes("mobile")) return "mobile";
  if (s.includes("iot") || s.includes("internet")) return "iot";
  if (s.includes("ai") || s.includes("artificial") || s.includes("machine")) return "ai";

  return str;
}

export default function DaftarProyekPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [filterType, setFilterType] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("Semua");

  // ===========================
  // TIPE UNTUK DROPDOWN
  // ===========================
  const TYPE_OPTIONS = ["Semua", "Web Development", "Mobile Development", "IoT", "AI"];

  const TYPE_MAP: Record<string, string> = {
    "Web Development": "web",
    "Mobile Development": "mobile",
    "IoT": "iot",
    "AI": "ai",
  };

  // ===========================
  // LOAD DATA
  // ===========================
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // ⬇️ ambil token dari localStorage (sesuai auth kamu)
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/api/submissions/approved", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        // DEBUG WAJIB (biar kelihatan di console)
        console.log("STATUS API:", res.status);

        if (!res.ok) {
          const errText = await res.text();
          console.error("API ERROR:", errText);
          throw new Error("API error");
        }

        const json = await res.json();
        console.log("HASIL API:", json);

        const list = Array.isArray(json) ? json : json.data ?? [];

        const mapped = list.map((item: any, i: number) => ({
          no: i + 1,
          id: item.id,
          email: item.email,
          phoneNumber: item.phoneNumber,
          judul: item.projectTitle,
          tipeLabel: item.projectType,
          tipe: normalizeType(item.projectType),
          status: item.status,
          raw: item,
        }));

        setData(mapped);
      } catch (err) {
        console.error("LOAD DATA ERROR:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);



  // ===========================
  // UPDATE STATUS (EDIT)
  // ===========================
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:4000/api/submissions/${id}/update-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      console.log("UPDATE STATUS CODE:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("UPDATE STATUS ERROR:", err);
        throw new Error("Update gagal");
      }

      // 🔁 update tabel TANPA reload
      setData((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
              ...d,
              status: newStatus,
              raw: { ...d.raw, status: newStatus },
            }
            : d
        )
      );

      // ✅ ALERT JELAS & TERLIHAT
      setSuccessMessage("Status proyek berhasil diperbarui.");
    } catch (err) {
      console.error("HANDLE UPDATE ERROR:", err);
      setSuccessMessage("Gagal memperbarui status proyek.");
    }
  };

  // ===========================
  // DELETE PROJECT
  // ===========================
  const confirmDeleteNow = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:4000/api/submissions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setData((prev) => prev.filter((d) => d.id !== id));
      setConfirmDelete(null);
      setSuccessMessage("Proyek berhasil dihapus!");
    } catch (err) {
      console.error(err);
      setSuccessMessage("Gagal menghapus proyek!");
      setConfirmDelete(null);
    }
  };

  // ===========================
  // FILTER + FIX FINISHED TERSEMBUNYI
  // ===========================
  const filteredData = useMemo(() => {
  return data.filter((item) => {
    // 🔹 Filter STATUS
    if (filterStatus !== "Semua" && item.status !== filterStatus) {
      return false;
    }

    // 🔹 Filter TIPE
    if (filterType !== "Semua") {
      const req = TYPE_MAP[filterType];
      if (item.tipe !== req) return false;
    }

    // 🔹 Search
    if (searchTerm.trim()) {
      return item.judul
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return true;
  });
}, [data, filterStatus, filterType, searchTerm]);

  // ===========================
  // PAGINATION
  // ===========================
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ===========================
  // OPEN EDIT
  // ===========================
  const openEdit = (item: any) => {
    const mapped = {
      id: item.raw.id,
      email: item.raw.email,
      phoneNumber: item.raw.phoneNumber,
      projectTitle: item.raw.projectTitle,
      projectType: item.raw.projectType,
      projectDescription: item.raw.projectDescription,
      status: item.raw.status,
    };

    setSelectedData(mapped);
    setIsEditModalOpen(true);
  };

  // ===========================
  // UI
  // ===========================
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
      >
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black uppercase">Daftar Proyek</h1>
          <p className="text-gray-600 text-sm">Kelola semua proyek produksi PSTeam.</p>
        </div>

        {/* LOADING */}
        {loading && <p className="text-center py-10 text-gray-500">Loading...</p>}

        {/* TABLE */}
        {!loading && (
          <>
            {/* SEARCH FILTER */}
            <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
              {/* SEARCH */}
              <div className="relative flex items-center h-10">
                {!isSearchOpen && (
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setTimeout(() => document.getElementById("searchProject")?.focus(), 50);
                    }}
                    className="absolute left-0 w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-md"
                  >
                    <Search size={18} />
                  </button>
                )}

                <input
                  id="searchProject"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  onBlur={() => !searchTerm.trim() && setIsSearchOpen(false)}
                  placeholder="Cari proyek..."
                  className={`transition-all duration-300 h-10 border bg-white text-black rounded-md shadow-sm text-sm ${isSearchOpen ? "w-56 pl-10 pr-3 opacity-100" : "w-10 opacity-0 pointer-events-none"
                    }`}
                />
              </div>

              {/* FILTER TIPE */}
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border bg-white text-black rounded-md pl-3 pr-10 py-2 shadow text-sm cursor-pointer"
                >
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border bg-white text-black rounded-md pl-3 pr-10 py-2 shadow text-sm cursor-pointer"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Sedang Diproses</option>
                  <option value="finished">Selesai</option>
                </select>
              </div>

              {/* Items per page */}
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
            >
              {[5, 10, 15, 20, 30, 40, 50].map((n) => (
                <option key={n} value={n}>
                  {n} Halaman
                </option>
              ))}
            </select>
          </div>
            </div>

            {/* TABLE BOX */}
            <div
              className={`bg-white shadow-md rounded-lg border border-gray-300 overflow-auto ${isSidebarOpen ? "min-w-[1057px]" : "w-full"
                }`}
            >
              <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
                <thead className="bg-[#eaf0fa] text-gray-800 font-semibold uppercase">
                  <tr>
                    <th className="border px-4 py-3 border-gray-300">No</th>
                    <th className="border px-4 py-3 border-gray-300">EMAIL</th>
                    <th className="border px-4 py-3 border-gray-300">NO TELEPON</th>
                    <th className="border px-4 py-3 border-gray-300">JUDUL</th>
                    <th className="border px-4 py-3 border-gray-300">TIPE</th>
                    <th className="border px-4 py-3 border-gray-300">STATUS</th>
                    <th className="border px-4 py-3 border-gray-300">AKSI</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleData.length > 0 ? (
                    visibleData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 border-gray-300">{item.no}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.email}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.phoneNumber}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.judul}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.tipeLabel}</td>

                        <td className="border px-4 py-2 border-gray-300">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${item.status === "finished"
                                ? "bg-green-100 text-green-700"
                                : item.status === "approved"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* ACTION */}
                        <td className="border px-4 py-2 border-gray-300">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedDetail(item.raw);
                                setIsDetailOpen(true);
                              }}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                              <FileText size={14} /> Detail
                            </button>

                            <button
                              onClick={() => openEdit(item)}
                              className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-md font-semibold hover:bg-yellow-500 transition"
                            >
                              <IconEdit size={14} /> Edit
                            </button>

                            <button
                              onClick={() => setConfirmDelete(item)}
                              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-gray-500 italic">
                        Tidak ada proyek ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-white rounded-b-lg">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      const newGroup = Math.floor((currentPage - 2) / 3);
                      setCurrentPage((prev) => prev - 1);
                      setPageGroup(newGroup);
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded border text-xs ${currentPage === 1
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-100 hover:bg-gray-300"
                    }`}
                >
                  {"<"}
                </button>

                {Array.from({ length: 3 }, (_, i) => {
                  const pageNum = pageGroup * 3 + (i + 1);
                  if (pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 rounded border text-xs ${currentPage === pageNum
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
                      const newGroup = Math.floor(currentPage / 3);
                      setCurrentPage((prev) => prev + 1);
                      setPageGroup(newGroup);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded border text-xs ${currentPage === totalPages
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-100 hover:bg-gray-300"
                    }`}
                >
                  {">"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* DETAIL MODAL */}
        <DetailProjectModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          data={selectedDetail}
        />

        {/* EDIT MODAL */}
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={selectedData}
          mode="edit"
          onUpdateStatus={handleUpdateStatus}
        />
      </main>

      {/* ===================== */}
      {/* CONFIRM DELETE MODAL */}
      {/* ===================== */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-black font-semibold mb-3">Konfirmasi Hapus</h3>
            <p className="text-sm text-gray-700 mb-6">
              Yakin ingin menghapus proyek <b>{confirmDelete.judul}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded bg-gray-300 text-black text-sm hover:bg-gray-400"
              >
                Batal
              </button>

              <button
                onClick={() => confirmDeleteNow(confirmDelete.id)}
                className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* SUCCESS MODAL */}
      {/* ===================== */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
            <p className="mb-4 text-black">{successMessage}</p>

            <button
              onClick={() => setSuccessMessage(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
