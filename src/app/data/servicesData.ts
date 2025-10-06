// data/servicesData.ts

export type Service = {
  id: number;
  title: string;
  category: "web" | "mobile" | "iot" | "ai";
  description: string;
  image: string;
  features: string[];
  icon: string;
};

export const services: Service[] = [
  {
    id: 1,
    title: "Website Perusahaan",
    category: "web",
    description: "Website profesional untuk perusahaan dengan desain modern dan responsif.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Admin Dashboard"],
    icon: "🏢",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "web",
    description: "Platform online shop lengkap dengan sistem pembayaran otomatis.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Multi-vendor"],
    icon: "🛒",
  },
  {
    id: 3,
    title: "Custom Web Application",
    category: "web",
    description: "Aplikasi web custom sesuai kebutuhan bisnis Anda.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    features: ["Custom Features", "Database Integration", "User Management", "API Integration"],
    icon: "⚙️",
  },
  {
    id: 4,
    title: "Android Apps",
    category: "mobile",
    description: "Aplikasi native Android dengan performa optimal.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Native Performance", "Play Store Ready", "Material Design", "Offline Support"],
    icon: "🤖",
  },
  {
    id: 5,
    title: "iOS Apps",
    category: "mobile",
    description: "Aplikasi iOS elegan dengan performa tinggi untuk Apple ecosystem.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Swift UI", "App Store Ready", "Apple Design", "iOS Features"],
    icon: "🍎",
  },
  {
    id: 6,
    title: "Cross-Platform Apps",
    category: "mobile",
    description: "Aplikasi berjalan di Android dan iOS hanya dengan satu codebase.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Single Codebase", "Faster Development", "Consistent UI", "Cost Effective"],
    icon: "📲",
  },
  {
    id: 7,
    title: "Smart Home System",
    category: "iot",
    description: "Sistem automasi rumah pintar dengan kontrol penuh dari smartphone.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Remote Control", "Energy Monitoring", "Security System", "Voice Control"],
    icon: "🏠",
  },
  {
    id: 8,
    title: "Industrial IoT",
    category: "iot",
    description: "Solusi IoT industri untuk memantau dan mengontrol mesin produksi secara real-time.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Real-time Monitoring", "Predictive Maintenance", "Data Analytics", "Alert System"],
    icon: "🏭",
  },
  {
    id: 9,
    title: "Smart Agriculture",
    category: "iot",
    description: "Sistem IoT untuk pertanian modern dengan pemantauan otomatis.",
    image: "https://images.unsplash.com/photo-1592982537447-7448a3cfbcc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Soil Monitoring", "Automated Irrigation", "Climate Control", "Crop Analytics"],
    icon: "🌱",
  },
  {
    id: 10,
    title: "Chatbot AI",
    category: "ai",
    description: "Chatbot cerdas untuk layanan pelanggan otomatis 24 jam nonstop.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2066&q=80",
    features: ["Natural Language", "24/7 Service", "Multi-language", "Learning System"],
    icon: "💬",
  },
  {
    id: 11,
    title: "Predictive Analytics",
    category: "ai",
    description: "Analisis prediktif untuk pengambilan keputusan berbasis data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Data Mining", "Machine Learning", "Real-time Insights", "Dashboard"],
    icon: "📊",
  },
  {
    id: 12,
    title: "Computer Vision",
    category: "ai",
    description: "Sistem pengenalan visual berbasis AI untuk automasi industri.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Image Recognition", "Object Detection", "Quality Control", "Automated Inspection"],
    icon: "👁️",
  },
];