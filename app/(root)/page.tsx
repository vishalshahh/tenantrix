'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import * as React from 'react'
import { createBlog } from './org/[slug]/actions'
import { useOrganization } from '@clerk/nextjs'


export default function OrgLandingPage() {
    const [blogContent, setBlogContent] = React.useState('')
    const [blogTitle, setBlogTitle] = React.useState('')

    const selectedOrg = useOrganization()
    console.log(selectedOrg)

    const handleCreateBlog = async () => {
        if (!selectedOrg.organization?.id) return
        await createBlog({
            body: blogContent.trim(),
            orgId: selectedOrg.organization?.id,
            title: blogTitle
        })
    }

    return (
        <main>
            <Navbar />
            <div className='p-10'>
                <Input value={blogTitle} onChange={e => setBlogTitle(e.target.value)} placeholder="Write your Title here..." />
                <Textarea value={blogContent} onChange={e => setBlogContent(e.target.value)} placeholder="Write your blog here..." />
                <Button onClick={handleCreateBlog} className='mt-2'>Create Blog</Button>
            </div>
        </main>
    );
}
