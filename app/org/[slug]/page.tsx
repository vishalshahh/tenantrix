'use client'

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function OrgLandingPage() {

    const [blogContent, setBlogContent] = React.useState('');
    const [blogTitle, setBlogTitle] = React.useState('');

    return (
        <main>
            <Navbar />
            <div className='p-10'>
                <Input placeholder='Write your blog title here...' value={blogTitle} onChange={e => setBlogTitle(e.target.value)} />
                <Textarea placeholder='Write your blog here...' className='mt-2' value={blogContent} onChange={e => setBlogContent(e.target.value)} />
                <Button className='mt-2'> Create Post</Button>
            </div>
        </main>
    )
}