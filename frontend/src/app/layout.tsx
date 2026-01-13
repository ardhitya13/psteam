import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import "flowbite";
import "flowbite-react";

export const metadata = {
  title: "PSTeam",
  description: "Website resmi PSTeam - Web, IoT, Mobile, dan AI Solution",
  icons: {
    icon: "/logopsteam1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">

      {/* 🌈 Background global gradasi vertikal — tanpa shorthand supaya aman */}
      <body
        suppressHydrationWarning
        className="antialiased text-white min-h-screen overflow-x-hidden transition-colors duration-300"
        style={{
          backgroundImage: "linear-gradient(180deg, #132C8E 0%, #050C28 100%)",
          backgroundColor: "#132C8E",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center top",
        }}
      >
        {/* ✅ Wrapper utama semua halaman */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
