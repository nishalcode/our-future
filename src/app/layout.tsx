import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-fredoka" 
});

export const metadata: Metadata = {
  title: "OUR FUTURE | @ngaithemes",
  description: "An emotional interactive experience.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
      <body className="antialiased overflow-hidden fixed inset-0 touch-none">
        {children}
      </body>
    </html>
  );
}
