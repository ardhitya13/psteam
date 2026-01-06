"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Search, Users, Edit } from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import {
  getAllLecturers,
  addCommunityService,
  addCommunityServiceByAdmin,
  updateCommunityService,
  deleteCommunityService,
} from "../../../lib/lecturer";

import EditCommunityServiceCard from "./CommunityServiceEditCard";

/* =========================
   TYPES
========================= */
type CommunityServiceItem = {
  id?: number;
  title: string;
  year: number;
};

type Lecturer = {
  id: number;
  name: string;
  email: string;
  studyProgram?: string;
  specialization?: string;
  imageUrl?: string;
  communityservice: CommunityServiceItem[];
};

export default function CommunityServiceTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  /* SEARCH */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* PAGINATION */
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageGroup, setPageGroup] = useState<number>(0);

  const [filterYear, setFilterYear] = useState("Semua");
  const [communityPage, setCommunityPage] = useState(1);

  useEffect(() => {
    setCommunityPage(1);
  }, [filterYear]);

  /* EDIT MODAL */
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayload, setEditPayload] = useState<{
    lecId: number;
    communityserviceList: CommunityServiceItem[];
    lecturer_name: string;
    email: string;
    studyProgram: string;
    specialization: string;
  } | null>(null);

  /* =========================
     LOAD DATA
  ========================= */
  async function loadLecturers() {
    try {
      const res = await getAllLecturers();

      const formatted = (res || []).map((lec: any) => {
        const profile = lec.lecturerprofile || {};

        return {
          id: lec.id,
          name: lec.name || "-",
          email: lec.email || "-",
          studyProgram: profile.studyProgram || "-",
          specialization: profile.specialization || "-",
          imageUrl: profile.imageUrl
            ? `http://localhost:4000${profile.imageUrl}`
            : "/no-photo.png",
          communityservice: Array.isArray(profile.communityservice)
            ? profile.communityservice
            : [],
        } as Lecturer;
      });

      setLecturers(formatted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data.");
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLecturers();
  }, []);

  /* =========================
     CREATE / UPDATE / DELETE
  ========================= */
  async function handleUpdateCommunityService(payload: {
    lecId: number;
    communityserviceList: CommunityServiceItem[];
  }) {
    const { lecId, communityserviceList } = payload;

    try {
      const lecturer = lecturers.find((l) => l.id === lecId);
      const original = lecturer?.communityservice || [];

      for (const old of original) {
        const stillExist = communityserviceList.some(
          (c) => c.id === old.id
        );
        if (!stillExist && old.id) {
          await deleteCommunityService(old.id);
        }
      }

      for (const item of communityserviceList) {
        if (!item.title.trim()) continue;

        if (!item.id) {
          await addCommunityServiceByAdmin(lecId, {
            title: item.title,
            year: item.year,
          });
        } else {
          await updateCommunityService(item.id, {
            title: item.title,
            year: item.year,
          });
        }
      }

      await loadLecturers();
    } catch (err) {
      console.error("UPDATE COMMUNITY SERVICE ERROR:", err);
      alert("Gagal menyimpan pengabdian.");
    }
  }

  /* =========================
     FILTER (SAMA POLA)
  ========================= */
  const filteredLecturers = useMemo(() => {
    if (!searchQuery.trim()) return lecturers;
    const q = searchQuery.toLowerCase();
    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.studyProgram || "").toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q)
    );
  }, [searchQuery, lecturers]);

  /* =========================
     PAGINATION LOGIC
  ========================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLecturers.length / itemsPerPage)
  );

  const startIndex = currentPage * itemsPerPage - itemsPerPage;
  const paginated = filteredLecturers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(0);
  }, [searchQuery, itemsPerPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  const emptyItem = (): CommunityServiceItem => ({
    title: "",
    year: new Date().getFullYear(),
  });

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
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
              Daftar Pengabdian Masyarakat
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola pengabdian masyarakat dosen PSTeam
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex justify-end mb-6">
            <div className="relative flex items-center h-10">
              {!searchOpen && (
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(
                      () =>
                        document
                          .getElementById("searchInput")
                          ?.focus(),
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery.trim()) setSearchOpen(false);
                }}
                placeholder="Cari nama / prodi / email..."
                className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10 ${searchOpen
                  ? "w-56 pl-10 pr-3 opacity-100"
                  : "w-10 opacity-0 pointer-events-none"
                  }`}
              />
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                const value = Number(e.target.value);
                setItemsPerPage(isNaN(value) ? 10 : value);
              }}
              className="ml-3 text-black bg-white rounded-md px-6 py-2"
            >
              {[10, 20, 30, 40, 50].map((n) => (
                <option key={n} value={n}>
                  {n} / halaman
                </option>
              ))}
            </select>
          </div>

          {/* TABLE */}
          <div className="bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-blue-50 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 w-16">No</th>
                  <th className="py-3 px-4 border border-gray-300">Nama</th>
                  <th className="py-3 px-4 border border-gray-300">Program Studi</th>
                  <th className="py-3 px-4 border border-gray-300">Email</th>
                  <th className="py-3 px-4 border border-gray-300">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((lec, index) => {
                  const indexNumber = startIndex + index + 1;

                  return (
                    <React.Fragment key={lec.id}>
                      <tr className="hover:bg-blue-50">
                        <td className="py-3 px-4 text-center border border-gray-300">
                          {index + 1}
                        </td>

                        <td className="py-3 px-4 border border-gray-300 flex items-center gap-3">
                          <img
                            src={lec.imageUrl}
                            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                          />
                          <div>
                            <div className="font-semibold">{lec.name}</div>
                            <div className="text-xs text-gray-500">
                              {lec.specialization}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 border border-gray-300">
                          {lec.studyProgram}
                        </td>
                        <td className="py-3 px-4 border border-gray-300">{lec.email}</td>

                        <td className="py-3 px-4 border border-gray-300 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              className="px-3 py-1 bg-green-500 font-semibold rounded-md text-white flex gap-1 hover:bg-blue-200"
                              onClick={() =>
                                setExpandedId(
                                  expandedId === lec.id ? null : lec.id
                                )
                              }
                            >
                              <Users className="pt-1" size={15} /> Detail
                            </button>

                            <button
                              className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-md flex gap-1 hover:bg-yellow-500"
                              onClick={() => {
                                setEditPayload({
                                  lecId: lec.id,
                                  communityserviceList:
                                    lec.communityservice.length > 0
                                      ? lec.communityservice
                                      : [emptyItem()],
                                  lecturer_name: lec.name,
                                  email: lec.email,
                                  studyProgram: lec.studyProgram || "",
                                  specialization:
                                    lec.specialization || "",
                                });
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="pt-1" size={15} /> Edit
                            </button>
                          </div>
                        </td>
                      </tr>

                      {expandedId === lec.id && (
                        <tr>
                          <td colSpan={5} className="p-0 border border-gray-300 bg-[#f5f7fb]">
                            <div className="p-6">
                              <div className="bg-white p-6 rounded-lg shadow border mb-6">
                                <div className="flex items-center gap-6">
                                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300">
                                    <img src={lec.imageUrl} className="object-cover w-full h-full" />
                                  </div>
                                  <div>
                                    <h2 className="text-2xl font-bold text-[#0a3b91]">{lec.name}</h2>
                                    <p className="text-gray-700 text-lg font-semibold">Dosen</p>
                                    <div className="mt-3 space-y-1 text-gray-700 text-sm">
                                      <p><strong>Program Studi:</strong> {lec.studyProgram}</p>
                                      <p><strong>Email:</strong> {lec.email}</p>
                                      <p><strong>Bidang Spesialis:</strong> {lec.specialization}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white p-6 rounded-lg shadow border">
                                <h3 className="text-xl font-bold mb-3">Pengabdian Masyarakat</h3>
                                <table className="w-full text-sm border bg-white rounded">
                                  <thead className="bg-blue-100 font-semibold">
                                    <tr>
                                      <th className="border px-3 py-2 w-12 text-center">No</th>
                                      <th className="border px-3 py-2">Judul Pengabdian</th>
                                      <th className="border px-3 py-2 w-32">
                                        <div className="flex flex-col items-center gap-1">
                                          <span>Tahun</span>
                                          <select
                                            value={filterYear}
                                            onChange={(e) => setFilterYear(e.target.value)}
                                            className="border rounded px-6 py-1 text-xs bg-white"
                                          >
                                            <option value="Semua">Semua</option>
                                            {[...new Set(lec.communityservice.map(c => c.year))]
                                              .sort((a, b) => b - a)
                                              .map((year) => (
                                                <option key={year} value={year}>
                                                  {year}
                                                </option>
                                              ))}
                                          </select>
                                        </div>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(() => {
                                      /* ===============================
                                         FILTER COMMUNITY SERVICE
                                      =============================== */
                                      const filteredCommunity = lec.communityservice.filter((c) => {
                                        const matchYear =
                                          filterYear === "Semua" || c.year === Number(filterYear);
                                        return matchYear;
                                      });

                                      /* ===============================
                                         PAGINATION COMMUNITY SERVICE
                                      =============================== */
                                      const COMMUNITY_PER_PAGE = 10;
                                      const totalCommunityPages = Math.max(
                                        1,
                                        Math.ceil(filteredCommunity.length / COMMUNITY_PER_PAGE)
                                      );

                                      const start = (communityPage - 1) * COMMUNITY_PER_PAGE;
                                      const paginatedCommunity = filteredCommunity.slice(
                                        start,
                                        start + COMMUNITY_PER_PAGE
                                      );

                                      return (
                                        <>
                                          {/* DATA */}
                                          {paginatedCommunity.map((c, idx) => (
                                            <tr key={c.id ?? idx} className="hover:bg-blue-50">
                                              <td className="border px-3 py-2 text-center">
                                                {start + idx + 1}
                                              </td>
                                              <td className="border px-3 py-2">
                                                {c.title}
                                              </td>
                                              <td className="border px-3 py-2 text-center">
                                                {c.year}
                                              </td>
                                            </tr>
                                          ))}

                                          {/* EMPTY STATE */}
                                          {filteredCommunity.length === 0 && (
                                            <tr>
                                              <td
                                                colSpan={3}
                                                className="text-center py-4 text-gray-500 italic"
                                              >
                                                Tidak ada pengabdian.
                                              </td>
                                            </tr>
                                          )}

                                          {/* PAGINATION */}
                                          {totalCommunityPages > 1 && (
                                            <tr>
                                              <td colSpan={3} className="py-3">
                                                <div className="flex justify-end items-center gap-2 text-xs">
                                                  <button
                                                    disabled={communityPage === 1}
                                                    onClick={() => setCommunityPage((p) => p - 1)}
                                                    className="px-2 py-1 border bg-blue-600 rounded disabled:opacity-50"
                                                  >
                                                    &lt;
                                                  </button>

                                                  <span>
                                                    {communityPage} / {totalCommunityPages}
                                                  </span>

                                                  <button
                                                    disabled={communityPage === totalCommunityPages}
                                                    onClick={() => setCommunityPage((p) => p + 1)}
                                                    className="px-2 py-1 border bg-blue-600 rounded disabled:opacity-50"
                                                  >
                                                    &gt;
                                                  </button>
                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </>
                                      );
                                    })()}
                                  </tbody>

                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 rounded-b-lg">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((prev) => prev - 1);
                    setPageGroup(
                      Math.floor((currentPage - 2) / 3)
                    );
                  }
                }}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded border text-xs ${currentPage === 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-100 hover:bg-gray-300"
                  }`}
              >
                &lt;
              </button>

              {Array.from({ length: 3 }, (_, i) => {
                const pageNum = pageGroup * 3 + (i + 1);
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 py-1 rounded text-xs border ${currentPage === pageNum
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
                    setCurrentPage((prev) => prev + 1);
                    setPageGroup(Math.floor(currentPage / 3));
                  }
                }}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded border text-xs ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-100 hover:bg-gray-300"
                  }`}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* MODAL */}
          <EditCommunityServiceCard
            isOpen={isEditOpen}
            defaultData={editPayload}
            onClose={() => {
              setIsEditOpen(false);
              setEditPayload(null);
            }}
            onSubmit={handleUpdateCommunityService}
          />
        </main>
      </div>
    </div>
  );
}

