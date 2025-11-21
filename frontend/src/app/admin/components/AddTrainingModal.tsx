"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { Training } from "./TrainingAdmin";

type Props = {
    onClose: () => void;
    onAdd: (data: Training) => void;
};

function formatRp(n: number | null) {
    if (n == null) return "";
    return "Rp " + n.toLocaleString("id-ID");
}
function onlyDigits(s: string) {
    return s.replace(/\D/g, "");
}

export default function AddTrainingModal({ onClose, onAdd }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [type, setType] = useState<Training["type"]>("web");
    const [priceNum, setPriceNum] = useState<number | null>(null);
    // default thumbnail: use uploaded sample path from your environment
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(
        "/mnt/data/6e7762b8-5202-4ce1-8ab2-57134e7c7b98.png"
    );
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const [description, setDescription] = useState("");
    const [costDetails, setCostDetails] = useState<string[]>([]);
    const [requirements, setRequirements] = useState<string[]>([]);
    const [schedule, setSchedule] = useState<{ batchName: string; startDate: string; endDate: string }[]>([]);
    const [rundown, setRundown] = useState<{ day: string; activity: string }[]>([]);
    const [organizer, setOrganizer] = useState<string>("PSTeam Academy");

    // thumbnail file handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) return;
        const url = URL.createObjectURL(f);
        setThumbnailFile(f);
        setThumbnailUrl(url);
    };

    // price input (user types numbers, show formatted)
    const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = onlyDigits(e.target.value);
        const num = digits ? parseInt(digits, 10) : null;
        setPriceNum(num);
    };

    // schedule management
    const addScheduleRow = () => setSchedule(s => [...s, { batchName: `Batch ${s.length + 1}`, startDate: "", endDate: "" }]);
    const updateScheduleRow = (idx: number, key: keyof typeof schedule[number], val: string) =>
        setSchedule(s => s.map((row, i) => i === idx ? { ...row, [key]: val } : row));
    const removeScheduleRow = (idx: number) => setSchedule(s => s.filter((_, i) => i !== idx));

    // rundown management
    const addRundownRow = () => setRundown(r => [...r, { day: `Hari ${r.length + 1}`, activity: "" }]);
    const updateRundownRow = (idx: number, key: keyof typeof rundown[number], val: string) =>
        setRundown(r => r.map((row, i) => i === idx ? { ...row, [key]: val } : row));
    const removeRundownRow = (idx: number) => setRundown(r => r.filter((_, i) => i !== idx));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: Training = {
            id: Date.now(),
            title,
            shortDescription,
            type,
            price: priceNum ?? 0,
            thumbnail: thumbnailUrl,
            description,
            costDetails,
            requirements,
            schedule,
            rundown,
            organizer,
        };

        onAdd(payload);
        // cleanup temporary object URLs (optional)
        if (thumbnailFile) {
            // do not revoke if we want preview later; you may revoke if needed:
            // URL.revokeObjectURL(thumbnailUrl);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Tambah Pelatihan Baru</h2>
                    <button onClick={onClose} className="p-2"><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Thumbnail + Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium">Thumbnail</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 w-full text-sm"
                            />

                            <div className="mt-3 w-full h-40 bg-gray-200 rounded overflow-hidden">
                                {thumbnailUrl ? (
                                    <img
                                        src={thumbnailUrl}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-xs text-gray-500 h-full">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <div>
                                <label className="text-sm font-medium">Judul</label>
                                <input
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 w-full border rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Deskripsi Singkat
                                </label>
                                <input
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    className="mt-1 w-full border rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-sm font-medium">Tipe</label>
                                    <select
                                        value={type}
                                        onChange={(e) =>
                                            setType(e.target.value as Training["type"])
                                        }
                                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                                    >
                                        <option value="web">Web Development</option>
                                        <option value="mobile">Mobile Development</option>
                                        <option value="iot">Internet of Things (IoT)</option>
                                        <option value="ai">Artificial Intelligence</option>
                                    </select>
                                </div>

                                <div className="w-44">
                                    <label className="text-sm font-medium">Harga</label>
                                    <input
                                        value={priceNum === null ? "" : formatRp(priceNum)}
                                        onChange={handlePriceInput}
                                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* detailed description */}
                    <div>
                        <label className="block text-sm font-medium">Deskripsi Lengkap</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
                    </div>

                    {/* cost & requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Rincian Biaya</label>
                                <button type="button" onClick={() => setCostDetails(d => [...d, ""])} className="text-sm text-blue-600">+ Tambah</button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {costDetails.map((c, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={c} onChange={(e) => setCostDetails(d => d.map((val, idx) => idx === i ? e.target.value : val))} className="flex-1 border rounded px-2 py-1 text-sm" />
                                        <button type="button" onClick={() => setCostDetails(d => d.filter((_, idx) => idx !== i))} className="bg-red-500 text-white px-2 rounded text-xs">Hapus</button>
                                    </div>
                                ))}
                                {costDetails.length === 0 && <div className="text-xs text-gray-500 italic">Belum ada rincian biaya.</div>}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Syarat Peserta</label>
                                <button type="button" onClick={() => setRequirements(r => [...r, ""])} className="text-sm text-blue-600">+ Tambah</button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {requirements.map((r, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={r} onChange={(e) => setRequirements(rr => rr.map((val, idx) => idx === i ? e.target.value : val))} className="flex-1 border rounded px-2 py-1 text-sm" />
                                        <button type="button" onClick={() => setRequirements(rr => rr.filter((_, idx) => idx !== i))} className="bg-red-500 text-white px-2 rounded text-xs">Hapus</button>
                                    </div>
                                ))}
                                {requirements.length === 0 && <div className="text-xs text-gray-500 italic">Belum ada syarat peserta.</div>}
                            </div>
                        </div>
                    </div>

                    {/* schedule */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Jadwal Pelaksanaan</label>
                            <button type="button" onClick={addScheduleRow} className="text-sm text-blue-600">+ Tambah Batch</button>
                        </div>

                        <div className="mt-2 space-y-2 overflow-x-auto">
                            {schedule.length === 0 && <div className="text-xs text-gray-500 italic py-2">Belum ada jadwal.</div>}
                            {schedule.map((s, i) => (
                                <div key={i} className="flex gap-2 items-end">
                                    <input value={s.batchName} onChange={(e) => updateScheduleRow(i, "batchName", e.target.value)} className="w-44 border rounded px-2 py-1 text-sm" />
                                    <input type="date" value={s.startDate} onChange={(e) => updateScheduleRow(i, "startDate", e.target.value)} className="border rounded px-2 py-1 text-sm" />
                                    <input type="date" value={s.endDate} onChange={(e) => updateScheduleRow(i, "endDate", e.target.value)} className="border rounded px-2 py-1 text-sm" />
                                    <button type="button" onClick={() => removeScheduleRow(i)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Hapus</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* rundown */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Rundown Kegiatan</label>
                            <button type="button" onClick={addRundownRow} className="text-sm text-blue-600">+ Tambah Hari</button>
                        </div>

                        <div className="mt-2 space-y-2">
                            {rundown.length === 0 && <div className="text-xs text-gray-500 italic py-2">Belum ada rundown.</div>}
                            {rundown.map((r, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input value={r.day} onChange={(e) => updateRundownRow(i, "day", e.target.value)} className="w-28 border rounded px-2 py-1 text-sm" />
                                    <input value={r.activity} onChange={(e) => updateRundownRow(i, "activity", e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm" />
                                    <button type="button" onClick={() => removeRundownRow(i)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Hapus</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* organizer */}
                    <div>
                        <label className="text-sm font-medium">Penyelenggara</label>
                        <input value={organizer} onChange={(e) => setOrganizer(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Simpan Pelatihan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
