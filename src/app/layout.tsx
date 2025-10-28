import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import "flowbite";
import "flowbite-react";

export const metadata = {
  title: "PSTeam",
  description: "Website resmi PSTeam - Web, IoT, Mobile, dan AI Solution",
  icons: { icon: "/logopsteam4.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

      {/* ✅ Background lebih profesional dan lembut */}
      <body
        className="bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900 
                   flex flex-col min-h-screen antialiased transition-colors duration-300"
      >
        {/* ✅ Gunakan context dan layout global */}
          <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
