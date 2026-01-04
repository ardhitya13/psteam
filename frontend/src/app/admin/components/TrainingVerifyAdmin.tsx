"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Trash2, FileText, Check } from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import TrainingVerifyDetailModal from "../components/TrainingVerifyDetailModal";

import {
  getPendingRegistrations,
  updateTrainingStatus,
} from "../../../lib/apiTrainingRegistration";

import type { Registration } from "@/types/trainingRegistration";

export default function VerifyTrainingAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const [confirmAccept, setConfirmAccept] = useState<Registration | null>(null);
  const [confirmReject, setConfirmReject] = useState<Registration | null>(null);
  const [detailData, setDetailData] = useState<Registration | null>(null);
  const [selectedType, setSelectedType] = useState<
    "all" | "web" | "mobile" | "iot" | "ai"
  >("all");

  function normalizeType(str: string) {
    if (!str) return "";
    const s = str.toLowerCase();
    if (s.includes("web")) return "web";
    if (s.includes("mobile")) return "mobile";
    if (s.includes("iot") || s.includes("internet")) return "iot";
    if (s.includes("ai") || s.includes("machine")) return "ai";
    return s;
  }

  async function load() {
    try {
      const res = await getPendingRegistrations();

      const mapped: Registration[] = res.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        batch: item.batch,
        notes: item.notes,
        status: item.status,

        trainingId: item.training?.id ?? null,
        trainingTitle: item.training?.title ?? "-",
        trainingType: item.training?.type ?? "-",
        trainingThumbnail: item.training?.thumbnail ?? null,
      }));

      setData(mapped);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil pendaftaran pending");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const approveNow = async (id: number) => {
    await updateTrainingStatus(id, "approved");
    setConfirmAccept(null);
    load();
  };

  const rejectNow = async (id: number) => {
    await updateTrainingStatus(id, "rejected");
    setConfirmReject(null);
    load();
  };

  // ========================
  // FILTER + PAGINATION
  // ========================
  const filtered = data.filter((item) => {
    const textMatch =
      `${item.name} ${item.email} ${item.trainingTitle}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const typeMatch =
      selectedType === "all"
        ? true
        : normalizeType(item.trainingType) === selectedType;

    return textMatch && typeMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, itemsPerPage]);

  // ========================
  // UI
  // ========================
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
            }`}
        >
          {/* TITLE */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-black uppercase">
              Verifikasi Pelatihan
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola pendaftaran peserta pelatihan PSTeam.
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
            <div className="relative flex items-center h-10">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => document.getElementById("search")?.focus(), 50);
                  }}
                  className="absolute left-0 w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => {
                  if (!searchTerm.trim()) setIsSearchOpen(false);
                }}
                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-black text-sm h-10 ${isSearchOpen
                  ? "w-60 pl-10 pr-3 opacity-100"
                  : "w-10 opacity-0 pointer-events-none"
                  }`}
                placeholder="Cari peserta..."
              />
            </div>

            {/* FILTER TIPE */}
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
                <option value="all">Semua Tipe</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="iot">IoT</option>
                <option value="ai">AI</option>
              </select>
            </div>


            {/* ITEMS PER PAGE */}
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
              >
                {[10, 20, 30, 40].map((n) => (
                  <option key={n} value={n}>
                    {n} Halaman
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
            <table className="min-w-full text-sm text-gray-800 text-center border-collapse">
              <thead className="bg-[#eaf0fa] text-gray-700 font-semibold">
                <tr>
                  <th className="border px-4 py-3 border-gray-300">No</th>
                  <th className="border px-4 py-3 border-gray-300">Nama</th>
                  <th className="border px-4 py-3 border-gray-300">Email</th>
                  <th className="border px-4 py-3 border-gray-300">Telepon</th>
                  <th className="border px-4 py-3 border-gray-300">Pelatihan</th>
                  <th className="border px-4 py-3 border-gray-300">Tipe</th>
                  <th className="border px-4 py-3 border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((p: any, i: number) => (
                    <tr key={p.id} className="hover:bg-blue-50">
                      <td className="border px-4 py-2 border-gray-300">
                        {startIndex + i + 1}
                      </td>
                      <td className="border px-4 py-2 border-gray-300">{p.name}</td>
                      <td className="border px-4 py-2 border-gray-300">{p.email}</td>
                      <td className="border px-4 py-2 border-gray-300">{p.phone}</td>
                      <td className="border px-4 py-2 border-gray-300">
                        {p.trainingTitle}
                      </td>

                      <td className="border px-4 py-2 border-gray-300 capitalize">
                        {normalizeType(p.trainingType || "")}
                      </td>

                      <td className="border px-4 py-2 border-gray-300">
                        <div className="inline-flex gap-2">

                          {/* DETAIL BUTTON */}
                          {p.trainingId && (
                            <button
                              onClick={() => setDetailData(p)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                              <FileText size={14} /> Detail
                            </button>

                          )}

                          <button
                            onClick={() => setConfirmAccept(p)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
                          >
                            <Check size={14} /> Terima
                          </button>

                          <button
                            onClick={() => setConfirmReject(p)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                          >
                            <Trash2 size={14} /> Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">
              {/* PREV */}
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
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

              {/* PAGE NUMBERS */}
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

              {/* NEXT */}
              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
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
      </div>

      {/* MODAL TERIMA */}
      {confirmAccept && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-3">Konfirmasi Terima</h3>
            <p className="text-sm text-gray-700 mb-6">
              Terima peserta <b>{confirmAccept.name}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmAccept(null)}
                className="px-4 py-2 text-white bg-gray-600 rounded"
              >
                Batal
              </button>

              <button
                onClick={() => approveNow(confirmAccept.id)}
                className="px-4 py-2 bg-blue-600 rounded text-sm"
              >
                Ya, Terima
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TOLAK */}
      {confirmReject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-3 text-red-600">
              Konfirmasi Penolakan
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Tolak peserta <b>{confirmReject.name}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmReject(null)}
                className="px-4 py-2 bg-gray-600 rounded text-sm"
              >
                Batal
              </button>

              <button
                onClick={() => rejectNow(confirmReject.id)}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm"
              >
                Ya, Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailData && (
        <TrainingVerifyDetailModal
          data={detailData}
          onClose={() => setDetailData(null)}
        />
      )}
    </div>
  );
}
