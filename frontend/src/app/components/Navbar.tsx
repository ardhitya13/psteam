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
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  // ⛔ FIX 1 — variabel aman untuk SSR
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ⛔ FIX 2 — jangan jalankan scroll handler sebelum isMobile terisi
  useEffect(() => {
    if (isMobile === null) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      if (currentY < lastScrollY) setHidden(false);
      else if (currentY > lastScrollY && currentY > 100 && !menuOpen)
        setHidden(true);

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen, isMobile]);

  const handleSelectCategory = (category: string) => {
    const formattedCategory =
      category === "Semua Pelatihan & Sertifikasi" ? "Semua" : category;

    router.push(
      `/services/training${
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

  // ⛔ FIX 3 — kalau SSR masih rendering, jangan render apa-apa dulu
  // supaya tidak terjadi mismatch server-client
  if (isMobile === null) {
    return <nav className="h-20"></nav>;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
      ${
        scrolled
          ? "backdrop-blur-lg bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          : "bg-transparent"
      }
    `}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 font-inter text-white">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/images/logopsteam4.png"
            alt="PSTeam Logo"
            width={78}
            height={80}
            priority
            className="transition duration-300 group-hover:scale-105"
          />
        </Link>

        {/* BUTTON MOBILE */}
        <div className="flex items-center space-x-4 md:order-2">
          <Link
            href="/login"
            className="hidden md:block bg-gradient-to-r from-blue-800 to-blue-500 px-5 py-2 rounded-lg"
          >
            Masuk
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 w-12 h-12 text-2xl"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* MENU */}
        <div
          className={`w-full md:flex md:w-auto md:order-1 transition-all duration-300 ${
            menuOpen
              ? "block bg-[#0A1436]/90 rounded-xl mt-3 py-3"
              : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-10 text-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`inline-block py-2 px-3 ${
                    pathname === item.path
                      ? "text-[#60A5FA] font-bold"
                      : "text-gray-100 hover:text-[#60A5FA]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* LAYANAN */}
            <li
              className="relative"
              onMouseEnter={() => !isMobile && setServiceOpen(true)}
              onMouseLeave={() => !isMobile && setServiceOpen(false)}
            >
              <button
                onClick={() => isMobile && setServiceOpen(!serviceOpen)}
                className="inline-flex items-center gap-1 py-2 px-3 text-gray-100 hover:text-[#60A5FA]"
              >
                <span>Layanan</span>
                <span
                  className={`text-xs transition ${
                    serviceOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* DROPDOWN MOBILE */}
              {isMobile && serviceOpen && (
                <div className="md:hidden mt-2 bg-[#0A1436]/90 p-4 rounded-xl">
                  <div className="text-center mb-3">
                    <h3 className="text-[#60A5FA]">💡 Pengajuan Proyek</h3>
                    <Link href="/services/submission">
                      <span className="block mt-2 bg-[#60A5FA] py-2 rounded-lg text-white">
                        Ajukan Sekarang
                      </span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => handleSelectCategory(item.title)}
                        className="p-3 rounded-lg bg-white/5 border text-gray-100"
                      >
                        {item.icon}
                        <p className="text-xs mt-1">{item.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DROPDOWN DESKTOP */}
              {!isMobile && (
                <div
                  className={`fixed left-1/2 -translate-x-1/2 w-[80vw] mt-2 transition-all duration-300 ${
                    serviceOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-5"
                  } bg-[#0a1440]/90 border border-white/10 rounded-2xl shadow-2xl p-10`}
                >
                  <div className="flex gap-10 text-white">
                    <div className="w-1/3">
                      <h3 className="text-lg text-[#60A5FA]">
                        💡 Pengajuan Proyek
                      </h3>
                      <p className="text-gray-200 text-sm mt-2 mb-3">
                        Ajukan ide proyek atau kerja sama.
                      </p>
                      <Link href="/services/submission">
                        <span className="inline-block bg-[#60A5FA] px-6 py-2 rounded-lg text-white">
                          Ajukan Sekarang
                        </span>
                      </Link>
                    </div>

                    <div className="w-2/3">
                      <h3 className="text-lg text-[#60A5FA] mb-4">
                        🎓 Pelatihan & Sertifikasi
                      </h3>
                      <div className="grid grid-cols-5 gap-6">
                        {categories.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => handleSelectCategory(item.title)}
                            className="p-6 rounded-xl bg-white/5 text-white hover:bg-[#60A5FA]/10 transition"
                          >
                            <div className="text-[#60A5FA] mb-3">
                              {item.icon}
                            </div>
                            <span className="text-sm">{item.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
