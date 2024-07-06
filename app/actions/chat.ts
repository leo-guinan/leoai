'use server'

import {MongoClient} from "mongodb";
import {nanoid, prisma} from "@/lib/utils";
import {BufferMemory} from "langchain/memory";
import {MongoDBChatMessageHistory} from "@langchain/mongodb";


export async function getChat(uuid: string) {

    const client = new MongoClient(process.env.MONGO_URL || "");
    await client.connect();
    const collection = client.db("submind-ui").collection("submind-memory");
    const collectionClaude = client.db("submind-ui").collection("submind-memory_claude");
    const collectionGPT4o = client.db("submind-ui").collection("submind-memory_gpt4o");
    const memory = new BufferMemory({
        chatHistory: new MongoDBChatMessageHistory({
            collection,
            sessionId: `chat_${uuid}`,
        }),
    });

     const claudeMemory = new BufferMemory({
        chatHistory: new MongoDBChatMessageHistory({
            collection: collectionClaude,
            sessionId: `basic_claude_${uuid}`,
        }),
    });

    const gpt4oMemory = new BufferMemory({
        chatHistory: new MongoDBChatMessageHistory({
            collection: collectionGPT4o,
            sessionId: `basic_gpt4o_${uuid}`,
        }),
    });

    const messages = await memory.chatHistory.getMessages();
    const messagesClaude = await claudeMemory.chatHistory.getMessages();
    const messagesGPT4o = await gpt4oMemory.chatHistory.getMessages();
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
        messagesClaude: messagesClaude.map((message) => {
            return {
                id: nanoid(),
                content: message.content.toString(),
                role: message._getType() === "human" ? "user" : "assistant",
                type: "text"
            }
        }),
        messagesGPT4o: messagesGPT4o.map((message) => {
            return {
                id: nanoid(),
                content: message.content.toString(),
                role: message._getType() === "human" ? "user" : "assistant",
                type: "text"
            }
        })
    }
}

export async function sendChatMessage(uuid: string, message: { content: string, role: "user" | "assistant" }) {
    const submindToChatWith = process.env.SUBMIND_ID as string

    const sendMessageResponse = await fetch(`${process.env.API_URL as string}creator_services/demo_message/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${process.env.PRELO_API_KEY}`
        },
        body: JSON.stringify({
            uuid,
            message: message.content,
            submind_id: submindToChatWith
        })
    })

    const parsed = await sendMessageResponse.json()
    console.log(parsed)
    return {
        message: parsed.custom_message,
        claude: parsed.claude_message,
        gpt: parsed.gpt4o_message
    }

}

