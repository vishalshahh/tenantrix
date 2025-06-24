'use server'

import { CreateBlogType, blogTable } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

// ✅ Set up Postgres connection properly
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

const db = drizzle(pool)

// ✅ Get top 5 blogs for an org, ordered by newest
export async function getTopBlogsByOrg(orgId: string) {
  return await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.orgId, orgId))
    .orderBy(desc(blogTable.createdAt)) // Requires createdAt in schema
    .limit(5)
}

// ✅ Create a blog and return its ID
export const createBlog = async (payload: CreateBlogType) => {
  const [result] = await db
    .insert(blogTable)
    .values(payload)
    .returning({
      id: blogTable.id,
    })

  return result.id
}
