"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";

export default function DaftarPenelitianPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const data = [
        {
            no: 1,
            nama: "Anggun Salsa F",
            judul: "Website pemesanan online coffee shop",
            tanggal: "08 Oktober 2025",
            dokumen: "Penelitian Anggun Salsa F",
        },
        {
            no: 2,
            nama: "Ardithya Danur S",
            judul: "Aplikasi mobile penjualan tshirt",
            tanggal: "16 Oktober 2025",
            dokumen: "Penelitian Ardithya Danur S",
        },
        {
            no: 3,
            nama: "Arifah Husaini",
            judul: "Website antrian parkir mobil",
            tanggal: "20 Oktober 2025",
            dokumen: "Hasil Penelitian Arifah",
        },
        {
            no: 4,
            nama: "Farhan Rasyid",
            judul: "Game adventure online",
            tanggal: "25 September 2025",
            dokumen: "Hasil Penelitian Farhan Rasyid",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <NavbarAdmin />
            <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            <main
                className={`transition-all duration-300 pt-0 px-8 pb-10 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
                    } mt-[58px]`}
            >
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
                    DAFTAR PENELITIAN DOSEN
                </h1>

                {/* Search */}
                <div className="flex justify-center mb-4">
                    <div className="flex w-full max-w-md items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                        <input
                            type="text"
                            placeholder="Cari nama dosen?"
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
                        <select className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white">
                            <option>Pilih tahun</option>
                            <option>2025</option>
                            <option>2024</option>
                            <option>2023</option>
                        </select>
                    </div>
                </div>

                {/* Tabel */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                    <table className="w-full border-collapse text-sm text-gray-700">
                        <thead className="bg-gray-300 text-gray-800">
                            <tr>
                                <th className="border px-4 py-2">NO</th>
                                <th className="border px-4 py-2">NAMA</th>
                                <th className="border px-4 py-2">JUDUL PENELITIAN</th>
                                <th className="border px-4 py-2">TANGGAL UNGGAH</th>
                                <th className="border px-4 py-2">DOKUMEN</th>
                                <th className="border px-4 py-2">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <motion.tr
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="bg-white hover:bg-gray-50"
                                >
                                    <td className="border px-4 py-2 text-center">{item.no}</td>
                                    <td className="border px-4 py-2">{item.nama}</td>
                                    <td className="border px-4 py-2">{item.judul}</td>
                                    <td className="border px-4 py-2 text-center">{item.tanggal}</td>
                                    <td className="border px-4 py-2">{item.dokumen}</td>
                                    <td className="border px-4 py-2 text-center flex justify-center gap-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded">
                                            Terbitkan
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
