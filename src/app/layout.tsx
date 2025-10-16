import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import "flowbite";
import "flowbite-react";

export const metadata = {
  title: "PSTeam",
  description: "Website resmi PSTeam - Web, IoT, Mobile, dan AI Solution",
  icons: {
    icon: "/logopsteam4.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/logopsteam4.png" sizes="any" type="image/png" />
        <link rel="shortcut icon" href="/logopsteam4.png" type="image/png" />
      </head>
      <body className="bg-white flex flex-col min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
