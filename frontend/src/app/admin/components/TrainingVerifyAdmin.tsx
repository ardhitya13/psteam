"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown, Eye, Check, X } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import TrainingVerificationDetailModal from "./TrainingVerifyDetailModal";
import TrainingVerificationStatusModal from "./TrainingVerifyStatusModal";

export type Registration = {
  id: number;
  name: string;
  email: string;
  phone: string;
  trainingTitle: string;
  trainingType: "web" | "mobile" | "ai" | "iot";
  batch: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
};

export default function TrainingVerificationAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [detailData, setDetailData] = useState<Registration | null>(null);
  const [statusData, setStatusData] = useState<{
    data: Registration;
    action: "approved" | "rejected";
  } | null>(null);

  // LOAD DATA
  const loadRegistrations = async () => {
    const res = await fetch("http://localhost:4000/api/trainings");
    const json = await res.json();
    setRegistrations(json);
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id: number, newStatus: "approved" | "rejected") => {
    await fetch(`http://localhost:4000/api/trainings/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setStatusData(null);
    await loadRegistrations();
  };

  // FILTERING
  const filtered = registrations.filter((r) =>
    `${r.name} ${r.email} ${r.trainingTitle}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
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
          className={`flex-1 px-8 md:px-12 py-6 mt-[85px] transition-all duration-300 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
        >
          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black uppercase">
              Verifikasi Pelatihan
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola pendaftaran peserta pelatihan PSTeam.
            </p>
          </div>

          {/* CONTROL BAR */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">
            {/* SEARCH */}
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
                placeholder="Cari peserta..."
                className={`transition-all duration-300 border border-gray-300 bg-white 
                  rounded-md shadow-sm text-sm h-10
                  ${
                    isSearchOpen
                      ? "w-56 pl-10 pr-3 opacity-100"
                      : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            {/* FILTER PAGE */}
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
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-lg shadow-md border border-gray-300 w-full max-w-[1200px] mx-auto overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
              <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
                <tr>
                  <th className="px-4 py-3 border border-gray-300">No</th>
                  <th className="px-4 py-3 border border-gray-300">Nama</th>
                  <th className="px-4 py-3 border border-gray-300">Email</th>
                  <th className="px-4 py-3 border border-gray-300">Telepon</th>
                  <th className="px-4 py-3 border border-gray-300">Pelatihan</th>
                  <th className="px-4 py-3 border border-gray-300">Tipe</th>
                  <th className="px-4 py-3 border border-gray-300">Status</th>
                  <th className="px-4 py-3 border border-gray-300">Spesifikasi</th>
                  <th className="px-4 py-3 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pageItems.map((r, i) => (
                  <tr key={r.id} className="hover:bg-blue-50 border">
                    <td className="border border-gray-300 px-4 py-2">
                      {startIndex + i + 1}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {r.name}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">{r.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{r.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {r.trainingTitle}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      {r.trainingType}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {r.status === "pending" && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">
                          Pending
                        </span>
                      )}
                      {r.status === "approved" && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                          Diterima
                        </span>
                      )}
                      {r.status === "rejected" && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">
                          Ditolak
                        </span>
                      )}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => setDetailData(r)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-green-600"
                      >
                        <Eye size={14} /> Detail
                      </button>
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            setStatusData({ data: r, action: "approved" })
                          }
                          className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-blue-700"
                        >
                          <Check size={14} /> Terima
                        </button>

                        <button
                          onClick={() =>
                            setStatusData({ data: r, action: "rejected" })
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-red-600"
                        >
                          <X size={14} /> Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-end items-center gap-2 px-4 py-4">
              <button
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-10 h-10 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                {"<"}
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 border rounded-md ${
                    safeCurrentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-10 h-10 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          </div>

          {/* MODALS */}
          {detailData && (
            <TrainingVerificationDetailModal
              data={detailData}
              onClose={() => setDetailData(null)}
            />
          )}

          {statusData && (
            <TrainingVerificationStatusModal
              data={statusData.data}
              action={statusData.action}
              onConfirm={() =>
                updateStatus(statusData.data.id!, statusData.action)
              }
              onClose={() => setStatusData(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
