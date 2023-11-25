import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import EditProfile from "../components/EditProfile";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    return (
        <>
            <EditProfile />
        </>
    );
}
