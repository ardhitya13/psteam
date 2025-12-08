// src/lib/apiTeam.ts

const API_URL = "http://localhost:4000/api/team";

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

// =====================================================
// GET ALL PROJECTS
// =====================================================
export async function getAllProjects() {
  const res = await fetch(API_URL, { cache: "no-store" });
  return handleResponse(res);
}

// =====================================================
// CREATE PROJECT  (MULTIPLE IMAGES FIXED)
// =====================================================
export async function createProject(data: any) {
  const form = new FormData();

  form.append("teamTitle", data.teamTitle);

  (data.teamMembers || []).forEach((m: any, i: number) => {
    form.append(`teamMembers[${i}][name]`, m.name || "");
    form.append(`teamMembers[${i}][role]`, m.role || "");
    form.append(`teamMembers[${i}][email]`, m.email || "");
    form.append(`teamMembers[${i}][category]`, m.category || "");
    form.append(`teamMembers[${i}][studyProgram]`, m.studyProgram || "");
    form.append(`teamMembers[${i}][education]`, m.education || "");
    form.append(`teamMembers[${i}][specialization]`, m.specialization || "");
    form.append(`teamMembers[${i}][github]`, m.github || "");
    form.append(`teamMembers[${i}][linkedin]`, m.linkedin || "");
    form.append(`teamMembers[${i}][facebook]`, m.facebook || "");
    form.append(`teamMembers[${i}][instagram]`, m.instagram || "");
    form.append(`teamMembers[${i}][website]`, m.website || "");

    // ===============================
    // FIX BASE64 → BLOB
    // ===============================
    if (m.image && typeof m.image === "string" && m.image.startsWith("data:image")) {
      // BLOB must be fetched with await → THIS FUNCTION MUST BE ASYNC
      form.append("images", dataURLtoBlob(m.image), `member-${i}.png`);
    } else {
      form.append("images", "");
    }
  });

  const res = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  return handleResponse(res);
}

// =============== HELPER: BASE64 → BLOB (WITHOUT await) ===============
function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

// =====================================================
// ADD MEMBER
// =====================================================
export async function addMember(projectId: number, member: any) {
  const form = new FormData();

  Object.keys(member).forEach((k) => {
    if (k !== "image") form.append(k, (member as any)[k] ?? "");
  });

  if (member.image && typeof member.image === "string" && member.image.startsWith("data:image")) {
    form.append("image", dataURLtoBlob(member.image), "member.png");
  } else {
    form.append("image", "");
  }

  const res = await fetch(`${API_URL}/${projectId}/member`, {
    method: "POST",
    body: form,
  });

  return handleResponse(res);
}

// =====================================================
// UPDATE MEMBER
// =====================================================
export async function updateMember(memberId: number, data: any) {
  const form = new FormData();

  Object.keys(data).forEach((k) => {
    if (k !== "image" && data[k] != null) form.append(k, data[k]);
  });

  if (data.image && typeof data.image === "string" && data.image.startsWith("data:image")) {
    form.append("image", dataURLtoBlob(data.image), "update.png");
  }

  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "PUT",
    body: form,
  });

  return handleResponse(res);
}

// =====================================================
// DELETE MEMBER
// =====================================================
export async function deleteMember(memberId: number) {
  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

// =====================================================
// DELETE PROJECT
// =====================================================
export async function deleteProject(projectId: number) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}
