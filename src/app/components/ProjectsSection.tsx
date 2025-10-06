"use client";
import Image from "next/image";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Website Kursus Bahasa Asing",
      img: "/campus/2.png",
      desc: "Aplikasi kursus berbasis web dengan sistem tutor dan siswa, dikembangkan dengan Laravel dan Tailwind CSS.",
    },
    {
      title: "IoT Monitoring System",
      img: "/campus/polibatam3.png",
      desc: "Sistem IoT untuk memonitor suhu dan kelembapan secara real-time menggunakan sensor dan dashboard web.",
    },
    {
      title: "AI Chat Assistant",
      img: "/campus/logo1.png",
      desc: "Asisten virtual berbasis AI yang membantu pengguna menjawab pertanyaan dan memberikan rekomendasi.",
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-12">
          Proyek Unggulan PSTeam
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.title}
              className="bg-gray-50 rounded-2xl shadow hover:shadow-xl overflow-hidden transition-all"
            >
              <div className="relative h-56">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-600">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
