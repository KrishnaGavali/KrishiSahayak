import type { Metadata } from "next";
import { Comfortaa, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot/Chatbot";

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
    <html lang="en" className=" p-5">
      <body className={`${comfortaa.className} antialiased`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
