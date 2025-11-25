"use client";

import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "..//components/AdminSidebar";
import ProductManager from "./components/ProductManager";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex flex-col">
      {/* NAVBAR */}
      <AdminNavbar toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* MAIN CONTENT */}
        <main
          className={`flex-1 px-8 py-6 mt-[85px] transition-all duration-300 ${
            isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
          }`}
        >
          <ProductManager />
        </main>
      </div>
    </div>
  );
}
