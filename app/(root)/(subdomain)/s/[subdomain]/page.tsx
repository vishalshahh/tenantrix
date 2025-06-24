import Link from "next/link"
import { db } from "@/db"
import { blogTable } from "@/db/schema"
import { clerkClient } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

interface Params {
    subdomain: string
}

export default async function subdomainPage({ params }: { params: Promise<Params> }) {
    const { subdomain } = await params
    const client = await clerkClient()
    const org = await client.organizations.getOrganization({ slug: subdomain })

    const orgId = org.id
    const blogs = await db
        .select()
        .from(blogTable)
        .where(eq(blogTable.orgId, orgId))

    return (
        <div className="p-10 max-w-3xl mx-auto space-y-6">
            {/* Page Heading */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Blogs for <span className="text-blue-600">{subdomain}</span>
                </h1>
                <a
                    href="http://localhost:3000"
                    className="inline-block bg-gray-800 text-white px-5 py-2 rounded-xl shadow hover:bg-gray-700 transition"
                >
                    ← Go to Home
                </a>
            </div>

            {/* Blog Cards */}
            {blogs.map((blog) => (
                <div
                    key={blog.id}
                    className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all hover:shadow-lg"
                >
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {blog.title}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {blog.body}
                    </p>
                </div>
            ))}
        </div>
    )
}