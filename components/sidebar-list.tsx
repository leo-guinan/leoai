import {ThemeToggle} from '@/components/theme-toggle'
import * as React from 'react'
import {useState} from 'react'
import {ChatTopic} from '@prisma/client/edge';
import {SidebarItems} from "@/components/sidebar-items";
import {MinusIcon, PlusIcon} from "@/components/ui/icons";

interface SidebarListProps {
    userId?: string
    topics: ChatTopic[]
    children?: React.ReactNode
}


export function SidebarList({userId: _, topics}: SidebarListProps) {

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
                {topics?.length && (
                    <div className="space-y-2 px-2">
                        <SidebarItems topics={topics}/>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between p-4">
                <ThemeToggle/>
                {/*<ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />*/}
            </div>
        </div>
    )
}
