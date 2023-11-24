"use client";

import Button from "@/components/Button";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  role?: string | null | undefined;
  no_telp?: string | null | undefined;
}

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });

    if (data?.url) {
      router.push(data.url);
    } else {
      console.error("Failed to sign out");
    }
  };

  useEffect(() => {
    getSession().then((session) => {
      const user: User | undefined = session?.user;
      const name = user?.name;
      const email = user?.email;
      const role = user?.role;
      const no_telp = user?.no_telp;
      setName(name ?? "Username");
      setEmail(email ?? "Email");
      setRole(role ?? "Role");
      setNoTelp(no_telp ?? "No Telp");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse min-h-screen flex items-center justify-center text-h4">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-[100px] xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-h3 font-bold text-center mb-10">{role}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="font-bold text-body">Nama</div>
              <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-96">
                {name}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-body">Email</div>
              <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-96">
                {email}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-body">No Telp</div>
              <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-96">
                {no_telp}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-body">Password</div>
              <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-96">
                ********
              </div>
            </div>
            <div className="mt-12 gap-2 flex flex-col">
              <Button
                id="editProfile"
                text="Edit Profile"
                className="w-[24rem]"
                type="primary"
                onClick={() => router.push("/profile/editProfile")}
              />
              <Button
                id="changePassword"
                text="Ganti Password"
                className="w-[24rem]"
                type="primary"
                onClick={() => router.push("/profile/changePassword")}
              />
              <Button
                id="logout"
                text="Logout"
                className="w-[24rem]"
                type="danger"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
