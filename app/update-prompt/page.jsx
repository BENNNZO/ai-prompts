"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

export default function page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({ prompt: '', tag: '' })

    useEffect(() => {
        async function getPromptDetails() {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId])

    async function editPrompt(e) {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) return alert('Prompt Id not found')

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (res.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}