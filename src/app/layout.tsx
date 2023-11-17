import type { Metadata } from "next";
import { Raleway, Poppins, Itim } from "next/font/google";
import Provider from "@/context/Provider";
import "./globals.css";
import Navbar from "./components/Navbar";

const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-raleway",
    weight: "400",
});
const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: "400",
});
const itim = Itim({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-itim",
    weight: "400",
});

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
            <body>
                <Provider>
                    <body
                        className={`${raleway.variable} ${poppins.variable} ${itim.variable}`}
                    >
                        {children}
                    </body>
                </Provider>
            </body>
        </html>
    );
}
