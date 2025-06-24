'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import * as React from 'react'
import { createBlog, getTopBlogsByOrg } from './org/[slug]/actions'
import { useOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface Blog {
  id: string
  title: string
  body: string

}

export default function OrgLandingPage() {
  const [blogContent, setBlogContent] = React.useState('')
  const [blogTitle, setBlogTitle] = React.useState('')
  const [blogs, setBlogs] = React.useState<Blog[]>([])

  const selectedOrg = useOrganization()
  const router = useRouter()

  const handleCreateBlog = async () => {
    if (!selectedOrg.isLoaded || !selectedOrg.organization) return
  
    const { id, slug } = selectedOrg.organization
  
    await createBlog({
      body: blogContent.trim(),
      orgId: id,
      title: blogTitle,
    })
  
    if (!slug) return
  
    const currentHost = window.location.host
    const isLocalhost = currentHost.includes("localhost")
  
    if (isLocalhost) {
      // dev environment: subdomain.localhost:3000
      window.location.href = `http://${slug}.localhost:3000`
    } else {
      // prod: subdomain.yourdomain.com
      const domainParts = currentHost.split(".")
      const baseDomain = domainParts.slice(-2).join(".") // example.com
      window.location.href = `https://${slug}.${baseDomain}`
    }
  }
  

  // fetch top 5 blogs
  React.useEffect(() => {
    const fetchBlogs = async () => {
      if (!selectedOrg.organization?.id) return
      const data = await getTopBlogsByOrg(selectedOrg.organization.id)
      setBlogs(data)
    }

    fetchBlogs()
  }, [selectedOrg.organization?.id])

  return (
    <main>
      <Navbar />
      <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted min-h-screen">
        <div className="w-full max-w-2xl space-y-10">
          {/* Blog Form */}
          <div className="space-y-6 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Create a New Blog
            </h1>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Blog Title
              </label>
              <Input
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
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
                onChange={(e) => setBlogContent(e.target.value)}
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

          {/* Top 5 Blogs */}
          {blogs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Blogs</h2>
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-4 bg-white dark:bg-zinc-800 rounded-xl border dark:border-zinc-700 shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300 line-clamp-3">
                    {blog.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
