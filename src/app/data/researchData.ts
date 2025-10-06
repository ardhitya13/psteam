export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  category?: "AI" | "Mobile" | "IoT" | "Web";
};

export type YearProjects = {
  year: number;
  projects: Project[];
};

const researchData: YearProjects[] = [
  {
    year: 2025,
    projects: [
      {
        title: "AI Chatbot",
        description: "Chatbot AI untuk interaksi pintar dengan kemampuan natural language processing",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2066&q=80",
        link: "#",
        category: "AI",
      },
      {
        title: "IoT Smart Home",
        description: "Sistem rumah pintar dengan IoT untuk automasi dan kontrol perangkat",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "IoT",
      },
      {
        title: "Mobile Learning App",
        description: "Aplikasi pembelajaran mobile interaktif dengan konten edukatif",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Mobile",
      },
      {
        title: "Company Website",
        description: "Website profesional untuk perusahaan dengan desain modern",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Web",
      },
    ],
  },
  {
    year: 2024,
    projects: [
      {
        title: "E-commerce Website",
        description: "Website toko online profesional dengan sistem pembayaran lengkap",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Web",
      },
      {
        title: "VR Simulation",
        description: "Simulasi VR untuk training dan edukasi di berbagai industri",
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
        link: "#",
        category: "AI",
      },
      {
        title: "AI Recommendation System",
        description: "Sistem rekomendasi berbasis AI untuk personalisasi konten",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "AI",
      },
      {
        title: "Mobile Fitness App",
        description: "Aplikasi fitness dan kesehatan dengan tracking progress",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Mobile",
      },
    ],
  },
  {
    year: 2023,
    projects: [
      {
        title: "Company Profile Website",
        description: "Website profil perusahaan dengan portfolio dan informasi lengkap",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
        link: "#",
        category: "Web",
      },
      {
        title: "Data Analytics Dashboard",
        description: "Dashboard analisis data real-time dengan visualisasi interaktif",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "AI",
      },
      {
        title: "IoT Sensor Monitoring",
        description: "Monitoring sensor IoT untuk data lingkungan dan industri",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "IoT",
      },
      {
        title: "Social Media Mobile App",
        description: "Aplikasi media sosial dengan fitur komunikasi real-time",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        link: "#",
        category: "Mobile",
      },
    ],
  },
  {
    year: 2022,
    projects: [
      {
        title: "Inventory Management System",
        description: "Sistem manajemen inventory dengan tracking dan reporting",
        image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Web",
      },
      {
        title: "Smart Agriculture IoT",
        description: "Sistem IoT untuk monitoring dan automasi pertanian",
        image: "https://images.unsplash.com/photo-1592982537447-7448a3cfbcc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "IoT",
      },
      {
        title: "Machine Learning Model",
        description: "Model machine learning untuk prediksi dan klasifikasi data",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "AI",
      },
    ],
  },
];

export default researchData;