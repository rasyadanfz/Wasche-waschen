"use client";

import { FormEvent, useState } from "react";
import Button from "../../../../../components/Button";
import FormInput from "../../../../../components/FormInput";
import toast, { Toaster } from "react-hot-toast";
import { errorToastOptions } from "@/toastConfig";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const [confirmPassword, setConfirmPassword] = useState("");
    const [currData, setCurrData] = useState({
        email: "",
        name: "",
        no_telp: "",
        password: "",
    });

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currData.password && !confirmPassword) {
            toast.error("Please enter password confirmation!");
            return;
        }
        if (currData.password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currData),
        });

        const res = await response.json();
        if (res.error) {
            toast.error(res.error);
            return;
        }

        toast.success("Successfully registered!");
        setTimeout(() => {
            router.push("/login");
        }, 1500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrData({
            ...currData,
            [e.target.id]: e.target.value,
        });
    };
    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="">
            <div className="error_toast">
                <Toaster toastOptions={errorToastOptions} />
            </div>
            <form
                action=""
                className="flex flex-col gap-y-3"
                onSubmit={onFormSubmit}
            >
                <FormInput
                    type="text"
                    id="name"
                    text="Nama"
                    placeholder="Enter Your Name"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="text"
                    id="email"
                    text="Email"
                    placeholder="example@gmail.com"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="text"
                    id="no_telp"
                    text="Nomor Telepon"
                    placeholder="Enter Your Phone Number"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="password"
                    id="password"
                    text="Password"
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                ></FormInput>
                <FormInput
                    type="password"
                    id="confirmpassword"
                    text="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                ></FormInput>
                <Button
                    text="Register"
                    className="py-2 mt-4 w-full h-full"
                    id="submit"
                />
            </form>
        </div>
    );
};

export default RegisterForm;
