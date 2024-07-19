'use server'

import {MongoClient} from "mongodb";
import {nanoid, prisma} from "@/lib/utils";
import {BufferMemory} from "langchain/memory";
import {MongoDBChatMessageHistory} from "@langchain/mongodb";
import {auth} from "@/auth";


export async function getChat(uuid: string) {

    const session = await auth()

    if (!session?.user) {
        return {
            error: "User not found"
        }
    }

    const chatSession = await prisma.chatSession.findUnique({
        where: {
            uuid,
            userId: session.user.id
        }
    })

    if (!chatSession) {
        await prisma.chatSession.create({
            data: {
                uuid,
                userId: session.user.id
            }
        })
    }



    const client = new MongoClient(process.env.MONGO_URL || "");
    await client.connect();
    const collection = client.db("leoai").collection("leoai-memory");

    const memory = new BufferMemory({
        chatHistory: new MongoDBChatMessageHistory({
            collection,
            sessionId: `${uuid}_chat`,
        }),
    });


    const messages = await memory.chatHistory.getMessages();
    return {
        id: uuid,
        title: "Chat",
        messages: messages.map((message) => {
            return {
                id: nanoid(),
                content: message.content.toString(),
                role: message._getType() === "human" ? "user" : "assistant",
                type: "text"
            }
        }),
    }
}

export async function sendChatMessage(uuid: string, message: { content: string, role: "user" | "assistant" }) {

    const sendMessageResponse = await fetch(`${process.env.API_URL as string}chat/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${process.env.API_KEY}`
        },
        body: JSON.stringify({
            uuid,
            message: message.content,
        })
    })

    const parsed = await sendMessageResponse.json()
    console.log(parsed.content)
    return {
        message: parsed.message,
        content: parsed.content,
    }

}

