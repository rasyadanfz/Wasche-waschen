"use client";

import toast, { Toaster } from "react-hot-toast";
import { errorToastOptions } from "@/toastConfig";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserSession {
  id: string;
  name: string;
  email: string;
  no_telp: string;
  role: string;
}

export default function EditProfile() {
  const [initData, setInitData] = useState({
    id: "",
    name: "",
    email: "",
    no_telp: "",
  });

  const [currData, setCurrData] = useState({
    id: "",
    name: "",
    email: "",
    no_telp: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      const user = session?.user as UserSession;
      const name = user?.name;
      const email = user?.email;
      const no_telp = user?.no_telp;
      const role = user?.role;
      if (role === "Admin") {
        setIsAdmin(true);
      }
      setCurrData({
        id: user?.id ?? "",
        name: name ?? "",
        email: email ?? "",
        no_telp: no_telp ?? "",
      });
      setInitData({
        id: user?.id ?? "",
        name: name ?? "",
        email: email ?? "",
        no_telp: no_telp ?? "",
      });
    });
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      setCurrData({ ...currData, name: e.target.value });
    } else if (e.target.id === "email") {
      setCurrData({ ...currData, email: e.target.value });
    } else if (e.target.id === "no_telp") {
      setCurrData({ ...currData, no_telp: e.target.value });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currData.name === "") {
      toast.error("Please enter your name!");
      return;
    }
    if (currData.email === "") {
      toast.error("Please enter your email!");
      return;
    }
    if (currData.no_telp === "") {
      toast.error("Please enter your phone number!");
      return;
    }

    const response = await fetch(`/api/user/editProfile?id=${currData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currData),
    });

    if (response.ok) {
      toast.success("Profile updated!");
    } else {
      toast.error("Failed to update profile!");
    }

    setTimeout(() => {
      router.push("/profile");
    }, 2000);
  };

  const router = useRouter();

  const disabledSave = () => {
    if (
      initData.name === currData.name &&
      initData.email === currData.email &&
      initData.no_telp === currData.no_telp
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="error_toast">
        <Toaster position="top-right" toastOptions={errorToastOptions} />
      </div>
      <div className="container mx-auto mt-[100px] xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
        <h1 className="text-h3 font-bold text-center mb-10">Edit Profile</h1>

        {!isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <form
              action=""
              className="flex flex-col gap-2"
              onSubmit={handleSave}
            >
              {!isAdmin && (
                <FormInput
                  className="w-96"
                  type="text"
                  id="name"
                  placeholder="Masukkan Nama"
                  text="Nama"
                  value={currData.name}
                  onChange={handleInputChange}
                />
              )}
              <FormInput
                className="w-96"
                type="text"
                id="email"
                placeholder="Masukkan Email"
                text="Email"
                value={currData.email}
                onChange={handleInputChange}
              />
              <FormInput
                className="w-96"
                type="text"
                id="no_telp"
                placeholder="Masukkan Nomor Telepon"
                text="Nomor Telepon"
                value={currData.no_telp}
                onChange={handleInputChange}
              />
              <Button
                text="Save"
                id="submit"
                disabled={disabledSave()}
                className={`w-[24rem] mt-10 ${
                  disabledSave() ? "cursor-not-allowed" : ""
                }`}
              />
            </form>
            <Button
              type="danger"
              text="Cancel"
              onClick={() => router.push("/profile")}
              className={`w-[24rem] mt-2`}
            />
          </div>
        ) : (
          <div className="absolute translate-x-[-50%] translate-y-[-50%] animate-pulse top-[50%] left-[50%] text-h2 font-raleway font-bold">
            <div>Loading...</div>
          </div>
        )}
      </div>
    </>
  );
}
