import type { Metadata } from "next";
import { Inter, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// const inter = Gloria_Hallelujah({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Wasche Waschen",
  description: "A laundry management system",
  icons: {
    icon: "/logo/logo.svg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
