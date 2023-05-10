"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

export default function page() {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const user = searchParams.get('user')
    const router = useRouter()

    const [posts, setPosts] = useState([])
    const [userData, setuserData] = useState()

    useEffect(() => {
        async function fetchData() {
            const postRes = await fetch(`/api/users/${user}/posts`)
            const postDat = await postRes.json()
            const userRes = await fetch(`/api/users/${user}`)
            const userDat = await userRes.json()

            setPosts(postDat)
            setuserData(userDat)
            console.log(userDat)
        }

        if (user) fetchData()
    }, [user])

    function handleEdit(post) {
        router.push(`/update-prompt?id=${post._id}`)
    }

    async function handleDelete(post) {
        const hasConfirm = confirm('Are you sure you want to delete this post?')

        if (hasConfirm) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter(p => p._id !== post._id)

                setPosts(filteredPosts)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Profile 
            name={user === session?.user.id ? "My" : userData?.username}
            desc="Welcome to your profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}