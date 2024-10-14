import { auth } from "@/auth";
import AdminDashboard from "@/components/admin/dashboard";
import {nanoid} from "@/lib/utils";
import {redirect} from "next/navigation";
import {User} from "@prisma/client/edge";


export default async function AdminPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }
    if ((session.user as User).role !== "admin") {
        redirect(`/`)
    }

    return (
        <AdminDashboard />
    )
}
