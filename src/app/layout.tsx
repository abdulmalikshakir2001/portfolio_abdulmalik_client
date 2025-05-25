import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdul malik Portfolio",
  description: `Full-Stack SaaS Developer with 6 years of experience building scalable web and AI-powered applications using MERN, Python, and modern DevOps tools. Expert in GPT integrations, video/voice AI solutions, and end-to-end development for SaaS, ERP, and automation platforms.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
