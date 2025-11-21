"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import AddIntellectualPropertyCard from "../components/AddIntellectualPropertyCard";
import EditIntellectualPropertyCard from "../components/EditIntellectualPropertyCard";

type HkiItem = {
  no: number;
  title: string;
  type: string;
  year: number;
};

export default function DaftarHkiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHki, setSelectedHki] = useState<HkiItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const itemsPerPage = 10;
  const maxVisiblePages = 2;

  // === Data Dummy ===
  const [data, setData] = useState<HkiItem[]>(
    [
      { no: 1, title: "Poster Aplikasi Polibatam Guest", type: "Hak Cipta Nasional", year: 2021 },
      { no: 2, title: "Sistem Informasi Organisasi Mahasiswa (SIOMA)", type: "Hak Cipta Nasional", year: 2022 },
      { no: 3, title: "Sistem Informasi Pelatihan Karyawan Baru", type: "Hak Cipta Nasional", year: 2022 },
      { no: 4, title: "Website Company Profile PT. ADE MESTAKUNG ABADI", type: "Hak Cipta Nasional", year: 2023 },
      { no: 5, title: "Aplikasi Absensi Berbasis QR Code", type: "Hak Cipta Nasional", year: 2023 },
      { no: 6, title: "Sistem E-Learning Polibatam", type: "Hak Cipta Nasional", year: 2024 },
      { no: 7, title: "Desain UI Dashboard Akademik", type: "Hak Cipta Nasional", year: 2025 },
      { no: 8, title: "Aplikasi Inventaris Barang Kampus", type: "Hak Cipta Nasional", year: 2024 },
      { no: 9, title: "Website Monitoring Proyek Mahasiswa", type: "Hak Cipta Nasional", year: 2025 },
      { no: 10, title: "Sistem Penilaian Dosen Otomatis", type: "Hak Cipta Nasional", year: 2025 },
      { no: 11, title: "Aplikasi Keuangan Digital Kampus", type: "Hak Cipta Nasional", year: 2023 },
      { no: 12, title: "Aplikasi Pengajuan Surat Mahasiswa", type: "Hak Cipta Nasional", year: 2024 },
    ]
  );

  // === Tambah Data ===
  const handleAddData = (newData: { title: string; type: string; year: number }) => {
    const newItem: HkiItem = {
      no: data.length + 1,
      title: newData.title,
      type: newData.type,
      year: newData.year,
    };
    setData((prev) => [...prev, newItem]);
  };

  // === Edit Data ===
  const handleEdit = (no: number) => {
    const hki = data.find((item) => item.no === no) ?? null;
    setSelectedHki(hki);
    setIsEditModalOpen(!!hki);
  };

  const handleUpdateData = (updatedData: HkiItem) => {
    setData((prev) =>
      prev.map((item) => (item.no === updatedData.no ? updatedData : item))
    );
    setIsEditModalOpen(false);
    setSelectedHki(null);
  };

  // === Hapus Data ===
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // === Filter & Search ===
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const cocokyear = selectedYear === "Semua" || item.year === Number(selectedYear);
      const cocoktitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokyear && cocoktitle;
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
          DAFTAR HKI / PATEN DOSEN
        </h1>

        {/* === Tombol & Filter === */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          {/* Tambah HKI */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah HKI / Paten
          </button>

          {/* Filter year */}
          <div className="relative inline-block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-900 cursor-pointer"
            >
              <option value="Semua">Semua Tahun</option>
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

          {/* Pencarian */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm overflow-hidden w-64 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <input
              type="text"
              placeholder="Cari title HKI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-2.5 focus:outline-none text-sm rounded-lg text-gray-900 placeholder-gray-500"
            />
            <div className="bg-blue-600 text-white px-3 py-3 flex items-center justify-center border-l border-blue-700">
              <Search size={16} />
            </div>
          </div>
        </div>

        {/* === Tabel Data === */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">title KARYA</th>
                <th className="border border-gray-200 px-4 py-2 text-center">type HKI</th>
                <th className="border border-gray-200 px-4 py-2 text-center">year</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item) => (
                  <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.type}</td>
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

          {/* === Pagination <1 2> Geser === */}
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

            {Array.from({ length: Math.min(maxVisiblePages, totalPages - pageStart + 1) }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(pageStart + i)}
                className={`px-2 py-1 border rounded text-xs font-medium mx-0.5 ${
                  currentPage === pageStart + i
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                {pageStart + i}
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
        <AddIntellectualPropertyCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddData}
        />
        <EditIntellectualPropertyCard
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateData}
          defaultData={selectedHki}
        />
      </main>
    </div>
  );
}
