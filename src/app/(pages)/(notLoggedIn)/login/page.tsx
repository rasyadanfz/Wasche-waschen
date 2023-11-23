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
        <div className="lg:mt-5 lg:mx-20">
            <div className="hidden lg:flex justify-between items-center mb-5">
                <div className="text-h3 font-itim text-primary-400">
                    Wäsche Waschen
                </div>
                <Link
                    href={"/register"}
                    className="text-white text-h6 font-bold px-12 py-1.5 bg-primary-400 hover:bg-primary-300 active:bg-primary-300 rounded-md font-raleway"
                >
                    Register
                </Link>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center lg:pb-6 lg:mt-14">
                <div className="flex flex-col px-10 py-4 mt-3 mr-2 font-raleway lg:border-2 lg:border-black rounded-lg lg:bg-[#FBFBFB]">
                    <div className="flex lg:hidden justify-center mb-5">
                        <Image
                            alt="Wasche Waschen Logo"
                            src="/images/Logo2W.svg"
                            width={96}
                            height={96}
                        />
                    </div>
                    <div className="text-h3 font-bold">Login</div>
                    <p className="text-h6 mt-2">Hi, Welcome Back👋</p>
                    <div className="mt-4">
                        <LoginForm />
                    </div>
                    <div className="text-center mt-3 text-body flex justify-center gap-x-1">
                        <p>Not registered yet?</p>
                        <Link
                            id="mainregister"
                            href={"/register"}
                            className="text-secondary-400 font-medium"
                        >
                            Register
                        </Link>
                    </div>
                    <div></div>
                </div>
                <div className="hidden lg:flex justify-center">
                    <Image
                        alt="Man Fixing a Washing Machine"
                        src="/images/Login Image.svg"
                        width={500}
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
