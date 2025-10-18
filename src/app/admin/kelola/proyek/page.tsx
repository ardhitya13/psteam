"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";

export default function DaftarProyekPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const data = [
        { no: 1, nama: "Anggun Salsa F", judul: "Website pemesanan online coffee shop", noTelp: "08123456789" },
        { no: 2, nama: "Ardithya Danur S", judul: "Aplikasi mobile penjualan tshirt", noTelp: "08123456789" },
        { no: 3, nama: "Arifah Husaini", judul: "Website antrian parkir mobil", noTelp: "08123456789" },
        { no: 4, nama: "Farhan Rasyid", judul: "Website kursus online public speaking", noTelp: "08123456789" },
        { no: 5, nama: "Rasyid Farhan", judul: "Game adventure online", noTelp: "08123456789" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* Navbar */}
            <NavbarAdmin />
            {/* Sidebar */}
            <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Main Content */}
            <main
                className={`transition-all duration-300 pt-0 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
                    } mt-[85px]`}
            >
                {/* Judul */}
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
                    PROYEK AJUAN TAMU ATAU KLIEN
                </h1>

                {/* Search Bar */}
                <div className="flex justify-center mb-4">
                    <div className="flex w-full max-w-xl items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                        <input
                            type="text"
                            placeholder="Cari Judul Proyek?"
                            className="flex-grow px-4 py-2 focus:outline-none"
                        />
                        <button className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* Dropdown */}
                <div className="flex justify-start mb-4">
                    <div className="relative inline-block">
                        <select
                            className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-700 cursor-pointer">
                            <option>Tipe Riwayat</option>
                            <option>Diterima</option>
                            <option>Ditolak</option>
                        </select>

                        {/* Icon custom */}
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronDown size={18} className="text-gray-500" />
                        </div>
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
                            {data.map((item, index) => (
                                <motion.tr
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="bg-white hover:bg-gray-50" >
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
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
