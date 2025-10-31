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
      education: "Magister Strata 2 (S2)",
      email: "swono@polibatam.ac.id",
      specialization: "Software Development",
      image: "/dosen/swono_sibagariang.png",
      educationHistory: [
        {
          jenjang: "Sarjana (S1)",
          universitas: "Universitas Khatolik Santo Thomas Sumatera Utara",
          bidang: "Teknik Informatika",
        },
        {
          jenjang: "Magister (S2)",
          universitas: "Universitas Sumatera Utara",
          bidang: "Ilmu dan Teknologi",
        },
      ],
      portfolio: {
        penelitian: [
          { judul: "Integrasi Teknologi Active Liveness Detection Dan Face Recognition Dalam Aplikasi Pembayaran Mobile Untuk Keamanan Otentikasi", tahun: 2025 },
          { judul: "Model Klasifikasi Calon Mahasiswa Baru untuk Rekomendasi Program Studi menggunakan Recurrent Neural Network", tahun: 2024 },
          { judul: "Rancang Bangun Aplikasi Pembukuan Laporan Keuangan Menggunakan Teknologi Web Service", tahun: 2023 },
          { judul: "Rancang Bangun Aplikasi SIOMAH (Sistem Informasi Organisasi Mahasiswa) Politeknik Negeri Batam", tahun: 2021 },
          { judul: "Usability Testing Situs Web Politeknik Negeri Batam Menggunakan Metode Eye Tracking", tahun: 2020 },
          { judul: "SISTEM INFORMASI PENGGAJIAN DOSEN HONORER BERBASIS DEKSTOP DI UNIVERSITAS SARI MUTIARA INDONESIA", tahun: 2019 },
        ],
        pengabdian: [
          { judul: "Pembangunan dan Penerapan Aplikasi Point of Sale (POS) Berbasis Website Pada UMKM Angkringan OmahMU Batam Center", tahun: 2025 },
          { judul: "Pengembangan Media Microlearning berbasis mobile di Sekolah Menengah Atas Islam Terpadu (SMAIT) Ulil Albab Batam", tahun: 2024 },
          { judul: "Pembuatan Website Media Promosi dan Pemasaran Hasil Pengolahan Ikan Pada Kelompok Nelayan Kelurahan Batu Besar, Batam", tahun: 2023 },
          { judul: "Upaya Peningkatan Pelayanan dan Efesiensi Bisnis pada Katering Aisyah Purple Kuliner melalui Aplikasi Inovatif", tahun: 2023 },
          { judul: "Implementasi dan Evaluasi Media Promosi Pulau Mubut", tahun: 2022 },
          { judul: "Instruktur / Pemateri Kegiatan Digital Talent (DTS-VSGA) dari Kominfo", tahun: 2022 },
          { judul: "Pembuatan Website Sebagai Media Promosi Wisata Pulau Mubut", tahun: 2021 },
          { judul: "Intensifikasi Jalur Transportasi Laut Dalam Mendukung Kegiatan Pelayaran Nelayan Melalui Sosialisasi Rute Jalur Pelayaran Efektif Berbasis Analisis Medan di Keluaran Sembulang", tahun: 2019 },
          { judul: "INTENSIFIKASI JALUR TRANSPORTASI NELAYAN MELALUI SOSIALISASI RUTE PELAYANAN EFEKTIF BERBASIS MEDAN DI KELURAHAN SEMBULANG", tahun: 2019 },
          { judul: "PELATIHAN PERAKITAN PERSONAL COMPUTER (PC) DAN INSTALASI SISTIM OPERASI BAGI SISWA/I SMK NILA HARAPAN DESA MULIOREJO KECAMATAN SUNGGAL KABUPATEN DELISERDANG PROVINSI SUMATERA UTARA", tahun: 2017 },
        ],
        publikasi: [
        { judul: "Interpretable Machine Learning for Job Placement Prediction: A SHAP-Based Feature Analysis", jenis: "Jurnal nasional terakreditasi", tahun: 2025 },
        { judul: "Penerapan Teknologi Raspberry Pi dalam Monitoring Kehadiran dan Pelanggaran Siswa berbasis Website", jenis: "Jurnal nasional", tahun: 2025 },
        { judul: "Classification of Alzheimer Disease from MRI Image Using Combination Naïve Bayes and Invariant Moment", jenis: "Prosiding seminar internasional", tahun: 2023 },
        { judul: "Rancang Bangun Aplikasi Point Of Sales Menggunakan Framework Codeigniter", jenis: "Jurnal nasional terakreditasi", tahun: 2023 },
        { judul: "Sistem Informasi Pemesanan Menu di Early Coffee menggunakan QR code Berbasis Website", jenis: "Jurnal nasional terakreditasi", tahun: 2023 },
        { judul: "Sistem Informasi Persediaan Dry Lens Untuk Lensa Kontak Berbasis WEB", jenis: "Jurnal nasional terakreditasi", tahun: 2022 },
        { judul: "Classification of Alzheimer Disease from MRI Image Using Combination NaÃ¯ve Bayes and Invariant Moment", jenis: "Artikel ilmiah", tahun: 2022 },
        { judul: "Rancang Bangun Aplikasi Sistem Informasi Organisasi Mahasiswa (SIOMAH)", jenis: "Jurnal nasional terakreditasi", tahun: 2021 },
        { judul: "Usability Testing Situs Web Politeknik Negeri Batam Menggunakan Metode Eye Tracking", jenis: "Jurnal nasional terakreditasi", tahun: 2021 },
        { judul: "Features Extraction of Mamographic Image using Zoning Method", jenis: "Lain-lain", tahun: 2020 },
        { judul: "CROSS-PLATFORM MOBILE MENGGUNAKAN FRAMEWORK IONIC", jenis: "Jurnal nasional terakreditasi", tahun: 2020 },
        { judul: "Pemberian Mini House (Destilator) Air laut kepada masyarakat Pantai Setokok, Batam, Guna membantu dalam penyediaan stok air bersih (Air Tawar), dan mendukung Parawisata", jenis: "Jurnal nasional", tahun: 2020 },
        { judul: "PENGAMBILAN KEPUTUSAN BERDASARKAN NILAI PROBABILITAS METODE NAÃ?Â VE BAYES", jenis: "Lain-lain", tahun: 2019 },
        { judul: "PEMBERIAN KREDIT DENGAN TEKNIK METODE TOPSIS PADA PERUSAHAAN LEASING CS FINANCE Swono Sibagariang", jenis: "Jurnal nasional", tahun: 2019 },
        { judul: "FUZZY MULTI ATRIBUTE DECISION MAKING (FMADM-SAW) DALAM PENENTUAN KELAYAKAN PEMBUATAN SERTIFIKAT TANAH", jenis: "Lain-lain", tahun: 2018 },
        { judul: "FUZZY MULTI ATRIBUTE DECISION MAKING (FMADM-SAW) DALAM PENENTUAN KELAYAKAN PEMBUATAN SERTIFIKAT TANAH", jenis: "Lain-lain", tahun: 2018 },
        { judul: "Penerapan Metode Focused Crawler dan Algoritma Porter Stemmmer Pada Pencarian Lirik Lagu", jenis: "Lain-lain", tahun: 2018 },
        { judul: "PENERAPAN PREFERENCE RANKING ORGANIZATION METHOD FOR ENRICHMENT EVALUATION (PROMETHEE) DALAM EVALUASI KINERJA DOSEN (Studi Kasus: Univ. Sari Mutiara Indonesia)", jenis: "Lain-lain", tahun: 2018 },
        { judul: "Penerapan Metode Focused Crawler dan Algoritma Porter Stemmmer Pada Pencarian Lirik Lagu", jenis: "Lain-lain", tahun: 2017 },
        { judul: "PENERAPAN WEB SERVICE PADA PERPUSTAKAAN BERBASIS ANDROID", jenis: "Lain-lain", tahun: 2017 },
        { judul: "&quot; Klasifikasi Citra Mammogram Metode Ekstraksi Ciri Zoning Menggunakan Ssvm", jenis: "Lain-lain", tahun: 2016 },
        { judul: "Ketik 2014 Konfrensi Nasional Pengembangan Teknologi Informasi dan Komunikasi: Prosiding	", jenis: "Lain-lain", tahun: 2014 },
        ],
        hki: [
        { judul: "Keamanan API Menggunakan JSON WEB TOKEN", jenis: "Hak cipta nasional", tahun: 2024 },
        { judul: "Rekomendasi Pilihan Program Studi Menggunakan Recurrent Neural Network", jenis: "Hak cipta nasional", tahun: 2024 },
        { judul: "Website Company Profile PT. ADE MESTAKUNG ABADI", jenis: "Hak cipta nasional", tahun: 2023 },
        { judul: "Penerapan Stack Dalam Pemetaan Barang Di Gudang", jenis: "Hak cipta nasional", tahun: 2023 },
        { judul: "Website Company Profile PT. ADE MESTAKUNG ABADI", jenis: "Hak cipta nasional", tahun: 2023 },
        { judul: "Website Media Promosi Wisata Pulau Mubut", jenis: "Hak cipta nasional", tahun: 2023 },
        { judul: "Sistem Informasi Organisasi Mahasiswa (SIOMA)", jenis: "Hak cipta nasional", tahun: 2022 },
        { judul: "SIstem Informasi Pelatihan Karyawan Baru", jenis: "Hak cipta nasional", tahun: 2022 },
        { judul: "Poster â€œAplikasi Polibatam Guestâ€ ", jenis: "Hak cipta nasional", tahun: 2022 },
        ],
      },
    },
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      position: "Dosen",
      program: "Teknologi Rekayasa Multimedia",
      education: "Doktor Strata 3 (S3)",
      email: "wibowo@polibatam.ac.id",
      specialization: "AI, Computer Vision, Autonomous System",
      image: "/dosen/ari_wibowo.png",
      educationHistory: [
        { jenjang: "Sarjana (S1)", universitas: "Institut Teknologi Bandung", bidang: "Teknik Informatika" },
        { jenjang: "Magister (S2)", universitas: "Institut Teknologi Bandung", bidang: "Informatika" },
        { jenjang: "Doktor (S3)", universitas: "Institut Teknologi Bandung", bidang: "Teknik Elektro Informatika" },
      ],
      portfolio: {
        penelitian: [
          { judul: "PROGRAM RISET PPMI STEI - GURU BESAR", tahun: 2025 },
          { judul: "Pengembangan Sistem Otonomi dengan Menggunakan Kecerdasan Artificial untuk Trem", tahun: 2023 },
          { judul: "Interactive Visualization Approach to Support Exploratory Data Analysis: Illustration in Research Topic Distribution", tahun: 2017 },
          { judul: "Pengembangan Program untuk Menyelesaikan Problem Gaussian Elimination Menggunakan Posix Thread Openmp dan Itel Tbb", tahun: 2013 },
        ],
        pengabdian: [
          { judul: "Peningkatan Partisipasi Masyarakat Dalam Pelaporan Kerusakan Fasilitas Publik Melalui Aplikasi BALAP-IN di Kota Batam", tahun: 2025 },
          { judul: "Rancang Bangun Kerangka Tanaman Hidroponik Politeknik Negeri Batam", tahun: 2021 },
          { judul: "Implementasi Teknologi Water Lifting untuk Masyarakat di Kelurahan Rempang Cate, Kec. Galang, Kota Batam, Kepulauan Riau", tahun: 2019 },
          { judul: "Pelatihan Bahasa Inggris untuk Masyarakat Hinterland dalam Pengembangan Kampung Wisata Pasir Panjang", tahun: 2018 },
          { judul: "Computational Thinking Mini Challenge Bebras Indonesia", tahun: 2017 },
          { judul: "Pelatihan ICT bagi pelaku Industri Rumahan (IR) Provinsi Kepulauan Riau", tahun: 2017 },
          { judul: "Program Pelatihan dan Pendampingan Guru dan Tata Usaha Berbasis Teknologi Informasi dan Komunikasi (TIK) di Sekolah Hinterland Nongsam", tahun: 2017 },
          { judul: "Program Pelatihan dan Pendampingan Pemasaran Online (E-Commerce) Untuk Usaha Kecil dan Kelompok Pemuda Kampung Tua Nongsa Batamm", tahun: 2017 },
          { judul: "Workshop Computational Thinking Politeknik Negeri Batam 2017", tahun: 2017 },
        ],
        publikasi: [
          { judul: "MIRSA+YOLOV7MOD: A Robust Object Detection Framework for Adverse Weather Conditions in Autonomous Vehicles", jenis: "Jurnal internasional", tahun: 2024 },
          { judul: "Object Detection in Dense and Mixed Traffic for Autonomous Vehicles With Modified Yolo", jenis: "Jurnal internasional bereputasi", tahun: 2023 },
          { judul: "Effect of Annealing Holding Time on Microstructure Changes in Steel Structures of S690QL and S235JR", jenis: "Jurnal nasional terakreditasi", tahun: 2021 },
          { judul: "Pemanfaatan Hasil Tangkap Ikan melalui Pelatihan Pembuatan Pempek di Kampung Rempang Cate", jenis: "Jurnal nasional", tahun: 2019 },
          { judul: "Penyelesaian Problem Gaussian Elimination Menggunakan Posix Thread, Open MP dan Intel TBB", jenis: "Lain-lain", tahun: 2014 },
          { judul: "KOMPRESI DATA MENGGUNAKAN METODE HUFFMAN", jenis: "Lain-lain", tahun: 2012 },
        ],
        hki: [
          { judul: "Bracket Penempatan Sensor pada Trem Otonom", jenis: "Paten nasional", tahun: 2024 },
        ],
      },
    },
  ];

  const semuaJenis = [
    "Jurnal nasional terakreditasi",
    "Jurnal nasional",
    "Jurnal internasional",
    "Prosiding seminar internasional",
    "Book chapter internasional",
    "Artikel ilmiah",
    "Lain-lain",
    "Hak cipta nasional",
    "Paten nasional",
  ];

  // ✅ Ambil hanya sejumlah 'limit' dosen
  const displayedDosen =
    typeof limit === "number" ? dosenList.slice(0, Math.max(1, limit)) : dosenList;

  return (
    <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-[#f8faff] via-[#eef3ff] to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        {displayedDosen.map((dosen, i) => (
          <DosenSingleCard key={i} dosen={dosen} semuaJenis={semuaJenis} />
        ))}
      </div>
    </section>
  );
}

// ==============================================================
function DosenSingleCard({ dosen, semuaJenis }: any) {
  const [activeTab, setActiveTab] = useState("penelitian");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jenisFilter, setJenisFilter] = useState("Semua");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ FIX: mencegah undefined portfolio
  const dataAktif = dosen?.portfolio?.[activeTab] || [];

  const jenisOptions =
    activeTab === "publikasi" && Array.isArray(dataAktif)
      ? [
          "Semua",
          ...new Set([...semuaJenis, ...dataAktif.map((i: any) => i.jenis || "")].filter(Boolean)),
        ]
      : [];

  const filteredData = useMemo(() => {
    let data = Array.isArray(dataAktif) ? [...dataAktif] : [];
    if (activeTab === "publikasi" && jenisFilter !== "Semua") {
      data = data.filter((i: any) => i.jenis === jenisFilter);
    }
    data.sort((a: any, b: any) =>
      sortOrder === "asc" ? a.tahun - b.tahun : b.tahun - a.tahun
    );
    return data;
  }, [dataAktif, activeTab, sortOrder, jenisFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <article className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-b border-white">
        <div className="relative w-40 h-40 flex-shrink-0">
          <Image
            src={dosen.image}
            alt={dosen.name}
            fill
            className="object-cover rounded-full border-4 border-blue-300 shadow-md"
            sizes="160px"
          />
        </div>
        <div className="flex-1 text-black space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text ">
            {dosen.name}
          </h2>
          <p className="text-gray-600 font-medium">{dosen.position}</p>
          <p><strong>Program Studi:</strong> {dosen.program}</p>
          <p><strong>Pendidikan Terakhir:</strong> {dosen.education}</p>
          <p className="flex items-center gap-2">
            <strong>Email:</strong>
            <a href={`mailto:${dosen.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
              <FaEnvelope size={14} /> {dosen.email}
            </a>
          </p>
          <p><strong>Bidang Spesialis:</strong> {dosen.specialization}</p>
        </div>
      </div>

      {/* RIWAYAT PENDIDIKAN */}
      <div className="px-8 pb-4 text-black">
        <h3 className="font-semibold text-lg mb-2 border-b border-blue-200 pb-1">
          Riwayat Pendidikan
        </h3>
        <ul className="list-disc ml-5 space-y-1">
          {dosen.educationHistory.map((edu: any, i: number) => (
            <li key={i}>
              {edu.jenjang} – {edu.universitas}:{" "}
              <span className="italic">{edu.bidang}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* TABS */}
      <DosenTabs
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setPage(1);
          setJenisFilter("Semua");
        }}
      />

      {/* TABEL */}
      <div className="overflow-x-auto px-6 pb-4 relative">
        <div className="overflow-hidden border border-blue-100 rounded-lg shadow-sm bg-white">
          <table className="w-full text-sm text-black">
            <thead className="bg-blue-100/70">
              <tr>
                <th className="p-3 w-12 text-left font-semibold">No</th>
                <th className="p-3 text-left font-semibold">
                  {activeTab === "penelitian"
                    ? "Judul Penelitian"
                    : activeTab === "pengabdian"
                    ? "Judul Pengabdian"
                    : activeTab === "publikasi"
                    ? "Judul Karya"
                    : "Judul HKI / Paten"}
                </th>
                {(activeTab === "publikasi" || activeTab === "hki") && (
                  <th className="p-3 text-left font-semibold relative">
                    Jenis
                    {activeTab === "publikasi" && (
                      <div ref={dropdownRef} className="inline-block ml-2 relative">
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="text-xs text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md"
                        >
                          <FaFilter className="inline mr-1 text-[10px]" /> {jenisFilter}
                        </button>
                        {dropdownOpen && (
                          <div className="absolute right-0 top-7 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56 max-h-60 overflow-y-auto">
                            {jenisOptions.map((jenis, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setJenisFilter(jenis);
                                  setDropdownOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                                  jenis === jenisFilter
                                    ? "bg-blue-100 font-semibold text-blue-700"
                                    : ""
                                }`}
                              >
                                {jenis}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                )}
                <th
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="p-3 cursor-pointer select-none font-semibold w-24"
                >
                  Tahun{" "}
                  {sortOrder === "asc" ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item: any, i: number) => (
                <tr
                  key={i}
                  className="even:bg-blue-50/30 hover:bg-blue-100/50 transition-colors"
                >
                  <td className="p-2">
                    {(page - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="p-2">{item.judul}</td>
                  {(activeTab === "publikasi" || activeTab === "hki") && (
                    <td className="p-2">{item.jenis}</td>
                  )}
                  <td className="p-2 font-medium text-center">
                    {item.tahun}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-6 bg-white rounded-b-3xl">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-md hover:bg-blue-50 disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-blue-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded-md hover:bg-blue-50 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </article>
  );
}
