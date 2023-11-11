"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [pathName, setPathName] = useState("");
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    setIsTop(window.scrollY < 5);
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const storedIsTop = sessionStorage.getItem("isTop");
    if (storedIsTop !== null) {
      setIsTop(storedIsTop === "true");
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTop(currentScrollY < 5);

      sessionStorage.setItem("isTop", (currentScrollY < 5).toString());
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentPathName = usePathname();

  useEffect(() => {
    setPathName(currentPathName);
  }, [currentPathName]);

  const navbarData = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Riwayat Transaksi",
      link: "/riwayat-transaksi",
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full flex items-center duration-500 py-4 shadow-md ${
          isTop ? "bg-transparent" : "bg-primary"
        }`}
      >
        <div className="container relative z-50 mx-auto">
          <div className="flex items-center justify-between relative">
            {/* logo */}
            <Link href="" className="px-4">
              <div className="flex items-center gap-2">
                <Image src="/logo/logo.svg" alt="Logo" width={30} height={30} />
                <p
                  className={`font-semibold text-lg ${
                    isTop ? "text-primary" : "text-white"
                  }`}
                >
                  2W Laundry
                </p>
              </div>
            </Link>
            <div className="hidden md:flex gap-7 items-center">
              {navbarData.map((item) => {
                return (
                  <Link href={item.link} key={item.label}>
                    <p
                      className={`cursor-pointer hover:underline 
                      ${
                        isTop ? "text-primary" : "text-white"
                      }
                      ${
                        pathName === item.link && "font-semibold underline"
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
              <div className={`px-7 py-2 font-bold cursor-pointer transition-colors duration-500 ${
                isTop ? "bg-primary text-white hover:bg-white hover:text-primary" : "bg-white text-primary hover:bg-primary hover:text-white"
              }`}>
                MASUK
              </div>
            </div>
          </div>
          {/* menu */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
