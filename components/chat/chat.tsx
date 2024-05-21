'use client'
import {ChatList} from "@/components/chat-list";
import {ChatScrollAnchor} from "@/components/chat-scroll-anchor";
import {ChatPanel} from "@/components/chat-panel";
import {useEffect, useRef, useState} from "react";
// import {sendPreloChatMessage} from "@/app/actions/prelo";
import {ICloseEvent, IMessageEvent, w3cwebsocket as W3CWebSocket} from "websocket";
import {nanoid} from "@/lib/utils";
import {sendChatMessage} from "@/app/actions/chat";


interface ChatMessage {
    id: string
    content: string
    role: string
}

interface ChatProps {
    uuid: string
    messages: ChatMessage[]
    user: {
        name?: string | null
        image?: string | null
    }
}

export default function Chat({
                                 uuid,
                                 messages,
                                 user,
                             }: ChatProps) {
    const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>(messages)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState('')
    const client = useRef<W3CWebSocket | null>(null)


    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [chatMessageLoading, setChatMessageLoading] = useState(false)

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [displayedMessages]); // Dependency array includes the data triggering the scroll

    useEffect(() => {

        const connectSocket = () => {

            // client.current = new W3CWebSocket(`ws://localhost:3000/api/socket/`)
            if (uuid) {
                if (!client.current) {
                    client.current = new W3CWebSocket(
                        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}prelo/${uuid}/`
                    )
                }

                // client.current = new W3CWebSocket(
                //     `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}cofounder/${sessionId}/`
                // )

                client.current.onopen = () => {
                    console.log("WebSocket Client Connected")
                }

                client.current.onmessage = (message: IMessageEvent) => {
                    const data = JSON.parse(message.data.toString())


                    // make sure message id isn't already in the list
                    if (displayedMessages.find(m => m.id === data.id)) {
                        //replace the message
                        setDisplayedMessages(d => d.map(m => m.id === data.id ? data : m))
                    }
                    if (data.message) {
                        setDisplayedMessages(d => [...d, {
                            content: data.message,
                            role: 'assistant',
                            id: data.id
                        }])
                    }
                }

                client.current.onclose = (event: ICloseEvent) => {
                    setTimeout(() => {
                        connectSocket()
                    }, 5000) // retries after 5 seconds.
                }

                client.current.onerror = (error: Error) => {
                    console.log(`WebSocket Error: ${JSON.stringify(error)}`)
                }
            }
        }

        connectSocket()
    }, [displayedMessages, uuid])

    const sendMessage = async (message: { content: string, role: "user" }) => {
        if (!message.content) return
        setIsLoading(true)
        try {
            setDisplayedMessages([...displayedMessages,
                {
                    content: message.content,
                    role: message.role,
                    id: "temp"
                },
            ])
            setChatMessageLoading(true)

            const response = await sendChatMessage(uuid, message);

            if (!response) {
                console.error("No response")
                return
            }
            setChatMessageLoading(false)

            setDisplayedMessages([...displayedMessages,
                {
                    content: message.content,
                    role: message.role,
                    id: "temp"
                },
                {
                    content: response,
                    role: 'assistant',
                    id: nanoid()
                }
            ])
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)

        }
    }
    return (
        <>
            <div className={'pt-4 md:pt-10 size-full mx-auto overflow-hidden box-border'}>
                <>
                    <div className="flex flex-col-reverse sm:flex-row h-[calc(100vh-200px)]">
                        <div className="flex flex-col size-full overflow-y-scroll pb-[200px]  ">
                            <div className="p-y-12">
                                <ChatList messages={displayedMessages} user={user}
                                          chatMessageLoading={chatMessageLoading}/>
                                <ChatScrollAnchor/>
                                <ChatPanel
                                    isLoading={isLoading}
                                    input={input}
                                    setInput={setInput}
                                    sendMessage={sendMessage}

                                />
                                <div ref={bottomRef}/>
                            </div>
                        </div>

                    </div>

                </>

            </div>

        </>
    )

}