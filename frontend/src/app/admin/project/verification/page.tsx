"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import ProjectDetailModal from "../../components/DetailVerifyModal";

export default function VerifikasiProyekPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedData, setSelectedData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  // ================================
  // 🔥 FETCH DATA DARI BACKEND
  // ================================
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/submissions/pending");

      if (!res.ok) {
        console.error("Fetch error:", await res.text());
        return;
      }

      const json = await res.json();
      console.log("DEBUG RESPONSE:", json);

      const list = Array.isArray(json) ? json : json.data || [];

      const mapped = list.map((item: any, index: number) => ({
        no: index + 1,
        id: item.id,
        email: item.email,
        telp: item.phoneNumber,
        judul: item.projectTitle,
        tipe: "Website", // sementara
        deskripsi: item.projectDescription,
        status: item.status,
      }));

      setData(mapped);
    } catch (error) {
      console.error("loadData error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // 🔥 TERIMA PROYEK 
  // ==========================================
  const handleTerima = async (item: any) => {
  const yes = confirm(`Terima proyek "${item.judul}"?`);
  if (!yes) return;

  try {
    const res = await fetch(`http://localhost:4000/api/submissions/${item.id}/approve`, {
      method: "PATCH",
    });

    if (!res.ok) {
      console.error("Approve failed:", await res.text());
      alert("Gagal menyetujui proyek!");
      return;
    }

    alert(`Proyek "${item.judul}" telah disetujui.`);
    loadData(); // reload data pending agar hilang dari list
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengupdate status!");
  }
};


  // ==========================================
  // 🔥 TOLAK PROYEK 
  // ==========================================
  const handleTolak = async (item: any) => {
  const yes = confirm(`Tolak proyek "${item.judul}"?`);
  if (!yes) return;

  try {
    const res = await fetch(`http://localhost:4000/api/submissions/${item.id}/reject`, {
      method: "PATCH",
    });

    if (!res.ok) {
      console.error("Reject failed:", await res.text());
      alert("Gagal menolak proyek!");
      return;
    }

    alert(`Proyek "${item.judul}" telah ditolak.`);
    loadData(); // reload pending supaya hilang dari tabel
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengupdate status!");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        }`}
      >
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black uppercase">
            Verifikasi Proyek
          </h1>
          <p className="text-gray-600 text-sm">
            Kelola pendaftaran proyek PSTeam.
          </p>
        </div>

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
