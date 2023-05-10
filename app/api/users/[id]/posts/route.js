import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"

export async function GET(req, { params }) {
    try {
        await connectDB()

        const prompts = await Prompt.find({ creator: params.id }).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("failed to get prompts", { status: 500 })
    }
}