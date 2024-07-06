import Chat from "@/components/chat/chat";
import {getChat} from "@/app/actions/chat";

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


    return <Chat messages={chat.messages} messagesClaude={chat.messagesClaude} messagesGPT4o={chat.messagesGPT4o}
                 uuid={params.uuid}/>
}
