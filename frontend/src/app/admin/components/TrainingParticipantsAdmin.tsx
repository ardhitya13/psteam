"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown, FileText, Trash2 } from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import TrainingVerifyDetailModal from "./TrainingVerifyDetailModal";
import type { Registration } from "@/types/trainingRegistration";

/* =========================
   TYPE TABLE DATA
========================= */
type Participant = {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch: string;
  training: {
    id: number;
    title: string;
    type: "web" | "mobile" | "iot" | "ai" | string;
    thumbnail?: string | null;
  };
};

export default function TrainingParticipantsAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedType, setSelectedType] = useState<
    "all" | "web" | "mobile" | "iot" | "ai"
  >("all");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const [detailData, setDetailData] = useState<Registration | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Participant | null>(null);

  /* =========================
     NORMALIZE TYPE
  ========================= */
  function normalizeType(str: string) {
    if (!str) return "";
    const s = str.toLowerCase();
    if (s.includes("web")) return "web";
    if (s.includes("mobile")) return "mobile";
    if (s.includes("iot") || s.includes("internet")) return "iot";
    if (s.includes("ai") || s.includes("machine")) return "ai";
    return s;
  }

  /* =========================
     LOAD DATA APPROVED
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/training-registrations/approved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setParticipants(Array.isArray(data) ? data : []);
      })
      .catch(() => setParticipants([]));
  }, []);

  /* =========================
     DELETE
  ========================= */
  const deleteNow = async (id: number) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/api/training-registrations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setParticipants((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
  };

  /* =========================
     FILTER + PAGINATION
  ========================= */
  const filtered = participants.filter((p) => {
    const textMatch =
      `${p.name} ${p.email} ${p.training.title}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const typeMatch =
      selectedType === "all"
        ? true
        : normalizeType(p.training.type) === selectedType;

    return textMatch && typeMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, selectedType, itemsPerPage]);

  /* =========================
     UI
  ========================= */
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
            <h1 className="text-3xl font-bold uppercase text-black">
              Daftar Peserta Pelatihan
            </h1>
            <p className="text-gray-600 text-sm">
              Data peserta yang telah diterima.
            </p>
          </div>

          {/* CONTROL BAR */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
            {/* SEARCH */}
            <div className="relative flex items-center h-10">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(
                      () =>
                        document.getElementById("searchInput")?.focus(),
                      50
                    );
                  }}
                  className="absolute left-0 w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => {
                  if (!searchTerm.trim()) setIsSearchOpen(false);
                }}
                placeholder="Cari peserta..."
                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-black text-sm h-10 ${isSearchOpen
                    ? "w-60 pl-10 pr-3 opacity-100"
                    : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            {/* FILTER TIPE */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(
                    e.target.value as
                    | "all"
                    | "web"
                    | "mobile"
                    | "iot"
                    | "ai"
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
                    {n} Data
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
            <table className="min-w-full text-sm text-gray-800 text-center border-collapse">
              <thead className="bg-[#eaf0fa] text-gray-700 font-semibold">
                <tr>
                  {[
                    "No",
                    "Nama",
                    "Email",
                    "Telepon",
                    "Pelatihan",
                    "Tipe",
                    "Batch",
                    "Aksi",
                  ].map((h) => (
                    <th key={h} className="border px-4 py-3 border-gray-300">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-gray-500">
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((p, i) => (
                    <tr key={p.id} className="hover:bg-blue-50">
                      <td className="border px-4 py-2 border-gray-300">
                        {startIndex + i + 1}
                      </td>
                      <td className="border px-4 py-2 border-gray-300">{p.name}</td>
                      <td className="border px-4 py-2 border-gray-300">{p.email}</td>
                      <td className="border px-4 py-2 border-gray-300">{p.phone}</td>
                      <td className="border px-4 py-2 border-gray-300">
                        {p.training.title}
                      </td>
                      <td className="border px-4 py-2 border-gray-300 capitalize">
                        {normalizeType(p.training.type)}
                      </td>
                      <td className="border px-4 py-2 border-gray-300">{p.batch}</td>
                      <td className="border px-4 py-2 border-gray-300">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() =>
                              setDetailData({
                                id: p.id,
                                name: p.name,
                                email: p.email,
                                phone: p.phone,
                                batch: p.batch,
                                status: "approved",
                                notes: "-",
                                trainingId: p.training.id,
                                trainingTitle: p.training.title,
                                trainingType: p.training.type,
                                trainingThumbnail:
                                  p.training.thumbnail ?? null,
                              })
                            }
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md font-semibold"
                          >
                            <FileText size={14} /> Detail
                          </button>

                          <button
                            onClick={() => setConfirmDelete(p)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* PAGINATION */}
            <div className="flex justify-end items-center gap-2 px-4 py-4 bg-gray-50 border-t border-gray-300">
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
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
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
                    className={`px-3 py-1 rounded text-xs border ${currentPage === pageNum
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
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-300"
                  }`}
              >
                &gt;
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* DELETE MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Konfirmasi Hapus
            </h3>
            <p className="mb-6 text-black">
              Hapus peserta <b>{confirmDelete.name}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Batal
              </button>
              <button
                onClick={() => deleteNow(confirmDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Ya, Hapus
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
