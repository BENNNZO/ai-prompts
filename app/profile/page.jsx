"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

export default function page() {
    const { data: session } = useSession()
    const router = useRouter();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()

            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [session?.user.id])

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
            name="My"
            desc="Welcome to your profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}