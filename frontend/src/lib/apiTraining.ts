// src/lib/apiTraining.ts
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
   CREATE TRAINING (WITH FILE UPLOAD)
===================================================== */
export async function createTraining(data: any) {
  const form = new FormData();

  // TEXT FIELDS
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

  // ARRAY → JSON STRING (backend expects STRING)
  form.append("costDetails", JSON.stringify(data.costDetails || []));
  form.append("requirements", JSON.stringify(data.requirements || []));
  form.append("schedule", JSON.stringify(data.schedule || []));
  form.append("rundown", JSON.stringify(data.rundown || []));

  // FILE (SAME FORMAT AS TEAM)
  if (data.thumbnailFile instanceof File) {
    form.append("thumbnail", data.thumbnailFile, "thumbnail.png");
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   GET ALL TRAININGS
===================================================== */
export async function getAllTraining() {
  const res = await fetch(API_URL, { cache: "no-store" });
  return handleResponse(res);
}

/* =====================================================
   UPDATE TRAINING (WITH OPTIONAL FILE)
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

  // Only upload a new file if user selected one
  if (data.thumbnailFile instanceof File) {
    form.append("thumbnail", data.thumbnailFile, "thumbnail-update.png");
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
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
  });

  return handleResponse(res);
}
