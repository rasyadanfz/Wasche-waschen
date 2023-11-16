import { redirect } from "next/navigation";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LoginPage = async () => {
    // Route
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/catalog");
    }

    return (
        <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
            <div className="hidden lg:grid items-center justify-center bg-gradient-to-b from-blue3 from-[10%] to-blue1 via-blue2">
                <div className="text-white flex flex-col items-center gap-y-2">
                    <Image
                        alt="Logo"
                        src="/images/Logo2W.svg"
                        width={200}
                        height={200}
                    />
                    <p className="text-[32px] font-bold mt-2">Wasche Waschen</p>
                </div>
            </div>
            <div className="flex flex-col justify-center mx-[20px] mt-10">
                <div className="items-center mx-4 lg:mx-[120px]">
                    <h1 className="text-[26px] sm:text-[28px] md:text-[30px] font-bold">
                        Login
                    </h1>
                    <div className="mt-5 lg:mt-10">
                        <LoginForm />
                    </div>
                    <div className="flex justify-center mt-3">
                        <div className="flex gap-x-2 text-[13px]">
                            <p>Belum punya akun?</p>
                            <Link href={"/register"} className="underline">
                                Daftar sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
