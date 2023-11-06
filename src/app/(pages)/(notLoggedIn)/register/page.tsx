"use client";

import { FormEvent, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        nama: "",
        no_telp: "",
        password: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | null) => {
        if (!e) {
            return;
        }
        e.preventDefault();

        console.log("DATA: ", data);
        // Register logic
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const userData = await response.json();
        console.log(userData);

        if (userData) {
            router.push("/login");
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
                        Register
                    </h1>
                    <div className="mt-5 lg:mt-10">
                        <RegisterForm
                            handleSubmit={handleSubmit}
                            setFormData={setData}
                            formData={data}
                        />
                    </div>
                    <div className="flex justify-center mt-3">
                        <div className="flex gap-x-2 text-[13px]">
                            <p>Sudah punya akun?</p>
                            <Link href={"/login"} className="underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
