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

  /* PAGINATION (SAMA DENGAN CONTOH PROYEK) */
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

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

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
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
    <div className="min-h-screen bg-gray-100 pt-0.5">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
            }`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black uppercase">
              Daftar HKI / Paten Dosen
            </h1>
            <p className="text-gray-600 text-sm">
              Detail HKI dosen — edit dan tambah melalui modal.
            </p>
          </div>

        {/* TOOLBAR */}
        <div className="flex justify-end items-center gap-3 mb-4 flex-wrap">
          <div className="relative flex items-center h-10">
            {!isSearchOpen && (
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchRef.current?.focus(), 50);
                }}
                className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-md absolute left-0"
              >
                <Search size={18} />
              </button>
            )}

            <input
              ref={searchRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => searchTerm === "" && setIsSearchOpen(false)}
              placeholder="Cari HKI..."
              className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 
                ${isSearchOpen
                  ? "w-56 pl-10 pr-3 opacity-100"
                  : "w-10 opacity-0 pointer-events-none"
                }`}
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
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
            className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
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
            className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
          >
            {[5, 10, 15, 20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>
                {n} Halaman
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectedItem(null);
              setIsAddOpen(true);
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-1"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {/* TABLE */}
        <div className={`bg-white shadow-md rounded-lg border border-gray-300 overflow-auto ${isSidebarOpen ? "min-w-[1057px]" : "w-full"}`} >
          <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
            <thead className="bg-[#eaf0fa] text-gray-800 font-semibold uppercase">
              <tr>
                <th className="border px-4 py-3 border-gray-300">NO</th>
                <th className="border px-4 py-3 border-gray-300 text-left">JUDUL</th>
                <th className="border px-4 py-3 border-gray-300">JENIS</th>
                <th className="border px-4 py-3 border-gray-300">TAHUN</th>
                <th className="border px-4 py-3 border-gray-300">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border px-4 py-6 border-gray-300 text-gray-500 italic"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                visibleData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 border-gray-300">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>

                    <td className="border px-4 py-2 border-gray-300 text-left">
                      {item.title}
                    </td>

                    <td className="border px-4 py-2 border-gray-300">
                      {item.type}
                    </td>

                    <td className="border px-4 py-2 border-gray-300">
                      {item.year}
                    </td>

                    <td className="border px-4 py-2 border-gray-300">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditOpen(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-md font-semibold hover:bg-yellow-500 transition"
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION (SAMA PERSIS DENGAN CONTOH PROYEK) */}
          <div className="flex justify-end items-center py-1 px-4 gap-2 text-sm bg-white">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  const newGroup = Math.floor((currentPage - 2) / 3);
                  setCurrentPage((p) => p - 1);
                  setPageGroup(newGroup);
                }
              }}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border text-xs ${currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-100 hover:bg-gray-300"
                }`}
            >
              {"<"}
            </button>

            {Array.from({ length: 3 }, (_, i) => {
              const pageNum = pageGroup * 3 + (i + 1);
              if (pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 py-1 rounded border text-xs ${currentPage === pageNum
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  const newGroup = Math.floor(currentPage / 3);
                  setCurrentPage((p) => p + 1);
                  setPageGroup(newGroup);
                }
              }}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border text-xs ${currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-100 hover:bg-gray-300"
                }`}
            >
              {">"}
            </button>
          </div>
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
