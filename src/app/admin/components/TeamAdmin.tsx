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
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Globe,
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
  studyProgram?: string;
  education?: string;
  specialization?: string;
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

  const [addForProject, setAddForProject] = useState<{ id: number; title: string } | null>(null);
  const [presetRole, setPresetRole] = useState<"dosen" | "mahasiswa" | "">("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      members: data.members.map((m) => {
        const finalRole =
          m.category === "mahasiswa"
            ? m.role?.trim()
              ? m.role
              : `Anggota Tim Produksi ${data.teamTitle}`
            : m.role?.trim()
              ? m.role
              : "Dosen Pembimbing";

        return {
          id: Date.now() + Math.random(),
          ...m,
          role: finalRole,
        };
      }),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const handleAddMember = (projectId: number, member: TeamPerson) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;

        const autoRole =
          member.category === "mahasiswa"
            ? `Anggota Tim Produksi ${p.teamTitle}`
            : member.role || "Dosen Pembimbing";

        const newMember: TeamPerson = {
          ...member,
          id: Date.now() + Math.random(),
          role: autoRole,
        };

        return {
          ...p,
          members: [...p.members, newMember],
        };
      })
    );
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
        members: p.members.map((m) => (m.id === updated.id ? updated : m)),
      }))
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const filteredProjects = projects.filter((p) =>
    p.teamTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main
          className={`flex-1 transition-all duration-300 px-8 py-6 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          } mt-[85px]`}
          style={{ minHeight: "calc(100vh - 85px)" }}
        >
          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black uppercase">
              Daftar Tim Pengembang
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola daftar project dan anggota tim.
            </p>
          </div>

          {/* CONTROL BAR */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-5">

            {/* SEARCH */}
            <div className="relative flex items-center justify-center">
              {!isSearchOpen && (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => {
                      const input = document.getElementById("searchInput") as HTMLInputElement;
                      input?.focus();
                    }, 50);
                  }}
                  className="absolute w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm z-20"
                >
                  <Search size={18} />
                </button>
              )}

              <input
                id="searchInput"
                type="text"
                placeholder="Cari project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => {
                  if (searchTerm.trim() === "") setIsSearchOpen(false);
                }}
                className={`
                  transition-all duration-300 bg-white border border-gray-300 rounded-md shadow-sm 
                  text-sm text-gray-900 placeholder-gray-400
                  ${
                    isSearchOpen
                      ? "w-56 pl-10 pr-3 py-2 opacity-100 z-30"
                      : "w-10 pl-0 pr-0 py-2 opacity-0 pointer-events-none z-10"
                  }
                `}
              />

              {isSearchOpen && (
                <Search size={16} className="absolute left-3 text-gray-500 pointer-events-none z-40" />
              )}
            </div>

            {/* FILTER */}
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 bg-white text-gray-700 font-medium 
                  rounded-md pl-3 pr-10 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  backgroundImage: "none",
                }}
              >
                {[10, 20, 30, 40].map((num) => (
                  <option key={num} value={num}>{num} Halaman</option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>

            {/* ADD TEAM */}
            <button
              onClick={() => {
                setAddForProject(null);
                setPresetRole("");
                setIsAddOpen(true);
              }}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium shadow-sm text-sm transition"
            >
              <PlusCircle className="w-4 h-4" /> Tambah Tim
            </button>
          </div>

          {/* TABLE WRAPPER */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-visible">

            {/* TABLE */}
            <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
              <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 w-16">No</th>
                  <th className="py-3 px-4 border border-gray-300">Nama Project</th>
                  <th className="py-3 px-4 border border-gray-300">Jumlah Anggota</th>
                  <th className="py-3 px-4 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project, index) => (
                    <React.Fragment key={project.id}>

                      {/* ROW PROJECT */}
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

                        <td className="py-3 px-4 border border-gray-300 text-center relative">
                          <div className="flex justify-center gap-2 items-center">

                            {/* EXPAND */}
                            <button
                              onClick={() => toggleExpand(project.id)}
                              className="bg-[#DBEAFE] hover:bg-[#BFDBFE] text-blue-700
                                px-3 py-1 rounded-md flex items-center gap-1 text-sm font-semibold"
                            >
                              <Users size={14} />
                              {expandedProject === project.id ? "Tutup" : "Lihat Anggota"}
                              {expandedProject === project.id ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>

                            {/* DROPDOWN */}
                            <div className="relative inline-block text-left">
                              <button
                                onClick={() =>
                                  setOpenDropdownId((prev) =>
                                    prev === project.id ? null : project.id
                                  )
                                }
                                className="bg-[#0ea5a4] hover:bg-[#059e9d] text-white 
                                  px-3 py-1 rounded-md flex items-center gap-2 text-sm font-semibold"
                              >
                                <span className="font-bold">+</span> Tambah Anggota ▾
                              </button>

                              {openDropdownId === project.id && (
                                <div
                                  className="absolute right-0 mt-2 w-44 origin-top-right bg-white 
                                    border border-gray-200 rounded-md shadow-lg z-50"
                                  onMouseLeave={() => setOpenDropdownId(null)}
                                >
                                  <div className="py-1">
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                      onClick={() => {
                                        setAddForProject({ id: project.id, title: project.teamTitle });
                                        setPresetRole("dosen");
                                        setIsAddOpen(true);
                                        setOpenDropdownId(null);
                                      }}
                                    >
                                      Tambah Dosen
                                    </button>

                                    <button
                                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                      onClick={() => {
                                        setAddForProject({ id: project.id, title: project.teamTitle });
                                        setPresetRole("mahasiswa");
                                        setIsAddOpen(true);
                                        setOpenDropdownId(null);
                                      }}
                                    >
                                      Tambah Mahasiswa
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* DELETE PROJECT */}
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="bg-[#EF4444] hover:bg-[#DC2626] text-white 
                                px-3 py-1 rounded-md flex items-center gap-1 text-sm"
                            >
                              <Trash className="w-4 h-4" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED CONTENT */}
                      {expandedProject === project.id && (
                        <tr>
                          <td colSpan={4} className="p-0 border border-gray-300 overflow-visible">
                            <div className="p-3 bg-gray-50">

                              <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">
                                Anggota Tim Produksi {project.teamTitle}
                              </h2>

                              {(() => {
                                const dosenMembers = project.members.filter((m) => m.category === "dosen");
                                const mahasiswaMembers = project.members.filter((m) => m.category === "mahasiswa");

                                return (
                                  <div className="space-y-6">

                                    {/* === DOSEN TABLE === */}
                                    <div>
                                      <h3 className="text-md font-semibold text-black mb-2">
                                        Daftar Dosen
                                      </h3>

                                      <div className="overflow-x-auto">
                                        <table className="w-full text-xs md:text-sm text-left border-collapse border border-gray-300 bg-white rounded-md">
                                          <thead className="bg-gray-100 text-gray-700 border border-gray-300">
                                            <tr>
                                              <th className="py-2 px-3 border border-gray-300">Foto</th>
                                              <th className="py-2 px-3 border border-gray-300">Nama</th>
                                              <th className="py-2 px-3 border border-gray-300">Peran</th>
                                              <th className="py-2 px-3 border border-gray-300">Kategori</th>
                                              <th className="py-2 px-3 border border-gray-300">Email</th>
                                              <th className="py-2 px-3 border border-gray-300">Dosen Info</th>
                                              <th className="py-2 px-3 border border-gray-300">Sosial Media</th>
                                              <th className="py-2 px-3 text-center border border-gray-300">Aksi</th>
                                            </tr>
                                          </thead>

                                          <tbody>
                                            {dosenMembers.length > 0 ? (
                                              dosenMembers.map((m) => (
                                                <tr key={m.id} className="hover:bg-gray-50 transition border border-gray-300">

                                                  <td className="py-2 px-3 border border-gray-300">
                                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                                                      {m.image ? (
                                                        <img src={m.image} alt={m.name} className="object-cover w-full h-full" />
                                                      ) : (
                                                        <div className="text-gray-400 flex items-center justify-center text-xs h-full">-</div>
                                                      )}
                                                    </div>
                                                  </td>

                                                  <td className="py-2 px-3 border border-gray-300">{m.name}</td>

                                                  <td className="py-2 px-3 border border-gray-300">{m.role}</td>

                                                  <td className="py-2 px-3 border border-gray-300 capitalize">{m.category}</td>

                                                  <td className="py-2 px-3 border border-gray-300">{m.email}</td>

                                                  <td className="py-2 px-3 border border-gray-300 align-top">
                                                    <div className="text-sm text-gray-700 font-medium mb-1">Dosen Info</div>
                                                    <div className="text-xs text-gray-500 space-y-1">
                                                      <div><span className="font-medium">• Program Studi :</span> {m.studyProgram || "-"}</div>
                                                      <div><span className="font-medium">• Pendidikan :</span> {m.education || "-"}</div>
                                                      <div><span className="font-medium">• Spesialis :</span> {m.specialization || "-"}</div>
                                                    </div>
                                                  </td>

                                                  <td className="py-2 px-3 border border-gray-300">
                                                    <div className="flex gap-3 text-gray-600 items-center">
                                                      {m.github && (<a href={m.github} target="_blank"><Github size={20} className="hover:text-black" /></a>)}
                                                      {m.linkedin && (<a href={m.linkedin} target="_blank"><Linkedin size={20} className="hover:text-blue-700" /></a>)}
                                                      {m.facebook && (<a href={m.facebook} target="_blank"><Facebook size={20} className="hover:text-blue-600" /></a>)}
                                                      {m.instagram && (<a href={m.instagram} target="_blank"><Instagram size={20} className="hover:text-pink-500" /></a>)}
                                                      {m.website && (<a href={m.website} target="_blank"><Globe size={20} className="hover:text-green-600" /></a>)}
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
                                                        onClick={() => handleDeleteMember(project.id, m.id)}
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
                                                <td colSpan={8} className="text-center py-3 text-gray-500 italic border border-gray-300">
                                                  Belum ada Dosen untuk project ini.
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>

                                    {/* === MAHASISWA TABLE === */}
                                    <div>
                                      <h3 className="text-md font-semibold text-black mb-2">
                                        Daftar Mahasiswa
                                      </h3>

                                      <div className="overflow-x-auto">
                                        <table className="w-full text-xs md:text-sm text-left border-collapse border border-gray-300 bg-white rounded-md">
                                          <thead className="bg-gray-100 text-gray-700 border border-gray-300">
                                            <tr>
                                              <th className="py-2 px-3 border border-gray-300">Foto</th>
                                              <th className="py-2 px-3 border border-gray-300">Nama</th>
                                              <th className="py-2 px-3 border border-gray-300">Peran</th>
                                              <th className="py-2 px-3 border border-gray-300">Kategori</th>
                                              <th className="py-2 px-3 border border-gray-300">Email</th>
                                              <th className="py-2 px-3 border border-gray-300">Sosial Media</th>
                                              <th className="py-2 px-3 text-center border border-gray-300">Aksi</th>
                                            </tr>
                                          </thead>

                                          <tbody>
                                            {mahasiswaMembers.length > 0 ? (
                                              mahasiswaMembers.map((m) => (
                                                <tr key={m.id} className="hover:bg-gray-50 transition border border-gray-300">

                                                  <td className="py-2 px-3 border border-gray-300">
                                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                                                      {m.image ? (
                                                        <img src={m.image} alt={m.name} className="object-cover w-full h-full" />
                                                      ) : (
                                                        <div className="text-gray-400 flex items-center justify-center text-xs h-full">-</div>
                                                      )}
                                                    </div>
                                                  </td>

                                                  <td className="py-2 px-3 border border-gray-300">{m.name}</td>

                                                  <td className="py-2 px-3 border border-gray-300">
                                                    {m.role?.trim()
                                                      ? m.role
                                                      : `Anggota Tim Produksi ${project.teamTitle}`}
                                                  </td>

                                                  <td className="py-2 px-3 border border-gray-300 capitalize">{m.category}</td>

                                                  <td className="py-2 px-3 border border-gray-300">{m.email}</td>

                                                  <td className="py-2 px-3 border border-gray-300">
                                                    <div className="flex gap-3 text-gray-600 items-center">
                                                      {m.github && (<a href={m.github} target="_blank"><Github size={20} className="hover:text-black" /></a>)}
                                                      {m.linkedin && (<a href={m.linkedin} target="_blank"><Linkedin size={20} className="hover:text-blue-700" /></a>)}
                                                      {m.facebook && (<a href={m.facebook} target="_blank"><Facebook size={20} className="hover:text-blue-600" /></a>)}
                                                      {m.instagram && (<a href={m.instagram} target="_blank"><Instagram size={20} className="hover:text-pink-500" /></a>)}
                                                      {m.website && (<a href={m.website} target="_blank"><Globe size={20} className="hover:text-green-600" /></a>)}
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
                                                        onClick={() => handleDeleteMember(project.id, m.id)}
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
                                                <td colSpan={7} className="text-center py-3 text-gray-500 italic border border-gray-300">
                                                  Belum ada Mahasiswa untuk project ini.
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>

                                  </div>
                                );
                              })()}

                            </div>
                          </td>
                        </tr>
                      )}

                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500 italic border border-gray-300">
                      Tidak ada project ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* PAGINATION → SUDAH DI DALAM TABLE WRAPPER */}
            <div className="flex justify-end px-4 py-4">
              <div className="flex items-center gap-2">

                {(() => {
                  const safeTotalPages = Math.max(totalPages, 1);
                  const safeCurrentPageFixed = Math.min(safeCurrentPage, safeTotalPages);

                  return (
                    <>
                      {/* Prev */}
                      <button
                        disabled={safeCurrentPageFixed === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={`w-10 h-10 rounded-md border flex items-center justify-center
                          ${
                            safeCurrentPageFixed === 1
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {"<"}
                      </button>

                      {/* Number */}
                      {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-md border flex items-center justify-center text-sm font-medium
                            ${
                              safeCurrentPageFixed === page
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Next */}
                      <button
                        disabled={safeCurrentPageFixed === safeTotalPages}
                        onClick={() =>
                          setCurrentPage(prev => Math.min(prev + 1, safeTotalPages))
                        }
                        className={`w-10 h-10 rounded-md border flex items-center justify-center
                          ${
                            safeCurrentPageFixed === safeTotalPages
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {">"}
                      </button>
                    </>
                  );
                })()}

              </div>
            </div>

          </div>

          {/* MODALS */}
          {isAddOpen && (
            <AddTeamModal
              onClose={() => {
                setIsAddOpen(false);
                setAddForProject(null);
                setPresetRole("");
              }}
              onAdd={handleAdd}
              onAddMember={(projId: number, member: TeamPerson) =>
                handleAddMember(projId, member)
              }
              forProjectId={addForProject?.id}
              projectTitle={addForProject?.title}
              presetRole={presetRole}
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
