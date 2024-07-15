'use client'
import {ChatList} from "@/components/chat-list";
import {ChatScrollAnchor} from "@/components/chat-scroll-anchor";
import {ChatPanel} from "@/components/chat-panel";
import {useEffect, useRef, useState} from "react";
import {nanoid} from "@/lib/utils";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {ScrollArea} from "@/components/ui/scroll-area";
import type {SWRSubscriptionOptions} from 'swr/subscription'
import useSWRSubscription from 'swr/subscription'
import {sendChatMessage} from "@/app/actions/chat";
import {Message} from "@/lib/types";
import Panel from "../panel/panel";


interface ChatProps {
    messages: Message[]
    uuid: string
}


export default function Chat({
                                 messages,

                                 uuid,
                             }: ChatProps) {
    const [displayedMessages, setDisplayedMessages] = useState<Message[]>(messages)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [completedDialogOpen, setCompletedDialogOpen] = useState<boolean>(false)
    const [chatMessageLoading, setChatMessageLoading] = useState(false)

    const {
        data,
        error
    } = useSWRSubscription(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}leo/${uuid}/` as string, (key: string, {next}: SWRSubscriptionOptions<number, Error>) => {
        console.log("key", key)
        const socket = new WebSocket(key)
        socket.addEventListener('message', (event) => next(null, event.data))
        // @ts-ignore
        socket.addEventListener('error', (event) => next(event.error))
        return () => socket.close()
    })

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [displayedMessages]); // Dependency array includes the data triggering the scroll

    useEffect(() => {
        if (!data) return
        const parsedData = JSON.parse(data.toString())
        console.log("parsedData", parsedData)

        setCompletedDialogOpen(true)
    }, [data])

    // const pickFile = async (selectedFile: File | null) => {
    //     // Check if the file is a PDF
    //     if (selectedFile) {
    //         if (selectedFile.type === 'application/pdf') {
    //             setLoading(true);
    //             const newUploadUrl = await getUploadUrl(selectedFile.name);
    //             if ('error' in newUploadUrl) {
    //                 setErrorMessage('Error getting upload URL. Please try again.');
    //                 setFile(null);
    //                 setLoading(false);
    //                 return;
    //             }
    //             setNewUUID(newUploadUrl.uuid)
    //             setNewBackendId(newUploadUrl.backendId)
    //
    //
    //             setUploadUrl(newUploadUrl.url)
    //             setFile(selectedFile);
    //             setErrorMessage('');
    //             setLoading(false);
    //         } else {
    //             setErrorMessage('Please upload a valid PDF file.');
    //             setFile(null);
    //         }
    //     }
    // }

    const sendMessage = async (message: { content: string, role: "user", file?: File }) => {
        if (!message.content) return
        setIsLoading(true)
        try {
            const newUserMessage = {
                content: message.content,
                role: message.role,
                id: nanoid(),
                file: message.file
            }


            setDisplayedMessages([...displayedMessages,
                {
                    content: message.content,
                    role: message.role,
                    id: "temp",
                    type: message.file ? "file" : "text"

                },
            ])
            setChatMessageLoading(true)
            // Create a FormData object to send both text and file

            const response = await sendChatMessage(uuid, message);

            if (!response) {
                console.error("No response")
                return
            }

            const newMessage = {
                content: response.message,
                role: 'assistant',
                id: nanoid(),
                type: "text",
                contentUrls: response.content
            }

            setDisplayedMessages([...displayedMessages,
                {
                    content: message.content,
                    role: message.role,
                    id: "temp",
                    type: message.file ? "file" : "text"
                },
                newMessage
            ])
            setChatMessageLoading(false)

        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)

        }
    }
    return (
        <>
            <div className={'pt-4 md:pt-10 size-full mx-auto box-border'}>

                <>
                    <div className="flex flex-col-reverse sm:flex-row h-full">
                        <ResizablePanelGroup direction="horizontal">
                            <ResizablePanel>
                                <div
                                    className="flex flex-col w-full h-full">
                                    <div className="flex flex-col p-y-12 w-4/5 mx-auto h-full">
                                        <ScrollArea className="flex flex-col size-full pb-8">
                                            <ChatList messages={displayedMessages}
                                                      chatMessageLoading={chatMessageLoading}/>
                                            <ChatScrollAnchor/>
                                        </ScrollArea>
                                        <div className="relative">
                                            <ChatPanel
                                                isLoading={isLoading}
                                                input={input}
                                                setInput={setInput}
                                                sendMessage={sendMessage}

                                            />
                                        </div>
                                        <div ref={bottomRef}/>
                                    </div>
                                </div>

                            </ResizablePanel>
                            <ResizableHandle/>
                            <ResizablePanel>
                                <div className="h-full">
                                    <ScrollArea className="flex flex-col size-full pb-8">
                                        <Panel/>

                                    </ScrollArea>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>

                </>

            </div>
        </>
    )

}