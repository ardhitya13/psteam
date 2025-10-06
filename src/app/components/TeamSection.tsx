"use client";
import { useEffect } from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const dosen = {
  name: "Ari Wibowo, S.T., M.T.",
  role: "Dosen Pembimbing",
  image: "/team/dosen1.png",
  github: "#",
  linkedin: "#",
  facebook: "#",
  instagram: "#",
};

const mahasiswa = [
  {
    name: "Ardhitya Danur Siswondo",
    role: "Full Stack Developer",
    image: "/team/mahasiswa1.png",
    github: "https://github.com/ardhitya13",
    linkedin: "https://www.linkedin.com/in/ardhitya-siswondo-7361552b8/",
    facebook: "https://www.facebook.com/ardhitya.siswondo.3/",
    instagram: "https://www.instagram.com/ardhitya__/",
  },
  {
    name: "Arifah Husaini",
    role: "UI/UX Designer",
    image: "/team/mahasiswa2.png", // Pastikan ini ukuran dan rasio sama seperti lainnya (misalnya 1:1)
    github: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Anggun Salsa Faradita",
    role: "UI/UX Designer",
    image: "/team/mahasiswa3.png",
    github: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Farhan",
    role: "Backend Developer",
    image: "/team/mahasiswa4.png",
    github: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
];

export default function TeamSection() {
  // 🔹 Jalankan animasi ketika elemen muncul di viewport
  useEffect(() => {
    AOS.init({
      duration: 900, // kecepatan animasi
      once: false, // animasi aktif setiap kali muncul di layar (bukan cuma reload)
      offset: 120,
    });
  }, []);

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold mb-10 text-gray-900"
        >
          Tim Pengembang PSTeam
        </h2>

        {/* Dosen Pembimbing */}
        <div data-aos="zoom-in" className="flex justify-center mb-16">
          <Card className="p-6 shadow-lg hover:shadow-xl w-72 transition-transform duration-300 hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <Image
                src={dosen.image}
                alt={dosen.name}
                width={150}
                height={150}
                className="rounded-full mb-4 object-cover aspect-square"
              />
              <h3 className="text-xl font-semibold">{dosen.name}</h3>
              <p className="text-gray-500 mb-4">{dosen.role}</p>
              <div className="flex justify-center gap-4 text-xl text-blue-600">
                <a href={dosen.github} target="_blank"><FaGithub /></a>
                <a href={dosen.linkedin} target="_blank"><FaLinkedin /></a>
                <a href={dosen.facebook} target="_blank"><FaFacebook /></a>
                <a href={dosen.instagram} target="_blank"><FaInstagram /></a>
              </div>
            </div>
          </Card>
        </div>

        {/* Mahasiswa */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mahasiswa.map((member, index) => (
            <Card
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150} // biar muncul bergiliran
              className="p-4 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mb-4 object-cover aspect-square"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center gap-4 text-xl text-blue-600">
                  <a href={member.github} target="_blank"><FaGithub /></a>
                  <a href={member.linkedin} target="_blank"><FaLinkedin /></a>
                  <a href={member.facebook} target="_blank"><FaFacebook /></a>
                  <a href={member.instagram} target="_blank"><FaInstagram /></a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
