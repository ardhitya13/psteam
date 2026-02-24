"use client";

import { Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Swal from "sweetalert2";

import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahPenelitianCard from "../components/AddResearchCard";
import EditPenelitianCard from "../components/EditResearchCard";

/* ================= LIB ================= */
import {
  getMyResearch,
  addResearch,
  updateResearch,
  deleteResearch,
} from "@/lib/lecturer";

/* ================= TYPES ================= */
type PenelitianItem = {
  id: number;
  title: string;
  year: number;
};

export default function DaftarPenelitianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<PenelitianItem[]>([]);
  const [selectedPenelitian, setSelectedPenelitian] =
    useState<PenelitianItem | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  /* ================= SEARCH ================= */
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  /* ================= FILTER ================= */
  const [selectedYear, setSelectedYear] = useState("Semua");

  /* ================= PAGINATION (STANDARD) ================= */
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const res = await getMyResearch();
      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : [];
      setData(list);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setData([]);
    }
  };

  /* ================= ADD ================= */
  const handleAddResearch = async (data: {
    title: string;
    year: number;
  }) => {
    await addResearch(data);
    setIsModalOpen(false);
    await fetchData();

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data penelitian berhasil ditambahkan",
    });
  };

  /* ================= EDIT ================= */
  const handleEditResearch = async (data: {
    id: number;
    title: string;
    year: number;
  }) => {
    const confirmEdit = await Swal.fire({
      icon: "warning",
      title: "Yakin mengubah data ini?",
      html: `
        <b>Judul:</b> ${selectedPenelitian?.title} → <b>${data.title}</b><br/>
        <b>Tahun:</b> ${selectedPenelitian?.year} → <b>${data.year}</b>
      `,
      showCancelButton: true,
      confirmButtonText: "Ya, Ubah",
      cancelButtonText: "Batal",
    });

    if (!confirmEdit.isConfirmed) return;

    await updateResearch(data.id, {
      title: data.title,
      year: data.year,
    });

    setIsEditModalOpen(false);
    setSelectedPenelitian(null);
    await fetchData();

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data penelitian berhasil diubah",
    });
  };

  /* ================= DELETE ================= */
  const handleDeleteResearch = async (id: number) => {
    const item = data.find((d) => d.id === id);

    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus penelitian ini?",
      html: `
        <b>Judul:</b> ${item?.title}<br/>
        <b>Tahun:</b> ${item?.year}
      `,
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!confirmDelete.isConfirmed) return;

    await deleteResearch(id);
    await fetchData();

    await Swal.fire({
      icon: "success",
      title: "Dihapus",
      text: "Data penelitian berhasil dihapus",
    });
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, selectedYear, itemsPerPage]);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  /* ================= FILTER & PAGINATION ================= */
  const yearOptions = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.year))).sort((a, b) => b - a),
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchYear =
        selectedYear === "Semua" || item.year === Number(selectedYear);
      const matchSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchYear && matchSearch;
    });
  }, [data, searchTerm, selectedYear]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen pt-0.5 bg-gray-100">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black uppercase">
            Daftar Penelitian Dosen
          </h1>
          <p className="text-gray-600 text-sm">
            Detail penelitian dosen — edit dan tambah melalui modal.
          </p>
        </div>

        {/* ================= TOOLBAR ================= */}
        <div className="flex justify-end items-center gap-3 mb-4 flex-wrap">
          {/* SEARCH */}
          <div className="relative flex items-center h-10">
            {!isSearchOpen && (
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchRef.current?.focus(), 50);
                }}
                className="absolute left-0 w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md"
              >
                <Search size={18} />
              </button>
            )}

            <input
              ref={searchRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => !searchTerm.trim() && setIsSearchOpen(false)}
              placeholder="Cari judul..."
              className={`transition-all duration-300 h-10 border bg-white text-black rounded-md shadow-sm text-sm ${isSearchOpen
                  ? "w-56 pl-10 pr-3 opacity-100"
                  : "w-10 opacity-0 pointer-events-none"
                }`}
            />
          </div>

          {/* FILTER YEAR */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
          >
            <option value="Semua">Semua Tahun</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* ITEMS PER PAGE */}
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
          >
            {[5, 10, 15, 20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>
                {n} Halaman
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus size={16} /> Tambah Penelitian
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div
          className={`bg-white shadow-md rounded-lg border border-gray-300 overflow-auto ${isSidebarOpen ? "min-w-[1057px]" : "w-full"
            }`}
        >
          <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
            <thead className="bg-[#eaf0fa] text-gray-800 font-semibold uppercase">
              <tr>
                <th className="border px-4 py-3 border-gray-300">NO</th>
                <th className="border px-4 py-3 border-gray-300 text-left">
                  JUDUL
                </th>
                <th className="border px-4 py-3 border-gray-300">TAHUN</th>
                <th className="border px-4 py-3 border-gray-300">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="border px-4 py-6 border-gray-300 text-gray-500 italic"
                  >
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                visibleData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 border-gray-300">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="border px-4 py-2 border-gray-300 text-left">
                      {item.title}
                    </td>
                    <td className="border px-4 py-2 border-gray-300">
                      {item.year}
                    </td>
                    <td className="border px-4 py-2 border-gray-300">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedPenelitian(item);
                            setIsEditModalOpen(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-md font-semibold hover:bg-yellow-500 transition"
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          onClick={() => handleDeleteResearch(item.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
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

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-end items-center py-1 px-4 gap-2 text-sm bg-white">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  const newGroup = Math.floor((currentPage - 2) / 3);
                  setCurrentPage((p) => p - 1);
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
                  setCurrentPage((p) => p + 1);
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
      </main>

      <TambahPenelitianCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddResearch}
      />

      <EditPenelitianCard
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultData={selectedPenelitian}
        onSubmit={handleEditResearch}
      />
    </div>
  );
}
