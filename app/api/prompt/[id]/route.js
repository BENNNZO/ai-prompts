import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id);

        if (!prompt) return new Response("Could not find prompt", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Could not find prompt", { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    const { prompt, tag } = await req.json()

    try {
        await connectDB();

        const existingPrompt  = await Prompt.findById(params.id);

        if (!prompt) return new Response("Could not find prompt", { status: 404 })

        existingPrompt .tag = tag;
        existingPrompt .prompt = prompt;

        existingPrompt .save();

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Could not update or find prompt", { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted", { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Could not delete prompt", { status: 500 })
    }
}