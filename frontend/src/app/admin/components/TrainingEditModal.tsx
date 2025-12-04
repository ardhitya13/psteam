"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Training } from "./TrainingAdmin";

function formatRp(n: number | null) {
  if (n == null) return "";
  return "Rp " + n.toLocaleString("id-ID");
}
function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

type Props = {
  data: Training;
  onClose: () => void;
  onUpdate: (data: Training) => void;
};

export default function EditTrainingModal({ data, onClose, onUpdate }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<Training>(data);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => setForm(data), [data]);

  // thumbnail change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    const url = URL.createObjectURL(f);
    setThumbnailFile(f);
    setForm(prev => ({ ...prev, thumbnail: url }));
  };

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    const num = digits ? parseInt(digits, 10) : null;
    setForm(prev => ({ ...prev, price: num ?? 0 }));
  };

  const update = (k: keyof Training, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  // schedule handlers
  const addSchedule = () => setForm(prev => ({ ...prev, schedule: [...(prev.schedule || []), { batchName: `Batch ${(prev.schedule||[]).length + 1}`, startDate: "", endDate: "" }] }));
  const updateSchedule = (idx: number, key: keyof NonNullable<Training["schedule"]>[number], val: string) =>
    setForm(prev => ({ ...prev, schedule: prev.schedule?.map((s, i) => i === idx ? { ...s, [key]: val } : s) || [] }));
  const removeSchedule = (idx: number) => setForm(prev => ({ ...prev, schedule: prev.schedule?.filter((_, i) => i !== idx) || [] }));

  // rundown handlers
  const addRundown = () => setForm(prev => ({ ...prev, rundown: [...(prev.rundown || []), { day: `Hari ${(prev.rundown||[]).length + 1}`, activity: "" }] }));
  const updateRundown = (idx: number, key: keyof NonNullable<Training["rundown"]>[number], val: string) =>
    setForm(prev => ({ ...prev, rundown: prev.rundown?.map((r, i) => i === idx ? { ...r, [key]: val } : r) || [] }));
  const removeRundown = (idx: number) => setForm(prev => ({ ...prev, rundown: prev.rundown?.filter((_, i) => i !== idx) || [] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Pelatihan</h2>
          <button onClick={onClose} className="p-2"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium">Thumbnail (file)</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm" />
              <div className="mt-3 w-full h-40 bg-gray-100 rounded overflow-hidden">
                {form.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-gray-500 p-4">Belum ada gambar</div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div>
                <label className="text-sm font-medium">Judul</label>
                <input value={form.title} onChange={(e) => update("title", e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="text-sm font-medium">Deskripsi Singkat</label>
                <input value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium">Tipe</label>
                  <select value={form.type} onChange={(e) => update("type", e.target.value as any)} className="mt-1 w-full border rounded px-3 py-2 text-sm">
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="iot">IoT</option>
                    <option value="ai">AI</option>
                  </select>
                </div>

                <div className="w-44">
                  <label className="text-sm font-medium">Harga</label>
                  <input value={form.price ? formatRp(form.price) : ""} onChange={handlePriceInput} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Deskripsi Lengkap</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
          </div>

          {/* cost & req */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Rincian Biaya</label>
                <button type="button" onClick={() => update("costDetails", [...(form.costDetails||[]), ""])} className="text-sm text-blue-600">+ Tambah</button>
              </div>
              <div className="mt-2 space-y-2">
                {(form.costDetails || []).map((c, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={c} onChange={(e) => update("costDetails", form.costDetails?.map((v, idx) => idx === i ? e.target.value : v) || [])} className="flex-1 border rounded px-2 py-1 text-sm"/>
                    <button type="button" onClick={() => update("costDetails", (form.costDetails||[]).filter((_, idx) => idx !== i))} className="bg-red-500 text-white px-2 rounded text-xs">Hapus</button>
                  </div>
                ))}
                {(form.costDetails || []).length === 0 && <div className="text-xs text-gray-500 italic">Belum ada rincian biaya.</div>}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Syarat Peserta</label>
                <button type="button" onClick={() => update("requirements", [...(form.requirements||[]), ""])} className="text-sm text-blue-600">+ Tambah</button>
              </div>
              <div className="mt-2 space-y-2">
                {(form.requirements || []).map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={r} onChange={(e) => update("requirements", form.requirements?.map((v, idx) => idx === i ? e.target.value : v) || [])} className="flex-1 border rounded px-2 py-1 text-sm"/>
                    <button type="button" onClick={() => update("requirements", (form.requirements||[]).filter((_, idx) => idx !== i))} className="bg-red-500 text-white px-2 rounded text-xs">Hapus</button>
                  </div>
                ))}
                {(form.requirements || []).length === 0 && <div className="text-xs text-gray-500 italic">Belum ada syarat peserta.</div>}
              </div>
            </div>
          </div>

          {/* schedule */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Jadwal Pelaksanaan</label>
              <button type="button" onClick={addSchedule} className="text-sm text-blue-600">+ Tambah Batch</button>
            </div>
            <div className="mt-2 space-y-2">
              {(form.schedule || []).length === 0 && <div className="text-xs text-gray-500 italic py-2">Belum ada jadwal.</div>}
              {(form.schedule || []).map((s, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <input value={s.batchName} onChange={(e) => updateSchedule(i, "batchName", e.target.value)} className="w-44 border rounded px-2 py-1 text-sm" />
                  <input type="date" value={s.startDate} onChange={(e) => updateSchedule(i, "startDate", e.target.value)} className="border rounded px-2 py-1 text-sm" />
                  <input type="date" value={s.endDate} onChange={(e) => updateSchedule(i, "endDate", e.target.value)} className="border rounded px-2 py-1 text-sm" />
                  <button type="button" onClick={() => removeSchedule(i)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Hapus</button>
                </div>
              ))}
            </div>
          </div>

          {/* rundown */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Rundown Kegiatan</label>
              <button type="button" onClick={addRundown} className="text-sm text-blue-600">+ Tambah Hari</button>
            </div>
            <div className="mt-2 space-y-2">
              {(form.rundown || []).length === 0 && <div className="text-xs text-gray-500 italic py-2">Belum ada rundown.</div>}
              {(form.rundown || []).map((r, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={r.day} onChange={(e) => updateRundown(i, "day", e.target.value)} className="w-28 border rounded px-2 py-1 text-sm" />
                  <input value={r.activity} onChange={(e) => updateRundown(i, "activity", e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm" />
                  <button type="button" onClick={() => removeRundown(i)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Hapus</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Penyelenggara</label>
            <input value={form.organizer} onChange={(e) => update("organizer", e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Batal</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
