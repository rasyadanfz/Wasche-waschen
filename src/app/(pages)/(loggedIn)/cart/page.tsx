import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CartPage from "./components/CartPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    } else if (session.user.role !== "Customer") {
        redirect("/catalog");
    }

    return (
        <div className="pb-14">
            <CartPage session={session} />
        </div>
    );
}
