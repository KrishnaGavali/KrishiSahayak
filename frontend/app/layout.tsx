import type { Metadata } from "next";
import { Comfortaa, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot/Chatbot";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "KrishiSahayak",
  description: "An AI-powered assistant for farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen flex flex-col">
      <body
        className={`${comfortaa.className} antialiased flex flex-col flex-1`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
