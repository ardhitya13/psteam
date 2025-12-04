"use client";

import { useState, useEffect } from "react";
import { FileText, Search, ChevronDown } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import ProjectDetailModal from "../../components/ProjectVerifyDetailModal";

export default function VerifikasiProyekPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // FIX: match DaftarProyek pagination

  // =====================================================
  // FETCH
  // =====================================================
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/submissions/pending");
      if (!res.ok) return;

      const json = await res.json();
      const list = Array.isArray(json) ? json : json.data || [];

      const mapped = list.map((item: any, i: number) => ({
        no: i + 1,
        id: item.id,
        email: item.email,
        phoneNumber: item.phoneNumber,
        judul: item.projectTitle,
        tipe: item.projectType || "-",
        deskripsi: item.projectDescription,
        status: item.status,
      }));

      setData(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // FILTERING + PAGINATION
  // =====================================================
  const filteredData = data.filter((item) =>
    `${item.email} ${item.judul}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginated = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, itemsPerPage]);

  // =====================================================
  // ACTIONS
  // =====================================================
  const handleTerima = async (item: any) => {
    if (!confirm(`Terima proyek "${item.judul}"?`)) return;

    await fetch(`http://localhost:4000/api/submissions/${item.id}/approve`, {
      method: "PATCH",
    });

    loadData();
  };

  const handleTolak = async (item: any) => {
    if (!confirm(`Tolak proyek "${item.judul}"?`)) return;

    await fetch(`http://localhost:4000/api/submissions/${item.id}/reject`, {
      method: "PATCH",
    });

    loadData();
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
        className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        }`}
      >
        {/* =======================================
            TITLE
        ======================================== */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            Verifikasi Proyek
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Kelola pendaftaran proyek PSTeam.
          </p>
        </div>

        {/* =======================================
            SEARCH + FILTER PAGE
        ======================================== */}
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
              className={`transition-all duration-300 border border-gray-300 bg-white 
                rounded-md shadow-sm text-sm h-10
                ${
                  isSearchOpen
                    ? "w-56 pl-10 pr-3 opacity-100"
                    : "w-10 opacity-0 pointer-events-none"
                }`}
            />
          </div>

          {/* Items Per Page */}
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
            >
              {[5, 10, 15, 20, 30].map((n) => (
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
        </div>

        {/* =======================================
            TABEL  (TIDAK DIUBAH PERMINTAAN)
        ======================================== */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-700 border border-gray-200 border-collapse">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border px-4 py-2 border-gray-300 text-center">NO</th>
                <th className="border px-4 py-2 border-gray-300 text-center">EMAIL</th>
                <th className="border px-4 py-2 border-gray-300 text-center">NO TELEPON</th>
                <th className="border px-4 py-2 border-gray-300 text-center">JUDUL</th>
                <th className="border px-4 py-2 border-gray-300 text-center">TIPE</th>
                <th className="border px-4 py-2 border-gray-300 text-center">SPESIFIKASI</th>
                <th className="border px-4 py-2 border-gray-300 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length > 0 ? (
                paginated.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="border px-4 py-2 border-gray-300 text-center">
                      {startIndex + idx + 1}
                    </td>
                    <td className="border px-4 py-2 border-gray-300">{item.email}</td>
                    <td className="border px-4 py-2 border-gray-300">{item.phoneNumber}</td>
                    <td className="border px-4 py-2 border-gray-300">{item.judul}</td>
                    <td className="border px-4 py-2 border-gray-300 text-center">{item.tipe}</td>

                    <td className="border px-4 py-2 border-gray-300 text-center">
                      <button
                        onClick={() => {
                          setSelectedData(item);
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                      >
                        <FileText size={14} /> Detail
                      </button>
                    </td>

                    <td className="border px-4 py-2 border-gray-300 text-center">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleTerima(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded"
                        >
                          Terima
                        </button>

                        <button
                          onClick={() => handleTolak(item)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded"
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Tidak ada proyek yang menunggu verifikasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ======================================================
              PAGINATION — MATCH DENGAN DAFTAR PROYEK
          ======================================================= */}
          <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">

            {/* PREV */}
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

            {/* NUMBER BUTTONS (3 only) */}
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

            {/* NEXT */}
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
      </main>

      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
        canChangeStatus={false}
      />
    </div>
  );
}
