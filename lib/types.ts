
export interface Content {
    type: string
    metadata: Record<string,string>
    source: string

}

export interface Message {
    content: string
    role: string
    id: string
    type: string
    contentUrls?: Content[]
}
