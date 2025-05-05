import { Geist, Geist_Mono } from "next/font/google";
import Nav from './components/Nav';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VOTE 30: Spoiler free F1 race poll",
  description: "A spoiler free F1 race poll",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body>
        <main className="app">
        <Nav />
        {children}
        </main>
      </body>
    </html>
  );
}
