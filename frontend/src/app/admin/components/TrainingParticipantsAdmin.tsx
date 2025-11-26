"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";

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

    const [pageGroup, setPageGroup] = useState(0); // 🔥 DITAMBAHKAN sesuai contoh
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/api/trainings/approved")
            .then((r) => r.json())
            .then((data) => {
                console.log("DATA DARI BACKEND: ", data);
                setParticipants(Array.isArray(data) ? data : []);
            });
    }, []);

    // =============================================
    // FILTER
    // =============================================
    const filtered = participants.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType = selectedType === "all" ? true : p.type === selectedType;
        return matchSearch && matchType;
    });

    // =============================================
    // PAGINATION (Mengikuti Contoh)
    // =============================================
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    // Reset pagination saat filter/search berubah
    useEffect(() => {
        setCurrentPage(1);
        setPageGroup(0);
    }, [searchTerm, selectedType, itemsPerPage]);

    // =============================================
    // UI
    // =============================================
    return (
        <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
            <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex flex-1">
                <AdminSidebar
                    isOpen={isSidebarOpen}
                    toggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <main
                    className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
                        isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
                    }`}
                >
                    {/* TITLE */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black uppercase">
                            Daftar Peserta Pelatihan
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Data peserta yang telah diterima.
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
                                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md absolute left-0"
                                >
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
                                placeholder="Cari peserta..."
                                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10
                                    ${
                                        isSearchOpen
                                            ? "w-56 pl-10 pr-3 opacity-100"
                                            : "w-10 opacity-0 pointer-events-none"
                                    }`}
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
                            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600" />
                        </div>

                        {/* ITEMS PER PAGE */}
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
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-x-auto">

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
                                            <td className="border px-4 py-2 border-gray-300">{startIndex + i + 1}</td>
                                            <td className="border px-4 py-2 border-gray-300 font-semibold">{p.name}</td>
                                            <td className="border px-4 py-2 border-gray-300">{p.email}</td>
                                            <td className="border px-4 py-2 border-gray-300">{p.phone}</td>
                                            <td className="border px-4 py-2 border-gray-300">{p.trainingTitle}</td>
                                            <td className="border px-4 py-2 border-gray-300 capitalize">{p.type}</td>
                                            <td className="border px-4 py-2 border-gray-300">{p.batch}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* ===========================================
                            PAGINATION (Mengikuti contoh 3 angka)
                        ============================================ */}
                        <div className="flex justify-end items-center py-3 px-4 gap-2 bg-gray-50 text-sm rounded-b-lg">

                            {/* PREV */}
                            <button
                                onClick={() => {
                                    if (currentPage > 1) {
                                        const newGroup = Math.floor((currentPage - 2) / 3);
                                        setCurrentPage((prev) => prev - 1);
                                        setPageGroup(newGroup);
                                    }
                                }}
                                disabled={currentPage === 1}
                                className={`px-2 py-1 rounded border text-xs ${
                                    currentPage === 1
                                        ? "bg-gray-200 text-gray-400"
                                        : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                                }`}
                            >
                                &lt;
                            </button>

                            {/* 3 PAGE NUMBERS */}
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

                            {/* NEXT */}
                            <button
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        const newGroup = Math.floor(currentPage / 3);
                                        setCurrentPage((prev) => prev + 1);
                                        setPageGroup(newGroup);
                                    }
                                }}
                                disabled={currentPage === totalPages}
                                className={`px-2 py-1 rounded border text-xs ${
                                    currentPage === totalPages
                                        ? "bg-gray-200 text-gray-400"
                                        : "bg-gray-100 hover:bg-gray-300 text-gray-800"
                                }`}
                            >
                                &gt;
                            </button>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
