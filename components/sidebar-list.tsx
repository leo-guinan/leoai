import {ThemeToggle} from '@/components/theme-toggle'
import * as React from 'react'
import {useState} from 'react'
import {SidebarItems} from "@/components/sidebar-items";
import {MinusIcon, PlusIcon} from "@/components/ui/icons";

interface SidebarListProps {
    userId?: string
    children?: React.ReactNode
}


export function SidebarList({userId: _}: SidebarListProps) {

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">

            </div>
            <div className="flex items-center justify-between p-4">
                <ThemeToggle/>
                {/*<ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />*/}
            </div>
        </div>
    )
}
