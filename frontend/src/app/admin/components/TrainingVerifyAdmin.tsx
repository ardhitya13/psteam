"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown, Eye, Check, X } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import TrainingVerificationDetailModal from "./TrainingVerifyDetailModal";
import TrainingVerificationStatusModal from "./TrainingVerifyStatusModal";

export type Registration = {
    id: number;
    name: string;
    email: string;
    phone: string;
    trainingTitle: string;
    trainingType: "web" | "mobile" | "ai" | "iot";
    batch: string;
    notes?: string;
    status: "pending" | "approved" | "rejected";
};

export default function TrainingVerificationAdmin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [detailData, setDetailData] = useState<Registration | null>(null);
    const [statusData, setStatusData] = useState<{
        data: Registration;
        action: "approved" | "rejected";
    } | null>(null);

    // Dummy data awal
    const dummy = [
        {
            id: 1,
            name: "Andi Saputra",
            email: "andi@polibatam.ac.id",
            phone: "08123456789",
            trainingTitle: "Fullstack Web Developer Bootcamp",
            trainingType: "web" as const,
            batch: "Batch 1",
            notes: "Ingin meningkatkan skill backend.",
            status: "pending" as const,
        },
        {
            id: 2,
            name: "Siti Rahma",
            email: "siti@polibatam.ac.id",
            phone: "082167854321",
            trainingTitle: "Flutter Mobile Apps Development",
            trainingType: "mobile" as const,
            batch: "Batch 2",
            notes: "Butuh skill mobile untuk magang.",
            status: "pending" as const,
        },
    ];

    // Load localStorage (jika ada)
    useEffect(() => {
        const saved = localStorage.getItem("trainingRegistrations");
        if (saved) setRegistrations(JSON.parse(saved));
        else setRegistrations(dummy);
    }, []);

    // Save ke localStorage
    useEffect(() => {
        localStorage.setItem("trainingRegistrations", JSON.stringify(registrations));
    }, [registrations]);

    // Update status
    const updateStatus = (id: number, newStatus: "approved" | "rejected") => {
        setRegistrations((prev) =>
            prev.map((r) =>
                r.id === id
                    ? {
                        ...r,
                        status: newStatus,
                    }
                    : r
            )
        );
        setStatusData(null);
    };

    // Filtering
    const filtered = registrations.filter((r) =>
        `${r.name} ${r.email} ${r.trainingTitle}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const safeCurrentPage = Math.min(currentPage, totalPages);

    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

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
                            Verifikasi Pelatihan
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Kelola pendaftaran peserta pelatihan PSTeam.
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

                            <input id="searchInput" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                onBlur={() => {
                                    if (searchTerm.trim() === "") setIsSearchOpen(false);
                                }}
                                placeholder="Cari peserta..."
                                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10
                                     ${isSearchOpen
                                        ? "w-56 pl-10 pr-3 opacity-100"
                                        : "w-10 opacity-0 pointer-events-none"
                                    }`}
                            />
                        </div>

                        {/* FILTER PAGE */}
                        <div className="relative">
                            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-3 pr-10 py-2 text-sm shadow-sm cursor-pointer appearance-none">
                                {[10, 20, 30, 40].map((n) => (
                                    <option key={n} value={n}>
                                        {n} Halaman
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"/>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-lg shadow border border-gray-300">
                        <table className="min-w-full text-sm border-collapse text-center">
                            <thead className="bg-[#eaf0fa] text-gray-800 font-semibold text-[14px] uppercase">
                                <tr>
                                    <th className="py-3 px-4 border border-gray-300">No</th>
                                    <th className="py-3 px-4 border border-gray-300">Nama</th>
                                    <th className="py-3 px-4 border border-gray-300">Email</th>
                                    <th className="py-3 px-4 border border-gray-300">Telepon</th>
                                    <th className="py-3 px-4 border border-gray-300">Pelatihan</th>
                                    <th className="py-3 px-4 border border-gray-300">Tipe</th>
                                    <th className="px-4 py-3 border border-gray-300">Status</th>
                                    <th className="px-4 py-3 border border-gray-300">Spesifikasi</th>
                                    <th className="px-4 py-3 border border-gray-300">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pageItems.map((r, i) => (
                                    <tr key={r.id} className="hover:bg-blue-50 border">
                                        <td className="border border-gray-300 px-4 py-3">{startIndex + i + 1}</td>
                                        <td className="border border-gray-300 px-4 py-3 font-semibold">{r.name}</td>
                                        <td className="border border-gray-300 px-4 py-3">{r.email}</td>
                                        <td className="border border-gray-300 px-4 py-3">{r.phone}</td>
                                        <td className="border border-gray-300 px-4 py-3">{r.trainingTitle}</td>
                                        <td className="border border-gray-300 px-4 py-3 capitalize">{r.trainingType}</td>

                                        <td className="border border-gray-300 px-4 py-3">
                                            {r.status === "pending" && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">
                                                    Pending
                                                </span>
                                            )}
                                            {r.status === "approved" && (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                                                    Diterima
                                                </span>
                                            )}
                                            {r.status === "rejected" && (
                                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">
                                                    Ditolak
                                                </span>
                                            )}
                                        </td>

                                        <td className="border border-gray-300 px-4 py-3">
                                            <button
                                                onClick={() => setDetailData(r)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1"
                                            >
                                                <Eye size={14} /> Detail
                                            </button>
                                        </td>

                                        <td className="border border-gray-300 px-4 py-3">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() =>
                                                        setStatusData({ data: r, action: "approved" })
                                                    }
                                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <Check size={14} /> Terima
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setStatusData({ data: r, action: "rejected" })
                                                    }
                                                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <X size={14} /> Tolak
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* PAGINATION */}
                        <div className="flex justify-end items-center gap-2 px-4 py-4">
                            <button
                                disabled={safeCurrentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className="w-10 h-10 border rounded"
                            >
                                {"<"}
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 border rounded ${safeCurrentPage === i + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-white"
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
                                className="w-10 h-10 border rounded"
                            >
                                {">"}
                            </button>
                        </div>
                    </div>

                    {/* MODALS */}
                    {detailData && (
                        <TrainingVerificationDetailModal
                            data={detailData}
                            onClose={() => setDetailData(null)}
                        />
                    )}

                    {statusData && (
                        <TrainingVerificationStatusModal
                            data={statusData.data}
                            action={statusData.action}
                            onConfirm={() => updateStatus(statusData.data.id!, statusData.action)}
                            onClose={() => setStatusData(null)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
