"use client";

import React, { useEffect, useState } from "react";
import { Search, Trash2, Plus } from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

type Lecturer = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
};

export default function LecturerAdminPage() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // =============================================
  // FETCH DATA
  // =============================================
  const loadLecturers = () => {
    fetch("http://localhost:4000/api/lecturers")
      .then((r) => r.json())
      .then((data) => setLecturers(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    loadLecturers();
  }, []);

  // =============================================
  // FILTER
  // =============================================
  const filtered = lecturers.filter((l) => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =============================================
  // PAGINATION
  // =============================================
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, itemsPerPage]);

  // =============================================
  // DELETE LECTURER
  // =============================================
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus akun dosen ini?")) return;

    await fetch(`http://localhost:4000/api/lecturers/${id}`, {
      method: "DELETE",
    });

    loadLecturers();
  };

  // =============================================
  // RENDER
  // =============================================
  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
        >
          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase">Kelola Dosen</h1>
            <p className="text-gray-600 text-sm">Mengatur akun dosen untuk akses PSTEAM.</p>
          </div>

          {/* CONTROL BAR */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">

            {/* SEARCH */}
            <div className="relative flex items-center h-10">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => document.getElementById("searchInput")?.focus(), 50);
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-md absolute left-0"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => searchTerm === "" && setIsSearchOpen(false)}
                placeholder="Cari dosen..."
                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 
                  ${
                    isSearchOpen
                      ? "w-56 pl-10 pr-3 opacity-100"
                      : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            {/* ITEMS PER PAGE */}
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer"
            >
              {[10, 20, 30, 40].map((n) => (
                <option key={n} value={n}>{n} Halaman</option>
              ))}
            </select>

            {/* ADD BUTTON */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus size={16} /> Tambah Dosen
            </button>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-x-auto">

            <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
              <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">Nama</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Telepon</th>
                  <th className="border border-gray-300 px-4 py-2">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 italic text-gray-500">Belum ada dosen.</td>
                  </tr>
                ) : (
                  pageItems.map((l, i) => (
                    <tr key={l.id} className="hover:bg-blue-50 border">
                      <td className="border px-4 py-2">{startIndex + i + 1}</td>
                      <td className="border px-4 py-2 font-semibold">{l.name}</td>
                      <td className="border px-4 py-2">{l.email}</td>
                      <td className="border px-4 py-2">{l.phone || "-"}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleDelete(l.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
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
                    const newGroup = Math.floor((currentPage - 2) / 3);
                    setCurrentPage((prev) => prev - 1);
                    setPageGroup(newGroup);
                  }
                }}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded border text-xs ${
                  currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-gray-300"
                }`}
              >
                &lt;
              </button>

              {/* 3 PAGE NUMBERS */}
              {Array.from({ length: 3 }, (_, i) => {
                const pageNumber = pageGroup * 3 + (i + 1);
                if (pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-2 py-1 rounded border text-xs ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-300"
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
                    setCurrentPage((prev) => prev + 1);
                    setPageGroup(newGroup);
                  }
                }}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded border text-xs ${
                  currentPage === totalPages
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
    </div>
  );
}
