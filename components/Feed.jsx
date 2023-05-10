"use client"

import React, { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

export default function Feed() {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()

            setPosts(data)
        }

        fetchPosts()
    }, [])

    useEffect(() => {
        async function fetchSearchPosts() {
            if (searchText === '') {
                const res = await fetch('/api/prompt')
                const data = await res.json()
    
                setPosts(data)
            } else {
                const res = await fetch(`/api/prompt/search/${searchText.replace("#", "%23")}`)
                const data = await res.json()
        
                setPosts(data)
            }
        }
        fetchSearchPosts()
    }, [searchText])

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
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                    type="text"
                    placeholder='Search for a tag or prompt...'
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    required
                    className='search_input peer'
                />
            </form>
            <div className='mt-16 prompt_layout'>
                {posts.map(e => (
                    <PromptCard
                        key={e._id}
                        post={e}
                        handleTagClick={() => setSearchText(e.tag)}
                        handleEdit={() => handleEdit && handleEdit(e)}
                        handleDelete={() => handleDelete && handleDelete(e)}
                    />
                ))}
            </div>
        </section>
    )
}