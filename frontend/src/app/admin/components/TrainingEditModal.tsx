"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { Training } from "./TrainingAdmin";
import { updateTraining } from "../../../lib/apiTraining";

type Props = {
  data: Training;
  onClose: () => void;
  onUpdate: (data: Training) => void;
};

/* =====================================================
   DOUBLE SAFE JSON PARSER
===================================================== */
function parseArray(input: any) {
  if (!input) return [];
  if (Array.isArray(input)) return input;

  try {
    const first = JSON.parse(input);
    if (Array.isArray(first)) return first;
    if (typeof first === "string") return JSON.parse(first);
    return [];
  } catch (e) {
    return [];
  }
}

const fixImage = (img?: string) => {
  if (!img) return "/default-thumb.png";
  if (img.startsWith("http")) return img;
  return "http://localhost:4000" + img;
};

function formatRp(n: number | null) {
  if (n == null) return "";
  return "Rp " + n.toLocaleString("id-ID");
}

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

export default function EditTrainingModal({ data, onClose, onUpdate }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ======================================
     🔥 NORMALISASI DATA ARRAY DARI DB
  ====================================== */
  const [costDetails, setCostDetails] = useState<string[]>(parseArray(data.costDetails));
  const [requirements, setRequirements] = useState<string[]>(parseArray(data.requirements));
  const [schedule, setSchedule] = useState<any[]>(parseArray(data.schedule));
  const [rundown, setRundown] = useState<any[]>(parseArray(data.rundown));

  // BASIC
  const [title, setTitle] = useState(data.title);
  const [shortDescription, setShortDescription] = useState(data.shortDescription ?? "");
  const [type, setType] = useState(data.type);
  const [priceNum, setPriceNum] = useState<number | null>(data.price ?? null);

  const [thumbnailUrl, setThumbnailUrl] = useState(fixImage(data.thumbnail));
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [description, setDescription] = useState(data.description ?? "");
  const [organizer, setOrganizer] = useState(data.organizer ?? "");
  const [duration, setDuration] = useState(data.duration ?? "");
  const [location, setLocation] = useState(data.location ?? "");
  const [certificate, setCertificate] = useState(data.certificate ?? "");
  const [instructor, setInstructor] = useState(data.instructor ?? "");

  const [successAlert, setSuccessAlert] = useState(false);

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    const num = digits ? parseInt(digits, 10) : null;
    setPriceNum(num);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    setThumbnailFile(f);
    setThumbnailUrl(URL.createObjectURL(f));
  };

  // SCHEDULE HANDLER
  const updateSchedule = (i: number, key: any, val: string) =>
    setSchedule((s) => s.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)));

  const addScheduleRow = () =>
    setSchedule((s) => [...s, { batchName: `Batch ${s.length + 1}`, startDate: "", endDate: "" }]);

  const removeSchedule = (idx: number) =>
    setSchedule((s) => s.filter((_, i) => i !== idx));

  // RUNDOWN HANDLER
  const updateRundown = (i: number, key: any, val: string) =>
    setRundown((r) => r.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)));

  const addRundownRow = () =>
    setRundown((r) => [...r, { day: `Hari ${r.length + 1}`, activity: "" }]);

  const removeRundown = (idx: number) =>
    setRundown((r) => r.filter((_, i) => i !== idx));

  /* ===========================================
     🔥 SUBMIT
  =========================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: data.id,
      title,
      shortDescription,
      type,
      price: priceNum ?? 0,
      thumbnail: data.thumbnail,
      description,
      costDetails,
      requirements,
      schedule,
      rundown,
      organizer,
      duration,
      location,
      certificate,
      instructor,
      thumbnailFile: thumbnailFile ?? null,
    };

    try {
      const updated = await updateTraining(data.id, payload);
      onUpdate(updated);
      setSuccessAlert(true);
    } catch (err) {
      console.error("updateTraining error:", err);
      alert("Gagal memperbarui pelatihan.");
    }
  };

  /* ===========================================
     🔥 RENDER
  =========================================== */
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Edit Pelatihan</h2>
          <button onClick={onClose} className="p-2 text-black hover:bg-gray-100 rounded"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* THUMBNAIL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-black">Thumbnail (file)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 w-full text-sm"
              />

              <div className="mt-3 w-full h-40 bg-gray-200 rounded overflow-hidden">
                <img src={thumbnailUrl} className="w-full h-full object-cove text-black" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              {/* title */}
              <div>
                <label className="text-sm font-medium text-black">Judul</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
                />
              </div>

              {/* short desc */}
              <div>
                <label className="text-sm font-medium text-black">Deskripsi Singkat</label>
                <input
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
                />
              </div>

              {/* type + price */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-black">Tipe</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="iot">Internet of Things (IoT)</option>
                    <option value="ai">Artificial Intelligence</option>
                  </select>
                </div>

                <div className="w-44">
                  <label className="text-sm font-medium text-black">Harga</label>
                  <input
                    value={priceNum == null ? "" : formatRp(priceNum)}
                    onChange={handlePriceInput}
                    className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* EXTRA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">Durasi</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-black">Lokasi</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-black">Sertifikat</label>
              <input
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-black">Instruktur</label>
              <input
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-black">Deskripsi Lengkap</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border rounded px-3 py-2 text-sm mt-1 text-black"
            />
          </div>

          {/* COST DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-black">Rincian Biaya</label>
                <button
                  type="button"
                  onClick={() => setCostDetails((d) => [...d, ""])}
                  className="text-sm text-blue-600"
                >
                  + Tambah
                </button>
              </div>

              <div className="mt-2 space-y-2">
                {costDetails.map((c, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={c}
                      onChange={(e) =>
                        setCostDetails((d) =>
                          d.map((v, idx) => (idx === i ? e.target.value : v))
                        )
                      }
                      className="flex-1 border rounded px-2 py-1 text-sm text-black"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCostDetails((d) => d.filter((_, idx) => idx !== i))
                      }
                      className="bg-red-500 text-white px-2 rounded text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUIREMENTS */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-black">Syarat Peserta</label>
                <button
                  type="button"
                  onClick={() => setRequirements((r) => [...r, ""])}
                  className="text-sm text-blue-600"
                >
                  + Tambah
                </button>
              </div>

              <div className="mt-2 space-y-2">
                {requirements.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={r}
                      onChange={(e) =>
                        setRequirements((rr) =>
                          rr.map((v, idx) => (idx === i ? e.target.value : v))
                        )
                      }
                      className="flex-1 border rounded px-2 py-1 text-sm text-black"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setRequirements((rr) => rr.filter((_, idx) => idx !== i))
                      }
                      className="bg-red-500 text-white px-2 rounded text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SCHEDULE */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-black">Jadwal Pelaksanaan</label>
              <button type="button" onClick={addScheduleRow} className="text-sm text-blue-600">
                + Tambah Batch
              </button>
            </div>

            <div className="mt-2 space-y-2">
              {schedule.map((s, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <input
                    value={s.batchName}
                    onChange={(e) => updateSchedule(i, "batchName", e.target.value)}
                    className="w-44 border rounded px-2 py-1 text-sm text-black"
                  />

                  <input
                    type="date"
                    value={s.startDate}
                    onChange={(e) => updateSchedule(i, "startDate", e.target.value)}
                    className="border rounded px-2 py-1 text-sm text-black"
                  />

                  <input
                    type="date"
                    value={s.endDate}
                    onChange={(e) => updateSchedule(i, "endDate", e.target.value)}
                    className="border rounded px-2 py-1 text-sm text-black"
                  />

                  <button
                    type="button"
                    onClick={() => removeSchedule(i)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RUNDOWN */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-black">Rundown Pelatihan</label>
              <button type="button" onClick={addRundownRow} className="text-sm text-blue-600">
                + Tambah Hari
              </button>
            </div>

            <div className="mt-2 space-y-2">
              {rundown.map((r, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={r.day}
                    onChange={(e) => updateRundown(i, "day", e.target.value)}
                    className="w-28 border rounded px-2 py-1 text-sm text-black"
                  />

                  <input
                    value={r.activity}
                    onChange={(e) => updateRundown(i, "activity", e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm text-black"
                  />

                  <button
                    type="button"
                    onClick={() => removeRundown(i)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ORGANIZER */}
          <div>
            <label className="text-sm font-medium text-black">Penyelenggara</label>
            <input
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm text-black"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border bg-black/50 rounded">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Simpan Perubahan
            </button>
          </div>

        </form>
      </div>

      {/* SUCCESS ALERT */}
      {successAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">
              Perubahan Berhasil!
            </h3>

            <p className="text-sm text-gray-700 mb-6">
              Pelatihan <b>{title}</b> berhasil diperbarui.
            </p>

            <button
              onClick={() => {
                setSuccessAlert(false);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
