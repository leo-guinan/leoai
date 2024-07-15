import Chat from "@/components/chat/chat";
import {getChat} from "@/app/actions/chat";
import {redirect} from "next/navigation";

interface ChatPageProps {
    params: {
        uuid: string
    }
}

export default async function ChatPage({params}: ChatPageProps) {


    const chat = await getChat(params.uuid)

    if ('error' in chat) {
        return null
    }


    return <Chat messages={chat.messages}
                 uuid={params.uuid}/>
}
