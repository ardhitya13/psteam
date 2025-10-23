"use client";

import { ChevronDown, Search, FileText } from "lucide-react";
import { useState } from "react";
import NavbarDosen from "../../components/NavbarDosen";
import SidebarDosen from "../../components/SidebarDosen";

export default function PublikasiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const data = [
    { no: 1, nama: "Nama1", judul: "Website pemesanan online coffee shop", noTelp: "08123456789" },
    { no: 2, nama: "Nama2", judul: "Aplikasi mobile penjualan tshirt", noTelp: "08123456789" },
    { no: 3, nama: "Nama3", judul: "Website antrian parkir mobil", noTelp: "08123456789" },
    { no: 4, nama: "Nama4", judul: "Website kursus online public speaking", noTelp: "08123456789" },
    // Tambahkan data dummy agar banyak
    ...Array.from({ length: 30 }, (_, i) => ({
      no: i + 6,
      nama: `Nama ${i + 6}`,
      judul: `Judul Proyek ${i + 6}`,
      noTelp: "08123456789",
    })),
  ];

  const visibleData = showAll ? data : data.slice(0, 9);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar */}
      <SidebarDosen isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        {/* Judul */}
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          PROYEK AJUAN TAMU ATAU KLIEN
        </h1>

        {/* Baris kontrol atas tabel */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          {/* Dropdown kiri */}
          <div className="relative inline-block">
            <select className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-700 cursor-pointer">
              <option>Tipe Riwayat</option>
              <option>Diterima</option>
              <option>Ditolak</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>

          {/* Search kanan */}
          <div className="flex w-full sm:w-auto max-w-xl items-center border rounded-lg overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              placeholder="Cari Judul Proyek?"
              className="flex-grow px-4 py-2 focus:outline-none border rounded-lg"
            />
            <button className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2">NO</th>
                <th className="border border-gray-200 px-4 py-2">NAMA</th>
                <th className="border border-gray-200 px-4 py-2">JUDUL</th>
                <th className="border border-gray-200 px-4 py-2">NO TELP</th>
                <th className="border border-gray-200 px-4 py-2">SPESIFIKASI</th>
                <th className="border border-gray-200 px-4 py-2">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((item) => (
                <tr key={item.no}>
                  <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.nama}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.judul}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{item.noTelp}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                      <FileText size={14} /> Detail
                    </button>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center flex justify-center gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded">
                      Terima
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded">
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tombol Lihat Semua / Lihat Sedikit */}
          <div className="flex justify-center py-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded transition-all"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
