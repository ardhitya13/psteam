"use client";

import React from "react";
import { X } from "lucide-react";
import { Training } from "./TrainingAdmin";

type Props = {
  data: Training | null;
  onClose: () => void;
};

/* =====================================================
   SUPER SAFE JSON PARSER (Double Parse + Fallback)
   ===================================================== */
function parseArray(input: any) {
  if (!input) return [];

  // sudah array → aman
  if (Array.isArray(input)) return input;

  try {
    // parse sekali
    const first = JSON.parse(input);

    // kalau hasilnya string JSON lagi → parse dua kali
    if (typeof first === "string") {
      return JSON.parse(first);
    }

    // kalau sudah array after parsing
    if (Array.isArray(first)) return first;

    return [];
  } catch (e) {
    console.warn("JSON parsing failed:", input);
    return [];
  }
}

/* FIX IMAGE BASE URL */
function fixImage(img?: string) {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return "http://localhost:4000" + img;
}

export default function DetailTrainingModal({ data, onClose }: Props) {
  if (!data) return null;

  // =====================================================
  // 🔥 NORMALISASI SEMUA DATA ARRAY
  // =====================================================
  const costDetails = parseArray(data.costDetails);
  const requirements = parseArray(data.requirements);
  const schedule = parseArray(data.schedule);
  const rundown = parseArray(data.rundown);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{data.title}</h2>
            <p className="text-sm text-gray-500">{(data.type || "").toUpperCase()}</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

          {/* LEFT SIDE */}
          <div>
            {data.thumbnail ? (
              <img
                src={fixImage(data.thumbnail)}
                alt={data.title}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}

            <div className="mt-4">
              <p className="text-sm text-gray-500">Harga Pelatihan</p>
              <p className="text-lg font-semibold text-orange-600">
                Rp {Number(data.price || 0).toLocaleString()}
              </p>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Penyelenggara: {data.organizer || "-"}
            </div>

            {data.duration && (
              <div className="mt-2 text-sm text-gray-700">
                Durasi: {data.duration}
              </div>
            )}

            {data.location && (
              <div className="mt-1 text-sm text-gray-700">
                Lokasi: {data.location}
              </div>
            )}

            {data.certificate && (
              <div className="mt-1 text-sm text-gray-700">
                Sertifikat: {data.certificate}
              </div>
            )}

            {data.instructor && (
              <div className="mt-1 text-sm text-gray-700">
                Instruktur: {data.instructor}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-4">

            {/* DESKRIPSI */}
            <div>
              <h3 className="font-semibold">Deskripsi Pelatihan</h3>
              <p className="text-sm text-gray-700 mt-1">{data.description || "-"}</p>
            </div>

            {/* COST DETAILS */}
            <div>
              <h4 className="font-semibold text-sm">Rincian Biaya</h4>
              <ul className="list-disc list-inside text-sm mt-1">
                {costDetails.length
                  ? costDetails.map((c: any, i: number) => <li key={i}>{String(c)}</li>)
                  : <li>-</li>}
              </ul>
            </div>

            {/* REQUIREMENTS */}
            <div>
              <h4 className="font-semibold text-sm">Syarat Peserta</h4>
              <ul className="list-disc list-inside text-sm mt-1">
                {requirements.length
                  ? requirements.map((r: any, i: number) => <li key={i}>{String(r)}</li>)
                  : <li>-</li>}
              </ul>
            </div>

            {/* SCHEDULE */}
            <div>
              <h4 className="font-semibold text-sm">Jadwal Pelaksanaan</h4>

              <table className="min-w-full text-sm mt-2 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-3 border">Batch</th>
                    <th className="py-2 px-3 border">Mulai</th>
                    <th className="py-2 px-3 border">Selesai</th>
                  </tr>
                </thead>

                <tbody>
                  {schedule.length ? (
                    schedule.map((s: any, i: number) => (
                      <tr key={i}>
                        <td className="py-2 px-3 border">{s.batchName}</td>
                        <td className="py-2 px-3 border">{s.startDate}</td>
                        <td className="py-2 px-3 border">{s.endDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-3 text-center italic text-gray-500">
                        Belum ada jadwal
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* RUNDOWN */}
            <div>
              <h4 className="font-semibold text-sm">Rundown Kegiatan</h4>

              <table className="min-w-full text-sm mt-2 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-3 border">Hari</th>
                    <th className="py-2 px-3 border">Kegiatan</th>
                  </tr>
                </thead>

                <tbody>
                  {rundown.length ? (
                    rundown.map((r: any, i: number) => (
                      <tr key={i}>
                        <td className="py-2 px-3 border">{r.day}</td>
                        <td className="py-2 px-3 border">{r.activity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-3 text-center italic text-gray-500">
                        Belum ada rundown
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
