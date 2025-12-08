"use client";

import React, { useEffect, useState } from "react";
import { Search, Trash2, Plus } from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

import UserAddModal from "./components/UserAddModal";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
};

export default function UserAdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [users, setUsers] = useState<User[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState(""); // <-- BARU

  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const loadUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then((r) => r.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ======================================================================
  // FILTER NEW
  // ======================================================================
  const filtered = users.filter((u) =>
    (roleFilter === "" || u.role === roleFilter) &&
    (
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, roleFilter, itemsPerPage]);

  // ======================================================================
  // DELETE
  // ======================================================================
  const deleteNow = async () => {
    if (!confirmDelete) return;

    await fetch(`http://localhost:4000/api/users/${confirmDelete}`, {
      method: "DELETE",
    });

    setConfirmDelete(null);
    loadUsers();
  };

  // ======================================================================
  // ADD
  // ======================================================================
  const handleAddUser = async (data: any) => {
    await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    loadUsers();
  };

  // ======================================================================
  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase">Kelola User</h1>
            <p className="text-gray-600 text-sm">Mengatur akun Admin & Dosen</p>
          </div>

          {/* ======================================================================
            SEARCH + FILTERS + ADD BTN
          ======================================================================*/}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">

            {/* SEARCH */}
            <div className="relative flex items-center h-10">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => document.getElementById("searchInput")?.focus(), 50);
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-md absolute left-0"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => searchTerm === "" && setIsSearchOpen(false)}
                placeholder="Cari user..."
                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 
                  ${
                    isSearchOpen
                      ? "w-56 pl-10 pr-3 opacity-100"
                      : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            {/* ITEMS PER PAGE */}
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
            >
              {[10, 20, 30, 40].map((n) => (
                <option key={n} value={n}>{n} Halaman</option>
              ))}
            </select>

            {/* ROLE FILTER */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
            >
              <option value="">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
            </select>

            {/* ADD USER BTN */}
            <button
              onClick={() => setOpenAdd(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-2"
            >
              <Plus size={16} /> Tambah User
            </button>
          </div>

          {/* ======================================================================
              TABLE
          ======================================================================*/}
          <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-x-auto">

            <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
              <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">Nama</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 italic text-gray-500">Belum ada user.</td>
                  </tr>
                ) : (
                  pageItems.map((l, i) => (
                    <tr key={l.id} className="hover:bg-blue-50 border">
                      <td className="border border-gray-300 px-4 py-2">{startIndex + i + 1}</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">{l.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{l.email}</td>
                      <td className="border border-gray-300 px-4 py-2 capitalize">{l.role}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => setConfirmDelete(l.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* ======================================================================
              PAGINATION
            ======================================================================*/}
            <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">

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
                  currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-gray-300"
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
                    className={`px-2 py-1 rounded border text-xs ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-300"
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
                    setCurrentPage((prev) => prev + 1);
                    setPageGroup(newGroup);
                  }
                }}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded border text-xs ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* ADD USER MODAL */}
          <UserAddModal
            isOpen={openAdd}
            onClose={() => setOpenAdd(false)} 
            onSubmit={handleAddUser}
          />

          {/* DELETE CONFIRM */}
          {confirmDelete && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-600">Konfirmasi Hapus</h3>
                <p className="text-sm text-gray-700 mb-6">
                  Yakin ingin menghapus user ini?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="px-4 py-2 rounded bg-gray-300 text-black text-sm hover:bg-gray-400"
                  >
                    Batal
                  </button>

                  <button
                    onClick={deleteNow}
                    className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
