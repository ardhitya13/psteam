"use client";

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const API_URL = "http://localhost:4000/api/team";
const BASE_URL = "http://localhost:4000"; // 🔥 TAMBAHKAN INI

export default function ProjectCard() {
  const [projects, setProjects] = useState<any[]>([]);

  // ===================== RESOLVE IMAGE ======================
  const resolveImage = (img: string | null | undefined) => {
    if (!img) return "/default-profile.png";
    if (img.startsWith("data:image")) return img; // base64
    if (img.startsWith("http")) return img; // full URL
    return BASE_URL + img; // 🔥 fix gambar backend
  };

  // LOAD DATA ============================================
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!Array.isArray(data)) return;

        setProjects(data);
      } catch (err) {
        console.error("Gagal memuat team:", err);
      }
    }

    load();
  }, []);

  // INIT AOS =============================================
  useEffect(() => {
    AOS.init({ duration: 900, once: false, offset: 120 });
  }, []);

  // ICONS =================================================
  const SocialIcons = ({ person }: { person: any }) => (
    <div className="flex justify-center gap-4 text-xl mt-5">
      {person.github && (
        <a href={person.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black transition-all">
          <FaGithub />
        </a>
      )}
      {person.linkedin && (
        <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0a66c2] transition-all">
          <FaLinkedin />
        </a>
      )}
      {person.facebook && (
        <a href={person.facebook} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1877f2] transition-all">
          <FaFacebook />
        </a>
      )}
      {person.instagram && (
        <a href={person.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#e4405f] transition-all">
          <FaInstagram />
        </a>
      )}
      {person.website && (
        <a href={person.website} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-600 transition-all">
          <FaGlobe />
        </a>
      )}
    </div>
  );

  // CARD TEMPLATE ========================================
  const renderCard = (person: any, index: number) => (
    <Card
      key={person.id ?? index}
      data-aos="fade-up"
      data-aos-delay={index * 150}
      className="relative p-6 !bg-white !text-gray-800 shadow-lg hover:shadow-2xl
                 transition-transform duration-300 hover:scale-105
                 rounded-2xl border border-gray-200 flex flex-col
                 justify-between !min-h-[460px] w-full max-w-sm"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#132C8E]/10 to-[#050C28]/10 rounded-2xl" />

      <div className="flex flex-col items-center text-center">
        
        {/* =========== FIX GAMBAR DI SINI =========== */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-md">
          <Image
            src={resolveImage(person.image)}
            alt={person.name}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>

        <h3 className="text-lg font-semibold text-blue-900">{person.name}</h3>
        <p className="text-blue-600 font-medium">{person.role}</p>
        <p className="text-sm text-gray-700 mt-2">{person.email}</p>

        {person.category === "dosen" && (
          <div className="mt-4 text-gray-700 text-sm leading-relaxed text-left">
            <p>
              <span className="font-semibold text-blue-800">Program Studi:</span>{" "}
              {person.studyProgram || "-"}
            </p>
            <p>
              <span className="font-semibold text-blue-800">Pendidikan:</span>{" "}
              {person.education || "-"}
            </p>
            <p>
              <span className="font-semibold text-blue-800">Spesialis:</span>{" "}
              {person.specialization || "-"}
            </p>
          </div>
        )}

        <SocialIcons person={person} />
      </div>
    </Card>
  );

  // =======================================================
  // RENDER
  // =======================================================
  return (
    <section id="team" className="py-20 text-gray-800 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {projects.map((project, pIndex) => {
          const members = project.teamMembers ?? [];

          const dosen = members.filter((m: any) => m.category === "dosen");
          const mahasiswa = members.filter((m: any) => m.category === "mahasiswa");

          return (
            <div key={pIndex} className="mb-28">
              
              {/* TITLE */}
              <h2 data-aos="fade-up" className="text-4xl font-bold mb-12 text-white text-center">
                Tim Pengembang{" "}
                <span className="text-[#60A5FA] font-extrabold">{project.teamTitle}</span>
              </h2>

              {/* DOSEN */}
              <h3 className="text-2xl font-semibold text-[#60A5FA] mb-8 text-center">
                Dosen Pembimbing
              </h3>

              <div className="flex justify-center flex-wrap gap-8 mb-20">
                {dosen.length > 0
                  ? dosen.map((item: any, i: number) => renderCard(item, i))
                  : <p className="text-white">Tidak ada dosen.</p>}
              </div>

              {/* MAHASISWA */}
              <h3 className="text-2xl font-semibold text-[#60A5FA] mb-8 text-center">
                Anggota Mahasiswa
              </h3>

              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center mx-auto w-full">
                {mahasiswa.length > 0
                  ? mahasiswa.map((item: any, i: number) => renderCard(item, i))
                  : <p className="text-white col-span-full">Tidak ada mahasiswa.</p>}
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}
