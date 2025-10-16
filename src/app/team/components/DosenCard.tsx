"use client";

import Image from "next/image";
import {
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";

export default function DosenSection() {
  const dosenList = [
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      title: "Dosen",
      prodi: "Teknologi Rekayasa Multimedia",
      pendidikan: "Doktor (S3) - Teknik Elektro Informatika, Institut Teknologi Bandung",
      email: "wibowo@polibatam.ac.id",
      riwayat: [
        "Sarjana (S1) Institut Teknologi Bandung - Teknik Informatika",
        "Magister (S2) Institut Teknologi Bandung - Informatika",
        "Doktor (S3) Institut Teknologi Bandung - Teknik Elektro Informatika",
      ],
      spesialis: "AI, Computer Vision, Autonomous System",
      image: "/dosen/ari_wibowo.png",
      socials: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Swono Sibagariang, S.Kom., M.Kom",
      title: "Dosen",
      prodi: "Teknik Informatika",
      pendidikan: "Magister (S2) - Ilmu dan Teknologi, Universitas Sumatera Utara",
      email: "swono@polibatam.ac.id",
      riwayat: [
        "Sarjana (S1) Universitas Katolik Santo Thomas Sumatera Utara - Teknik Informatika",
        "Magister (S2) Universitas Sumatera Utara - Ilmu dan Teknologi",
      ],
      spesialis: "Software Development",
      image: "/dosen/swono_sibagariang.png",
      socials: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
      },
    },
  ];

  return (
    <section className="py-12 bg-gray-50" id="dosen">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Dosen Pembimbing
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {dosenList.map((dosen, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={dosen.image}
                  alt={dosen.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{dosen.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{dosen.title}</p>

                <p className="text-sm text-gray-700">
                  <strong>Program Studi:</strong> {dosen.prodi}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Email:</strong> {dosen.email}
                </p>

                <div className="text-left mt-3">
                  <p className="font-semibold text-gray-800">Riwayat Pendidikan:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {dosen.riwayat.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-gray-700">
                    <strong>Bidang Spesialis:</strong> {dosen.spesialis}
                  </p>
                </div>

                {/* ==== Sosial Media ==== */}
                <div className="flex gap-4 mt-5">
                  <a
                    href={dosen.socials.github}
                    target="_blank"
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    <BsGithub size={20} />
                  </a>
                  <a
                    href={dosen.socials.linkedin}
                    target="_blank"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <BsLinkedin size={20} />
                  </a>
                  <a
                    href={dosen.socials.facebook}
                    target="_blank"
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                  >
                    <BsFacebook size={20} />
                  </a>
                  <a
                    href={dosen.socials.instagram}
                    target="_blank"
                    className="text-gray-700 hover:text-pink-500 transition-colors"
                  >
                    <BsInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
