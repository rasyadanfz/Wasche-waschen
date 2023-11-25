import type { Metadata } from "next";
import { Raleway, Itim } from "next/font/google";
import Provider from "@/context/Provider";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";

const raleway = Raleway({ subsets: ["latin"] });
const itim = Itim({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-itim",
    weight: "400",
});

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
        <html lang="en" className="bg-backgroundcolor">
            <Provider>
                <body className={`${raleway.className} ${itim.variable}`}>
                    <Navbar />
                    {children}
                </body>
            </Provider>
        </html>
    );
}
