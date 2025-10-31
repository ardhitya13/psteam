import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import "flowbite";
import "flowbite-react";

export const metadata = {
  title: "PSTeam",
  description: "Website resmi PSTeam - Web, IoT, Mobile, dan AI Solution",
  icons: { icon: "/logopsteam4.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/logopsteam4.png" sizes="any" type="image/png" />
        <link rel="shortcut icon" href="/logopsteam4.png" type="image/png" />
      </head>

      {/* 🌈 Background gradasi global (paksa tampil di semua halaman) */}
      <body
        style={{
          background: "linear-gradient(90deg, #132C8E 0%, #050C28 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          color: "white",
          minHeight: "100vh",
          margin: 0,
        }}
        className="antialiased transition-colors duration-300"
      >
        {/* ✅ Layout global dengan konten utama */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
