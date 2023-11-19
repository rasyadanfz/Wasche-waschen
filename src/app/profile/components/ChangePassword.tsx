"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import bcrypt from "bcrypt";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { errorToastOptions } from "@/toastConfig";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
}

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getSession().then((session) => {
      const user = session?.user as User;
      const Id = user?.id;
      setUserId(Id ?? "Id");
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "current-password") {
      setPassword(e.target.value);
    } else if (e.target.id === "new-password") {
      setNewPassword(e.target.value);
    } else if (e.target.id === "confirm-password") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === "") {
      toast.error("Please enter your current password!");
      return;
    }
    if (newPassword === "") {
      toast.error("Please enter your new password!");
      return;
    }
    if (confirmPassword === "") {
      toast.error("Please enter your new password confirmation!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const response = await fetch(`/api/user/changePassword?id=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        newPassword: newPassword,
      }),
    });

    const res = await response.json();
    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Successfully changed password!");
    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  const router = useRouter();

  return (
    <>
      <div className="error_toast">
        <Toaster position="top-right" toastOptions={errorToastOptions} />
      </div>
      <div className="container mx-auto mt-[100px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-h3 font-bold text-center mb-10">
            Change Password
          </h1>
          <form action="" className="flex flex-col gap-2" onSubmit={handleSave}>
            <FormInput
              className="w-96"
              type="password"
              id="current-password"
              placeholder="Masukkan Password Saat Ini"
              text="Current Password"
              onChange={handleInputChange}
            />
            <FormInput
              className="w-96"
              type="password"
              id="new-password"
              placeholder="Masukkan Password Baru"
              text="New Password"
              onChange={handleInputChange}
            />
            <FormInput
              className="w-96"
              type="password"
              id="confirm-password"
              placeholder="Masukkan Password Baru"
              text="Confirm Password"
              onChange={handleInputChange}
            />
            <Button className="w-[24rem] mt-10" text="Save" id="submit" />
          </form>
          <Button
            type="danger"
            text="Cancel"
            className="w-[24rem] mt-2"
            onClick={() => router.push("/profile")}
            id="cancel"
          />
        </div>
      </div>
    </>
  );
}
