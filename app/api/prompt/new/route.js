import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"

export async function GET(req) {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to create new prompt", { status: 500 })
    }
}