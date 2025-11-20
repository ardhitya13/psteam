"use client";

import React, { useEffect, useState } from "react";
import {
    Search,
    ChevronDown,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

type Participant = {
    id: number;
    name: string;
    email: string;
    phone: string;
    trainingTitle: string;
    type: "web" | "mobile" | "iot" | "ai";
    batch: string;
};

export default function TrainingParticipantsAdmin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [participants, setParticipants] = useState<Participant[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        // Dummy Data
        const dummy: Participant[] = [
            /* contoh nanti dari backend */
            /*
            {
              id: 1,
              name: "Ardhitya",
              email: "user@mail.com",
              phone: "081234567",
              trainingTitle: "Flutter Mobile Apps",
              type: "mobile",
              batch: "Batch 1",
            }
            */
        ];
        setParticipants(dummy);
    }, []);

    const filtered = participants.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType =
            selectedType === "all" ? true : p.type === selectedType;
        return matchSearch && matchType;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
            <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex flex-1">
                <AdminSidebar
                    isOpen={isSidebarOpen}
                    toggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <main
                    className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
                        }`}
                >
                    {/* TITLE */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black uppercase">
                            Daftar Peserta Pelatihan
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Data peserta yang telah diterima dalam pelatihan PSTeam.
                        </p>
                    </div>

                    {/* CONTROL BAR */}
                    <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">

                        {/* SEARCH */}
                        <div className="relative flex items-center h-10">
                            {!isSearchOpen && (
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(true);
                                        setTimeout(() => {
                                            document.getElementById("searchInput")?.focus();
                                        }, 50);
                                    }}
                                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md absolute left-0">
                                    <Search size={18} />
                                </button>
                            )}

                            <input
                                id="searchInput"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onBlur={() => {
                                    if (searchTerm.trim() === "") setIsSearchOpen(false);
                                }}
                                placeholder="Cari pelatihan..."
                                className={` transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 *
                                    ${isSearchOpen ? "w-56 pl-10 pr-3 opacity-100" : "w-10 opacity-0 pointer-events-none"}
                                    `}
                                    />
                        </div>

                        {/* FILTER TIPE */}
                        <div className="relative">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-40 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md pl-3 pr-10 py-2 shadow-sm appearance-none cursor-pointer"
                            >
                                <option value="all">Semua Tipe</option>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                                <option value="iot">IoT</option>
                                <option value="ai">AI</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                            />
                        </div>

                        {/* FILTER PAGE */}
                        <div className="relative">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none"
                            >
                                {[10, 20, 30, 40].map((n) => (
                                    <option key={n} value={n}>
                                        {n} Halaman
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-300">
                        <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
                            <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
                                <tr>
                                    <th className="px-4 py-3 border border-gray-300">No</th>
                                    <th className="px-4 py-3 border border-gray-300">Nama</th>
                                    <th className="px-4 py-3 border border-gray-300">Email</th>
                                    <th className="px-4 py-3 border border-gray-300">Telepon</th>
                                    <th className="px-4 py-3 border border-gray-300">Pelatihan</th>
                                    <th className="px-4 py-3 border border-gray-300">Tipe</th>
                                    <th className="px-4 py-3 border border-gray-300">Batch</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pageItems.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="text-center py-10 italic text-gray-500"
                                        >
                                            Belum ada peserta diterima.
                                        </td>
                                    </tr>
                                ) : (
                                    pageItems.map((p, i) => (
                                        <tr key={p.id} className="hover:bg-blue-50 border">
                                            <td className="px-4 py-3 border">
                                                {startIndex + i + 1}
                                            </td>

                                            <td className="px-4 py-3 border font-semibold">
                                                {p.name}
                                            </td>

                                            <td className="px-4 py-3 border">{p.email}</td>
                                            <td className="px-4 py-3 border">{p.phone}</td>

                                            <td className="px-4 py-3 border">{p.trainingTitle}</td>

                                            <td className="px-4 py-3 border capitalize">{p.type}</td>

                                            <td className="px-4 py-3 border">{p.batch}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* PAGINATION */}
                        <div className="flex justify-end items-center gap-2 px-4 py-4">
                            <button
                                disabled={safeCurrentPage === 1}
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                className="w-10 h-10 border rounded-md bg-white hover:bg-gray-100"
                            >
                                {"<"}
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 border rounded-md ${safeCurrentPage === i + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={safeCurrentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                className="w-10 h-10 border rounded-md bg-white hover:bg-gray-100"
                            >
                                {">"}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
