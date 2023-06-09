import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import { connectDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SK
        })
    ],
    callbacks: {
        async session({ session }){
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
    
            return session
        },
        async signIn({ profile }) {
            try {
                //connect to DB
                await connectDB()
    
                // check if user exists
                const userExists = await User.findOne({ email: profile.email })
    
                // if user doesnt exists is creates one using the google auth response
                if (!userExists) {
                    User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }