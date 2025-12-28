const BASE_URL = "http://localhost:4000/api/public";

/* =========================
   TYPES (OPTIONAL, DISARANKAN)
========================= */
export type PublicLecturer = {
  name: string;
  email: string;
  lecturerprofile: {
    studyProgram: string;
    specialization: string;
    imageUrl: string | null;
    educationhistory: any[];
    research: any[];
    communityservice: any[];
    scientificwork: any[];
    intellectualproperty: any[];
  };
};

/* =========================
   FETCH PUBLIC LECTURERS
========================= */
export async function getPublicLecturers(): Promise<PublicLecturer[]> {
  const res = await fetch(`${BASE_URL}/lecturer`, {
    method: "GET",
    cache: "no-store", // supaya selalu fresh
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dosen publik");
  }

  return res.json();
}
