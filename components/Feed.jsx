"use client"

import React, { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

export default function Feed() {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            console.log(await res.json())
            // const data = await res.json()

            // setPosts(data)
        }

        fetchPosts()
    }, [])

    function handleSearchChange(e) {

    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                    type="text"
                    placeholder='Search for a tag or username...'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>
            <div className='mt-16 prompt_layout'>
                {posts.map(e => (
                    <PromptCard
                        key={e._id}
                        post={e}
                        handleTagClick={() => {}}
                    />
                ))}
            </div>
        </section>
    )
}