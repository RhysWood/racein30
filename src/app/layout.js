import { Geist, Geist_Mono } from "next/font/google";
import Nav from './components/Nav';
import "./globals.css";
import { Metadata } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://racein30.com'),
  title: "VOTE 30: Spoiler free F1 race poll",
  description: "Vote whether to watch the full F1 race or just the 30-minute highlights. Community-driven, spoiler-free F1 race recommendations.",
  keywords: ["F1", "Formula 1", "race highlights", "F1 voting", "race in 30", "spoiler free F1"],
  openGraph: {
    title: "VOTE 30: Spoiler free F1 race poll",
    description: "Community-driven F1 race viewing recommendations",
    type: "website",
    url: "https://racein30.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Race in 30 - F1 Race Voting Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOTE 30: Spoiler free F1 race poll",
    description: "Community-driven F1 race viewing recommendations",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = "#ffffff";

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
