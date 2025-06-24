# 🏢 Tenantrix — Multi-Tenant Blog Platform

Tenantrix is a scalable multi-tenant blog application built with **Next.js**, **Clerk authentication**, and **PostgreSQL** (via Docker). It allows users to create and manage multiple blogs under different organizations — even on **custom domains**.

---

## ✨ Key Features

- 🔐 **Multi-Org Support**: Users can create and manage multiple organizations, each with its own blogs.
- ✍️ **Blog Creation**: Write, update, and publish blog posts scoped to an organization.
- 🌐 **Custom Domains**: Map custom domains to specific organizations/blogs for a personalized blogging experience.
- ⚙️ **Secure Auth**: Clerk handles secure user management with organization context.
- 🐳 **PostgreSQL + Docker**: All data is stored in a robust PostgreSQL database powered by Docker.

---

## 🧠 Tech Stack

| Category      | Tools Used                               |
|---------------|------------------------------------------|
| Frontend      | Next.js 14, TypeScript, Tailwind CSS     |
| Auth          | Clerk (multi-tenant organizations)       |
| Database      | PostgreSQL (Dockerized)                  |
| ORM           | Drizzle                                  |
| Hosting       | Vercel (recommended)                     |
| DNS           | Vercel / Custom Domain Mapping           |

---

## 📸 Screenshots

> Here’s what Tenantrix looks like in action:

### 🖼️ Blog Dashboard View

![Blog Dashboard](./public/250624_08h47m20s_screenshot.png)

### 🌐 Created Blogs Preview

![Created Blogs](./public/250624_08h46m49s_screenshot.png)

### 🌐 Drizzle Database Preview

![Drizzle Database](./public/250624_08h48m56s_screenshot.png)

---

## 🚀 Getting Started

### 🛠️ Prerequisites

- Node.js 18+
- Docker
- Clerk Account
- Vercel (or any preferred host)

### 🔧 Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/tenantrix.git
cd tenantrix
bun install
docker-compose up -d
```

2. **Configure environment variables:**

Create a .env.local file and add the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tenantrix
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_FRONTEND_API=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

3. **Run migrations**:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Start the app**:

```bash
bun dev
Visit http://localhost:3000 to view the app.
```

### 🔗 Custom Domain Mapping

- Tenantrix supports custom domains for each organization’s blog. You can:
- Configure DNS settings to point to the app.
- Use dynamic routing in Next.js to handle subdomains and root domains.
- Clerk will automatically handle auth per domain/org.

### 📂 Project Structure
```bash
app/
 └── (root)/
      ├── layout.tsx
      ├── page.tsx
 └── (subdomain)/s/[subdomain]/
      ├── page.tsx        # Renders organization-specific blogs
```

📜 License
This project is open-source and available under the MIT License.

🙌 Learn by Piyush Garg❣️
