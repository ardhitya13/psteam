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
        {
          degree: "Sarjana (S1)",
          university: "Universitas Khatolik Santo Thomas Sumatera Utara",
          major: "Teknik Informatika",
        },
        {
          degree: "Magister (S2)",
          university: "Universitas Sumatera Utara",
          major: "Ilmu dan Teknologi",
        },
      ],
      portfolio: {
        research: [
          { title: "Integrasi Teknologi Active Liveness Detection Dan Face Recognition Dalam Aplikasi Pembayaran Mobile Untuk Keamanan Otentikasi", year: 2025 },
          { title: "Model Klasifikasi Calon Mahasiswa Baru untuk Rekomendasi Program Studi menggunakan Recurrent Neural Network", year: 2024 },
          { title: "Rancang Bangun Aplikasi Pembukuan Laporan Keuangan Menggunakan Teknologi Web Service", year: 2023 },
          { title: "Rancang Bangun Aplikasi SIOMAH (Sistem Informasi Organisasi Mahasiswa) Politeknik Negeri Batam", year: 2021 },
          { title: "Usability Testing Situs Web Politeknik Negeri Batam Menggunakan Metode Eye Tracking", year: 2020 },
          { title: "SISTEM INFORMASI PENGGAJIAN DOSEN HONORER BERBASIS DEKSTOP DI UNIVERSITAS SARI MUTIARA INDONESIA", year: 2019 },
        ],
        communityService: [
          { title: "Pembangunan dan Penerapan Aplikasi Point of Sale (POS) Berbasis Website Pada UMKM Angkringan OmahMU Batam Center", year: 2025 },
          { title: "Pengembangan Media Microlearning berbasis mobile di Sekolah Menengah Atas Islam Terpadu (SMAIT) Ulil Albab Batam", year: 2024 },
          { title: "Pembuatan Website Media Promosi dan Pemasaran Hasil Pengolahan Ikan Pada Kelompok Nelayan Kelurahan Batu Besar, Batam", year: 2023 },
          { title: "Upaya Peningkatan Pelayanan dan Efesiensi Bisnis pada Katering Aisyah Purple Kuliner melalui Aplikasi Inovatif", year: 2023 },
          { title: "Implementasi dan Evaluasi Media Promosi Pulau Mubut", year: 2022 },
          { title: "Instruktur / Pemateri Kegiatan Digital Talent (DTS-VSGA) dari Kominfo", year: 2022 },
          { title: "Pembuatan Website Sebagai Media Promosi Wisata Pulau Mubut", year: 2021 },
          { title: "Intensifikasi Jalur Transportasi Laut Dalam Mendukung Kegiatan Pelayaran Nelayan Melalui Sosialisasi Rute Jalur Pelayaran Efektif Berbasis Analisis Medan di Keluaran Sembulang", year: 2019 },
          { title: "INTENSIFIKASI JALUR TRANSPORTASI NELAYAN MELALUI SOSIALISASI RUTE PELAYANAN EFEKTIF BERBASIS MEDAN DI KELURAHAN SEMBULANG", year: 2019 },
          { title: "PELATIHAN PERAKITAN PERSONAL COMPUTER (PC) DAN INSTALASI SISTIM OPERASI BAGI SISWA/I SMK NILA HARAPAN DESA MULIOREJO KECAMATAN SUNGGAL KABUPATEN DELISERDANG PROVINSI SUMATERA UTARA", year: 2017 },
        ],
        publications: [
          { title: "Interpretable Machine Learning for Job Placement Prediction: A SHAP-Based Feature Analysis", type: "Jurnal nasional terakreditasi", year: 2025 },
          { title: "Penerapan Teknologi Raspberry Pi dalam Monitoring Kehadiran dan Pelanggaran Siswa berbasis Website", type: "Jurnal nasional", year: 2025 },
          { title: "Classification of Alzheimer Disease from MRI Image Using Combination Naïve Bayes and Invariant Moment", type: "Prosiding seminar internasional", year: 2023 },
          { title: "Rancang Bangun Aplikasi Point Of Sales Menggunakan Framework Codeigniter", type: "Jurnal nasional terakreditasi", year: 2023 },
          { title: "Sistem Informasi Pemesanan Menu di Early Coffee menggunakan QR code Berbasis Website", type: "Jurnal nasional terakreditasi", year: 2023 },
          { title: "Sistem Informasi Persediaan Dry Lens Untuk Lensa Kontak Berbasis WEB", type: "Jurnal nasional terakreditasi", year: 2022 },
          { title: "Classification of Alzheimer Disease from MRI Image Using Combination NaÃ¯ve Bayes and Invariant Moment", type: "Artikel ilmiah", year: 2022 },
          { title: "Rancang Bangun Aplikasi Sistem Informasi Organisasi Mahasiswa (SIOMAH)", type: "Jurnal nasional terakreditasi", year: 2021 },
          { title: "Usability Testing Situs Web Politeknik Negeri Batam Menggunakan Metode Eye Tracking", type: "Jurnal nasional terakreditasi", year: 2021 },
          { title: "Features Extraction of Mamographic Image using Zoning Method", type: "Lain-lain", year: 2020 },
          { title: "CROSS-PLATFORM MOBILE MENGGUNAKAN FRAMEWORK IONIC", type: "Jurnal nasional terakreditasi", year: 2020 },
          { title: "Pemberian Mini House (Destilator) Air laut kepada masyarakat Pantai Setokok, Batam, Guna membantu dalam penyediaan stok air bersih (Air Tawar), dan mendukung Parawisata", type: "Jurnal nasional", year: 2020 },
          { title: "PENGAMBILAN KEPUTUSAN BERDASARKAN NILAI PROBABILITAS METODE NAÃ?Â VE BAYES", type: "Lain-lain", year: 2019 },
          { title: "PEMBERIAN KREDIT DENGAN TEKNIK METODE TOPSIS PADA PERUSAHAAN LEASING CS FINANCE Swono Sibagariang", type: "Jurnal nasional", year: 2019 },
          { title: "FUZZY MULTI ATRIBUTE DECISION MAKING (FMADM-SAW) DALAM PENENTUAN KELAYAKAN PEMBUATAN SERTIFIKAT TANAH", type: "Lain-lain", year: 2018 },
          { title: "FUZZY MULTI ATRIBUTE DECISION MAKING (FMADM-SAW) DALAM PENENTUAN KELAYAKAN PEMBUATAN SERTIFIKAT TANAH", type: "Lain-lain", year: 2018 },
          { title: "Penerapan Metode Focused Crawler dan Algoritma Porter Stemmmer Pada Pencarian Lirik Lagu", type: "Lain-lain", year: 2018 },
          { title: "PENERAPAN PREFERENCE RANKING ORGANIZATION METHOD FOR ENRICHMENT EVALUATION (PROMETHEE) DALAM EVALUASI KINERJA DOSEN (Studi Kasus: Univ. Sari Mutiara Indonesia)", type: "Lain-lain", year: 2018 },
          { title: "Penerapan Metode Focused Crawler dan Algoritma Porter Stemmmer Pada Pencarian Lirik Lagu", type: "Lain-lain", year: 2018 },
          { title: "PENERAPAN WEB SERVICE PADA PERPUSTAKAAN BERBASIS ANDROID", type: "Lain-lain", year: 2017 },
          { title: "&quot; Klasifikasi Citra Mammogram Metode Ekstraksi Ciri Zoning Menggunakan Ssvm", type: "Lain-lain", year: 2016 },
          { title: "Ketik 2014 Konfrensi Nasional Pengembangan Teknologi Informasi dan Komunikasi: Prosiding", type: "Lain-lain", year: 2014 },
        ],
        intellectualProperty: [
          { title: "Keamanan API Menggunakan JSON WEB TOKEN", type: "Hak cipta nasional", year: 2024 },
          { title: "Rekomendasi Pilihan Program Studi Menggunakan Recurrent Neural Network", type: "Hak cipta nasional", year: 2024 },
          { title: "Website Company Profile PT. ADE MESTAKUNG ABADI", type: "Hak cipta nasional", year: 2023 },
          { title: "Penerapan Stack Dalam Pemetaan Barang Di Gudang", type: "Hak cipta nasional", year: 2023 },
          { title: "Website Company Profile PT. ADE MESTAKUNG ABADI", type: "Hak cipta nasional", year: 2023 },
          { title: "Website Media Promosi Wisata Pulau Mubut", type: "Hak cipta nasional", year: 2023 },
          { title: "Sistem Informasi Organisasi Mahasiswa (SIOMA)", type: "Hak cipta nasional", year: 2022 },
          { title: "SIstem Informasi Pelatihan Karyawan Baru", type: "Hak cipta nasional", year: 2022 },
          { title: "Poster â€œAplikasi Polibatam Guestâ€ ", type: "Hak cipta nasional", year: 2022 },
        ],
      },
    },
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      position: "Dosen",
      program: "Teknologi Rekayasa Multimedia",
      educationLevel: "Doktor (S3)",
      email: "wibowo@polibatam.ac.id",
      specialization: "AI, Computer Vision, Autonomous System",
      imageUrl: "/dosen/ari_wibowo.png",
      educationHistory: [
        { degree: "Sarjana (S1)", university: "Institut Teknologi Bandung", major: "Teknik Informatika" },
        { degree: "Magister (S2)", university: "Institut Teknologi Bandung", major: "Informatika" },
        { degree: "Doktor (S3)", university: "Institut Teknologi Bandung", major: "Teknik Elektro Informatika" },
      ],
      portfolio: {
        research: [
          { title: "PROGRAM RISET PPMI STEI - GURU BESAR", year: 2025 },
          { title: "Pengembangan Sistem Otonomi dengan Menggunakan Kecerdasan Artificial untuk Trem", year: 2023 },
          { title: "Interactive Visualization Approach to Support Exploratory Data Analysis: Illustration in Research Topic Distribution", year: 2017 },
          { title: "Pengembangan Program untuk Menyelesaikan Problem Gaussian Elimination Menggunakan Posix Thread Openmp dan Itel Tbb", year: 2013 },
        ],
        communityService: [
          { title: "Peningkatan Partisipasi Masyarakat Dalam Pelaporan Kerusakan Fasilitas Publik Melalui Aplikasi BALAP-IN di Kota Batam", year: 2025 },
          { title: "Rancang Bangun Kerangka Tanaman Hidroponik Politeknik Negeri Batam", year: 2021 },
          { title: "Implementasi Teknologi Water Lifting untuk Masyarakat di Kelurahan Rempang Cate, Kec. Galang, Kota Batam, Kepulauan Riau", year: 2019 },
          { title: "Pelatihan Bahasa Inggris untuk Masyarakat Hinterland dalam Pengembangan Kampung Wisata Pasir Panjang", year: 2018 },
          { title: "Computational Thinking Mini Challenge Bebras Indonesia", year: 2017 },
          { title: "Pelatihan ICT bagi pelaku Industri Rumahan (IR) Provinsi Kepulauan Riau", year: 2017 },
          { title: "Program Pelatihan dan Pendampingan Guru dan Tata Usaha Berbasis Teknologi Informasi dan Komunikasi (TIK) di Sekolah Hinterland Nongsam", year: 2017 },
          { title: "Program Pelatihan dan Pendampingan Pemasaran Online (E-Commerce) Untuk Usaha Kecil dan Kelompok Pemuda Kampung Tua Nongsa Batamm", year: 2017 },
          { title: "Workshop Computational Thinking Politeknik Negeri Batam 2017", year: 2017 },
        ],
        publications: [
          { title: "MIRSA+YOLOV7MOD: A Robust Object Detection Framework for Adverse Weather Conditions in Autonomous Vehicles", type: "Jurnal internasional", year: 2024 },
          { title: "Object Detection in Dense and Mixed Traffic for Autonomous Vehicles With Modified Yolo", type: "Jurnal internasional bereputasi", year: 2023 },
          { title: "Effect of Annealing Holding Time on Microstructure Changes in Steel Structures of S690QL and S235JR", type: "Jurnal nasional terakreditasi", year: 2021 },
          { title: "Pemanfaatan Hasil Tangkap Ikan melalui Pelatihan Pembuatan Pempek di Kampung Rempang Cate", type: "Jurnal nasional", year: 2019 },
          { title: "Penyelesaian Problem Gaussian Elimination Menggunakan Posix Thread, Open MP dan Intel TBB", type: "Lain-lain", year: 2014 },
          { title: "KOMPRESI DATA MENGGUNAKAN METODE HUFFMAN", type: "Lain-lain", year: 2012 },
        ],
        intellectualProperty: [
          { title: "Bracket Penempatan Sensor pada Trem Otonom", type: "Paten nasional", year: 2024 },
        ],
      },
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

// ============================================================

function DosenSingleCard({ dosen }: any) {
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

  // ========== DATA ==========
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
    if (
      (activeTab === "publications" || activeTab === "intellectualProperty") &&
      typeFilter !== "Semua"
    ) {
      data = data.filter((i) => i.type === typeFilter);
    }
    data.sort((a, b) => (sortOrder === "asc" ? a.year - b.year : b.year - a.year));
    return data;
  }, [dataAktif, activeTab, typeFilter, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ============================================================
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

      {/* ============ SEMUA KONTEN MASUK DROPDOWN ============ */}
      <div className="flex justify-center mt-4 mb-6">
        <details className="w-full max-w-5xl rounded-2xl shadow-md bg-white border border-blue-200">
          <summary className="cursor-pointer py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold text-center select-none">
            Lihat Detail Dosen
          </summary>

          <div className="px-8 py-6 mt-3 rounded-b-2xl bg-white">

            {/* ================= RIWAYAT PENDIDIKAN ================= */}
            <div className="text-black mb-6">
              <h3 className="font-semibold text-lg mb-2 border-b border-blue-200 pb-1">
                Riwayat Pendidikan
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                {dosen.educationHistory.map((edu: any, i: number) => (
                  <li key={i}>
                    {edu.degree} – {edu.university}: <span className="italic">{edu.major}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= TABS ================= */}
            <DosenTabs
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setPage(1);
                setTypeFilter("Semua");
              }}
            />

            {/* ================= TABEL ================= */}
            <div className="overflow-x-auto px-2 pb-4 mt-4">
              <div className="border border-blue-100 rounded-lg shadow-sm bg-white relative">

                <table className="w-full text-sm text-black">
                  <thead className="bg-blue-100/70">
                    <tr>
                      <th className="p-3 w-12 text-left font-semibold">No</th>
                      <th className="p-3 text-left font-semibold">
                        {activeTab === "research"
                          ? "Judul Penelitian"
                          : activeTab === "communityService"
                            ? "Judul Pengabdian"
                            : activeTab === "publications"
                              ? "Judul Karya"
                              : "Judul HKI / Paten"}
                      </th>

                      {(activeTab === "publications" ||
                        activeTab === "intellectualProperty") && (
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
                                    const isAvailable =
                                      type === "Semua" || existingTypes.has(type);

                                    return (
                                      <button
                                        key={idx}
                                        onClick={() => {
                                          if (isAvailable) {
                                            setTypeFilter(type);
                                            setDropdownOpen(false);
                                          }
                                        }}
                                        disabled={!isAvailable}
                                        className={`block w-full text-left px-4 py-2 text-sm ${type === typeFilter
                                            ? "bg-blue-100 font-semibold text-blue-700"
                                            : isAvailable
                                              ? "hover:bg-blue-50 text-gray-800"
                                              : "opacity-40 cursor-not-allowed text-gray-400"
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
                        Tahun{" "}
                        {sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.map((item: any, i: number) => (
                      <tr
                        key={i}
                        className="even:bg-blue-50/30 hover:bg-blue-100/50 transition-colors"
                      >
                        <td className="p-2">{(page - 1) * itemsPerPage + i + 1}</td>
                        <td className="p-2">{item.title}</td>

                        {(activeTab === "publications" ||
                          activeTab === "intellectualProperty") && (
                            <td className="p-2">{item.type}</td>
                          )}

                        <td className="p-2 font-medium text-center">{item.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 py-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1.5 rounded-md border text-sm font-semibold ${page === i + 1
                        ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white border-blue-700"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

          </div>
        </details>
      </div>

    </article>
  );
}
