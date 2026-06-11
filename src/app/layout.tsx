import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Manfa | Wear The Change",
  description:
    "Minimal. Timeless. Purposeful. Thoughtfully crafted essentials designed for changing every lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
