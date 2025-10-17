"use client";
import { useState } from "react";
import NavbarAdmin from "./components/NavbarAdmin";
import SidebarAdmin from "./components/SidebarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main
          className={`transition-all duration-300 flex-1 p-6 pt-[80px] ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
