"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import DosenTabs from "./DosenTabs";
import { getPublicLecturers } from "@/lib/publicLecturer";

/* ================= TYPE ================= */

type Dosen = {
  name: string;
  email: string;
  program: string;
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
  const [list, setList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const raw = await getPublicLecturers();

        const mapped: Dosen[] = raw.map((d) => {
          const p = d.lecturerprofile;

          return {
            name: d.name,
            email: d.email,
            program: p?.studyProgram ?? "-",
            specialization: p?.specialization ?? "-",
            imageUrl: p?.imageUrl
              ? `http://localhost:4000${p.imageUrl}`
              : "/default-avatar.png",
            educationHistory: p?.educationhistory ?? [],
            portfolio: {
              research: p?.research ?? [],
              communityService: p?.communityservice ?? [],
              publications: p?.scientificwork ?? [],
              intellectualProperty: p?.intellectualproperty ?? [],
            },
          };
        });

        setList(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Memuat data dosen…
      </div>
    );
  }

  const displayed =
    typeof limit === "number" ? list.slice(0, limit) : list;

  return (
    <section className="max-w-6xl mx-auto space-y-16 px-6 py-12">
      {displayed.map((d, i) => (
        <DosenSingleCard key={i} dosen={d} />
      ))}
    </section>
  );
}

/* ========================================================= */

function DosenSingleCard({ dosen }: { dosen: Dosen }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<
    "research" | "communityService" | "publications" | "intellectualProperty"
  >("research");

  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState("Semua");
  const [typeFilter, setTypeFilter] = useState("Semua");

  const perPage = 10;
  const rawData = dosen.portfolio[tab] ?? [];

  /* ================= FILTER OPTIONS ================= */

  const yearOptions = useMemo(() => {
    const years = rawData.map((d: any) => d.year).filter(Boolean);
    return ["Semua", ...Array.from(new Set(years)).sort((a, b) => b - a)];
  }, [rawData]);

  const typeOptions = useMemo(() => {
    const types = rawData.map((d: any) => d.type).filter(Boolean);
    return ["Semua", ...Array.from(new Set(types))];
  }, [rawData]);

  /* ================= FILTER DATA ================= */

  const filtered = useMemo(() => {
    let data = [...rawData];

    if (yearFilter !== "Semua") {
      data = data.filter((d: any) => String(d.year) === yearFilter);
    }

    if (
      (tab === "publications" || tab === "intellectualProperty") &&
      typeFilter !== "Semua"
    ) {
      data = data.filter((d: any) => d.type === typeFilter);
    }

    return data;
  }, [rawData, yearFilter, typeFilter, tab]);

  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  return (
    <article className="bg-white rounded-3xl shadow-xl border border-blue-200 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex gap-8 p-8 bg-blue-100 border-b border-blue-300">
        <div className="relative w-32 h-32 shrink-0">
          <Image
            src={dosen.imageUrl}
            alt={dosen.name}
            fill
            className="rounded-full object-cover border-4 border-blue-600"
          />
        </div>

        <div className="space-y-1 text-gray-800">
          <h2 className="text-3xl font-bold text-blue-900">
            {dosen.name}
          </h2>

          {/* LABEL DOSEN */}
          <span className="inline-block text-sm font-semibold text-blue-700">
            Dosen
          </span>

          <p>
            <b>Program Studi:</b> {dosen.program}
          </p>

          <p className="flex items-center gap-2">
            <FaEnvelope /> {dosen.email}
          </p>

          <p>
            <b>Bidang Spesialis:</b> {dosen.specialization}
          </p>
        </div>
      </div>

      {/* ================= TOGGLE ICON ONLY ================= */}
      <div className="flex justify-center -mt-4">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-r from-blue-800 to-blue-500 text-white p-2 rounded-full shadow-md hover:scale-105 transition"
          aria-label="Toggle Detail"
        >
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* ================= DETAIL ================= */}
      {open && (
        <div className="p-8 text-gray-800">
          {/* RIWAYAT PENDIDIKAN */}
          <div className="mb-10">
            <h3 className="font-semibold text-lg mb-3 border-b border-blue-300 pb-2">
              Riwayat Pendidikan
            </h3>

            <ul className="space-y-2">
              {dosen.educationHistory.length ? (
                dosen.educationHistory.map((e, i) => (
                  <li
                    key={i}
                    className="pl-4 border-l-4 border-blue-500"
                  >
                    <span className="font-semibold">{e.degree}</span> –{" "}
                    {e.university} ({e.major})
                  </li>
                ))
              ) : (
                <li>-</li>
              )}
            </ul>
          </div>

          {/* TABS */}
          <DosenTabs
            activeTab={tab}
            setActiveTab={(t: any) => {
              setTab(t);
              setPage(1);
              setYearFilter("Semua");
              setTypeFilter("Semua");
            }}
          />

          {/* ================= TABLE ================= */}
          <div className="mt-6 rounded-xl overflow-hidden border border-blue-300">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
                <tr>
                  <th className="p-3 border border-blue-600 w-14 text-center">
                    No
                  </th>

                  <th className="p-3 border border-blue-600 text-left">
                    Judul
                  </th>

                  {(tab === "publications" || tab === "intellectualProperty") && (
                    <th className="p-3 border border-blue-600 w-56 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-semibold">Jenis</span>

                        <select
                          value={typeFilter}
                          onChange={(e) => {
                            setTypeFilter(e.target.value);
                            setPage(1);
                          }}
                          className="
    bg-white
    text-blue-900 text-xs font-medium
    rounded-md
    px-3 py-1.5
    pr-10               /* 🔥 JARAK ICON ▼ */
    border border-blue-300
    shadow-sm
    focus:outline-none
    focus:ring-2 focus:ring-blue-400
    hover:border-blue-500
    transition
  "
                        >
                          {typeOptions.map((t) => (
                            <option key={t} value={t} className="text-blue-900">
                              {t}
                            </option>
                          ))}
                        </select>

                      </div>
                    </th>
                  )}

                  <th className="p-3 border border-blue-600 w-28 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-white font-semibold">Tahun</span>

                      <select
                        value={yearFilter}
                        onChange={(e) => {
                          setYearFilter(e.target.value);
                          setPage(1);
                        }}
                        className="
    bg-white
    text-blue-900 text-xs font-medium
    rounded-md
    px-3 py-1.5
    pr-10               /* 🔥 INI YANG PALING PENTING */
    border border-blue-300
    shadow-sm
    focus:outline-none
    focus:ring-2 focus:ring-blue-400
    hover:border-blue-500
    transition
  "
                      >
                        {yearOptions.map((y) => (
                          <option key={y} value={y} className="text-blue-900">
                            {y}
                          </option>
                        ))}
                      </select>

                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {current.length ? (
                  current.map((it: any, i: number) => (
                    <tr
                      key={i}
                      className="even:bg-blue-50 hover:bg-blue-100"
                    >
                      <td className="p-3 border border-blue-200 text-center font-semibold">
                        {start + i + 1}
                      </td>

                      <td className="p-3 border border-blue-200">
                        {it.title}
                      </td>

                      {(tab === "publications" ||
                        tab === "intellectualProperty") && (
                          <td className="p-3 border border-blue-200">
                            {it.type}
                          </td>
                        )}

                      <td className="p-3 border border-blue-200 text-center">
                        {it.year}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        tab === "publications" ||
                          tab === "intellectualProperty"
                          ? 4
                          : 3
                      }
                      className="py-8 text-center italic text-gray-500"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPage > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                ‹
              </button>

              {Array.from({ length: totalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${page === i + 1
                    ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
                    : "border hover:bg-blue-100"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPage}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
