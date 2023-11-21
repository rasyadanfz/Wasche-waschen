"use client";

import { FormEvent, useState } from "react";
import Button from "../../../../../components/Button";
import FormInput from "@/components/FormInput";
import toast, { Toaster } from "react-hot-toast";
import { errorToastOptions } from "@/toastConfig";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
    const router = useRouter();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailInput) {
            toast.error("Please enter your email!");
            return;
        } else if (emailInput) {
            if (!emailInput.includes("@")) {
                toast.error("Email not valid!");
                return;
            }
        }
        if (passwordInput === "") {
            toast.error("Please enter your password!");
            return;
        }

        const loginResponse = await signIn("credentials", {
            email: emailInput,
            password: passwordInput,
            redirect: false,
        });

        if (loginResponse?.error) {
            switch (loginResponse.error) {
                case "No user found":
                    toast.error("Account not found!");
                    return;
                case "Wrong password":
                    toast.error("Wrong password!");
                    return;
            }
        }

        if (loginResponse?.ok) {
            router.push("/catalog");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "email") {
            setEmailInput(e.target.value);
        } else if (e.target.id === "password") {
            setPasswordInput(e.target.value);
        }
    };

    return (
        <div className="">
            <div className="error_toast">
                <Toaster
                    position="top-right"
                    toastOptions={errorToastOptions}
                />
            </div>
            <form
                action=""
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit}
            >
                <FormInput
                    type="text"
                    id="email"
                    text="Email"
                    placeholder="example@gmail.com"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="password"
                    id="password"
                    text="Password"
                    placeholder="Enter Password"
                    onChange={handleInputChange}
                ></FormInput>
                <Button
                    text="Login"
                    className="py-2 mt-4 w-full h-full"
                    id="submit"
                />
            </form>
        </div>
    );
};

export default LoginForm;
