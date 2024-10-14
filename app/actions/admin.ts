'use server'
import {auth} from "@/auth";
import {User} from "@prisma/client/edge";

export async function writeLinkedInPosts(topic: string) {

    const session = await auth()

    if (!session?.user) {
        return {
            error: "User not found"
        }
    }

    const user = session.user as User

    if (user.role !== "admin") {
        return {
            error: "User not found"
        }
    }

    const getPostsResponse = await fetch(`${process.env.API_URL as string}linkedin/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${process.env.API_KEY}`
        },
        body: JSON.stringify({
            topic,
        })
    })

    const parsed = await getPostsResponse.json()
    console.log(parsed)
    return parsed.posts
}