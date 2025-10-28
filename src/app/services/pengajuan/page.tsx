"use client";

import TataCaraPengajuan from "./components/TataCaraPengajuan";
import FormPengajuan from "./components/FormPengajuan";

export default function PengajuanPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <TataCaraPengajuan />
        <FormPengajuan />
      </div>
    </main>
  );
}
