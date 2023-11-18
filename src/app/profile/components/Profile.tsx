"use client";

import FormInput from "@/components/FormInput";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
    return <div className="animate-pulse min-h-screen flex items-center justify-center text-h4">Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto mt-[100px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-h3 font-bold text-center mb-10">{role}</h1>
          <div className="flex flex-col gap-2">
            <FormInput type="text" id="name" text="Name" placeholder={name} value={name} />
            <FormInput type="text" id="email" text="Email" placeholder={email} value={email} />
            <FormInput type="text" id="no_telp" text="Phone Number" placeholder={no_telp} value={no_telp} />
            <FormInput type="password" id="password" text="Password" placeholder="Password" classname="w-[500px]" />
          </div>
        </div>
      </div>
    </>
  );
}
