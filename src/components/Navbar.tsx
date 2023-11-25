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
            link: "/catalog",
        },
        {
            label: "Riwayat Transaksi",
            link: "/riwayat-transaksi",
        },
    ];

    const navbarDataAdmin = [
        {
            label: "Home",
            link: "/catalog",
        },
        {
            label: "Daftar Transaksi",
            link: "/transaksi",
        },
        {
            label: "Laporan",
            link: "/laporan",
        },
    ];

    const navbarData = isAdmin ? navbarDataAdmin : navbarDataCustomer;

    return (
        <div>
            {disabledNavbar.includes(
                currentPathName
            ) ? null : loading ? null : (
                <header
                    className={`px-5 fixed top-0 left-0 w-full flex items-center py-4 duration-500 shadow-lg z-10 ${
                        isTop ? "bg-transparent" : "bg-primary-300"
                    }`}
                >
                    <div className="container relative z-50 mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
                        <div className="flex items-center justify-between relative">
                            {/* Logo */}
                            <div>
                                <Link id="companylogo" href="/">
                                    <h1
                                        className={`font-bold text-[1.5rem] ${
                                            itim.className
                                        } ${
                                            isTop
                                                ? "text-primary-500"
                                                : "text-white"
                                        }`}
                                    >
                                        WäscheWaschen
                                    </h1>
                                </Link>
                            </div>
                            {/* Navigasi */}
                            <div className="flex items-center px-8">
                                {/* hamburger button */}
                                <button
                                    id="hamburger"
                                    name="hamburger"
                                    type="button"
                                    className="flex w-[28px] flex-wrap gap-[6px] absolute z-30 lg:hidden"
                                    onClick={() => {
                                        const hamburger =
                                            document.querySelector(
                                                "#hamburger"
                                            );
                                        const navMenu =
                                            document.querySelector(
                                                "nav.nav-menu"
                                            );
                                        const hamburgerSpan =
                                            document.querySelectorAll(
                                                "#hamburger span"
                                            );
                                        hamburger?.classList.toggle(
                                            "hamburger-active"
                                        );
                                        navMenu?.classList.toggle("scale-0");
                                    }}
                                >
                                    <span
                                        className={`hamburger-line origin-top-left ${
                                            isTop
                                                ? "bg-primary-500"
                                                : "bg-white"
                                        }`}
                                    ></span>
                                    <span
                                        className={`hamburger-line ${
                                            isTop
                                                ? "bg-primary-500"
                                                : "bg-white"
                                        }`}
                                    ></span>
                                    <span
                                        className={`hamburger-line origin-bottom-left ${
                                            isTop
                                                ? "bg-primary-500"
                                                : "bg-white"
                                        }`}
                                    ></span>
                                </button>
                                {/* link */}
                                <nav className="nav-menu bg-[#EDEDED] scale-0 absolute  shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full duration-500 origin-top-right py-5 lg:py-0 lg:scale-100 lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none lg:transition-colors z-[100]">
                                    <ul className="flex flex-col gap-1 lg:flex-row lg:gap-8 items-center">
                                        {navbarData.map((item) => (
                                            <div key={item.label}>
                                                <Link href={item.link}>
                                                    <p
                                                        className={`cursor-pointer hover:underline
                        ${
                            currentPathName === item.link
                                ? isTop
                                    ? "text-primary-500 font-bold"
                                    : "text-primary-500 lg:text-white font-bold"
                                : "text-black"
                        }`}
                                                    >
                                                        {item.label}
                                                    </p>
                                                </Link>
                                            </div>
                                        ))}
                                        <div className="mt-6 lg:mt-0 lg:ml-20">
                                            <div className="flex flex-row items-center gap-2">
                                                {!isAdmin && (
                                                    <>
                                                        <Link
                                                            id="cart"
                                                            href={`/cart`}
                                                        >
                                                            <Image
                                                                src="/icons/cart.svg"
                                                                alt="cart-icon"
                                                                width={30}
                                                                height={30}
                                                                className={`transition-transform transform hover:scale-110 cursor-pointer ${
                                                                    currentPathName ===
                                                                    "/cart"
                                                                        ? "scale-110"
                                                                        : "scale-100"
                                                                }`}
                                                            />
                                                        </Link>

                                                        <div className="border-r border-black h-6 mx-4" />
                                                    </>
                                                )}
                                                <Link
                                                    href="/profile"
                                                    id="profile"
                                                >
                                                    <div
                                                        className={`flex flex-row gap-3 font-semibold transition-transform transform hover:scale-110 cursor-pointer items-center 
                            ${
                                currentPathName === "/profile"
                                    ? "scale-110"
                                    : "scale-100"
                            }
                          `}
                                                    >
                                                        <Image
                                                            src="/icons/user.svg"
                                                            alt="user-icon"
                                                            width={30}
                                                            height={30}
                                                        />
                                                        <div
                                                            className={`transition-colors duration-500 text-black`}
                                                        >
                                                            {username}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </div>
    );
};

export default Navbar;
