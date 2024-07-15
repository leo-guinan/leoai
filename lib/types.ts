
export interface Content {
    type: string
    metadata: {
        videoId: string
        title: string
        description: string
    }

}

export interface Message {
    content: string
    role: string
    id: string
    type: string
    contentUrls?: Content[]
}
