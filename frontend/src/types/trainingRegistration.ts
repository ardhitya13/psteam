export type Registration = {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";

  trainingId: number | null;
  trainingTitle: string;
  trainingType: string;
  trainingThumbnail?: string | null;
};
