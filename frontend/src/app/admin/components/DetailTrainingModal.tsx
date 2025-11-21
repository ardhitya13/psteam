"use client";

import React from "react";
import { X, Edit } from "lucide-react";
import { Training } from "./TrainingAdmin";

type Props = {
  data: Training | null;
  onClose: () => void;
  onEdit: (t: Training) => void;
};

export default function DetailTrainingModal({ data, onClose, onEdit }: Props) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{data.title}</h2>
            <p className="text-sm text-gray-500">{data.type?.toUpperCase()}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="p-2 rounded"><X /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          <div>
            {data.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover rounded" />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">No Image</div>
            )}

            <div className="mt-4">
              <p className="text-sm text-gray-500">Harga Pelatihan</p>
              <p className="text-lg font-semibold text-orange-600">Rp {data.price?.toLocaleString()}</p>
            </div>

            <div className="mt-3 text-xs text-gray-500">Penyelenggara: {data.organizer || "-"}</div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="font-semibold">Deskripsi Pelatihan</h3>
              <p className="text-sm text-gray-700 mt-1">{data.description || "-"}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Rincian Biaya</h4>
              <ul className="list-disc list-inside text-sm mt-1">
                {data.costDetails?.length ? data.costDetails.map((c, i) => <li key={i}>{c}</li>) : <li>-</li>}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Syarat Peserta</h4>
              <ul className="list-disc list-inside text-sm mt-1">
                {data.requirements?.length ? data.requirements.map((r, i) => <li key={i}>{r}</li>) : <li>-</li>}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Jadwal Pelaksanaan</h4>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-gray-100">
                    <tr><th className="py-2 px-3 border">Batch</th><th className="py-2 px-3 border">Mulai</th><th className="py-2 px-3 border">Selesai</th></tr>
                  </thead>
                  <tbody>
                    {data.schedule?.length ? data.schedule.map((s, i) => (
                      <tr key={i}><td className="py-2 px-3 border">{s.batchName}</td><td className="py-2 px-3 border">{s.startDate}</td><td className="py-2 px-3 border">{s.endDate}</td></tr>
                    )) : <tr><td colSpan={3} className="py-3 text-gray-500 italic text-center">Belum ada jadwal</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Rundown Kegiatan</h4>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100"><tr><th className="py-2 px-3 border">Hari</th><th className="py-2 px-3 border">Kegiatan</th></tr></thead>
                  <tbody>
                    {data.rundown?.length ? data.rundown.map((r, i) => <tr key={i}><td className="py-2 px-3 border">{r.day}</td><td className="py-2 px-3 border">{r.activity}</td></tr>) : <tr><td colSpan={2} className="py-3 text-gray-500 italic text-center">Belum ada rundown</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
