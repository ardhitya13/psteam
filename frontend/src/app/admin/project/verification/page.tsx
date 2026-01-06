"use client";

import { useState, useEffect } from "react";
import { FileText, Search, ChevronDown, Check, Trash2 } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import ProjectDetailModal from "../../components/ProjectVerifyDetailModal";

export default function VerifikasiProyekPage() {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [selectedType, setSelectedType] = useState<
    "all" | "web" | "mobile" | "iot" | "ai"
  >("all");

  // 🔥 Alert TERIMA + TOLAK
  const [confirmAccept, setConfirmAccept] = useState<any>(null);
  const [confirmReject, setConfirmReject] = useState<any>(null);

  // =====================================================
  // FETCH DATA
  // =====================================================
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/submissions/pending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      console.log("PENDING STATUS:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("PENDING ERROR:", err);
        return;
      }

      const json = await res.json();
      console.log("PENDING DATA:", json);

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
      console.error("LOAD PENDING ERROR:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      console.warn("TOKEN TIDAK ADA, FETCH DIBATALKAN");
      return;
    }

    loadData();
  }, [token]);


  // =====================================================
  // UPDATE STATUS
  // =====================================================
  const approveNow = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/submissions/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("APPROVE STATUS:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("APPROVE ERROR:", err);
        return;
      }

      setConfirmAccept(null);
      loadData();
    } catch (err) {
      console.error("APPROVE FAILED:", err);
    }
  };


  const rejectNow = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/submissions/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("REJECT STATUS:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("REJECT ERROR:", err);
        return;
      }

      setConfirmReject(null);
      loadData();
    } catch (err) {
      console.error("REJECT FAILED:", err);
    }
  };

  function normalizeType(str: string) {
    if (!str) return "";
    const s = str.toLowerCase();
    if (s.includes("web")) return "web";
    if (s.includes("mobile")) return "mobile";
    if (s.includes("iot") || s.includes("internet")) return "iot";
    if (s.includes("ai") || s.includes("machine") || s.includes("artificial"))
      return "ai";
    return s;
  }

  // =====================================================
  // FILTER & PAGINATION
  // =====================================================
  const filteredData = data.filter((item) => {
    const textMatch =
      `${item.email} ${item.judul}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const typeMatch =
      selectedType === "all"
        ? true
        : normalizeType(item.tipe) === selectedType;

    return textMatch && typeMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginated = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, itemsPerPage]);

  // =====================================================
  // UI
  // =====================================================
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
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            Verifikasi Proyek
          </h1>
          <p className="text-gray-600 text-sm mt-1">Kelola pendaftaran proyek PSTeam.</p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex items-center h-10">
            {!isSearchOpen && (
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => document.getElementById("searchProject")?.focus(), 50);
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
                if (!searchTerm.trim()) setIsSearchOpen(false);
              }}
              placeholder="Cari proyek..."
              className={`transition-all duration-300 border border-gray-300 bg-white text-black rounded-md shadow-sm text-sm h-10 ${isSearchOpen ? "w-56 pl-10 pr-3 opacity-100" : "w-10 opacity-0 pointer-events-none"
                }`}
            />
          </div>

          {/* FILTER JENIS */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(
                  e.target.value as "all" | "web" | "mobile" | "iot" | "ai"
                )
              }
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
            >
              <option value="all">Semua Jenis</option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="iot">IoT</option>
              <option value="ai">AI</option>
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

        {/* TABLE */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-700 border border-gray-200 border-collapse">
            <thead className="bg-[#eaf0fa] text-gray-800 font-semibold uppercase">
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
                        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                      >
                        <FileText size={14} /> Detail
                      </button>
                    </td>

                    <td className="border px-4 py-2 border-gray-300 text-center">
                      <div className="inline-flex gap-2">
                        {/* 🔵 TERIMA */}
                        <button
                          onClick={() => setConfirmAccept(item)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
                        >
                          <Check size={14} /> Terima
                        </button>

                        {/* 🔴 TOLAK */}
                        <button
                          onClick={() => setConfirmReject(item)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                        >
                          <Trash2 size={14} /> Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                    Tidak ada proyek yang menunggu verifikasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                  setPageGroup(Math.floor((currentPage - 2) / 3));
                }
              }}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border text-xs ${currentPage === 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-100 hover:bg-gray-300"
                }`}
            >
              &lt;
            </button>

            {Array.from({ length: 3 }, (_, i) => {
              const pageNum = pageGroup * 3 + (i + 1);
              if (pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 py-1 rounded text-xs border ${currentPage === pageNum
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
                  setCurrentPage((prev) => prev + 1);
                  setPageGroup(Math.floor(currentPage / 3));
                }
              }}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border text-xs ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-100 hover:bg-gray-300"
                }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>

      {/* DETAIL */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
        canChangeStatus={false}
      />

      {/* =====================================================
          🔵 MODAL TERIMA
      ====================================================== */}
      {confirmAccept && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-600">Konfirmasi Terima</h3>
            <p className="text-sm text-gray-700 mb-6">
              Apakah Anda yakin ingin menerima proyek{" "}
              <b>{confirmAccept.judul}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmAccept(null)}
                className="px-4 py-2 rounded bg-gray-300 text-black text-sm hover:bg-gray-400"
              >
                Batal
              </button>

              <button
                onClick={() => approveNow(confirmAccept.id)}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
              >
                Ya, Terima
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          🔴 MODAL TOLAK
      ====================================================== */}
      {confirmReject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-3 text-red-600">Konfirmasi Penolakan</h3>
            <p className="text-sm text-gray-700 mb-6">
              Apakah Anda yakin ingin menolak proyek{" "}
              <b>{confirmReject.judul}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmReject(null)}
                className="px-4 py-2 rounded bg-gray-300 text-black text-sm hover:bg-gray-400"
              >
                Batal
              </button>

              <button
                onClick={() => rejectNow(confirmReject.id)}
                className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
              >
                Ya, Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
