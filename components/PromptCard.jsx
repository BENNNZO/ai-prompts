"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
    const [copied, setCopied] = useState('')

    const { data: session } = useSession();
    const router = useRouter();

    function handleCopy() {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 1500)
    }

    return (
        <div className='prompt_card shadow-md flex-1'>
            <div className='flex justify-between items-start gap-5 flex-1'>
                <div 
                    className='flex justify-start items-center gap-3 cursor-pointer flex-1'
                    onClick={() => router.push(`/profile?user=${post.creator._id}`)}
                >
                    <Image 
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className='rounded-full object-fit'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter test-sm text-gray-500'>
                            {post.creator.email}  
                        </p>
                    </div>
                </div>

                <div className='copy_btn' onClick={handleCopy}>
                    <Image 
                        src={copied === post.prompt 
                            ? '/assets/icons/tick.svg'
                            : '/assets/icons/copy.svg'
                        }
                        width={18}
                        height={18}
                        alt='copy button'
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <div className='flex flex-row justify-between border-t-2 pt-2'>
                <p 
                    className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => handleTagClick && handleTagClick(post.tag)}
                >
                    {post.tag}
                </p>

                {session?.user.id === post.creator._id && (
                    <div className='flex-center gap-4'>
                        <p 
                            className='font-inter text-sm green_gradient cursor-pointer'
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p 
                            className='font-inter text-sm orange_gradient cursor-pointer'
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}