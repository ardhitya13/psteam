"use client";

import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,
  Users,
  Search,
} from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AddTeamModal from "./AddTeamModal";
import EditTeamModal from "./EditTeamModal";

type TeamPerson = {
  id?: number;
  name: string;
  role: string;
  email: string;
  image?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  category: "dosen" | "mahasiswa";
};

type TeamProject = {
  id: number;
  teamTitle: string;
  members: TeamPerson[];
};

export default function TeamAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<TeamProject[]>([]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState<TeamPerson | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("teamProjects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("teamProjects", JSON.stringify(projects));
  }, [projects]);

  const handleAdd = (data: { teamTitle: string; members: TeamPerson[] }) => {
    const newProject: TeamProject = {
      id: Date.now(),
      teamTitle: data.teamTitle,
      members: data.members.map((m) => ({
        id: Date.now() + Math.random(),
        ...m,
      })),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Yakin ingin menghapus seluruh tim ini?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleDeleteMember = (projectId: number, memberId?: number) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, members: p.members.filter((m) => m.id !== memberId) }
          : p
      )
    );
  };

  const handleUpdateMember = (updated: TeamPerson) => {
    setProjects((prev) =>
      prev.map((p) => ({
        ...p,
        members: p.members.map((m) =>
          m.id === updated.id ? updated : m
        ),
      }))
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const filteredProjects = projects.filter((p) =>
    p.teamTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      {/* Navbar dan Sidebar */}
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Konten utama */}
        <main
          className={`flex-1 transition-all duration-300 px-8 py-6 ${isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
            } mt-[85px]`}
          style={{ minHeight: "calc(100vh - 85px)" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0a3b91] uppercase">
              Daftar Tim Pengembang
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola daftar project dan anggota tim.
            </p>
          </div>

          {/* Control Bar */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">
            {/* Search */}
            <div className="relative flex items-center">
              <Search
                className="absolute left-3 text-gray-500 pointer-events-none"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-56 
               focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm 
               bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 bg-white text-gray-700 font-medium rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
              >
                {[10, 20, 30, 40].map((num) => (
                  <option key={num} value={num}>
                    {num} Halaman
                  </option>
                ))}
              </select>
            </div>

            {/* Tambah Tim */}
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3 py-1.5 rounded-md flex items-center gap-2 font-medium shadow-sm text-sm transition"
            >
              <PlusCircle className="w-4 h-4" /> Tambah Tim
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">
            <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
              <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 w-16">No</th>
                  <th className="py-3 px-4 border border-gray-300">
                    Nama Project
                  </th>
                  <th className="py-3 px-4 border border-gray-300">
                    Jumlah Anggota
                  </th>
                  <th className="py-3 px-4 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project, index) => (
                    <React.Fragment key={project.id}>
                      <tr className="border border-gray-300 hover:bg-blue-50 transition">
                        <td className="font-medium py-3 px-4 border border-gray-300">
                          {startIndex + index + 1}
                        </td>
                        <td className="font-semibold text-gray-900 py-3 px-4 border border-gray-300">
                          {project.teamTitle}
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          {project.members.length}
                        </td>
                        <td className="py-3 px-4 border border-gray-300 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => toggleExpand(project.id)}
                              className="bg-[#DBEAFE] hover:bg-[#BFDBFE] text-blue-700 px-3 py-1 rounded-md flex items-center gap-1 text-sm font-semibold"
                            >
                              <Users size={14} />
                              {expandedProject === project.id
                                ? "Tutup"
                                : "Lihat Anggota"}
                              {expandedProject === project.id ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
                            >
                              <Trash className="w-4 h-4" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>

                      {expandedProject === project.id && (
                        <tr>
                          <td colSpan={4} className="p-0 border border-gray-300">
                            <div className="p-3 bg-gray-50">
                              <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">
                                Anggota Tim Produksi {project.teamTitle}
                              </h2>

                              <table className="w-full text-xs md:text-sm text-left border-collapse border border-gray-300 bg-white rounded-md">
                                <thead className="bg-gray-100 text-gray-700 border border-gray-300">
                                  <tr>
                                    <th className="py-2 px-3 border border-gray-300">Foto</th>
                                    <th className="py-2 px-3 border border-gray-300">Nama</th>
                                    <th className="py-2 px-3 border border-gray-300">Peran</th>
                                    <th className="py-2 px-3 border border-gray-300">Kategori</th>
                                    <th className="py-2 px-3 border border-gray-300">Email</th>
                                    <th className="py-2 px-3 border border-gray-300">Sosial Media</th>
                                    <th className="py-2 px-3 text-center border border-gray-300">
                                      Aksi
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {project.members.length > 0 ? (
                                    project.members.map((m) => (
                                      <tr
                                        key={m.id}
                                        className="hover:bg-gray-50 transition border border-gray-300"
                                      >
                                        <td className="py-2 px-3 border border-gray-300">
                                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                                            {m.image ? (
                                              <img
                                                src={m.image}
                                                alt={m.name}
                                                className="object-cover w-full h-full"
                                              />
                                            ) : (
                                              <div className="text-gray-400 flex items-center justify-center text-xs h-full">
                                                -
                                              </div>
                                            )}
                                          </div>
                                        </td>
                                        <td className="py-2 px-3 border border-gray-300">
                                          {m.name}
                                        </td>
                                        <td className="py-2 px-3 border border-gray-300">
                                          {m.role?.trim()
                                            ? m.role
                                            : `Anggota Tim ${project.teamTitle}`}
                                        </td>
                                        <td className="py-2 px-3 border border-gray-300 capitalize">
                                          {m.category}
                                        </td>
                                        <td className="py-2 px-3 border border-gray-300">
                                          {m.email}
                                        </td>
                                        <td className="py-2 px-3 border border-gray-300">
                                          <div className="flex flex-wrap gap-1 text-xs">
                                            {m.github && (
                                              <a
                                                href={m.github}
                                                target="_blank"
                                                className="bg-gray-100 hover:bg-blue-100 text-gray-700 px-2 py-1 rounded"
                                              >
                                                GitHub
                                              </a>
                                            )}
                                          </div>
                                        </td>
                                        <td className="py-2 px-3 text-center border border-gray-300">
                                          <div className="flex justify-center gap-2">
                                            <button
                                              onClick={() => setEditData(m)}
                                              className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                                            >
                                              <Edit className="w-3 h-3" /> Edit
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleDeleteMember(
                                                  project.id,
                                                  m.id
                                                )
                                              }
                                              className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                                            >
                                              <Trash className="w-3 h-3" /> Hapus
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={7}
                                        className="text-center py-3 text-gray-500 italic border border-gray-300"
                                      >
                                        Belum ada anggota untuk project ini.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-10 text-gray-500 italic border border-gray-300"
                    >
                      Tidak ada project ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination kanan bawah */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-1 mt-5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1.5 rounded bg-gray-200 hover:bg-blue-100 text-gray-700 disabled:opacity-50"
              >
                {"<"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 rounded ${currentPage === i + 1
                      ? "bg-[#2563EB] text-white"
                      : "bg-gray-200 hover:bg-blue-100 text-gray-700"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1.5 rounded bg-gray-200 hover:bg-blue-100 text-gray-700 disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          )}

          {/* Modals */}
          {isAddOpen && (
            <AddTeamModal
              onClose={() => setIsAddOpen(false)}
              onAdd={handleAdd}
            />
          )}
          {editData && (
            <EditTeamModal
              data={editData}
              onClose={() => setEditData(null)}
              onUpdate={handleUpdateMember}
            />
          )}
        </main>
      </div>
    </div>
  );
}
