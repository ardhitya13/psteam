// frontend/src/lib/lecturer.ts
const BASE_URL = "http://localhost:4000/api/lecturer";

async function safeFetch(url: string, options: RequestInit = {}) {
  const isForm = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (!isForm) {
    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.error || `Request failed: ${res.status}`);
  }

  return data;
}

// ==========================================
// GET ALL / PROFILE / UPDATE
// ==========================================
export function getAllLecturers() {
  return safeFetch(`${BASE_URL}`);
}

export function getLecturerProfile(userId: number) {
  return safeFetch(`${BASE_URL}/${userId}`);
}

export function updateLecturerProfile(userId: number, data: any) {
  return safeFetch(`${BASE_URL}/${userId}`, {
    method: "PUT",
    body: data,
  });
}

// ==========================================
// CRUD EDUCATION (TIDAK DIUBAH)
// ==========================================
export function addEducation(userId: number, data: any) {
  return safeFetch(`${BASE_URL}/${userId}/education`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEducation(id: number, data: any) {
  return safeFetch(`${BASE_URL}/education/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteEducation(id: number) {
  return safeFetch(`${BASE_URL}/education/${id}`, {
    method: "DELETE",
  });
}

// ==========================================
// CRUD RESEARCH (PATHS FIXED)
// ==========================================
export function addResearch(userId: number, data: any) {
  return safeFetch(`${BASE_URL}/lecturer/${userId}/research`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateResearch(id: number, data: any) {
  return safeFetch(`${BASE_URL}/research/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteResearch(id: number) {
  return safeFetch(`${BASE_URL}/research/${id}`, {
    method: "DELETE",
  });
}
