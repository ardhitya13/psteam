"use client";

import { ChevronDown, Search, FileText, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import TambahPenelitianCard from "../../components/TambahPenelitianCard";
import EditPenelitianCard from "../../components/EditPenelitianCard";

type PenelitianItem = {
  no: number;
  nama: string;
  judul: string;
  tahun: number;
};

export default function DaftarPenelitianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageGroup, setPageGroup] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPenelitian, setSelectedPenelitian] = useState<PenelitianItem | null>(null);

  const itemsPerPage = 15;

  // Data dummy awal
  const [data, setData] = useState<PenelitianItem[]>([
    { no: 1, nama: "Anggun Salsa F", judul: "Penelitian AI dalam Pendidikan", tahun: 2024 },
    { no: 2, nama: "Ardhitya Danur S", judul: "Optimasi Web Responsif", tahun: 2025 },
    { no: 3, nama: "Arifah Husaini", judul: "Analisis Data Mahasiswa", tahun: 2023 },
    { no: 4, nama: "Farhan Rasyid", judul: "Kursus Online Public Speaking", tahun: 2025 },
    ...Array.from({ length: 20 }, (_, i): PenelitianItem => ({
      no: i + 5,
      nama: `Nama Dosen ${i + 5}`,
      judul: `Judul Penelitian ${i + 5}`,
      tahun: 2020 + ((i + 5) % 6),
    })),
  ]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Tambah data
  const handleAddData = (newData: { nama: string; judul: string; tahun: number }) => {
    if (!newData.nama || !newData.judul || !newData.tahun) return;
    const newItem: PenelitianItem = {
      no: data.length + 1,
      nama: newData.nama,
      judul: newData.judul,
      tahun: newData.tahun,
    };
    setData((prev) => [...prev, newItem]);
    console.log(`✅ Penelitian baru '${newData.judul}' ditambahkan ke portofolio ${newData.nama}`);
  };

  // Hapus data
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // Buka modal edit
  const handleEdit = (no: number) => {
    const selected = data.find((item) => item.no === no);
    if (selected) {
      setSelectedPenelitian(selected);
      setIsEditModalOpen(true);
    }
  };

  // Simpan hasil edit
  const handleUpdateData = (updatedData: PenelitianItem) => {
    setData((prev) =>
      prev.map((item) => (item.no === updatedData.no ? updatedData : item))
    );
    setIsEditModalOpen(false);
    console.log(`📝 Data penelitian '${updatedData.judul}' berhasil diperbarui.`);
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
          DAFTAR PENELITIAN DOSEN
        </h1>

        {/* Tombol dan filter */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah Penelitian
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

          <div
            className={`flex items-center border rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${
              searchOpen ? "w-64" : "w-11"
            }`}
          >
            {searchOpen && (
              <input
                type="text"
                placeholder="Cari Judul Penelitian?"
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

        {/* Tabel Data */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2">NAMA DOSEN</th>
                <th className="border border-gray-200 px-4 py-2">JUDUL PENELITIAN</th>
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
            <button
              onClick={() => {
                if (currentPage > 1) {
                  const newGroup = Math.floor((currentPage - 2) / 3);
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  setPageGroup(newGroup);
                }
              }}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border text-xs transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-300 text-gray-800"
              }`}
            >
              &lt;
            </button>

            {Array.from({ length: 3 }, (_, i) => {
              const pageNumber = pageGroup * 3 + (i + 1);
              if (pageNumber > totalPages) return null;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-2 py-1 rounded text-xs border ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  const newGroup = Math.floor(currentPage / 3);
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  setPageGroup(newGroup);
                }
              }}
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

          {/* Modal Tambah */}
          <TambahPenelitianCard
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddData}
          />

          {/* Modal Edit */}
          <EditPenelitianCard
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateData}
            defaultData={selectedPenelitian}
          />
        </div>
      </main>
    </div>
  );
}
