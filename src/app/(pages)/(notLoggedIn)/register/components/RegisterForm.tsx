"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import FormInput from "../../../../../components/FormInput";

type RegisterFormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement> | null) => void;
    setFormData: (formData: {
        email: string;
        nama: string;
        no_telp: string;
        password: string;
    }) => void;
    formData: {
        email: string;
        nama: string;
        no_telp: string;
        password: string;
    };
};

const RegisterForm: React.FC<RegisterFormProps> = ({
    handleSubmit,
    setFormData,
    formData,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currData, setCurrData] = useState({
        email: "",
        nama: "",
        no_telp: "",
        password: "",
    });
    const [formEvent, setFormEvent] =
        useState<FormEvent<HTMLFormElement> | null>(null);

    useEffect(() => {
        handleSubmit(formEvent);
    }, [formData]);

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (currData.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("CURR DATA: ", currData);
        setFormData(currData);
        setFormEvent(e);
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

    const handleShowPassword = () => {
        const show = showPassword;
        setShowPassword(!show);
    };

    const handleShowConfirmPassword = () => {
        const show = showConfirmPassword;
        setShowConfirmPassword(!show);
    };

    return (
        <div className="">
            <form
                action=""
                className="flex flex-col gap-y-2.5"
                onSubmit={onFormSubmit}
            >
                <FormInput
                    type="email"
                    id="email"
                    text="Email"
                    placeholder="example@gmail.com"
                    onChange={handleInputChange}
                ></FormInput>
                <FormInput
                    type="text"
                    id="nama"
                    text="Nama"
                    placeholder="Enter Your Name"
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    text="Password"
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    setShowPassword={handleShowPassword}
                ></FormInput>
                <FormInput
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    text="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    setShowPassword={handleShowConfirmPassword}
                ></FormInput>
                <Button text="Register" className="py-2 mx-[30px] mt-4" />
            </form>
        </div>
    );
};

export default RegisterForm;
