import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/context/Provider";
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
<<<<<<< HEAD

  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {!disabledNavbar.includes(pathName) && <Navbar />}
        {children}
      </body>
    </html>
  );
=======
    return (
        <html lang="en">
            <Provider>
                <body className={inter.className}>{children}</body>
            </Provider>
        </html>
    );
>>>>>>> 5e766142c349cf3100ffcfdcf65eb32f03087049
}
