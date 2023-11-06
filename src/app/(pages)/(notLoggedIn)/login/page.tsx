"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        name: "",
        no_telp: "",
        password: "",
    });

    const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginResult = await signIn("credentials", {
            ...data,
            redirect: false,
        });
        if (loginResult) {
            router.push("/catalog");
        }
    };

    return (
        <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
            <div className="hidden lg:grid items-center justify-center bg-gradient-to-b from-blue3 from-[10%] to-blue1 via-blue2">
                <div className="text-white">
                    <p className="text-[32px] font-bold">Wasche Waschen</p>
                    <p>Laundry menjadi lebih efisien bersama kami</p>
                </div>
            </div>
            <div className="flex flex-col justify-center mx-[20px] mt-10">
                <div className="items-center mx-4 lg:mx-[120px]">
                    <h1 className="text-[26px] sm:text-[28px] md:text-[30px] font-bold">
                        Login
                    </h1>
                    <div className="mt-5 lg:mt-10">
                        <LoginForm handleSubmit={loginHandler} />
                    </div>
                    <div className="flex justify-center mt-3">
                        <div className="flex gap-x-2 text-[13px]">
                            <p>Belum punya akun?</p>
                            <Link href={"/register"} className="underline">
                                Daftar sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
