import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wasche Waschen",
  description: "A laundry management system",
  icons: {
    icon: "/logo/logo.svg",
  }
};

const disabledNavbar = ['/login', '/register'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {!disabledNavbar.includes(pathName) && <Navbar />}
        {children}
      </body>
    </html>
  );
}
