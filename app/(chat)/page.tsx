import {nanoid} from "@/lib/utils";
import {redirect} from "next/navigation";


export default async function NewChatPage() {
    const uuid = nanoid();
    redirect(`/chat/${uuid}`);
}
