"use client";

import { ChevronDown, Search, Plus, Edit, Upload, Trash2 } from "lucide-react";
import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import TambahHkiCard from "../../components/TambahHkiCard";

type HkiItem = {
  no: number;
  judul: string;
  jenis: string;
  tahun: number;
  status: "Belum Diterbitkan" | "Sudah Diterbitkan";
};

export default function DaftarHkiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageGroup, setPageGroup] = useState(0);
  const itemsPerPage = 15;

  // Data dummy HKI
  const [data, setData] = useState<HkiItem[]>(() => [
    { no: 1, judul: "Poster Aplikasi Polibatam Guest", jenis: "Hak Cipta Nasional", tahun: 2021, status: "Sudah Diterbitkan" },
    { no: 2, judul: "Sistem Informasi Organisasi Mahasiswa (SIOMA)", jenis: "Hak Cipta Nasional", tahun: 2022, status: "Sudah Diterbitkan" },
    { no: 3, judul: "Sistem Informasi Pelatihan Karyawan Baru", jenis: "Hak Cipta Nasional", tahun: 2022, status: "Sudah Diterbitkan" },
    { no: 4, judul: "Website Company Profile PT. ADE MESTAKUNG ABADI", jenis: "Hak Cipta Nasional", tahun: 2023, status: "Sudah Diterbitkan" },
    ...Array.from({ length: 8 }, (_, i): HkiItem => ({
      no: i + 5,
      judul: `Judul HKI ${i + 5}`,
      jenis: "Hak Cipta Nasional",
      tahun: 2020 + ((i + 5) % 6),
      status: Math.random() > 0.5 ? "Sudah Diterbitkan" : "Belum Diterbitkan",
    })),
  ]);

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Fungsi tambah data
  const handleAddData = (newData: { judul: string; jenis: string; tahun: number }) => {
    if (!newData.judul || !newData.jenis || !newData.tahun) return;
    const newItem: HkiItem = {
      no: data.length + 1,
      judul: newData.judul,
      jenis: newData.jenis,
      tahun: newData.tahun,
      status: "Belum Diterbitkan",
    };
    setData((prev) => [...prev, newItem]);
  };

  // Fungsi ubah status
  const handleTerbitkan = (no: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.no === no ? { ...item, status: "Sudah Diterbitkan" } : item
      )
    );
  };

  // Fungsi hapus
  const handleHapus = (no: number) => {
    if (confirm("Yakin ingin menghapus data HKI ini?")) {
      setData((prev) => prev.filter((item) => item.no !== no));
    }
  };

  // Fungsi edit
  const handleEdit = (no: number) => {
    alert(`Edit data HKI nomor ${no}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR HKI / PATEN DOSEN
        </h1>

        {/* Kontrol Atas */}
        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah HKI / Paten
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
            className={`flex items-center border rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${searchOpen ? "w-64" : "w-11"
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
                <th className="border border-gray-200 px-4 py-2 text-center">STATUS</th>
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
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${item.status === "Sudah Diterbitkan"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      {item.status === "Belum Diterbitkan" ? (
                        <>
                          <button
                            onClick={() => handleTerbitkan(item.no)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded flex items-center gap-1 shadow-sm transition-all"
                          >
                            <Upload size={14} /> Terbitkan
                          </button>
                          <button
                            onClick={() => handleHapus(item.no)}
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1 shadow-sm transition-all"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
              className={`px-2 py-1 rounded border text-xs transition-all ${currentPage === 1
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
                className={`px-2 py-1 rounded text-xs border ${currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border text-xs transition-all ${currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                }`}
            >
              &gt;
            </button>
          </div>

          {/* Modal Tambah */}
          <TambahHkiCard
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddData}
          />
        </div>
      </main>
    </div>
  );
}
