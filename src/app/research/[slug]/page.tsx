// app/research/[slug]/page.tsx
import { notFound } from "next/navigation";
import ResearchDetail from "../components/ResearchDetail";

export type ResearchItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  pdf?: string; // ✅ optional: path file PDF
};

const researchDetails: ResearchItem[] = [
  {
    slug: "ai-chatbot",
    title: "AI Chatbot untuk Layanan Pendidikan",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=2066&q=80",
    summary:
      "Proyek ini berfokus pada pengembangan chatbot berbasis kecerdasan buatan untuk membantu siswa memahami materi belajar melalui percakapan alami. Chatbot ini menggunakan model NLP modern seperti GPT untuk menjawab pertanyaan pengguna secara kontekstual.",
    pdf: "/pdfs/ai-chatbot.pdf",
  },
  {
    slug: "iot-smart-home",
    title: "IoT Smart Home Automation",
    category: "IoT",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2070&q=80",
    summary:
      "Sistem rumah pintar berbasis Internet of Things (IoT) untuk mengontrol perangkat seperti lampu, AC, dan keamanan rumah secara otomatis melalui jaringan Wi-Fi dan aplikasi mobile.",
    pdf: "/pdfs/iot-smart-home.pdf",
  },
  {
    slug: "mobile-learning-app",
    title: "Mobile Learning App Interaktif",
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2070&q=80",
    summary:
      "Aplikasi pembelajaran interaktif berbasis Android untuk meningkatkan efektivitas belajar mandiri dengan fitur kuis, materi multimedia, dan laporan hasil belajar.",
  },
  {
    slug: "company-website",
    title: "Company Website Modern",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80",
    summary:
      "Website profesional dengan desain modern menggunakan Next.js dan Tailwind CSS, dirancang untuk kebutuhan branding digital perusahaan.",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = researchDetails.find((item) => item.slug === slug);

  if (!project) notFound();

  return <ResearchDetail project={project!} />;
}
