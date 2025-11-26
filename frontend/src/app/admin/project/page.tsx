"use client";

import { ChevronDown, Search, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import EditProjectModal from "../components/EditProjectModal";
import DetailProjectModal from "../components/DetailProjectModal";

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

  // ==================================================================
  // FETCH DATA
  // ==================================================================
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://localhost:4000/api/submissions/approved");
        const json = await res.json();

        if (!Array.isArray(json)) {
          console.error("API did not return array:", json);
          return;
        }

        const mapped = json.map((item: any, index: number) => ({
          no: index + 1,
          email: item.email,
          telp: item.phoneNumber,
          judul: item.projectTitle,
          tipe: item.projectType,
          status: item.status === "approved" ? "Sedang Diproses" : item.status,
          deskripsi: item.projectDescription,
          raw: item,
        }));

        setData(mapped);
      } catch (err) {
        console.error("Error fetch data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // FILTERING
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        (filterType === "Semua" || item.tipe === filterType) &&
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, filterType, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openEdit = (item: any) => {
    setSelectedData(item.raw);
    setIsEditModalOpen(true);
  };

  // ==================================================================
  // UI RENDER
  // ==================================================================
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black uppercase">Daftar Proyek</h1>
          <p className="text-gray-600 text-sm">
            Kelola semua proyek produksi PSTeam.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading data...</p>
        )}

        {!loading && (
          <>
            {/* ===========================================================
                          SEARCH & FILTER (mengikuti verifikasi)
            ============================================================ */}
            <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">

              {/* Search */}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={() => {
                    if (searchTerm.trim() === "") setIsSearchOpen(false);
                  }}
                  placeholder="Cari proyek..."
                  className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 ${
                    isSearchOpen
                      ? "w-56 pl-10 pr-3 opacity-100"
                      : "w-10 opacity-0 pointer-events-none"
                  }`}
                />
              </div>

              {/* Filter Type */}
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
                >
                  <option value="Semua">Semua Tipe</option>
                  <option value="Website">Website</option>
                  <option value="Mobile">Mobile</option>
                  <option value="AI">AI</option>
                  <option value="IoT">IoT</option>
                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                />
              </div>
            </div>

            {/* ===========================================================
                                  TABLE (TIDAK DIUBAH)
            ============================================================ */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300">
              <table className="w-full text-sm text-gray-700 border-collapse">
                <thead className="bg-gray-300 text-gray-800">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">NO</th>
                    <th className="border border-gray-300 px-4 py-2">EMAIL</th>
                    <th className="border border-gray-300 px-4 py-2">NO TELEPON</th>
                    <th className="border border-gray-300 px-4 py-2">JUDUL</th>
                    <th className="border border-gray-300 px-4 py-2">TIPE</th>
                    <th className="border border-gray-300 px-4 py-2">STATUS</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">AKSI</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleData.map((item) => (
                    <tr key={item.no} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {item.no}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.telp}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {item.tipe}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Sedang Diproses"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedDetail(item.raw);
                              setIsDetailOpen(true);
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white rounded w-28 h-8 text-xs"
                          >
                            Lihat Detail
                          </button>

                          <button
                            onClick={() => openEdit(item)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white rounded w-24 h-8 flex items-center justify-center gap-1 text-xs"
                          >
                            <Edit size={14} /> Edit
                          </button>

                          <button className="bg-red-500 hover:bg-red-600 text-white rounded w-24 h-8 flex items-center justify-center gap-1 text-xs">
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination – tidak disentuh */}
              <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      const newGroup = Math.floor((currentPage - 2) / 3);
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      setPageGroup(newGroup);
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded border text-xs ${
                    currentPage === 1
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
                      className={`px-2 py-1 rounded text-xs border ${
                        currentPage === pageNumber
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
                  className={`px-2 py-1 rounded border text-xs ${
                    currentPage === totalPages
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

        {/* Modal Detail */}
        <DetailProjectModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          data={selectedDetail}
        />

        {/* Modal Edit */}
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={selectedData}
          mode="edit"
        />
      </main>
    </div>
  );
}
