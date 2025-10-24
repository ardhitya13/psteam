"use client";

import { ChevronDown, Search, Edit, Upload, Trash2, Plus } from "lucide-react";
import React, { useState, useMemo } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import ProyekModal from "../../components/ProyekModal";

export default function DaftarProyekPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    const itemsPerPage = 8;

    // Dummy data
    const data = [
        {
            no: 1,
            email: "anggun@polibatam.ac.id",
            judul: "Website Pemesanan Online Coffee Shop",
            tipe: "Website",
            status: "Belum Diproses",
        },
        {
            no: 2,
            email: "ardhitya@polibatam.ac.id",
            judul: "Aplikasi Mobile Penjualan Tshirt",
            tipe: "Mobile",
            status: "Sedang Diproses",
        },
        ...Array.from({ length: 40 }, (_, i) => ({
            no: i + 3,
            email: `user${i + 3}@polibatam.ac.id`,
            judul: `Judul Proyek ${i + 3}`,
            tipe: ["Website", "Mobile", "AI", "IoT"][Math.floor(Math.random() * 4)],
            status: ["Belum Diproses", "Sedang Diproses", "Selesai"][i % 3],
        })),
    ];

    // Filter dan pencarian
    const filteredData = useMemo(() => {
        return data.filter(
            (item) =>
                (filterType === "Semua" || item.tipe === filterType) &&
                item.judul.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, filterType, searchQuery]);

    // Pagination per 3 halaman
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const visibleData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = (item: any) => {
        setSelectedData(item);
        setIsModalOpen(true);
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
                    DAFTAR PROYEK
                </h1>

                {/* Kontrol Atas */}
                <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
                    <div className="relative inline-block">
                        <select
                            value={filterType}
                            onChange={(e) => {
                                setFilterType(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white text-gray-700 cursor-pointer"
                        >
                            <option value="Semua">Semua Tipe</option>
                            <option value="Website">Website</option>
                            <option value="Mobile">Mobile</option>
                            <option value="AI">AI</option>
                            <option value="IoT">IoT</option>
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
                                placeholder="Cari Judul Proyek?"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="flex-grow px-3 py-2.5 focus:outline-none text-sm rounded-lg"
                            />
                        )}
                        <button
                            onClick={() => setSearchOpen((prev) => !prev)}
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
                                <th className="border border-gray-200 px-4 py-2">EMAIL</th>
                                <th className="border border-gray-200 px-4 py-2">JUDUL</th>
                                <th className="border border-gray-200 px-4 py-2">TIPE</th>
                                <th className="border border-gray-200 px-4 py-2">STATUS</th>
                                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleData.length > 0 ? (
                                visibleData.map((item) => (
                                    <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                                        <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.judul}</td>
                                        <td className="border border-gray-200 px-4 py-2 text-center">{item.tipe}</td>
                                        <td className="border border-gray-200 px-4 py-2 text-center">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${item.status === "Selesai"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Sedang Diproses"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-4 py-1 rounded flex items-center gap-1 border-none focus:outline-none"
                                                >
                                                    <Edit size={14} /> Edit
                                                </button>

                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded flex items-center gap-1 border-none focus:outline-none"
                                                >
                                                    <Upload size={14} /> Terbitkan
                                                </button>

                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded flex items-center gap-1 border-none focus:outline-none"
                                                >
                                                    <Trash2 size={14} /> Hapus
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-6 text-gray-500 border border-gray-200"
                                    >
                                        Tidak ada proyek yang ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination (3 halaman) */}
                    <div className="flex justify-end items-center py-3 px-4 gap-1 text-sm bg-gray-50 rounded-b-lg">
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

                {/* Modal Edit */}
                <ProyekModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    data={selectedData}
                    mode="edit"
                />
            </main>
        </div>
    );
}
