# Joshua Manigault — Portfolio

A modern, data-driven developer portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod
- **Content**: MDX support via next-mdx-remote

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # /about page
│   ├── api/contact/        # POST /api/contact endpoint
│   ├── contact/            # /contact page
│   ├── projects/           # /projects and /projects/[slug] pages
│   ├── globals.css         # Global styles & Tailwind theme
│   ├── layout.tsx          # Root layout (nav, footer, metadata)
│   ├── not-found.tsx       # 404 page
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
│   ├── ui/                 # Primitive UI components (Button, etc.)
│   ├── contact-form.tsx    # Contact form with validation
│   ├── footer.tsx          # Site footer
│   ├── hero-section.tsx    # Homepage hero with animations
│   ├── mdx-content.tsx     # MDX renderer for case studies
│   ├── navbar.tsx          # Responsive navigation
│   ├── project-card.tsx    # Project card component
│   ├── project-grid.tsx    # Grid layout for project cards
│   ├── section.tsx         # Reusable section wrapper
│   ├── tech-badge.tsx      # Tech stack badge
│   ├── theme-provider.tsx  # Dark/light theme context
│   └── theme-toggle.tsx    # Theme toggle button
├── content/
│   └── projects/           # MDX case study files
├── data/
│   ├── projects.ts         # Project data + query helpers
│   ├── site.ts             # Site config, education, experience, certifications
│   └── types.ts            # TypeScript type definitions
└── lib/
    ├── github.ts           # GitHub API integration (build-time)
    ├── mdx.ts              # MDX file loader
    ├── utils.ts            # Utility functions (cn, formatDate, slugify)
    └── validators.ts       # Zod validation schemas
```

## Adding a New Project

1. **Add the project data** in `src/data/projects.ts`:

```ts
{
  title: "My New Project",
  slug: "my-new-project",
  description: "Short description for cards.",
  longDescription: "Detailed description for the project page.",
  techStack: ["React", "Node.js", "PostgreSQL"],
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://myproject.com",
  images: ["/images/projects/my-new-project.jpg"],
  featured: true,         // Show on homepage
  category: "fullstack",  // web | mobile | backend | fullstack | other
  status: "completed",    // completed | in-progress | planned
  dates: {
    started: "2024-06",
    completed: "2024-09",
  },
}
```

2. **(Optional) Add a case study** by creating `src/content/projects/my-new-project.mdx`:

```mdx
---
title: My New Project
---

## Overview

Write your detailed case study here using MDX...
```

3. The project will automatically appear on the `/projects` page, and a detail page at `/projects/my-new-project` will be statically generated.

## Features

- **Data-driven**: All projects, experience, and config live in structured TypeScript files
- **Static generation**: Project detail pages are statically generated at build time
- **GitHub integration**: Stars and last-updated metadata fetched at build time
- **Dark mode**: System-aware with manual toggle
- **Filtering & search**: Client-side project filtering by category, tech stack, and text search with URL query params
- **Contact form**: Validated with Zod, submitted to API route with loading/success/error states
- **MDX case studies**: Rich project writeups without editing page code
- **Responsive**: Mobile-first design with responsive navigation
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO**: Per-page metadata, OpenGraph tags, structured data

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js — no configuration needed
4. (Optional) Add `GITHUB_TOKEN` environment variable for higher API rate limits

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | GitHub personal access token for repo metadata fetching (increases rate limit) |

## License

MIT
