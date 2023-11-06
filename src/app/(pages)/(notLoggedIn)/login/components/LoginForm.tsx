"use client";

import { FormEvent, useState } from "react";
import Button from "../../../../../components/Button";
import FormInput from "@/components/FormInput";

type RegisterFormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const LoginForm: React.FC<RegisterFormProps> = ({ handleSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        const show = showPassword;
        setShowPassword(!show);
    };
    return (
        <div className="">
            <form
                action=""
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit}
            >
                <FormInput
                    type="email"
                    id="email"
                    text="Email"
                    placeholder="example@gmail.com"
                ></FormInput>
                <FormInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    text="Password"
                    placeholder="Enter Password"
                    setShowPassword={handleShowPassword}
                ></FormInput>
                <Button text="Login" className="py-2 mx-[30px] mt-4" />
            </form>
        </div>
    );
};

export default LoginForm;
