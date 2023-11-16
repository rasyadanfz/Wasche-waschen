import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/context/Provider";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
            <Provider>
                <body className={inter.className}>{children}</body>
            </Provider>
        </html>
    );
}
