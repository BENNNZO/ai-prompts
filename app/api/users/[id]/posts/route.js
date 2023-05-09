// import mongoose from "mongoose";
// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"

export async function GET(req, { params }) {
    try {
        await connectDB()

        console.log(params.id)
        console.log('645999f92cc4b6945ebdcbb8')

        const prompts = await Prompt.find({ creator: params.id }).populate('creator')
        console.log('got posts')
        console.log(JSON.stringify(prompts))
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("failed to get prompts", { status: 500 })
    }
}