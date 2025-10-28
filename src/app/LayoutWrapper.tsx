"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 🧭 Semua halaman publik yang menampilkan Navbar & Footer
  const showLayoutFor = [
    "/",
    "/about",
    "/team",
    "/portfolio",
    "/products",
    "/services",
  ];

  // ❌ Halaman yang tidak boleh ada Navbar/Footer
  const excludedPaths = ["/login", "/admin", "/dosen"];

  // ✅ Tampilkan layout hanya jika:
  // - Path termasuk halaman publik
  // - Bukan halaman login/admin
  const showLayout =
    showLayoutFor.some((path) =>
      path === "/" ? pathname === "/" : pathname.startsWith(path)
    ) && !excludedPaths.some((ex) => pathname.startsWith(ex));

  return (
    <div
      className={`flex flex-col min-h-screen transition-all duration-300 ${showLayout ? "pt-[110px]" : "bg-white"
        }`}
    >
      {showLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {showLayout && <Footer />}
    </div>
  );
}
