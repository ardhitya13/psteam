"use client";

import { useEffect } from "react";
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

export default function TeamSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      offset: 120,
    });
  }, []);

  // === Dosen ===
  const dosenList = [
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      role: "Dosen Pembimbing",
      image: "/dosen/ari_wibowo.png",
      email: "ariwibowo@polibatam.ac.id",
      website: "https://ariwibowo.my.id",
      program: "Teknik Informatika",
      education:
        "Doktor (S3) Institut Teknologi Bandung - Teknik Elektro Informatika",
      specialization: "AI, Computer Vision, Autonomous System",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
    },
    {
      name: "Swono Sibagariang, S.Kom., M.Kom",
      role: "Dosen Pembimbing",
      image: "/dosen/swono_sibagariang.png",
      email: "swono@polibatam.ac.id",
      website: "https://swonosibagariang.my.id",
      program: "Teknik Informatika",
      education:
        "Magister (S2) Universitas Sumatera Utara - Ilmu dan Teknologi",
      specialization: "Software Development",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
    },
  ];

  // === Mahasiswa ===
  const mahasiswa = [
    {
      name: "Ardhitya Danur Siswondo",
      role: "Anggota Tim Produksi PSTeam",
      image: "/team/ardhitya.jpg",
      email: "ardhityasiswondo@gmail.com",
      website: "https://ardhitya-danur-siswondo-portofolio.vercel.app/",
      github: "https://github.com/ardhitya13",
      linkedin: "https://www.linkedin.com/in/ardhitya-danur-siswondo-7361552b8/",
      facebook: "https://www.facebook.com/ardhitya.siswondo.3/",
      instagram: "https://www.instagram.com/ardhitya__/",
    },
    {
      name: "Arifah Husaini",
      role: "Anggota Tim Produksi PSTeam",
      image: "/team/Arifah.jpeg",
      email: "Arifahhusaini03@gmail.com",
      website: "#",
      github: "#",
      linkedin: "https://github.com/arifah336",
      facebook: "https://www.facebook.com/arifa.husain.921",
      instagram: "https://www.instagram.com/ripahusain_/",
    },
    {
      name: "Anggun Salsa Faradita",
      role: "Anggota Tim Produksi PSTeam",
      image: "/team/Anggun.jpeg",
      email: "anggunsalsa2807@gmail.com",
      website: "#",
      github: "https://github.com/anggun07",
      linkedin: "https://www.linkedin.com/in/anggun-salsa-faradita-13b0432b3/",
      facebook: "https://www.facebook.com/share/169XkGzGJo/",
      instagram: "https://www.instagram.com/anggunslsa_",
    },
    {
      name: "Farhan",
      role: "Anggota Tim Produksi PSTeam",
      image: "/team/Farhan.jpeg",
      email: "farhanrsyidd@egmail.com",
      website: "#",
      github: "https://github.com/farhanrasyid20",
      linkedin: "https://www.linkedin.com/in/farhan-rasyid-88978a27a",
      facebook: "https://www.facebook.com/share/16vJEhxjRS/",
      instagram: "https://www.instagram.com/frhanr20",
    },
  ];

  // === Social Icons ===
  const SocialIcons = ({ person }: { person: any }) => (
    <div className="flex justify-center gap-4 text-xl mt-5">
      <a
        href={person.github}
        target="_blank"
        className="text-gray-500 hover:text-black transition-all duration-300"
      >
        <FaGithub />
      </a>
      <a
        href={person.linkedin}
        target="_blank"
        className="text-gray-500 hover:text-[#0a66c2] transition-all duration-300"
      >
        <FaLinkedin />
      </a>
      <a
        href={person.facebook}
        target="_blank"
        className="text-gray-500 hover:text-[#1877f2] transition-all duration-300"
      >
        <FaFacebook />
      </a>
      <a
        href={person.instagram}
        target="_blank"
        className="text-gray-500 hover:text-[#e4405f] transition-all duration-300"
      >
        <FaInstagram />
      </a>
      <a
        href={person.website}
        target="_blank"
        className="text-gray-500 hover:text-green-600 transition-all duration-300"
      >
        <FaGlobe />
      </a>
    </div>
  );

  // === Template Card ===
  const renderCard = (person: any, index: number) => (
    <Card
      key={index}
      data-aos="fade-up"
      data-aos-delay={index * 150}
      className="relative p-6 !bg-white !text-gray-800 shadow-lg hover:shadow-2xl 
                 transition-transform duration-300 hover:scale-105 rounded-2xl 
                 border border-gray-200 flex flex-col justify-between h-[460px] w-full max-w-sm"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#132C8E]/10 to-[#050C28]/10 rounded-2xl" />

      <div className="flex flex-col items-center text-center">
        <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-md transition-transform duration-300 hover:scale-105">
          <Image
            src={person.image}
            alt={person.name}
            width={160}
            height={160}
            className="object-cover object-[center_10%] w-full h-full"
          />
        </div>

        <h3 className="text-lg font-semibold text-blue-900">{person.name}</h3>
        <p className="text-blue-600 font-medium">{person.role}</p>
        <p className="text-sm text-gray-700 mt-2">{person.email}</p>

        {person.program && (
          <div className="mt-4 text-gray-700 text-sm leading-relaxed text-left">
            <p>
              <span className="font-semibold text-blue-800">Program Studi:</span>{" "}
              {person.program}
            </p>
            <p>
              <span className="font-semibold text-blue-800">Pendidikan:</span>{" "}
              {person.education}
            </p>
            <p>
              <span className="font-semibold text-blue-800">Spesialis:</span>{" "}
              {person.specialization}
            </p>
          </div>
        )}

        <SocialIcons person={person} />
      </div>
    </Card>
  );

  // === Return Section ===
  return (
    <section
      id="team"
      className="py-20 text-gray-800 bg-transparent"
    >
      <div className="max-w-7xl mx-auto text-center px-6">
        {/* 🔹 Judul utama */}
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold mb-12 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
        >
          Tim Pengembang {" "}
          <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_8px_rgba(96,165,250,0.6)]">
            PSTeam
          </span>
        </h2>

        {/* 🔹 Subjudul Dosen */}
        <h3 className="text-2xl font-semibold text-[#60A5FA] mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          Dosen Pembimbing
        </h3>
        <div className="flex justify-center flex-wrap gap-8 mb-20">
          {dosenList.map((dosen, index) => renderCard(dosen, index))}
        </div>

        {/* 🔹 Subjudul Mahasiswa */}
        <h3 className="text-2xl font-semibold text-[#60A5FA] mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          Anggota Mahasiswa
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {mahasiswa.map((member, index) => renderCard(member, index))}
        </div>
      </div>
    </section>
  );
}
