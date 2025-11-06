"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NavbarDosen from "../components/NavbarDosen";
import SidebarDosen from "../components/SidebarDosen";
import TambahKaryaIlmiahCard from "../components/TambahKaryaIlmiahCard";

type KaryaIlmiahItem = {
  no: number;
  judul: string;
  jenis: string;
  tahun: number;
};

export default function DaftarKaryaIlmiahPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 2;

  // === Data Dummy ===
  const [data, setData] = useState<KaryaIlmiahItem[]>(
    [
      { no: 1, judul: "Penerapan IoT dalam Smart Campus", jenis: "Jurnal Nasional Terakreditasi", tahun: 2025 },
      { no: 2, judul: "Analisis Big Data untuk Prediksi Cuaca", jenis: "Jurnal Internasional", tahun: 2024 },
      { no: 3, judul: "Studi Desain UI/UX untuk Aplikasi Edukasi", jenis: "Prosiding Nasional", tahun: 2023 },
      { no: 4, judul: "Implementasi Blockchain dalam Keamanan Data", jenis: "Jurnal Nasional", tahun: 2025 },
      { no: 5, judul: "Pemanfaatan AI untuk Pendidikan Digital", jenis: "Jurnal Nasional Terakreditasi", tahun: 2022 },
      { no: 6, judul: "Optimalisasi Energi dengan Teknologi Smart Grid", jenis: "Prosiding Internasional", tahun: 2021 },
      { no: 7, judul: "Sistem Keamanan Jaringan Berbasis IDS", jenis: "Jurnal Nasional", tahun: 2023 },
      { no: 8, judul: "Pengembangan Chatbot Akademik Berbasis NLP", jenis: "Prosiding Nasional", tahun: 2024 },
      { no: 9, judul: "Pemanfaatan Cloud Computing untuk UMKM", jenis: "Jurnal Nasional", tahun: 2025 },
      { no: 10, judul: "Rancang Bangun Aplikasi Kesehatan Digital", jenis: "Jurnal Internasional", tahun: 2022 },
      { no: 11, judul: "Sistem Informasi Pengelolaan Sekolah", jenis: "Jurnal Nasional", tahun: 2021 },
      { no: 12, judul: "Pemodelan Data Mahasiswa Menggunakan AI", jenis: "Jurnal Nasional Terakreditasi", tahun: 2024 },
    ]
  );

  // === Tambah Data ===
  const handleAddData = (newData: { judul: string; jenis: string; tahun: number }) => {
    const newItem: KaryaIlmiahItem = {
      no: data.length + 1,
      judul: newData.judul,
      jenis: newData.jenis,
      tahun: newData.tahun,
    };
    setData((prev) => [...prev, newItem]);
  };

  // === Edit Data (dummy) ===
  const handleEdit = (no: number) => {
    alert(`Edit karya ilmiah nomor ${no}`);
  };

  // === Hapus Data ===
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus karya ilmiah ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // === Filter & Search ===
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const cocokTahun = selectedYear === "Semua" || item.tahun === Number(selectedYear);
      const cocokJudul = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokTahun && cocokJudul;
    });
  }, [data, searchTerm, selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
    setPageStart(1);
  }, [searchTerm, selectedYear]);

  // === Pagination ===
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
          DAFTAR KARYA ILMIAH DOSEN
        </h1>

        {/* === Kontrol Atas === */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          {/* Tambah Data */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah Karya Ilmiah
          </button>

          {/* Filter Tahun */}
          <div className="relative inline-block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-900 cursor-pointer"
            >
              <option value="Semua">Semua Tahun</option>
              {[2025, 2024, 2023, 2022, 2021].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>

          {/* Pencarian */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm overflow-hidden w-64 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <input
              type="text"
              placeholder="Cari Judul Karya Ilmiah..."
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
                <th className="border border-gray-200 px-4 py-2">JUDUL KARYA</th>
                <th className="border border-gray-200 px-4 py-2 text-center">JENIS</th>
                <th className="border border-gray-200 px-4 py-2 text-center">TAHUN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item) => (
                  <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.judul}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.jenis}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.tahun}</td>
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

          {/* === Pagination <1 2> === */}
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

        {/* Modal Tambah */}
        <TambahKaryaIlmiahCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddData}
        />
      </main>
    </div>
  );
}
