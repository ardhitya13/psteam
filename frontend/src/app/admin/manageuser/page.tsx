"use client";

import React, { useEffect, useState } from "react";
import { Search, Trash2, Plus } from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import UserAddModal from "./components/UserAddModal";

/* =========================
   USER TYPE (NO PHONE)
========================= */
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function UserAdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  /* =========================
     LOAD USERS
  ========================= */
  const loadUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil data user", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filtered = users.filter(
    (u) =>
      (roleFilter === "" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchTerm, roleFilter, itemsPerPage]);

  /* =========================
     DELETE USER
  ========================= */
  const deleteNow = async () => {
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/api/users/${confirmDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setConfirmDelete(null);
    loadUsers();
  };

  /* =========================
     ADD USER (FIX PALING PENTING)
  ========================= */
  const handleAddUser = async (data: any) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak ditemukan");

    const res = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    // 🔥 WAJIB — BIAR GA SUKSES PALSU
    if (!res.ok) {
      throw new Error(result.error || "Gagal menambahkan user");
    }

    await loadUsers();
  };

  /* =========================
     RENDER
  ========================= */
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
          {/* JUDUL */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase text-gray-800">
              Kelola User
            </h1>
            <p className="text-gray-700 text-sm">
              Mengatur akun Admin & Dosen
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">
            <div className="relative flex items-center h-10">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(
                      () => document.getElementById("searchInput")?.focus(),
                      50
                    );
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

            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
            >
              {[10, 20, 30, 40].map((n) => (
                <option key={n} value={n}>
                  {n} Halaman
                </option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md pl-2 pr-7 py-2 text-sm shadow-sm cursor-pointer"
            >
              <option value="">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
            </select>

            <button
              onClick={() => setOpenAdd(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-2"
            >
              <Plus size={16} /> Tambah User
            </button>
          </div>

          {/* TABLE */}
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
                    <td colSpan={5} className="py-6 italic text-gray-500">
                      Belum ada user.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((l, i) => (
                    <tr key={l.id} className="hover:bg-blue-50 border">
                      <td className="border border-gray-300 px-4 py-2">
                        {startIndex + i + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        {l.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {l.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 capitalize">
                        {l.role}
                      </td>
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
          </div>

          <UserAddModal
            isOpen={openAdd}
            onClose={() => setOpenAdd(false)}
            onSubmit={handleAddUser}
          />
        </main>
      </div>
    </div>
  );
}
