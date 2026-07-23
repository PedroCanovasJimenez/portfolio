import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Cánovas Jiménez — Creative Developer",
  description:
    "Portfolio de Pedro Cánovas Jiménez: diseño web, sistemas FiveM, inteligencia artificial y dirección creativa.",
};

export const viewport: Viewport = {
  themeColor: "#C3BDB9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
