"use client"

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

export default function NavBar () {
    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [dropdownToggle, setDropdownToggle] = useState(false)

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
        setupProviders()
    }, [])

    return (
        <nav className='flex-between w-full py-3 border-b-2'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image 
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>
                    Promptopia
                </p>
            </Link>
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button
                            type='button'
                            onClick={signOut}
                            className='outline_btn'
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image 
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='object-contain rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((e, i) => (
                            <button
                                type='button'
                                key={i}
                                onClick={() => signIn(providers.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image 
                            src={session?.user.image}
                            alt="logo"
                            width={30}
                            height={30}
                            className='object-contain rounded-full'
                            onClick={() => setDropdownToggle(prev => !prev)}
                        />

                        {dropdownToggle && (
                            <div className='dropdown shadow-lg'>
                                <Link 
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setDropdownToggle(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setDropdownToggle(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => {
                                        setDropdownToggle(false)
                                        signOut()
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((e, i) => (
                            <button
                                type='button'
                                key={i}
                                onClick={() => signIn(providers.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}