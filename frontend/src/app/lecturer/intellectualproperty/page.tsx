"use client";

import { ChevronDown, Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

import NavbarDosen from "../components/NavbarLecturer";
import SidebarDosen from "../components/SidebarLecturer";
import TambahHkiCard from "../components/AddIntellectualPropertyCard";
import EditHkiCard from "../components/EditIntellectualPropertyCard";

type HkiItem = {
  id: number;
  title: string;
  type: string;
  year: number;
};

export default function DaftarHkiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [data, setData] = useState<HkiItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HkiItem | null>(null);

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
    const res = await fetch(
      `http://localhost:4000/api/lecturer/${userId}/intellectual-property`
    );
    const json = await res.json();
    setData(json.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= ADD ================= */
  const handleAddData = async (payload: {
    title: string;
    type: string;
    year: number;
  }) => {
    await fetch(
      `http://localhost:4000/api/lecturer/${userId}/intellectual-property`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    await fetchData();
    setIsModalOpen(false);
    setSuccessTitle(payload.title);
    setAddSuccess(true);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: HkiItem) => {
    setAddSuccess(false);
    setUpdateSuccess(false);
    setDeleteSuccess(false);
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateData = async (updated: HkiItem) => {
    await fetch(
      `http://localhost:4000/api/lecturer/intellectual-property/${updated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updated.title,
          type: updated.type,
          year: updated.year,
        }),
      }
    );

    await fetchData();
    setIsEditModalOpen(false);
    setSuccessTitle(updated.title);
    setUpdateSuccess(true);
  };

  /* ================= DELETE ================= */
  const openDeleteModal = (id: number) => {
    setAddSuccess(false);
    setUpdateSuccess(false);
    setDeleteSuccess(false);
    setDeleteId(id);
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(
      `http://localhost:4000/api/lecturer/intellectual-property/${deleteId}`,
      {
        method: "DELETE",
      }
    );

    await fetchData();
    setDeleteConfirm(false);
    setDeleteSuccess(true);
    setDeleteId(null);
  };

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const cocokYear =
        selectedYear === "Semua" || item.year === Number(selectedYear);
      const cocokTitle = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return cocokYear && cocokTitle;
    });
  }, [data, searchTerm, selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
    setPageStart(1);
  }, [searchTerm, selectedYear]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );
  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const visiblePages = Array.from(
    { length: Math.min(maxVisiblePages, totalPages - pageStart + 1) },
    (_, i) => pageStart + i
  );

  /* ================= ALERT COMPONENTS ================= */
  const SuccessAlert = ({
    message,
    onOk,
  }: {
    message: string;
    onOk: () => void;
  }) =>
    createPortal(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999]">
        <div className="bg-white p-6 rounded-lg w-80 text-center">
          <h3 className="font-bold text-blue-600 mb-2">Berhasil!</h3>
          <p className="mb-4">{message}</p>
          <button
            onClick={onOk}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            OK
          </button>
        </div>
      </div>,
      document.body
    );

  const DeleteAlert = ({
    onCancel,
    onOk,
  }: {
    onCancel: () => void;
    onOk: () => void;
  }) =>
    createPortal(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999]">
        <div className="bg-white p-6 rounded-lg w-80 text-center">
          <h3 className="font-bold text-red-600 mb-2">Hapus Data?</h3>
          <p className="mb-4">Data akan dihapus permanen!</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Batal
            </button>
            <button
              onClick={onOk}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          DAFTAR HKI / PATEN DOSEN
        </h1>

        <div className="flex justify-end items-center mb-4 gap-3 flex-wrap">
          <button
            onClick={() => {
              setAddSuccess(false);
              setUpdateSuccess(false);
              setDeleteSuccess(false);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 border rounded-lg shadow-sm text-sm"
          >
            <Plus size={16} /> Tambah HKI
          </button>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-lg px-3 pr-8 py-2 text-black"
          >
            <option value="Semua">Semua Tahun</option>
            {[2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <div className="flex items-center border rounded-lg bg-white shadow-sm overflow-hidden w-64 text-black">
            <input
              type="text"
              placeholder="Cari Judul HKI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-2.5 focus:outline-none text-sm"
            />
            <div className="bg-blue-600 text-white px-3 py-3 border-l">
              <Search size={16} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300">
              <tr>
                <th className="border px-4 py-2 text-center">NO</th>
                <th className="border px-4 py-2">JUDUL KARYA</th>
                <th className="border px-4 py-2 text-center">JENIS HKI</th>
                <th className="border px-4 py-2 text-center">TAHUN</th>
                <th className="border px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2 text-center">{item.type}</td>
                    <td className="border px-4 py-2 text-center">{item.year}</td>

                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-400 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                        >
                          <Edit size={14} /> Edit
                        </button>

                        <button
                          onClick={() => openDeleteModal(item.id)}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-3 flex justify-end gap-2">
            <button onClick={() => pageStart > 1 && (setPageStart(pageStart - 1), setCurrentPage(pageStart - 1))}>
              &lt;
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-blue-600 text-white" : ""}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                pageStart + maxVisiblePages - 1 < totalPages &&
                (setPageStart(pageStart + 1), setCurrentPage(pageStart + 1))
              }
            >
              &gt;
            </button>
          </div>
        </div>

        {/* ADD MODAL */}
        <TambahHkiCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddData}
        />

        {addSuccess && (
          <SuccessAlert
            message={`"${successTitle}" berhasil ditambahkan.`}
            onOk={() => setAddSuccess(false)}
          />
        )}

        {/* EDIT MODAL */}
        <EditHkiCard
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateData}
          defaultData={selectedItem}
        />

        {/* UPDATE SUCCESS */}
        {updateSuccess && (
          <SuccessAlert
            message={`Perubahan pada "${successTitle}" berhasil disimpan.`}
            onOk={() => setUpdateSuccess(false)}
          />
        )}

        {/* DELETE CONFIRM */}
        {deleteConfirm && (
          <DeleteAlert
            onCancel={() => setDeleteConfirm(false)}
            onOk={confirmDelete}
          />
        )}

        {/* DELETE SUCCESS */}
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
