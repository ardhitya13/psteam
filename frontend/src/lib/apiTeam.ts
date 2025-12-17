// src/lib/apiTeam.ts

const API_URL = "http://localhost:4000/api/team";

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
   GET ALL PROJECTS
===================================================== */
export async function getAllProjects() {
  const res = await fetch(API_URL, { cache: "no-store" });
  return handleResponse(res);
}

/* =====================================================
   CREATE PROJECT (MULTIPLE MEMBERS + FILES)
===================================================== */
export async function createProject(data: any) {
  const form = new FormData();

  // TITLE
  form.append("teamTitle", data.teamTitle);

  // MEMBERS JSON
  form.append("teamMembers", JSON.stringify(data.teamMembers));

  // FILES (WAJIB SAMA: field name = "images")
  data.teamMembers.forEach((m: any, i: number) => {
    if (m.imageFile instanceof File) {
      form.append("images", m.imageFile, `member-${i}.png`);
    }
  });

  const res = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   ADD MEMBER (SINGLE FILE)
===================================================== */
export async function addMember(projectId: number, member: any) {
  const form = new FormData();

  // TEXT FIELDS ONLY
  Object.keys(member).forEach((key) => {
    if (key !== "image" && key !== "imageFile" && member[key] != null) {
      form.append(key, member[key]);
    }
  });

  // FILE FIELD (WAJIB NAMANYA "image")
  if (member.imageFile instanceof File) {
    form.append("image", member.imageFile, "member.png");
  }

  const res = await fetch(`${API_URL}/${projectId}/member`, {
    method: "POST",
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   UPDATE MEMBER (WITH OPTIONAL IMAGE FILE)
===================================================== */
export async function updateMember(memberId: number, data: any) {
  const form = new FormData();

  Object.keys(data).forEach((key) => {
    if (key !== "image" && key !== "imageFile" && data[key] != null) {
      form.append(key, data[key]);
    }
  });

  // Gambar baru dikirim jika user upload file
  if (data.imageFile instanceof File) {
    form.append("image", data.imageFile, "update.png");
  }

  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "PUT",
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   DELETE MEMBER
===================================================== */
export async function deleteMember(memberId: number) {
  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

/* =====================================================
   DELETE PROJECT
===================================================== */
export async function deleteProject(projectId: number) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}
