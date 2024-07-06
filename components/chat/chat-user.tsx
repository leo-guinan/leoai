interface ChatUserProps {
}

export default function ChatUser({}: ChatUserProps) {
    function getUserInitials(name?: string) {
        if (!name) return "US"
        const [firstName, lastName] = name.split(' ')
        return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
    }

    return (
        <>
            <div
                className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                US
            </div>

        </>
    )
}