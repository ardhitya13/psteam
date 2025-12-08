"use client";

export type TrainingPayload = {
  title: string;
  shortDescription?: string;
  type: string;
  price: number;
  thumbnail?: string;
  description?: string;

  // Tambahkan field baru
  duration?: string;
  location?: string;
  certificate?: string;
  instructor?: string;
  excerpt?: string;
  specification?: string;

  costDetails?: string[];
  requirements?: string[];
  schedule?: { batchName: string; startDate: string; endDate: string }[];
  rundown?: { day: string; activity: string }[];
  organizer?: string;
};

const BASE_URL = "http://localhost:4000/api/training";

/* ==================================
   GET ALL TRAINING (Landing Page)
================================== */
export async function getAllTraining() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil daftar pelatihan");
  return res.json();
}

/* ==================================
   CREATE TRAINING
================================== */
export async function createTraining(payload: TrainingPayload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal membuat pelatihan baru");
  return res.json();
}

/* ==================================
   UPDATE TRAINING
================================== */
export async function updateTraining(id: number, payload: TrainingPayload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal mengupdate pelatihan");
  return res.json();
}

/* ==================================
   DELETE TRAINING
================================== */
export async function deleteTraining(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Gagal menghapus pelatihan");
  return res.json();
}
