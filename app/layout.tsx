import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leon Lush",
  description: "YouTuber, Podcaster & Internet Commentator",
  openGraph: {
    title: "Leon Lush",
    description: "YouTuber, Podcaster & Internet Commentator",
    url: "https://leonlush.com",
    siteName: "Leon Lush",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Lush",
    description: "YouTuber, Podcaster & Internet Commentator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="min-h-screen bg-[#0F0F0F] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
