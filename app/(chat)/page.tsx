import { auth } from "@/auth";
import {nanoid} from "@/lib/utils";
import {redirect} from "next/navigation";


export default async function NewChatPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }
    await redirect(`/chat/${nanoid()}`)
    return null
}
