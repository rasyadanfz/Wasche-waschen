import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Provider from "@/context/Provider";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Navbar2 from "@/components/Navbar2";

const raleway = Raleway({ subsets: ["latin"] });

// const inter = Gloria_Hallelujah({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Wasche Waschen",
  description: "A laundry management system",
  icons: {
    icon: "/logo/logo.svg",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${raleway.className}`}>
          <Navbar2 />
          {children}
        </body>
      </Provider>
    </html>
  );
}
