"use client";

import { Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Swal from "sweetalert2"; // ✅ TAMBAHAN SAJA

import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahPenelitianCard from "../components/AddResearchCard";
import EditPenelitianCard from "../components/EditResearchCard";

/* ================= LIB ================= */
import {
  getMyResearch,
  addResearch,
  updateResearch,
  deleteResearch,
} from "@/lib/lecturer";

/* ================= TYPES ================= */
type PenelitianItem = {
  id: number;
  title: string;
  year: number;
};

export default function DaftarPenelitianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<PenelitianItem[]>([]);
  const [selectedPenelitian, setSelectedPenelitian] =
    useState<PenelitianItem | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [selectedYear, setSelectedYear] = useState("Semua");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH DATA (GET) ================= */
  const fetchData = async () => {
    try {
      const res = await getMyResearch();

      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : [];

      setData(list);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setData([]);
    }
  };

  /* ================= ADD (POST) ================= */
  const handleAddResearch = async (data: {
    title: string;
    year: number;
  }) => {
    await addResearch(data);
    await fetchData();
  };

  /* ================= EDIT (PUT) + ALERT ================= */
  const handleEditResearch = async (data: {
    id: number;
    title: string;
    year: number;
  }) => {
    const confirmEdit = await Swal.fire({
      icon: "warning",
      title: "Yakin mengubah data ini?",
      html: `
        <b>Judul:</b> ${selectedPenelitian?.title} → <b>${data.title}</b><br/>
        <b>Tahun:</b> ${selectedPenelitian?.year} → <b>${data.year}</b>
      `,
      showCancelButton: true,
      confirmButtonText: "Ya, Ubah",
      cancelButtonText: "Batal",
    });

    if (!confirmEdit.isConfirmed) return;

    await updateResearch(data.id, {
      title: data.title,
      year: data.year,
    });

    setIsEditModalOpen(false);
    setSelectedPenelitian(null);
    await fetchData();

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data penelitian berhasil diubah",
    });
  };

  /* ================= DELETE + ALERT ================= */
  const handleDeleteResearch = async (id: number) => {
    const item = data.find((d) => d.id === id);

    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus penelitian ini?",
      html: `
        <b>Judul:</b> ${item?.title}<br/>
        <b>Tahun:</b> ${item?.year}
      `,
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!confirmDelete.isConfirmed) return;

    await deleteResearch(id);
    await fetchData();

    await Swal.fire({
      icon: "success",
      title: "Dihapus",
      text: "Data penelitian berhasil dihapus",
    });
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedYear, itemsPerPage]);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) searchRef.current.focus();
  }, [isSearchOpen]);

  /* ================= FILTER & PAGINATION ================= */
  const yearOptions = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.year))).sort((a, b) => b - a),
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchYear =
        selectedYear === "Semua" || item.year === Number(selectedYear);
      const matchSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchYear && matchSearch;
    });
  }, [data, searchTerm, selectedYear]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen pt-6 bg-gray-100">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`pt-6 px-8 pb-10 transition-all ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-black">
          DAFTAR PENELITIAN DOSEN
        </h1>

        {/* TOOLBAR */}
        <div className="flex justify-end items-center gap-3 mb-4">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg bg-blue-600"
            >
              <Search size={18} className="text-white" />
            </button>

            {isSearchOpen && (
              <input
                ref={searchRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul..."
                className="absolute right-12 top-0 rounded-lg px-4 py-2 text-black bg-white shadow border"
              />
            )}
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-lg px-4 py-2 bg-white text-black border"
          >
            <option value="Semua">Semua Tahun</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="rounded-lg px-4 py-2 bg-white text-black border"
          >
            {[10, 20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>
                {n} / halaman
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus size={16} /> Tambah Penelitian
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-black">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 w-16">NO</th>
                <th className="px-4 py-3 text-left">JUDUL</th>
                <th className="px-4 py-3 w-28">TAHUN</th>
                <th className="px-4 py-3 w-40">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                visibleData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="text-center py-3">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="px-4 py-3">{item.title}</td>
                    <td className="text-center py-3">{item.year}</td>
                    <td className="text-center py-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPenelitian(item);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        <Edit size={12} /> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteResearch(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        <Trash2 size={12} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={4} className="px-4 py-3 bg-gray-50">
                  <div className="flex justify-end gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-2 py-1 rounded border"
                    >
                      &lt;
                    </button>

                    <span className="px-3 py-1 bg-blue-600 text-white rounded font-semibold">
                      {currentPage}
                    </span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-2 py-1 rounded border"
                    >
                      &gt;
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      <TambahPenelitianCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddResearch}
      />

      <EditPenelitianCard
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultData={selectedPenelitian}
        onSubmit={handleEditResearch}
      />
    </div>
  );
}
