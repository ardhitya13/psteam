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

// ========================================================
// CRUD RESEARCH (PATHS FIXED)
// ========================================================
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

// ========================================================
// CRUD COMMUNITY SERVICE
// ========================================================
export function addCommunityService(userId: number, data: any) {
  return safeFetch(`${BASE_URL}/lecturer/${userId}/community-service`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCommunityService(id: number, data: any) {
  return safeFetch(`${BASE_URL}/community-service/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCommunityService(id: number) {
  return safeFetch(`${BASE_URL}/community-service/${id}`, {
    method: "DELETE",
  });
}

// ========================================================
// SCIENTIFIC WORK
// ========================================================
export function addScientificWork(userId: number, data: any) {
  return safeFetch(`${BASE_URL}/lecturer/${userId}/scientific-work`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateScientificWork(id: number, data: any) {
  return safeFetch(`${BASE_URL}/scientific-work/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteScientificWork(id: number) {
  return safeFetch(`${BASE_URL}/scientific-work/${id}`, {
    method: "DELETE",
  });
}

// ========================================================
// INTELLECTUAL PROPERTY
// ========================================================
export function addIntellectualProperty(userId: number, data: any) {
  return safeFetch(`${BASE_URL}/lecturer/${userId}/intellectual-property`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateIntellectualProperty(id: number, data: any) {
  return safeFetch(`${BASE_URL}/intellectual-property/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteIntellectualProperty(id: number) {
  return safeFetch(`${BASE_URL}/intellectual-property/${id}`, {
    method: "DELETE",
  });
}
