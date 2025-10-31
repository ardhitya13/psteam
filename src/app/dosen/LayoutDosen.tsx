"use client";
import { useState } from "react";
import NavbarDosen from "./components/NavbarDosen";
import SidebarDosen from "./components/SidebarDosen";

export default function DosenLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDosen toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarDosen isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main
        className={`transition-all duration-300 pt-[90px] px-8 pb-6 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
