import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "dAte nIght - AI Dating Concierge",
  description: "Less scrolling, more dressing up. Your AI Avatar does the dirty work of dating so you don't have to.",
  keywords: ["dating", "AI", "matchmaking", "date night"],
  openGraph: {
    title: "dAte nIght",
    description: "10 Million potential matches. 52 weekends a year. Your AI Avatar does the dirty work of dating so you don't have to.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dAte nIght - AI Dating Concierge",
    description: "Less scrolling, more dressing up.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
