import { useSession } from "next-auth/react";
import RiwayatTransaksi from "./component/RiwayatTransaksi";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RiwayatTransaksiPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    } else if (session.user.role !== "Customer") {
        redirect("/transaksi");
    }
    return (
        <>
            <RiwayatTransaksi />
        </>
    );
}
