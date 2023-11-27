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
        <div className="lg:mt-5 lg:mx-20 lg:h-full flex flex-col justify-center">
            <div className="hidden lg:flex justify-between items-center mb-5">
                <div className="text-h3 font-itim text-primary-400">
                    Wäsche Waschen
                </div>
                <Link
                    href={"/login"}
                    className="text-white text-h6 font-bold px-12 py-1.5 bg-primary-400 hover:bg-primary-300 active:bg-primary-300 rounded-md font-raleway"
                >
                    Login
                </Link>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center lg:pb-6 lg:my-auto">
                <div className="flex flex-col px-10 py-4 mt-4 lg:mr-2 font-raleway lg:border-2 lg:border-black rounded-lg bg-[#FBFBFB]">
                    <div className="text-h3 font-bold">Register</div>
                    <p className="text-h6 mt-2">Hi, Welcome👋</p>
                    <div className="mt-4 ">
                        <RegisterForm />
                    </div>
                    <div
                        className="text-center mt-3 text-body flex justify-center gap-x-1"
                        id="acclogin"
                    >
                        <p>Already have an account?</p>
                        <Link
                            href={"/login"}
                            className="text-secondary-400 font-medium"
                        >
                            Login
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center">
                    <Image
                        alt="Woman doing laundry"
                        src="/images/Woman Laundry.svg"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
