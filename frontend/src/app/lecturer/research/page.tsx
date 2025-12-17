"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahPenelitianCard from "../components/AddResearchCard";
import EditPenelitianCard from "../components/EditResearchCard";

type PenelitianItem = {
  no: number;
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

  // Dummy data tanpa nama
  const [data, setData] = useState<PenelitianItem[]>(
    Array.from({ length: 25 }, (_, i) => ({
      no: i + 1,
      title: `Judul Penelitian ${i + 1}`,
      year: 2020 + ((i + 1) % 6),
    }))
  );

  // Tambah
  const handleAddData = (newData: { title: string; year: number }) => {
    const newItem: PenelitianItem = {
      no: data.length + 1,
      title: newData.title,
      year: newData.year,
    };
    setData((prev) => [...prev, newItem]);
  };

  // Edit
  const handleEdit = (no: number) => {
    const penelitian = data.find((item) => item.no === no) ?? null;
    setSelectedPenelitian(penelitian);
    setIsEditModalOpen(!!penelitian);
  };

  const handleUpdateData = (updatedData: { no: number; title: string; year: number }) => {
    setData((prev) =>
      prev.map((item) =>
        item.no === updatedData.no ? { ...item, title: updatedData.title, year: updatedData.year } : item
      )
    );
    setIsEditModalOpen(false);
    setSelectedPenelitian(null);
  };

  // Hapus
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // Filter
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const cocokYear = selectedYear === "Semua" || item.year === Number(selectedYear);
      const cocokTitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokYear && cocokTitle;
    });
  }, [data, searchTerm, selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
    setPageStart(1);
  }, [searchTerm, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-300 pt-0 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"} mt-[85px]`}>

        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR PENELITIAN DOSEN
        </h1>

        {/* kontrol */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah Penelitian
          </button>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
          >
            <option value="Semua">Semua Tahun</option>
            {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <div className="flex items-center border rounded-lg bg-white shadow-sm overflow-hidden w-64">
            <input
              type="text"
              placeholder="Cari Judul Penelitian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-2.5 focus:outline-none text-sm"
            />
            <div className="bg-blue-600 text-white px-3 py-3 flex items-center">
              <Search size={16} />
            </div>
          </div>
        </div>

        {/* === TABEL (SAMA PERSIS KARYA ILMIAH) === */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">JUDUL PENELITIAN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">TAHUN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item) => (
                  <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
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
                  <td colSpan={4} className="text-center py-4 text-gray-500 italic">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination */}
          <div className="flex justify-end items-center px-4 py-3 border-t bg-white rounded-b-lg">
            <button onClick={handlePrevGroup} disabled={pageStart === 1} className="px-2 py-1 border rounded text-xs">
              {"<"}
            </button>

            {visiblePages.map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-2 py-1 border rounded text-xs mx-1 ${currentPage === page ? "bg-blue-600 text-white" : ""}`}>
                {page}
              </button>
            ))}

            <button onClick={handleNextGroup} disabled={pageStart + maxVisiblePages - 1 >= totalPages} className="px-2 py-1 border rounded text-xs">
              {">"}
            </button>
          </div>
        </div>

        {/* modal */}
        <TambahPenelitianCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddData} />

        <EditPenelitianCard
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateData}
          defaultData={
            selectedPenelitian
              ? {
                  no: selectedPenelitian.no,
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
