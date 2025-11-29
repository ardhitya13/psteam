"use client";

export type SubmissionPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  projectTitle: string;
  projectDescription: string;
  projectType?: string;
};

const BASE_URL = "http://localhost:4000/api/submissions";

/* GET ALL PENDING */
export async function getPendingSubmissions() {
  const res = await fetch(`${BASE_URL}/pending`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil pengajuan pending");
  return res.json();
}

/* GET ALL APPROVED */
export async function getApprovedSubmissions() {
  const res = await fetch(`${BASE_URL}/approved`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil pengajuan approved");
  return res.json();
}

/* CREATE SUBMISSION */
export async function createSubmission(payload: SubmissionPayload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal mengirim pengajuan");
  return res.json();
}

/* APPROVE SUBMISSION */
export async function approveSubmission(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/approve`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Gagal menyetujui pengajuan");
  return res.json();
}

/* REJECT SUBMISSION */
export async function rejectSubmission(id: number, adminNote?: string) {
  const res = await fetch(`${BASE_URL}/${id}/reject`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminNote }),
  });

  if (!res.ok) throw new Error("Gagal menolak pengajuan");
  return res.json();
}
