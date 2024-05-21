'use client'
import {useState} from "react";
import {startChat} from "@/app/actions/chat";
import {useRouter} from "next/navigation";

export default function NewChat() {
    const router = useRouter()
    const [topic, setTopic] = useState('')

    const handleStartChat = async () => {
        if (!topic) {
            return
        }
        const newTopic = await startChat(topic)
        if ('error' in newTopic) {
            console.error(newTopic.error)
            return
        }
        setTopic('')
        router.push(`/chat/${newTopic.uuid}`)

    }

    return (
        <>
            <div className="max-w-lg flex flex-row space-x-4 p-8">
                <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
                    Chat Topic
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="topic"
                        id="topic"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-zinc-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter a topic for your chat"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleStartChat}
                >
                    Start Chat
                </button>
            </div>
        </>
    )
}