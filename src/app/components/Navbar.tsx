"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Itim } from "next/font/google";
import { getSession } from "next-auth/react";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  role?: string | null | undefined;
  no_telp?: string | null | undefined;
}

const itim = Itim({
  weight: "400", // Specify the weight of the font
  subsets: ["latin"],
});

const disabledNavbar = ["/login", "/register"];

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPathName, setCurrentPathName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (currentPathName !== "/login" && currentPathName !== "/register") {
      getSession().then((session) => {
        const user: User | undefined = session?.user;
        const role = user?.role;
        const name = user?.name;
        setUsername(name ?? "Username");
        if (role === "Admin") {
          setIsAdmin(true);
        }
        setLoading(false);
      });
    }
  }, [currentPathName]);


  const handleScroll = () => {
    setIsTop(window.scrollY < 5);
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

  const pathName = usePathname();

  useEffect(() => {
    setCurrentPathName(pathName);
  }, [pathName]); // Run this effect only once after mounting

  const navbarDataCustomer = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Riwayat Transaksi",
      link: "/riwayat-transaksi",
    },
  ];

  const navbarDataAdmin = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Daftar Transaksi",
      link: "/daftar-transaksi",
    },
    {
      label: "Laporan",
      link: "/laporan",
    },
  ];

  const navbarData = isAdmin ? navbarDataAdmin : navbarDataCustomer;

  return (
    <>
      {disabledNavbar.includes(currentPathName) ? null : loading ? null : 
      (
        <div
          className={`fixed top-0 left-0 w-full flex items-center duration-500 py-4 shadow-lg ${
            isTop ? "bg-transparent" : "bg-primary-300"
          }`}
        >
          <div className="container relative z-50 mx-auto">
            <div className="flex items-center justify-between relative">
              <Link href="" className="px-4">
                <h1
                  className={`font-bold text-[1.5rem] ${itim.className} ${
                    isTop ? "text-primary-500" : "text-white"
                  }`}
                >
                  WäscheWaschen
                </h1>
              </Link>
              <div className="flex flex-row gap-8">
                {navbarData.map((item) => (
                  <Link href={item.link} key={item.label}>
                    <p
                      className={`cursor-pointer hover:underline
                      ${
                        currentPathName === item.link
                          ? isTop
                            ? "text-primary-500 font-bold"
                            : "text-white font-bold"
                          : "text-black"
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-row gap-3">
                <Image
                  src="/icons/user.svg"
                  alt="user-icon"
                  width={30}
                  height={30}
                />
                <div
                  className={` py-2 font-semibold transition-colors duration-500 text-black`}
                >
                  {username}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
