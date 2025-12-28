"use client";

const API_URL = "http://localhost:4000/api/training";

/* =====================================================
   HANDLE RESPONSE
===================================================== */
async function handleResponse(res: Response) {
  const type = res.headers.get("content-type") || "";

  if (!res.ok) {
    const text = type.includes("json")
      ? JSON.stringify(await res.json())
      : await res.text();

    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return type.includes("json") ? res.json() : res.text();
}

/* =====================================================
   AUTH HEADER (AMAN, TIDAK ERROR)
===================================================== */
function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

/* =====================================================
   CREATE TRAINING (FormData + JWT)
===================================================== */
export async function createTraining(data: any) {
  const form = new FormData();

  form.append("title", data.title);
  form.append("shortDescription", data.shortDescription || "");
  form.append("type", data.type);
  form.append("price", String(data.price));
  form.append("description", data.description || "");
  form.append("organizer", data.organizer || "");
  form.append("duration", data.duration || "");
  form.append("location", data.location || "");
  form.append("certificate", data.certificate || "");
  form.append("instructor", data.instructor || "");

  form.append("costDetails", JSON.stringify(data.costDetails || []));
  form.append("requirements", JSON.stringify(data.requirements || []));
  form.append("schedule", JSON.stringify(data.schedule || []));
  form.append("rundown", JSON.stringify(data.rundown || []));

  if (data.thumbnailFile instanceof File) {
    form.append("thumbnail", data.thumbnailFile);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(), // ✅ HANYA AUTH
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   GET ALL TRAININGS
===================================================== */
export async function getAllTraining() {
  const res = await fetch(API_URL, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

/* =====================================================
   UPDATE TRAINING
===================================================== */
export async function updateTraining(id: number, data: any) {
  const form = new FormData();

  form.append("title", data.title);
  form.append("shortDescription", data.shortDescription || "");
  form.append("type", data.type);
  form.append("price", String(data.price));
  form.append("description", data.description || "");
  form.append("organizer", data.organizer || "");
  form.append("duration", data.duration || "");
  form.append("location", data.location || "");
  form.append("certificate", data.certificate || "");
  form.append("instructor", data.instructor || "");

  form.append("costDetails", JSON.stringify(data.costDetails || []));
  form.append("requirements", JSON.stringify(data.requirements || []));
  form.append("schedule", JSON.stringify(data.schedule || []));
  form.append("rundown", JSON.stringify(data.rundown || []));

  if (data.thumbnailFile instanceof File) {
    form.append("thumbnail", data.thumbnailFile);
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   DELETE TRAINING
===================================================== */
export async function deleteTraining(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}
