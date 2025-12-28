"use client";

import { Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Swal from "sweetalert2";

import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahHkiCard from "../components/AddIntellectualPropertyCard";
import EditHkiCard from "../components/EditIntellectualPropertyCard";

import {
  getMyIntellectualProperty,
  addIntellectualProperty,
  updateIntellectualProperty,
  deleteIntellectualProperty,
} from "@/lib/lecturer";

/* ================= TYPES ================= */
type HkiItem = {
  id: number;
  title: string;
  type: string;
  year: number;
};

export default function DaftarHkiPage() {
  /* ================= STATE ================= */
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<HkiItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HkiItem | null>(null);

  /* MODAL */
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  /* SEARCH */
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  /* FILTER */
  const [selectedYear, setSelectedYear] = useState("Semua");
  const [selectedType, setSelectedType] = useState("");

  /* PAGINATION */
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const res = await getMyIntellectualProperty();
      setData(Array.isArray(res) ? res : []);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* RESET PAGE JIKA FILTER BERUBAH */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedYear, selectedType, itemsPerPage]);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  /* ================= ADD ================= */
  const handleAdd = async (payload: {
    title: string;
    type: string;
    year: number;
  }) => {
    try {
      await addIntellectualProperty(payload);
      setIsAddOpen(false);
      await fetchData();

      Swal.fire({
        icon: "success",
        title: "Berhasil Menambahkan HKI",
        html: `
          <div style="text-align:left">
            <b>Judul:</b> ${payload.title}<br/>
            <b>Jenis:</b> ${payload.type}<br/>
            <b>Tahun:</b> ${payload.year}
          </div>
        `,
      });
    } catch (err: any) {
      Swal.fire("Gagal", err.message || "Terjadi kesalahan", "error");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (updated: HkiItem) => {
    if (!selectedItem) return;

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Yakin mengubah data ini?",
      html: `
        <div style="text-align:left">
          <b>Judul:</b><br/>
          ${selectedItem.title} → <b>${updated.title}</b><br/><br/>

          <b>Jenis:</b><br/>
          ${selectedItem.type} → <b>${updated.type}</b><br/><br/>

          <b>Tahun:</b><br/>
          ${selectedItem.year} → <b>${updated.year}</b>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Ya, Ubah",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    await updateIntellectualProperty(updated.id, {
      title: updated.title,
      type: updated.type,
      year: updated.year,
    });

    setIsEditOpen(false);
    setSelectedItem(null);
    await fetchData();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data HKI berhasil diperbarui",
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    const item = data.find((d) => d.id === id);
    if (!item) return;

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus data ini?",
      html: `
        <div style="text-align:left">
          <b>Judul:</b> ${item.title}<br/>
          <b>Jenis:</b> ${item.type}<br/>
          <b>Tahun:</b> ${item.year}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    await deleteIntellectualProperty(id);
    await fetchData();

    Swal.fire({
      icon: "success",
      title: "Dihapus",
      text: "Data HKI berhasil dihapus",
    });
  };

  /* ================= FILTER ================= */
  const yearOptions = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.year))).sort((a, b) => b - a),
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const byYear =
        selectedYear === "Semua" || item.year === Number(selectedYear);
      const byType = !selectedType || item.type === selectedType;
      const bySearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return byYear && byType && bySearch;
    });
  }, [data, selectedYear, selectedType, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 pt-6">
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
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          DAFTAR HKI / PATEN DOSEN
        </h1>

        {/* TOOLBAR */}
        <div className="flex justify-end items-center gap-3 mb-4 flex-wrap">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 bg-blue-600 rounded"
            >
              <Search size={16} className="text-white" />
            </button>
            {isSearchOpen && (
              <input
                ref={searchRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="absolute right-12 top-0 px-3 py-2 border rounded bg-white text-black"
                placeholder="Cari judul..."
              />
            )}
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border rounded bg-white text-black"
          >
            <option value="">Pilih jenis HKI</option>
            <option value="Paten">Paten</option>
            <option value="Hak Cipta">Hak Cipta</option>
            <option value="Merek">Merek</option>
            <option value="Desain Industri">Desain Industri</option>
            <option value="Rahasia Dagang">Rahasia Dagang</option>
            <option value="Lain-Lain">Lain-Lain</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border rounded bg-white text-black"
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
            className="px-3 py-2 border rounded bg-white text-black"
          >
            {[10, 20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>
                {n} / halaman
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectedItem(null);
              setIsAddOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-sm text-gray-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 w-16 text-center">NO</th>
                <th className="px-4 py-3 text-left">JUDUL</th>
                <th className="px-4 py-3 w-40 text-center">JENIS</th>
                <th className="px-4 py-3 w-24 text-center">TAHUN</th>
                <th className="px-4 py-3 w-32 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                visibleData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="text-center px-4 py-3">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="px-4 py-3">{item.title}</td>
                    <td className="text-center px-4 py-3">{item.type}</td>
                    <td className="text-center px-4 py-3">{item.year}</td>
                    <td className="text-center px-4 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsEditOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={5} className="px-4 py-3 bg-gray-50 text-right">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-2 py-1 border rounded mx-1"
                  >
                    &lt;
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded">
                    {currentPage}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-2 py-1 border rounded mx-1"
                  >
                    &gt;
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      {/* MODALS */}
      <TambahHkiCard
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAdd}
      />

      <EditHkiCard
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        defaultData={selectedItem}
        onSubmit={handleEdit}
      />
    </div>
  );
}
