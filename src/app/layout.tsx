
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Provider from "@/context/Provider";
import "./globals.css";
import Navbar from "./components/Navbar";
import { useState } from "react";

const raleway = Raleway({ subsets: ["latin"] });

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
        <body className={`${raleway.className} min-h-[1000px]`}>
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
