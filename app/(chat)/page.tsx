import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import {User} from "@prisma/client/edge";
import NewChat from "@/components/chat/new-chat";


export default async function NewChatPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }

    if ((session.user as User).currentTopicUUID) {
        redirect(`/chat/${(session.user as User).currentTopicUUID}`)
    }


    return <NewChat />
}
