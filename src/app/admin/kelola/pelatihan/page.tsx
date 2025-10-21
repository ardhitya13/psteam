"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";

export default function DaftarPelatihanPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const data = [
    { no: 1, nama: "Anggun Salsa F", email: "anggunsalsa@gmail.com", telp: "08123456789", tipe: "Website" },
    { no: 2, nama: "Ardithya Danur S", email: "ardithyadanur@gmail.com", telp: "08123456789", tipe: "AI" },
    { no: 3, nama: "Arifah Husaini", email: "arifahhusaini@gmail.com", telp: "08123456789", tipe: "IoT" },
    { no: 4, nama: "Farhan Rasyid", email: "farhanrasyid@gmail.com", telp: "08123456789", tipe: "Mobile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarAdmin toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarAdmin isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 pt-0 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          DAFTAR PELATIHAN DI AJUKAN
        </h1>

        {/* Search */}
        <div className="flex justify-center mb-4">
          <div className="flex w-full max-w-md items-center border rounded-lg overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              placeholder="Cari nama pendaftar?"
              className="flex-grow px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex justify-start mb-4">
          <div className="relative inline-block">
            <select className="appearance-none border rounded-lg pl-4 pr-10 py-2 shadow-sm bg-white">
              <option>Pilih tipe proyek</option>
              <option>Website</option>
              <option>AI</option>
              <option>IoT</option>
              <option>Mobile</option>
            </select>
          </div>
        </div> 

        {/* Tabel */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="border border-gray-200 px-4 py-2">NO</th>
                <th className="border border-gray-200 px-4 py-2">NAMA</th>
                <th className="border border-gray-200 px-4 py-2">EMAIL</th>
                <th className="border border-gray-200 px-4 py-2">NOMOR TELP</th>
                <th className="border border-gray-200 px-4 py-2">TIPE PROYEK</th>
                <th className="border border-gray-200 px-4 py-2">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <motion.tr
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="bg-white hover:bg-gray-50"
                >
                  <td className="border border-gray-200 px-4 py-2 text-center">{item.no}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.nama}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{item.telp}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{item.tipe}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center flex justify-center gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded">
                      Terima
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded">
                      Tolak
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
