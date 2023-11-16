import RegisterForm from "./components/RegisterForm";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/catalog");
    }

    return (
        <>
            <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
                <div className="hidden lg:grid items-center justify-center bg-gradient-to-b from-blue3 from-[10%] to-blue1 via-blue2">
                    <div className="text-white flex flex-col items-center gap-y-2">
                        <Image
                            alt="Logo"
                            src="/images/Logo2W.svg"
                            width={200}
                            height={200}
                        />
                        <p className="text-[32px] font-bold mt-2">
                            Wasche Waschen
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center mx-[20px] mt-6">
                    <div className="items-center mx-4 lg:mx-[120px]">
                        <h1 className="text-[26px] sm:text-[28px] md:text-[30px] font-bold">
                            Register
                        </h1>
                        <div className="mt-4">
                            <RegisterForm />
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
        </>
    );
};

export default RegisterPage;
