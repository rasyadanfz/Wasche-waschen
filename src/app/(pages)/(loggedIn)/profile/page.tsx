import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "./components/Profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    return (
        <>
            <Profile />
        </>
    );
}
