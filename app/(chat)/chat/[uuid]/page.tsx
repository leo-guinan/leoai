import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import {User} from "@prisma/client/edge";

import Chat from "@/components/chat/chat";
import {getChat} from "@/app/actions/chat";
interface ChatPageProps {
    params: {
        uuid: string
    }
}

export default async function ChatPage({params}: ChatPageProps) {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }

    const chat = await getChat(params.uuid)

    if ('error' in chat) {
        return null
    }


    return <Chat user={session.user} messages={chat.messages} uuid={params.uuid} />
}
