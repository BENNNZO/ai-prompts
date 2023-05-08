import mongoose from "mongoose";

let isConnected = false // tracks connection

export async function connectDB() {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is Already Connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err)
    }
}