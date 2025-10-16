"use client";

import { usePathname } from "next/navigation";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Daftar halaman yang menampilkan Navbar dan Footer
  const showLayoutFor = [
    "/",
    "/about",
    "/team",
    "/research",
    "/publications",
    "/projects",
    "/services",
  ];

  const showLayout = showLayoutFor.includes(pathname);

  return (
    <div className={`flex flex-col min-h-screen ${showLayout ? "pt-[120px]" : ""}`}>
      {showLayout && <NavBar />}
      <main className="flex-grow">{children}</main>
      {showLayout && <Footer />}
    </div>
  );
}
