import { auth } from "@/auth";
import AdminDashboard from "@/components/admin/dashboard";
import {nanoid} from "@/lib/utils";
import {redirect} from "next/navigation";
import {User} from "@prisma/client/edge";
import LinkedIn from "@/components/admin/linkedin";


export default async function AdminPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }
    console.log(session.user)
    if ((session.user as User).role !== "admin") {
        redirect(`/`)
    }

    return (
        <LinkedIn />
    )
}
