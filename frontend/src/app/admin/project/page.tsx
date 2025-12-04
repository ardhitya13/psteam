"use client";

import { ChevronDown, Search, Edit, Trash2, FileText } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import EditProjectModal from "../components/EditProjectModal";
import DetailProjectModal from "../components/DetailProjectModal";

// ===============================
// NORMALIZER UNTUK PROJECT TYPE
// ===============================
function normalizeType(str: string) {
  if (!str) return "";

  const s = str.toLowerCase().trim();

  if (s.includes("web")) return "web";
  if (s.includes("mobile")) return "mobile";
  if (s.includes("iot") || s.includes("internet of things")) return "iot";

  if (
    s.includes("ai") ||
    s.includes("artificial intelligence") ||
    s.includes("machine learning")
  )
    return "ai";

  return s;
}



export default function DaftarProyekPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [filterType, setFilterType] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const itemsPerPage = 8;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FIXED — STATIC LIST OF FILTER OPTIONS
  // =====================================================
  const TYPE_OPTIONS = [
    "Semua",
    "Web Development",
    "Mobile Development",
    "IoT",
    "AI",
  ];

  // MAP UNTUK DROPDOWN
  const TYPE_MAP: Record<string, string> = {
    "Web Development": "web",
    "Mobile Development": "mobile",
    "IoT": "iot",
    "AI": "ai",

  };

  // =====================================================
  // FETCH DATA
  // =====================================================
  useEffect(() => {
  async function loadData() {
    try {
      const approvedRes = await fetch(
        "http://localhost:4000/api/submissions/approved"
      );

      const combined = await approvedRes.json(); // berisi approved + finished

      const mapped = combined.map((item: any, index: number) => ({
        no: index + 1,
        id: item.id,
        email: item.email,
        phoneNumber: item.phoneNumber,
        judul: item.projectTitle,
        tipeLabel: item.projectType ?? "",
        tipe: normalizeType(item.projectType ?? ""),
        status: item.status, // biarkan original
        raw: item,
      }));

      setData(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);



  // =====================================================
  // UPDATE STATUS
  // =====================================================
  async function updateStatus(id: number, newStatus: string) {
    try {
      const res = await fetch(
        `http://localhost:4000/api/submissions/${id}/update-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Gagal update status");

      const updatedData = data.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, raw: { ...item.raw, status: newStatus } }
          : item
      );

      setData(updatedData);

      alert("Status berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      alert("Gagal update status!");
    }
  }

  // =====================================================
  // FILTERING FIXED
  // =====================================================
  const filteredData = useMemo(() => {
    return data.filter((item) => {

      const statusRaw = item.raw.status; // "approved" / "pending" / "finished"

      // 1. PENDING selalu disembunyikan total
      if (statusRaw === "pending") return false;

      // 2. FINISHED disembunyikan, kecuali jika ada searchTerm
      if (statusRaw === "finished" && searchTerm.trim() === "") return false;

      // 3. FILTER TYPE
      if (filterType !== "Semua") {
        const requiredType = TYPE_MAP[filterType];
        if (item.tipe !== requiredType) return false;
      }

      // 4. SEARCH
      return item.judul
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
    });
  }, [data, filterType, searchTerm]);



  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black uppercase">
            Daftar Proyek
          </h1>
          <p className="text-gray-600 text-sm">
            Kelola semua proyek produksi PSTeam.
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-500 py-10">Loading data...</p>
        )}

        {!loading && (
          <>
            {/* SEARCH & FILTER */}
            <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
              {/* Search Bar */}
              <div className="relative flex items-center h-10">
                {!isSearchOpen && (
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setTimeout(() => {
                        document.getElementById("searchProject")?.focus();
                      }, 50);
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md absolute left-0"
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
                  onBlur={() => {
                    if (searchTerm.trim() === "") setIsSearchOpen(false);
                  }}
                  placeholder="Cari proyek..."
                  className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 ${isSearchOpen
                    ? "w-56 pl-10 pr-3 opacity-100"
                    : "w-10 opacity-0 pointer-events-none"
                    }`}
                />
              </div>

              {/* FILTER TIPE — FIXED STATIC OPTIONS */}
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                />
              </div>
            </div>

            {/* TABLE */}
            <div
              className={`bg-white shadow-md rounded-lg border border-gray-300 overflow-auto ${isSidebarOpen ? "min-w-[1057px]" : "w-full"
                }`}
            >
              <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
                <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
                  <tr>
                    <th className="border px-4 py-2 border-gray-300 w-12">NO</th>
                    <th className="border px-4 py-2 border-gray-300 w-56">EMAIL</th>
                    <th className="border px-4 py-2 border-gray-300 w-40">NO TELEPON</th>
                    <th className="border px-4 py-2 border-gray-300 w-56">JUDUL</th>
                    <th className="border px-4 py-2 border-gray-300 w-48">TIPE</th>
                    <th className="border px-4 py-2 border-gray-300 w-40">STATUS</th>
                    <th className="border px-4 py-2 border-gray-300 w-48">AKSI</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleData.length > 0 ? (
                    visibleData.map((item) => (
                      <tr key={item.no} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 border-gray-300">{item.no}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.email}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.phoneNumber}</td>
                        <td className="border px-4 py-2 border-gray-300">{item.judul}</td>
                        <td className="border px-4 py-2 border-gray-300">
                          {item.tipeLabel || item.tipe}
                        </td>
                        <td className="border px-4 py-2 border-gray-300">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${item.status === "Selesai"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Sedang Diproses"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* ACTION BUTTONS */}
                        <td className="border px-4 py-2 border-gray-300">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedDetail(item.raw);
                                setIsDetailOpen(true);
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 flex items-center gap-1 text-xs font-semibold"
                            >
                              <FileText size={14} /> Detail
                            </button>

                            <button
                              onClick={() => openEdit(item)}
                              className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-3 py-1 flex items-center gap-1 text-xs font-semibold"
                            >
                              <Edit size={14} /> Edit
                            </button>

                            <button className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 flex items-center gap-1 text-xs font-semibold">
                              <Trash2 size={14} /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                        Tidak ada proyek yang sudah diverifikasi.
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
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      setPageGroup(newGroup);
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded border text-xs ${currentPage === 1
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                    }`}
                >
                  &lt;
                </button>

                {Array.from({ length: 3 }, (_, i) => {
                  const pageNumber = pageGroup * 3 + (i + 1);
                  if (pageNumber > totalPages) return null;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-2 py-1 rounded text-xs border ${currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      const newGroup = Math.floor(currentPage / 3);
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      setPageGroup(newGroup);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded border text-xs ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                    }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* MODALS */}
        <DetailProjectModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          data={selectedDetail}
        />

        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={selectedData}
          mode="edit"
          onUpdateStatus={updateStatus}
        />
      </main>
    </div>
  );
}
