"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahPengabdianCard from "../components/AddCommunityService";
import EditPengabdianCard from "../components/EditCommunityServiceCard";

type CSItem = {
  id: number;
  title: string;
  year: number;
};

export default function DaftarPengabdianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [data, setData] = useState<CSItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CSItem | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("Semua");

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);

  const itemsPerPage = 10;
  const maxVisiblePages = 2;

  const userId = 2;

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/lecturer/${userId}/community-service`);
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("Gagal fetch pengabdian:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= ADD ================= */
  const handleAddData = async ({ title, year }: { title: string; year: number }) => {
    try {
      await fetch(`http://localhost:4000/api/lecturer/${userId}/community-service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, year }),
      });

      await fetchData();
      setIsModalOpen(false);
      setSuccessTitle(title);
      setAddSuccess(true);
    } catch (err) {
      console.error("Gagal tambah data:", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: CSItem) => {
    setUpdateSuccess(false);
    setAddSuccess(false);
    setDeleteSuccess(false);
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateData = async (updated: CSItem) => {
    try {
      await fetch(`http://localhost:4000/api/lecturer/community-service/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updated.title, year: updated.year }),
      });

      await fetchData();
      setIsEditModalOpen(false);
      setSuccessTitle(updated.title);
      setUpdateSuccess(true);
    } catch (err) {
      console.error("Gagal update:", err);
    }
  };

  /* ================= DELETE ================= */
  const openDeleteModal = (id: number) => {
    setDeleteSuccess(false);
    setUpdateSuccess(false);
    setAddSuccess(false);
    setDeleteId(id);
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`http://localhost:4000/api/lecturer/community-service/${deleteId}`, {
        method: "DELETE",
      });

      await fetchData();
      setDeleteConfirm(false);
      setDeleteSuccess(true);
      setDeleteId(null);
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const cocokYear = selectedYear === "Semua" || item.year === Number(selectedYear);
      const cocokTitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokYear && cocokTitle;
    });
  }, [data, searchTerm, selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
    setPageStart(1);
  }, [searchTerm, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const visiblePages = Array.from(
    { length: Math.min(maxVisiblePages, totalPages - pageStart + 1) },
    (_, i) => pageStart + i
  );

  const handleNextGroup = () => {
    if (pageStart + maxVisiblePages - 1 < totalPages) {
      setPageStart(pageStart + 1);
      setCurrentPage(pageStart + 1);
    }
  };

  const handlePrevGroup = () => {
    if (pageStart > 1) {
      setPageStart(pageStart - 1);
      setCurrentPage(pageStart - 1);
    }
  };

  /* ================= ALERT UI ================= */
  const SuccessAlert = ({ message, onOk }: { message: string; onOk: () => void }) =>
    createPortal(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999999]">
        <div className="bg-white p-6 rounded-lg w-80 text-center">
          <h3 className="font-bold text-blue-600 mb-2">Berhasil!</h3>
          <p className="mb-4">{message}</p>
          <button onClick={onOk} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            OK
          </button>
        </div>
      </div>,
      document.body
    );

  const DeleteAlert = ({ onCancel, onOk }: { onCancel: () => void; onOk: () => void }) =>
    createPortal(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999999]">
        <div className="bg-white p-6 rounded-lg w-80 text-center">
          <h3 className="font-bold text-red-600 mb-2">Hapus Data?</h3>
          <p className="mb-4">Data akan dihapus permanen.</p>
          <div className="flex justify-center gap-3">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-lg">
              Batal
            </button>
            <button onClick={onOk} className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Hapus
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR PENGABDIAN DOSEN
        </h1>

        <div className="flex justify-end gap-3 mb-4">

          <button
            onClick={() => {
              setAddSuccess(false);
              setUpdateSuccess(false);
              setDeleteSuccess(false);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm"
          >
            <Plus size={16} /> Tambah Pengabdian
          </button>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-lg px-3 py-2 pr-8 text-black"
          >
            <option value="Semua">Semua Tahun</option>
            {[2025, 2024, 2023, 2022, 2021].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <div className="flex border rounded-lg overflow-hidden bg-white  text-black">
            <input
              className="px-3 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Judul..."
            />
            <div className="px-2 bg-blue-600 text-white flex items-center">
              <Search size={16} />
            </div>
          </div>
        </div>

        <div className="border rounded-lg shadow bg-white overflow-x-auto">
          <table className="w-full text-sm text-black">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 border text-center">NO</th>
                <th className="px-4 py-2 border">JUDUL</th>
                <th className="px-4 py-2 border text-center">TAHUN</th>
                <th className="px-4 py-2 border text-center">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-center">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2 text-center">{item.year}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-400 text-xs text-white rounded px-3 py-1 flex items-center"
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          onClick={() => openDeleteModal(item.id)}
                          className="bg-red-500 text-xs text-white rounded px-3 py-1 flex items-center"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 italic text-gray-500">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-3 flex justify-end gap-2">
            <button onClick={handlePrevGroup} disabled={pageStart === 1} className="px-2 py-1 border rounded text-xs">
              &lt;
            </button>
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 border rounded text-xs ${
                  currentPage === page ? "bg-blue-600 text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextGroup}
              disabled={pageStart + maxVisiblePages - 1 >= totalPages}
              className="px-2 py-1 border rounded text-xs"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* MODAL ADD */}
        <TambahPengabdianCard
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setAddSuccess(false);
          }}
          onSubmit={handleAddData}
        />

        {/* SUCCESS ADD */}
        {addSuccess && (
          <SuccessAlert
            message={`Data "${successTitle}" berhasil ditambahkan.`}
            onOk={() => {
              setAddSuccess(false);
            }}
          />
        )}

        {/* MODAL EDIT */}
        <EditPengabdianCard
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setUpdateSuccess(false);
          }}
          defaultData={selectedItem}
          onSubmit={handleUpdateData}
        />

        {/* SUCCESS UPDATE */}
        {updateSuccess && (
          <SuccessAlert
            message={`Perubahan "${successTitle}" berhasil disimpan.`}
            onOk={() => {
              setUpdateSuccess(false);
            }}
          />
        )}

        {/* DELETE CONFIRM */}
        {deleteConfirm && (
          <DeleteAlert
            onCancel={() => setDeleteConfirm(false)}
            onOk={confirmDelete}
          />
        )}

        {/* SUCCESS DELETE */}
        {deleteSuccess && (
          <SuccessAlert
            message="Data berhasil dihapus."
            onOk={() => setDeleteSuccess(false)}
          />
        )}
      </main>
    </div>
  );
}
