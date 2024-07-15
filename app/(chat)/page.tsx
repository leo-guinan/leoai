import {nanoid} from "@/lib/utils";
import {redirect} from "next/navigation";


export default async function NewChatPage() {
    redirect(`/chat/${nanoid()}`)
}
