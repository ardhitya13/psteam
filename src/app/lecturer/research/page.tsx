"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahPenelitianCard from "../components/AddResearchCard";
import EditCommunityServiceCard from "../components/EditCommunityServiceCard";

type PenelitianItem = {
  no: number;
  nama: string;
  title: string;
  year: number;
};

export default function DaftarPenelitianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPenelitian, setSelectedPenelitian] = useState<PenelitianItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 2;

  // === Data Dummy ===
  const [data, setData] = useState<PenelitianItem[]>(
    Array.from({ length: 25 }, (_, i) => ({
      no: i + 1,
      nama: "Arifah Husaini",
      title: `title Penelitian ${i + 1}`,
      year: 2020 + ((i + 1) % 6),
    }))
  );

  // === Tambah Data ===
  const handleAddData = (newData: { nama: string; title: string; year: number }) => {
    const newItem: PenelitianItem = {
      no: data.length + 1,
      nama: "Arifah Husaini",
      title: newData.title,
      year: newData.year,
    };
    setData((prev) => [...prev, newItem]);
  };

  // === Edit Data ===
  const handleEdit = (no: number) => {
    const penelitian = data.find((item) => item.no === no) ?? null;
    setSelectedPenelitian(penelitian);
    setIsEditModalOpen(!!penelitian);
  };

  const handleUpdateData = (updatedData: { no: number; nama: string; title: string; year: number }) => {
    setData((prev) =>
      prev.map((item) =>
        item.no === updatedData.no
          ? { ...item, title: updatedData.title, year: updatedData.year }
          : item
      )
    );
    setIsEditModalOpen(false);
    setSelectedPenelitian(null);
  };

  // === Hapus Data ===
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // === Filter + Pencarian ===
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const cocokyear = selectedYear === "Semua" || item.year === Number(selectedYear);
      const cocoktitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokyear && cocoktitle;
    });
  }, [data, searchTerm, selectedYear]);

  // Reset pagination saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
    setPageStart(1);
  }, [searchTerm, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // === Pagination Sliding <1 2> ===
  const visiblePages = Array.from(
    { length: Math.min(maxVisiblePages, totalPages - pageStart + 1) },
    (_, i) => pageStart + i
  );

  const handleNextGroup = () => {
    if (pageStart + maxVisiblePages - 1 < totalPages) {
      setPageStart(pageStart + 1);
      setCurrentPage(pageStart + 1);
    }
  };

  const handlePrevGroup = () => {
    if (pageStart > 1) {
      setPageStart(pageStart - 1);
      setCurrentPage(pageStart - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR PENELITIAN DOSEN
        </h1>

        {/* === Kontrol Atas === */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          {/* Tambah */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah Penelitian
          </button>

          {/* Filter year */}
          <div className="relative inline-block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-900 cursor-pointer"
            >
              <option value="Semua">Semua year</option>
              {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>

          {/* Cari */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm overflow-hidden w-64 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <input
              type="text"
              placeholder="Cari title Penelitian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-2.5 focus:outline-none text-sm rounded-lg text-gray-900 placeholder-gray-500"
            />
            <div className="bg-blue-600 text-white px-3 py-3 flex items-center justify-center border-l border-blue-700">
              <Search size={16} />
            </div>
          </div>
        </div>

        {/* === Tabel === */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">NAMA DOSEN</th>
                <th className="border border-gray-200 px-4 py-2">title PENELITIAN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">year</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item) => (
                  <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.nama}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.year}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item.no)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleHapus(item.no)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* === Pagination < 1 2 > === */}
          <div className="flex justify-end items-center px-4 py-3 border-t bg-white rounded-b-lg">
            <button
              onClick={handlePrevGroup}
              disabled={pageStart === 1}
              className={`px-2 py-1 border rounded text-xs font-medium ${
                pageStart === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200 text-gray-800"
              }`}
            >
              &lt;
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1 border rounded text-xs font-medium mx-0.5 ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextGroup}
              disabled={pageStart + maxVisiblePages - 1 >= totalPages}
              className={`px-2 py-1 border rounded text-xs font-medium ${
                pageStart + maxVisiblePages - 1 >= totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200 text-gray-800"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* === Modal Tambah & Edit === */}
        <TambahPenelitianCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddData}
        />

        <EditCommunityServiceCard
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateData}
          defaultData={
            selectedPenelitian
              ? {
                  no: selectedPenelitian.no,
                  nama: selectedPenelitian.nama,
                  title: selectedPenelitian.title,
                  year: selectedPenelitian.year,
                }
              : null
          }
        />
      </main>
    </div>
  );
}
