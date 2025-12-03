"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { FaEnvelope, FaFilter } from "react-icons/fa";
import { ChevronUp, ChevronDown } from "lucide-react";
import DosenTabs from "./DosenTabs";

export default function DosenCard({ limit }: { limit?: number }) {
  const dosenList = [
    {
      name: "Swono Sibagariang, S.Kom., M.Kom",
      position: "Dosen",
      program: "Teknik Informatika",
      educationLevel: "Magister (S2)",
      email: "swono@polibatam.ac.id",
      specialization: "Software Development",
      imageUrl: "/dosen/swono_sibagariang.png",
      educationHistory: [
        { degree: "Sarjana (S1)", university: "Universitas Khatolik Santo Thomas Sumatera Utara", major: "Teknik Informatika" },
        { degree: "Magister (S2)", university: "Universitas Sumatera Utara", major: "Ilmu dan Teknologi" }
      ],
      portfolio: {
        research: [
          { title: "Integrasi Teknologi Active Liveness Detection", year: 2025 },
          { title: "Model Klasifikasi Calon Mahasiswa Baru", year: 2024 }
        ],
        communityService: [
          { title: "Penerapan Aplikasi POS UMKM", year: 2025 }
        ],
        publications: [
          { title: "Interpretable Machine Learning", type: "Jurnal nasional terakreditasi", year: 2025 },
          { title: "Penerapan Raspberry Pi untuk Kehadiran", type: "Jurnal nasional", year: 2025 }
        ],
        intellectualProperty: [
          { title: "Keamanan API Menggunakan JWT", type: "Hak cipta nasional", year: 2024 }
        ]
      }
    }
  ];

  const displayedDosen =
    typeof limit === "number" ? dosenList.slice(0, Math.max(1, limit)) : dosenList;

  return (
    <section className="py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {displayedDosen.map((dosen, i) => (
          <DosenSingleCard key={i} dosen={dosen} />
        ))}
      </div>
    </section>
  );
}

/* ========================================================= */

function DosenSingleCard({ dosen }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("research");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("Semua");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dataAktif = dosen?.portfolio?.[activeTab] || [];

  const kategoriPublikasi = [
    "Artikel ilmiah",
    "Jurnal nasional",
    "Jurnal nasional terakreditasi",
    "Jurnal internasional bereputasi",
    "Jurnal internasional",
    "Lain-lain",
  ];

  const kategoriHKI = ["Hak cipta nasional", "Paten nasional"];

  const existingTypes = new Set(dataAktif.map((item: any) => item.type));

  const typeOptions =
    activeTab === "publications"
      ? ["Semua", ...kategoriPublikasi]
      : activeTab === "intellectualProperty"
        ? ["Semua", ...kategoriHKI]
        : [];

  const filteredData = useMemo(() => {
    let data = [...dataAktif];
    if ((activeTab === "publications" || activeTab === "intellectualProperty") && typeFilter !== "Semua") {
      data = data.filter((i) => i.type === typeFilter);
    }
    data.sort((a, b) => (sortOrder === "asc" ? a.year - b.year : b.year - a.year));
    return data;
  }, [dataAktif, activeTab, typeFilter, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  /* ========================================================= */

  return (
    <article className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-visible">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-blue-50 to-white border-b border-white rounded-t-3xl">
        <div className="relative w-40 h-40">
          <Image
            src={dosen.imageUrl}
            alt={dosen.name}
            fill
            className="object-cover rounded-full border-4 border-blue-300 shadow-md"
          />
        </div>

        <div className="flex-1 text-black space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            {dosen.name}
          </h2>
          <p className="text-gray-700 font-semibold">{dosen.position}</p>
          <p><strong>Program Studi:</strong> {dosen.program}</p>
          <p><strong>Pendidikan Terakhir:</strong> {dosen.educationLevel}</p>
          <p className="flex items-center gap-2">
            <strong>Email:</strong>
            <a href={`mailto:${dosen.email}`} className="text-blue-600 hover:underline">
              <FaEnvelope className="inline mr-1" /> {dosen.email}
            </a>
          </p>
          <p><strong>Bidang Spesialis:</strong> {dosen.specialization}</p>
        </div>
      </div>

      {/* ============ ACCORDION ============ */}
      <div className="my-4 flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
        >
          {isOpen ? "Tutup Detail" : "Lihat Detail Dosen"}
        </button>
      </div>

      {/* ============ DETAIL CONTENT ============ */}
      {isOpen && (
        <div className="px-8 py-6 bg-white border-t border-blue-200">

          {/* PENDIDIKAN */}
          <div className="text-black mb-6">
            <h3 className="font-semibold text-lg mb-2 border-b border-blue-200 pb-1">
              Riwayat Pendidikan
            </h3>
            <ul className="list-disc ml-5 space-y-1">
              {dosen.educationHistory.map((edu: any, i: number) => (
                <li key={i}>{edu.degree} – {edu.university}: <span className="italic">{edu.major}</span></li>
              ))}
            </ul>
          </div>

          {/* TABS */}
          <DosenTabs
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setPage(1);
              setTypeFilter("Semua");
            }}
          />

          {/* TABLE */}
          <div className="overflow-x-auto px-2 pb-4 mt-4">
            <div className="border border-blue-100 rounded-lg shadow-sm bg-white relative">

              <table className="w-full text-sm text-black">
                <thead className="bg-blue-100/70">
                  <tr>
                    <th className="p-3 w-12 text-left font-semibold">No</th>
                    <th className="p-3 text-left font-semibold">Judul</th>

                    {(activeTab === "publications" || activeTab === "intellectualProperty") && (
                      <th className="p-3 text-left font-semibold relative">
                        Jenis
                        <div ref={dropdownRef} className="inline-block ml-2 relative">
                          <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-xs text-blue-700 border border-blue-400 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition"
                          >
                            <FaFilter className="inline mr-1 text-[10px]" /> {typeFilter}
                          </button>

                          {dropdownOpen && (
                            <div className="absolute right-0 top-7 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-56 max-h-60 overflow-y-auto">
                              {typeOptions.map((type, idx) => {
                                const isAvailable = type === "Semua" || existingTypes.has(type);
                                return (
                                  <button
                                    key={idx}
                                    disabled={!isAvailable}
                                    onClick={() => {
                                      if (isAvailable) {
                                        setTypeFilter(type);
                                        setDropdownOpen(false);
                                      }
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm ${
                                      type === typeFilter
                                        ? "bg-blue-100 font-semibold text-blue-700"
                                        : isAvailable
                                          ? "hover:bg-blue-50"
                                          : "opacity-40 cursor-not-allowed"
                                    }`}
                                  >
                                    {type}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </th>
                    )}

                    <th
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="p-3 cursor-pointer select-none font-semibold w-24"
                    >
                      Tahun {sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.map((item: any, i: number) => (
                    <tr key={i} className="even:bg-blue-50/30 hover:bg-blue-100/60 transition-colors">
                      <td className="p-2">{startIndex + i + 1}</td>
                      <td className="p-2">{item.title}</td>

                      {(activeTab === "publications" || activeTab === "intellectualProperty") && (
                        <td className="p-2">{item.type}</td>
                      )}

                      <td className="p-2 font-medium text-center">{item.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>

          {/* PAGINATION — MATCH WITH VERIFIED STYLE */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-6">

              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-1.5 rounded-md border text-sm ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                &lt;
              </button>

              {/* 3 page grouping */}
              {Array.from({ length: 3 }, (_, i) => {
                const pageNumber = Math.floor((page - 1) / 3) * 3 + (i + 1);
                if (pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1.5 rounded-md border text-sm font-semibold ${
                      page === pageNumber
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-3 py-1.5 rounded-md border text-sm ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                &gt;
              </button>

            </div>
          )}

        </div>
      )}

    </article>
  );
}
