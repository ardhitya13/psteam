"use client";

import { ChevronDown, Search, FileText, Plus } from "lucide-react";
import { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";

export default function DaftarPenelitianPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Data dummy
    const data = [
        { no: 1, nama: "Anggun Salsa F", judul: "Penelitian AI dalam pendidikan", noTelp: "08123456789" },
        { no: 2, nama: "Ardithya Danur S", judul: "Optimasi Web Responsif", noTelp: "08123456789" },
        { no: 3, nama: "Arifah Husaini", judul: "Analisis Data Mahasiswa", noTelp: "08123456789" },
        { no: 4, nama: "Farhan Rasyid", judul: "Kursus Online Public Speaking", noTelp: "08123456789" },
        // Tambahkan data dummy tambahan
        ...Array.from({ length: 60 }, (_, i) => ({
            no: i + 5,
            nama: `Nama ${i + 5}`,
            judul: `Judul Penelitian ${i + 5}`,
            noTelp: "08123456789",
        })),
    ];

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const [pageGroup, setPageGroup] = useState(0);


    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* Navbar */}
            <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Sidebar */}
            <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Main Content */}
            <main
                className={`transition-all duration-300 pt-0 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
                    } mt-[85px]`}
            >
                {/* Judul */}
                <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
                    DAFTAR PENELITIAN DOSEN
                </h1>

                {/* Kontrol Atas Tabel */}
                <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
                    {/* Tombol Tambah */}
                    <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 border rounded-lg shadow-sm text-sm">
                        <Plus size={16} /> Tambah
                    </button>

                    {/* Filter Dropdown */}
                    <div className="relative inline-block">
                        <select className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-700 cursor-pointer">
                            <option>Filter Status</option>
                            <option>Diterima</option>
                            <option>Ditolak</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronDown size={18} className="text-gray-500" />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className={`flex items-center border rounded-lg bg-white shadow-sm transition-all duration-300 overflow-hidden ${searchOpen ? "w-64" : "w-10"}`}>
                        {searchOpen && (
                            <input type="text" 
                            placeholder="Cari Judul Penelitian?"
                            className="flex-grow px-3 py-2 focus:outline-none text-sm"/>
                        )}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
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
                                            Terbitkan
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded">
                                            Tolak
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination (per 3 halaman) */}
                    <div className="flex justify-end items-center py-3 px-4 gap-1 text-sm">
                        {/* Tombol Sebelumnya */}
                        <button
                            onClick={() => {
                                if (currentPage > 1) {
                                    const newGroup = Math.floor((currentPage - 2) / 3);
                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                    setPageGroup(newGroup);
                                }
                            }}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 rounded border text-xs transition-all ${currentPage === 1
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                                }`}
                        >
                            &lt;
                        </button>

                        {/* Nomor Halaman */}
                        {Array.from({ length: 3 }, (_, i) => {
                            const pageNumber = pageGroup * 3 + (i + 1);
                            if (pageNumber > totalPages) return null;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`px-2 py-1 rounded text-xs border ${currentPage === pageNumber
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        {/* Tombol Berikutnya */}
                        <button
                            onClick={() => {
                                if (currentPage < totalPages) {
                                    const newGroup = Math.floor(currentPage / 3);
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                    setPageGroup(newGroup);
                                }
                            }}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 rounded border text-xs transition-all ${currentPage === totalPages
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                                }`}
                        >
                            &gt;
                        </button>
                    </div>


                </div>
            </main>
        </div>
    );
}
