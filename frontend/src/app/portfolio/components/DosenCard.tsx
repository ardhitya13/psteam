"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { FaEnvelope, FaFilter } from "react-icons/fa";
import { ChevronUp, ChevronDown } from "lucide-react";
import DosenTabs from "./DosenTabs";

/* ================= TYPE ================= */

type Dosen = {
  name: string;
  position: string;
  program: string;
  educationLevel: string;
  email: string;
  specialization: string;
  imageUrl: string;
  educationHistory: any[];
  portfolio: {
    research: any[];
    communityService: any[];
    publications: any[];
    intellectualProperty: any[];
  };
};

/* ================= MAIN ================= */

export default function DosenCard({ limit }: { limit?: number }) {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/lecturer", {
          credentials: "include",
        });

        const json = await res.json();
        const rawData = Array.isArray(json)
          ? json
          : json.data || json.lecturers || [];

        const generated: Dosen[] = rawData.map((d: any) => {
          const profile = d.lecturerprofile || {};

          return {
            name: d.name ?? "-",
            position: "Dosen",
            program: profile.studyProgram ?? "-",
            educationLevel: "-",
            email: d.email ?? "-",
            specialization: profile.specialization ?? "-",
            imageUrl: profile.imageUrl
              ? `http://localhost:4000${profile.imageUrl}`
              : "/default-avatar.png",
            educationHistory: profile.educationhistory || [],
            portfolio: {
              research: profile.research || [],
              communityService: profile.communityservice || [],
              publications: profile.scientificwork || [],
              intellectualProperty: profile.intellectualproperty || [],
            },
          };
        });

        setDosenList(generated);
      } catch (err) {
        console.error("Gagal mengambil data dosen", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayed =
    typeof limit === "number"
      ? dosenList.slice(0, Math.max(1, limit))
      : dosenList;

  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Memuat data dosen...
      </section>
    );
  }

  return (
    <section className="py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {displayed.map((dosen, i) => (
          <DosenSingleCard key={i} dosen={dosen} />
        ))}
      </div>
    </section>
  );
}

/* ========================================================= */

function DosenSingleCard({ dosen }: { dosen: Dosen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "research" | "communityService" | "publications" | "intellectualProperty"
  >("research");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("Semua");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dataAktif = dosen.portfolio[activeTab] || [];

  const kategoriPublikasi = [
    "Artikel ilmiah",
    "Jurnal nasional",
    "Jurnal nasional terakreditasi",
    "Jurnal internasional bereputasi",
    "Jurnal internasional",
    "Lain-lain",
  ];

  const kategoriHKI = ["Hak cipta nasional", "Paten nasional"];

  const existingTypes = new Set(dataAktif.map((i: any) => i.type));

  const typeOptions =
    activeTab === "publications"
      ? ["Semua", ...kategoriPublikasi]
      : activeTab === "intellectualProperty"
      ? ["Semua", ...kategoriHKI]
      : [];

  const filteredData = useMemo(() => {
    let data = [...dataAktif];

    if (
      (activeTab === "publications" ||
        activeTab === "intellectualProperty") &&
      typeFilter !== "Semua"
    ) {
      data = data.filter((i: any) => i.type === typeFilter);
    }

    data.sort((a: any, b: any) =>
      sortOrder === "asc" ? a.year - b.year : b.year - a.year
    );

    return data;
  }, [dataAktif, activeTab, typeFilter, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <article className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-visible">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-blue-50 to-white border-b rounded-t-3xl">
        <div className="relative w-40 h-40 shrink-0">
          <Image
            src={dosen.imageUrl}
            alt={dosen.name}
            fill
            unoptimized
            className="object-cover rounded-full border-4 border-blue-300 shadow-md"
          />
        </div>

        <div className="flex-1 text-black space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            {dosen.name}
          </h2>
          <p className="font-semibold">{dosen.position}</p>
          <p>
            <strong>Program Studi:</strong> {dosen.program}
          </p>
          <p>
            <strong>Pendidikan Terakhir:</strong> {dosen.educationLevel}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> {dosen.email}
          </p>
          <p>
            <strong>Bidang Spesialis:</strong> {dosen.specialization}
          </p>
        </div>
      </div>

      {/* ================= ACCORDION ================= */}
      <div className="my-4 flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
        >
          {isOpen ? "Tutup Detail" : "Lihat Detail Dosen"}
        </button>
      </div>

      {/* ================= DETAIL ================= */}
      {isOpen && (
        <div className="px-8 py-6 border-t border-blue-200 overflow-visible">
          {/* PENDIDIKAN */}
          <h3 className="font-semibold text-lg mb-2">Riwayat Pendidikan</h3>
          <ul className="list-disc ml-5 mb-6">
            {dosen.educationHistory.length > 0
              ? dosen.educationHistory.map((e: any, i: number) => (
                  <li key={i}>
                    {e.degree} – {e.university} ({e.major})
                  </li>
                ))
              : <li>-</li>}
          </ul>

          {/* TABS */}
          <DosenTabs
            activeTab={activeTab}
            setActiveTab={(tab: any) => {
              setActiveTab(tab);
              setPage(1);
              setTypeFilter("Semua");
            }}
          />

          {/* ================= TABLE ================= */}
          <div className="relative mt-4 overflow-visible">
            <table className="w-full text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3">No</th>
                  <th className="p-3 text-left">Judul</th>

                  {(activeTab === "publications" ||
                    activeTab === "intellectualProperty") && (
                    <th className="p-3 text-left relative">
                      Jenis
                      <div
                        ref={dropdownRef}
                        className="inline-block ml-2 relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpen(!dropdownOpen);
                          }}
                          className="text-xs px-2 py-1 border rounded bg-blue-50 inline-flex items-center gap-1"
                        >
                          <FaFilter className="text-[10px]" /> {typeFilter}
                        </button>

                        {dropdownOpen && (
                          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-xl z-[9999] max-h-64 overflow-y-auto">
                            {typeOptions.map((type, i) => {
                              const ok =
                                type === "Semua" || existingTypes.has(type);
                              return (
                                <button
                                  key={i}
                                  disabled={!ok}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (ok) {
                                      setTypeFilter(type);
                                      setDropdownOpen(false);
                                    }
                                  }}
                                  className={`block w-full text-left px-4 py-2 text-sm ${
                                    type === typeFilter
                                      ? "bg-blue-100 font-semibold"
                                      : ok
                                      ? "hover:bg-blue-50"
                                      : "opacity-40"
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
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="p-3 cursor-pointer"
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Tahun</span>
                      {sortOrder === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((item: any, i: number) => (
                  <tr key={i} className="even:bg-blue-50">
                    <td className="p-2 text-center">{startIndex + i + 1}</td>
                    <td className="p-2">{item.title}</td>
                    {(activeTab === "publications" ||
                      activeTab === "intellectualProperty") && (
                      <td className="p-2">{item.type}</td>
                    )}
                    <td className="p-2 text-center">{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </article>
  );
}
