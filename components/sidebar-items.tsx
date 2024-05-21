'use client'

import {AnimatePresence, motion} from 'framer-motion'
import {SidebarItem} from '@/components/sidebar-item'
import {ChatTopic} from "@prisma/client/edge";


interface SidebarItemsProps {
    topics?: ChatTopic[]
}

export function SidebarItems({topics}: SidebarItemsProps) {
    if (!topics?.length) return null

    return (
        <AnimatePresence>
            {topics.map(
                (topic, index) =>
                    topic && (
                        <motion.div
                            key={topic?.id}
                            exit={{
                                opacity: 0,
                                height: 0
                            }}
                        >
                            <SidebarItem index={index} topic={topic}>
                                <></>
                            </SidebarItem>
                        </motion.div>
                    )
            )}
        </AnimatePresence>
    )
}
