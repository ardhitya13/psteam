"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import TambahKaryaIlmiahCard from "../../components/TambahKaryaIlmiahCard";
import EditKaryaIlmiahCard from "../../components/EditKaryaIlmiahCard";

type KaryaIlmiahItem = {
  no: number;
  judul: string;
  jenis: string;
  tahun: number;
};

export default function DaftarKaryaIlmiahPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKarya, setSelectedKarya] = useState<KaryaIlmiahItem | null>(null);
  const itemsPerPage = 15;

  // ✅ Data Dummy
  const [data, setData] = useState<KaryaIlmiahItem[]>([
    {
      no: 1,
      judul: "Interpretable Machine Learning for Job Placement Prediction",
      jenis: "Jurnal Nasional Terakreditasi",
      tahun: 2025,
    },
    {
      no: 2,
      judul: "Penerapan Teknologi Raspberry Pi dalam Monitoring Kehadiran",
      jenis: "Jurnal Nasional",
      tahun: 2024,
    },
    {
      no: 3,
      judul: "Classification of Alzheimer Disease from MRI Image",
      jenis: "Prosiding Seminar Internasional",
      tahun: 2023,
    },
    ...Array.from({ length: 10 }, (_, i): KaryaIlmiahItem => ({
      no: i + 4,
      judul: `Judul Karya Ilmiah ${i + 4}`,
      jenis:
        i % 2 === 0
          ? "Jurnal Nasional Terakreditasi"
          : "Prosiding Seminar Nasional",
      tahun: 2020 + ((i + 4) % 6),
    })),
  ]);

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const visibleData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Tambah Data
  const handleAddData = (newData: { judul: string; jenis: string; tahun: number }) => {
    if (!newData.judul || !newData.jenis || !newData.tahun) return;
    const newItem: KaryaIlmiahItem = {
      no: data.length + 1,
      judul: newData.judul,
      jenis: newData.jenis,
      tahun: newData.tahun,
    };
    setData((prev) => [...prev, newItem]);
  };

  // Hapus
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus karya ilmiah ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // Edit
  const handleEdit = (no: number) => {
    const karya = data.find((item) => item.no === no);
    if (karya) {
      setSelectedKarya(karya);
      setIsEditModalOpen(true);
    }
  };

  // Simpan hasil edit
  const handleUpdateData = (updatedData: KaryaIlmiahItem) => {
    setData((prev) =>
      prev.map((item) => (item.no === updatedData.no ? { ...updatedData } : item))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarAdmin
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR KARYA ILMIAH
        </h1>

        {/* 🔹 Kontrol Atas */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah Karya Ilmiah
          </button>

          <div className="relative inline-block">
            <select className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-700 cursor-pointer">
              <option>Filter Tahun</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>

          {/* 🔍 Search */}
          <div
            className={`flex items-center border rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${
              searchOpen ? "w-64" : "w-11"
            }`}
          >
            {searchOpen && (
              <input
                type="text"
                placeholder="Cari Judul Karya Ilmiah..."
                className="flex-grow px-3 py-2.5 focus:outline-none text-sm rounded-lg"
              />
            )}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="bg-blue-600 text-white px-3 py-3 flex items-center justify-center border rounded-lg hover:bg-blue-700 transition-all"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* 🔹 Tabel Data */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">JUDUL KARYA</th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  JENIS KARYA
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  TAHUN
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  AKSI
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleData.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {item.no}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.judul}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {item.jenis}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {item.tahun}
                  </td>
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
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center py-3 px-4 gap-1 text-sm">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border text-xs transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-300 text-gray-800"
              }`}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 rounded text-xs border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border text-xs transition-all ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-300 text-gray-800"
              }`}
            >
              &gt;
            </button>
          </div>

          {/* Modals */}
          <TambahKaryaIlmiahCard
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddData}
          />
          <EditKaryaIlmiahCard
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateData}
            defaultData={selectedKarya}
          />
        </div>
      </main>
    </div>
  );
}
