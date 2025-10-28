"use client";

import DosenCard from "./components/DosenCard";

export default function PortfolioPage() {
  return (
    <section
      className="relative py-20 px-6 min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f3f7ff 40%, #e8f0ff 80%, #ffffff 100%)",
      }}
    >
      {/* 🔵 Efek latar belakang lembut (gradasi biru & ungu) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[150px] opacity-50"></div>
        <div className="absolute bottom-[-120px] right-[-100px] w-[450px] h-[450px] bg-purple-200 rounded-full blur-[180px] opacity-40"></div>
      </div>

      {/* 🧾 Konten Utama */}
      <div className="max-w-6xl mx-auto relative text-gray-700">
        <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 drop-shadow-sm">
          Portofolio Dosen PSTeam
        </h1>

        {/* 🗒️ Keterangan singkat */}
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed">
          Halaman ini menampilkan kumpulan portofolio dosen dari{" "}
          <span className="font-semibold text-blue-700">PSTeam Politeknik Negeri Batam</span>, 
          mencakup karya ilmiah, penelitian, publikasi, pengabdian kepada masyarakat, 
          serta hak kekayaan intelektual. Setiap dosen berkontribusi aktif dalam 
          pengembangan ilmu pengetahuan dan teknologi untuk kemajuan pendidikan.
        </p>

        {/* 📚 Daftar Card Dosen */}
        <div className="space-y-10">
          <DosenCard />
        </div>
      </div>
    </section>
  );
}
