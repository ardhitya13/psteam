"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import TambahPengabdianCard from "../../components/TambahPengabdianCard";
import EditPengabdianCard from "../../components/EditPengabdianCard";

type PengabdianItem = {
  no: number;
  nama: string;
  judul: string;
  tahun: number;
};

export default function DaftarPengabdianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPengabdian, setSelectedPengabdian] = useState<PengabdianItem | null>(null);
  const itemsPerPage = 15;

  // ✅ Data Dummy tanpa status
  const [data, setData] = useState<PengabdianItem[]>([
    {
      no: 1,
      nama: "Dr. Anggun Salsa F",
      judul: "Pelatihan Literasi Digital untuk UMKM",
      tahun: 2024,
    },
    {
      no: 2,
      nama: "Ardhitya Danur S",
      judul: "Edukasi Keamanan Siber di Sekolah",
      tahun: 2025,
    },
    {
      no: 3,
      nama: "Arifah Husaini",
      judul: "Pelatihan Data Management untuk Mahasiswa",
      tahun: 2023,
    },
    ...Array.from({ length: 10 }, (_, i): PengabdianItem => ({
      no: i + 4,
      nama: `Nama Dosen ${i + 4}`,
      judul: `Judul Pengabdian ${i + 4}`,
      tahun: 2020 + ((i + 4) % 6),
    })),
  ]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Tambah Data
  const handleAddData = (newData: { nama: string; judul: string; tahun: number }) => {
    const newItem: PengabdianItem = {
      no: data.length + 1,
      nama: newData.nama,
      judul: newData.judul,
      tahun: newData.tahun,
    };
    setData((prev) => [...prev, newItem]);
  };

  // Hapus Data
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // Edit Data
  const handleEdit = (no: number) => {
    const pengabdian = data.find((item) => item.no === no) ?? null;
    setSelectedPengabdian(pengabdian);
    setIsEditModalOpen(!!pengabdian);
  };

  // Simpan Edit
  const handleUpdateData = (updatedData: PengabdianItem) => {
    setData((prev) =>
      prev.map((item) => (item.no === updatedData.no ? updatedData : item))
    );
    setIsEditModalOpen(false);
    setSelectedPengabdian(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR PENGABDIAN MASYARAKAT
        </h1>

        {/* 🔹 Kontrol Atas */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah Pengabdian
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
                placeholder="Cari Judul Pengabdian..."
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

        {/* 🔹 Tabel Data tanpa status */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">NAMA DOSEN</th>
                <th className="border border-gray-200 px-4 py-2">JUDUL PENGABDIAN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">TAHUN</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.nama}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.judul}</td>
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
          <TambahPengabdianCard
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddData}
          />

          {/* Modal Edit */}
          <EditPengabdianCard
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateData}
            defaultData={selectedPengabdian}
          />
        </div>
      </main>
    </div>
  );
}
