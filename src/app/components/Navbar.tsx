"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaMicrochip,
  FaLayerGroup,
} from "react-icons/fa";

export default function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) setHidden(false);
      else if (currentY > lastScrollY && currentY > 100 && !menuOpen)
        setHidden(true);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

  const handleSelectCategory = (category: string) => {
    const formattedCategory =
      category === "Semua Pelatihan & Sertifikasi" ? "Semua" : category;

    router.push(
      `/services/pelatihan${
        formattedCategory === "Semua"
          ? ""
          : `?category=${encodeURIComponent(formattedCategory)}`
      }`
    );

    setServiceOpen(false);
    setMenuOpen(false);
  };

  const categories = [
    { icon: <FaLayerGroup size={24} />, title: "Semua Pelatihan & Sertifikasi" },
    { icon: <FaGlobe size={24} />, title: "Web Development" },
    { icon: <FaMobileAlt size={24} />, title: "Mobile Development" },
    { icon: <FaMicrochip size={24} />, title: "Internet of Things (IoT)" },
    { icon: <FaRobot size={24} />, title: "Artificial Intelligence" },
  ];

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/about" },
    { name: "Tim", path: "/team" },
    { name: "Portofolio", path: "/portfolio" },
    { name: "Produk", path: "/products" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/10 
      bg-gradient-to-r from-[#132C8E]/90 to-[#050C28]/90 shadow-lg transition-all duration-500 ease-in-out ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 font-inter text-white">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logopsteam4.png"
            alt="PSTeam Logo"
            width={78}
            height={80}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex items-center space-x-4 md:order-2">
          <Link
            href="/login"
            className="hidden md:block bg-[#60A5FA] hover:bg-[#4f8de0] text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl focus:ring-2 focus:ring-[#60A5FA]/50"
          >
            Masuk
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center p-2 w-12 h-12 text-2xl text-white rounded-lg md:hidden hover:bg-white/10 transition-all duration-200"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        <div
          className={`w-full md:flex md:w-auto md:order-1 transition-all duration-300 ${
            menuOpen
              ? "block bg-[#0A1436]/95 shadow-lg rounded-xl mt-3 py-3 border border-white/10"
              : "hidden md:block"
          }`}
        >
          <ul
            className="flex flex-col p-4 mt-2 font-semibold text-[17px] 
            md:flex-row md:space-x-10 md:mt-0 md:p-0 space-y-2 md:space-y-0 items-center"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`inline-block py-2 px-3 rounded-lg transition-all duration-200 ${
                    pathname === item.path
                      ? "text-[#60A5FA] font-bold"
                      : "text-gray-100 hover:text-[#60A5FA]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown Layanan */}
            <li
              className="relative flex flex-col items-start w-full md:w-auto"
              onMouseEnter={() =>
                window.innerWidth >= 768 && setServiceOpen(true)
              }
              onMouseLeave={() =>
                window.innerWidth >= 768 && setServiceOpen(false)
              }
            >
              <button
                onClick={() =>
                  window.innerWidth < 768 && setServiceOpen(!serviceOpen)
                }
                className="inline-flex items-center justify-between w-full md:w-auto gap-1 py-2 px-3 rounded-lg text-gray-100 hover:text-[#60A5FA] font-semibold transition-all duration-200"
              >
                <span>Layanan</span>
                <span
                  className={`text-xs transition-transform duration-300 ${
                    serviceOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* ✅ Dropdown untuk mobile */}
              {serviceOpen && (
                <div className="md:hidden mt-2 w-full bg-[#0A1436]/90 border border-white/10 rounded-xl p-4 space-y-3 transition-all duration-300">
                  <div>
                    <h3 className="text-[#60A5FA] text-base font-semibold mb-2">
                      💡 Pengajuan Proyek
                    </h3>
                    <Link
                      href="/services/pengajuan"
                      onClick={() => {
                        setMenuOpen(false);
                        setServiceOpen(false);
                      }}
                      className="block bg-[#60A5FA] text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-[#4f8de0] transition"
                    >
                      Ajukan Sekarang
                    </Link>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <h3 className="text-[#60A5FA] text-base font-semibold mb-3">
                      🎓 Pelatihan & Sertifikasi
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleSelectCategory(item.title)}
                          className="flex items-center gap-2 text-left border border-white/10 rounded-lg p-2 bg-white/5 hover:bg-[#60A5FA]/10 transition"
                        >
                          <span className="text-[#60A5FA]">{item.icon}</span>
                          <span className="text-xs text-gray-100 font-medium">
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dropdown Desktop tetap sama */}
              <div
                className={`hidden md:block fixed left-1/2 -translate-x-1/2 top-[calc(100%+10px)] w-[80vw] rounded-2xl shadow-2xl bg-[#0a1440]/95 border border-white/10 p-10 transition-all duration-500 ease-in-out backdrop-blur-xl z-40 ${
                  serviceOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-5 invisible"
                }`}
              >
                <div className="flex gap-10 text-white">
                  {/* Konten desktop tidak diubah */}
                  <div className="w-1/3 border-r border-white/10 pr-8">
                    <h3 className="text-lg font-semibold text-[#60A5FA] mb-3 flex items-center gap-2">
                      💡 Pengajuan Proyek
                    </h3>
                    <p className="text-gray-200 text-sm mb-5 leading-relaxed">
                      Ajukan ide proyek atau kerja sama dengan tim PSTeam untuk diwujudkan bersama.
                    </p>
                    <Link
                      href="/services/pengajuan"
                      className="inline-block bg-[#60A5FA] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#4f8de0] transition shadow-md hover:shadow-lg"
                    >
                      Ajukan Sekarang
                    </Link>
                  </div>

                  <div className="w-2/3">
                    <h3 className="text-lg font-semibold text-[#60A5FA] mb-4 flex items-center gap-2">
                      🎓 Pelatihan & Sertifikasi
                    </h3>
                    <p className="text-gray-200 text-sm mb-6">
                      Pilih bidang pelatihan sesuai minat dan tingkatkan skill-mu bersama kami.
                    </p>

                    <div className="grid grid-cols-5 gap-6">
                      {categories.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleSelectCategory(item.title)}
                          className="flex flex-col items-center justify-center text-center border border-white/10 rounded-xl py-6 px-3 bg-white/5 hover:bg-[#60A5FA]/10 transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1"
                        >
                          <div className="text-[#60A5FA] mb-3 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-100 group-hover:text-[#60A5FA]">
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="md:hidden mt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-[#60A5FA] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#4f8de0] transition-all duration-300"
              >
                Masuk
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
