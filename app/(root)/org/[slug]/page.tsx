'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import * as React from 'react'
import { createBlog } from './actions'
import { useOrganization } from '@clerk/nextjs'

export default function OrgLandingPage() {
    const [blogContent, setBlogContent] = React.useState('')
    const [blogTitle, setBlogTitle] = React.useState('')

    const selectedOrg = useOrganization()

    const handleCreateBlog = async () => {
        if (!selectedOrg.organization?.id) return
        await createBlog({
            body: blogContent.trim(),
            orgId: selectedOrg.organization?.id,
            title: blogTitle
        })
    }

    return (
        <main className="min-h-screen bg-muted">
            <Navbar />
            <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-md space-y-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Create a Blog Post
                    </h1>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Blog Title
                        </label>
                        <Input
                            value={blogTitle}
                            onChange={e => setBlogTitle(e.target.value)}
                            placeholder="Write your title here..."
                            className="text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Blog Content
                        </label>
                        <Textarea
                            value={blogContent}
                            onChange={e => setBlogContent(e.target.value)}
                            placeholder="Write your blog here..."
                            rows={10}
                            className="text-base"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleCreateBlog} className="px-6 py-2 text-base">
                            Create Blog
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
