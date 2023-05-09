"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

export default function page() {
    const { data: session } = useSession()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            console.log(data)
            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [session?.user.id])

    function handleEdit() {

    }

    function handleDelete() {

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