// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
'use client'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
//@ts-ignore
import remarkCollapse from 'remark-collapse'

import {cn} from '@/lib/utils'
import {CodeBlock} from '@/components/ui/codeblock'
import {MemoizedReactMarkdown} from '@/components/markdown'
import {ChatMessageActions} from '@/components/chat-message-actions'
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Image from 'next/image'
import ChatUser from "@/components/chat/chat-user";

export interface ChatMessageProps {
    message: {
        content: string
        role: string
        id: string
    },

}

export function ChatMessage({message, ...props}: ChatMessageProps) {
    return (
        <div
            className={cn('group relative mb-4 flex items-start max-w-xl')}
            {...props}
        >
            <div
                className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full ',
                    message.role === 'user'
                        ? ''
                        : 'bg-primary text-primary-foreground'
                )}
            >
                {message.role === 'user' ? <ChatUser/> :
                    <Image src="/logo.png" width={32} height={32} alt="Score My Deck Logo" className="rounded-full" />}
            </div>
            <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
                <MemoizedReactMarkdown
                    className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm, remarkMath, [remarkCollapse, {test: 'Problem'}]]}
                    //@ts-ignore
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                        p({children}) {
                            return <p className="mb-2 last:mb-0">{children}</p>
                        },
                        code({node, inline, className, children, ...props}) {
                            if (children.length) {
                                if (children[0] == '▍') {
                                    return (
                                        <span className="mt-1 cursor-default animate-pulse">▍</span>
                                    )
                                }

                                children[0] = (children[0] as string).replace('`▍`', '▍')
                            }

                            const match = /language-(\w+)/.exec(className || '')

                            if (inline) {
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }

                            return (
                                <CodeBlock
                                    key={Math.random()}
                                    language={(match && match[1]) || ''}
                                    value={String(children).replace(/\n$/, '')}
                                    {...props}
                                />
                            )
                        }
                    }}
                >
                    {message.content}
                </MemoizedReactMarkdown>
                <ChatMessageActions message={message}/>
            </div>
        </div>
    )
}
