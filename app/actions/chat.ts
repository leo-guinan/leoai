'use server'

import {MongoClient} from "mongodb";
import {auth} from "@/auth";
import {nanoid, prisma} from "@/lib/utils";
import {BufferMemory} from "langchain/memory";
import {MongoDBChatMessageHistory} from "@langchain/mongodb";


export async function getChat(uuid: string) {

    const chatTopic = await prisma.chatTopic.findUnique({
        where: {
            uuid
        }
    })

    if (!chatTopic) {
        return {
            error: "Chat not found"
        }
    }


    const client = new MongoClient(process.env.MONGO_URL || "");
    await client.connect();
    const collection = client.db("submind-ui").collection("submind-memory");
    const session = await auth()
    if (!session?.user) {
        return {
            error: "User not found"
        }
    }


    const memory = new BufferMemory({
        chatHistory: new MongoDBChatMessageHistory({
            collection,
            sessionId: `chat_${chatTopic?.id}`,
        }),
    });

    const messages = await memory.chatHistory.getMessages();
    return {
        id: chatTopic.id,
        title: "Chat",
        userId: session.user.id,
        messages: messages.map((message) => {
            return {
                id: nanoid(),
                content: message.content.toString(),
                role: message._getType() === "human" ? "user" : "assistant"
            }
        })
    }
}

export async function sendChatMessage(uuid: string, message: { content: string, role: "user" | "assistant" }) {
    const session = await auth()

    if (!session?.user) {
        return {
            error: "User not found"
        }
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
    })


    if (!user) {
        return {
            error: "User not found"
        }
    }

    const submindToChatWith = process.env.SUBMIND_ID as string


    const sendMessageResponse = await fetch(`${process.env.API_URL as string}/submind/${submindToChatWith}/send/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${process.env.PRELO_API_KEY}`
        },
        body: JSON.stringify({
            uuid,
            message: message.content,
        })
    })

    const parsed = await sendMessageResponse.json()

    return parsed.message

}

export async function clearPreviousTopic() {
    const session = await auth()

    if (!session?.user) {
        return {
            error: "User not found"
        }
    }

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            currentTopicId: null
        }
    })

    return {
        success: true
    }
}

export async function startChat(topic: string) {
    const session = await auth()

    if (!session?.user) {
        return {
            error: "User not found"
        }
    }

    const chatTopic = await prisma.chatTopic.create({
        data: {
            name: topic,
            userId: session.user.id,
            uuid: nanoid()
        }
    })

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            currentTopicUUID: chatTopic.uuid
        }
    })

    return {
        uuid: chatTopic.uuid
    }
}