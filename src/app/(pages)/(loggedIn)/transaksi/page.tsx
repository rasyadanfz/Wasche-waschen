import { getServerSession } from "next-auth";
import Transaksi from "./components/Transaksi";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function TransaksiPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    } else if (session.user.role !== "Admin") {
        redirect("/catalog");
    } else {
        return (
            <>
                <Transaksi />
            </>
        );
    }
}
