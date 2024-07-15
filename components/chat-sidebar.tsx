'use client'
import * as React from 'react'
import {SidebarList} from '@/components/sidebar-list'
import {IconPlus, MagnifyingGlassIcon} from "@/components/ui/icons";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {SyntheticEvent} from "react";

interface ChatHistoryProps {
    userId?: string
}



export function ChatSidebar({userId }: ChatHistoryProps) {

    const router = useRouter();

    const clearExisting = async (e: SyntheticEvent) => {
        e.preventDefault();
        router.push('/')
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-2 my-4">
              <Link
                  onClick={clearExisting}
                href="#"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-10 w-full text-zinc-50 dark:text-gray-900 justify-start bg-standard dark:bg-gray-100 px-4 shadow-none transition-colors hover:bg-gray-100 hover:text-gray-900  dark:hover:bg-standard dark:hover:text-zinc-50'
                )}
              >
                <MagnifyingGlassIcon className="-translate-x-2 stroke-2 size-8" />
                New Chat Topic
              </Link>
            </div>
            <React.Suspense
                fallback={
                    <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
                        {Array.from({length: 10}).map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
                            />
                        ))}
                    </div>
                }
            >
                <SidebarList userId={userId} />
            </React.Suspense>
        </div>
    )
}
