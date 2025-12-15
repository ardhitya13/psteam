"use client";

import { useState } from "react";
import NavbarDosen from "./components/NavbarLecturer";
import SidebarDosen from "./components/SidebarLecturer";
import LecturerGuard from "./components/LecturerGuard"; // ⬅️ TAMBAHAN

export default function DosenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <LecturerGuard>
      <div className="flex bg-gray-50 min-h-screen overflow-hidden">
        {/* Sidebar */}
        <SidebarDosen
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Konten utama */}
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {/* Navbar */}
          <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Isi halaman */}
          <main
            className={`transition-all duration-300 px-6 pt-[90px] pb-10 ${
              isSidebarOpen ? "ml-0 md:ml-[232px]" : "ml-0 md:ml-[80px]"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </LecturerGuard>
  );
}
