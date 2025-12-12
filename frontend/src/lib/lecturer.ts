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

// ========================================================
// GET ALL
// ========================================================
export function getAllLecturers() {
  return safeFetch(`${BASE_URL}`);
}

export function getLecturerProfile(userId: number) {
  return safeFetch(`${BASE_URL}/${userId}`);
}

// ========================================================
// UPDATE PROFILE (AUTO DETECT PHOTO / NON-PHOTO)
// ========================================================
export function updateLecturerProfile(userId: number, data: any) {
  const isForm = data instanceof FormData;

  return safeFetch(
    `${BASE_URL}/${userId}${isForm ? "/photo" : ""}`,
    {
      method: "PUT",
      body: isForm ? data : JSON.stringify(data),
    }
  );
}

// ========================================================
// EDUCATION CRUD
// ========================================================
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
