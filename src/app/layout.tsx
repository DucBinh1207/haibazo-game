import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haibazo Game",
  description:
    "Haibazo Game - A fun and challenging game built with NextJs, Tailwind, and TypeScript",
  keywords:
    "HTML, CSS, JavaScript, TypeScript, Tailwind,  NextJs, Haibazo Game",
  applicationName: "Haibazo Game",
  openGraph: {
    title: "Haibazo Game",
    description:
      "Welcome to Haibazo Game! A fun and challenging game built with NextJs. Enjoy the challenge!",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Haibazo Game Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haibazo Game",
    description:
      "Welcome to Haibazo Game! A fun and challenging game built with NextJs. Enjoy the challenge!",
    images: ["/images/banner-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
