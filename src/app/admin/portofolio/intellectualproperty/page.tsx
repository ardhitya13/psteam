"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import AddIntellectualPropertyCard from "../../components/AddIntellectualPropertyCard";
import EditIntellectualPropertyCard from "../../components/EditIntellectualPropertyCard";

type HkiItem = {
  no: number;
  judul: string;
  jenis: string;
  tahun: number;
};

export default function DaftarHkiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHki, setSelectedHki] = useState<HkiItem | null>(null);
  const itemsPerPage = 15;

  // Dummy data
  const [data, setData] = useState<HkiItem[]>([
    { no: 1, judul: "Poster Aplikasi Polibatam Guest", jenis: "Hak Cipta Nasional", tahun: 2021 },
    { no: 2, judul: "Sistem Informasi Organisasi Mahasiswa (SIOMA)", jenis: "Hak Cipta Nasional", tahun: 2022 },
    { no: 3, judul: "Sistem Informasi Pelatihan Karyawan Baru", jenis: "Hak Cipta Nasional", tahun: 2022 },
    { no: 4, judul: "Website Company Profile PT. ADE MESTAKUNG ABADI", jenis: "Hak Cipta Nasional", tahun: 2023 },
    ...Array.from({ length: 8 }, (_, i): HkiItem => ({
      no: i + 5,
      judul: `Judul HKI ${i + 5}`,
      jenis: "Hak Cipta Nasional",
      tahun: 2020 + ((i + 5) % 6),
    })),
  ]);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Tambah
  const handleAddData = (newData: { judul: string; jenis: string; tahun: number }) => {
    const newItem: HkiItem = { no: data.length + 1, ...newData };
    setData((prev) => [...prev, newItem]);
  };

  // Hapus
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // Edit
  const handleEdit = (no: number) => {
    const hki = data.find((item) => item.no === no) ?? null;
    setSelectedHki(hki);
    setIsEditModalOpen(!!hki);
  };

  // Simpan edit
  const handleUpdateData = (updatedData: HkiItem) => {
    setData((prev) =>
      prev.map((item) => (item.no === updatedData.no ? updatedData : item))
    );
    setIsEditModalOpen(false);
    setSelectedHki(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR HKI / PATEN DOSEN
        </h1>

        {/* Tombol & Filter */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah HKI / Paten
          </button>

          <div className="relative inline-block">
            <select className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-700 cursor-pointer">
              <option>Pilih Tahun</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>

          <div
            className={`flex items-center border rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${
              searchOpen ? "w-64" : "w-11"
            }`}
          >
            {searchOpen && (
              <input
                type="text"
                placeholder="Cari Judul HKI..."
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

        {/* Tabel */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">JUDUL KARYA</th>
                <th className="border border-gray-200 px-4 py-2 text-center">JENIS HKI</th>
                <th className="border border-gray-200 px-4 py-2 text-center">TAHUN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((item) => (
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
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center py-3 px-4 gap-1 text-sm">
            <span className="text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>
          </div>

          {/* Modal Tambah */}
          <AddIntellectualPropertyCard
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddData}
          />

          {/* Modal Edit */}
          <EditIntellectualPropertyCard
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateData}
            defaultData={selectedHki}
          />
        </div>
      </main>
    </div>
  );
}
