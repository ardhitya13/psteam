"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import ProjectDetailModal from "../../components/ProjectDetailModal";

export default function VerifikasiProyekPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data proyek yang sedang dilihat
  const [selectedData, setSelectedData] = useState<{
    no: number;
    email: string;
    telp: string;
    judul: string;
    tipe: string;
    deskripsi: string;
    status: string;
  } | null>(null);

  // Data proyek menunggu verifikasi
  const [data, setData] = useState([
    {
      no: 1,
      email: "mahasiswa1@polibatam.ac.id",
      telp: "081234567890",
      judul: "Sistem Pemesanan Online Coffee Shop",
      tipe: "Website",
      deskripsi: "Sistem untuk memesan kopi secara online.",
      status: "Menunggu Verifikasi",
    },
    {
      no: 2,
      email: "mahasiswa2@polibatam.ac.id",
      telp: "081267854321",
      judul: "Aplikasi Mobile Bimbingan Belajar",
      tipe: "Mobile",
      deskripsi: "Aplikasi untuk membantu siswa belajar daring.",
      status: "Menunggu Verifikasi",
    },
  ]);

  // Terima proyek
  const handleTerima = (item: any) => {
    const existingProjects = JSON.parse(localStorage.getItem("proyekAktif") || "[]");

    const updatedProjects = [...existingProjects, { ...item, status: "Diterima" }];

    localStorage.setItem("proyekAktif", JSON.stringify(updatedProjects));

    setData((prev) => prev.filter((p) => p.no !== item.no));

    alert(`✅ Proyek "${item.judul}" berhasil diterima dan masuk ke Daftar Proyek Aktif.`);
  };

  // Tolak proyek
  const handleTolak = (item: any) => {
    if (confirm(`Apakah kamu yakin ingin menolak proyek "${item.judul}"?`)) {
      setData((prev) => prev.filter((p) => p.no !== item.no));
      alert(`❌ Proyek "${item.judul}" telah ditolak.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          VERIFIKASI PROYEK
        </h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-700 border border-gray-200 border-collapse">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center">NO</th>
                <th className="border border-gray-200 px-4 py-2 text-center">EMAIL</th>
                <th className="border border-gray-200 px-4 py-2 text-center">NO TELEPON</th>
                <th className="border border-gray-200 px-4 py-2 text-center">JUDUL</th>
                <th className="border border-gray-200 px-4 py-2 text-center">TIPE</th>
                <th className="border border-gray-200 px-4 py-2 text-center">SPESIFIKASI</th>
                <th className="border border-gray-200 px-4 py-2 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.telp}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.judul}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{item.tipe}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedData(item);
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                      >
                        <FileText size={14} /> Detail
                      </button>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleTerima(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleTolak(item)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded"
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                    Tidak ada proyek yang menunggu verifikasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
        canChangeStatus={false}
      />
    </div>
  );
}
