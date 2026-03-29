<h1 align=center>Power AI - Astro Theme</h1>

<p align=center>A modern, dark-themed AI/SaaS website template built with Astro, TailwindCSS & TypeScript. Converted from the Power AI Next.js theme to take advantage of Astro's superior static site performance.</p>

<p align=center>Made with ♥ by <a href="https://sitepins.com/">Sitepins</a></p>

<p align=center> If you find this project useful, please give it a ⭐ to show your support.</p>

<p align=center>
  <a href="https://github.com/withastro/astro/releases/tag/astro%406.0.4">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=6.0.4&color=000&logo=astro" alt="Astro Version 6.0.4"/>
  </a>
  <a href="https://github.com/sitepins/powerai-astro/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/sitepins/powerai-astro" alt="license">
  </a>
  <img src="https://img.shields.io/github/languages/code-size/sitepins/powerai-astro" alt="code size">
</p>

## 📌 Key Features

- ⚡ **Blazing Fast** — Static site generation with Astro for optimal performance
- 🌑 **Dark Mode** — Sleek, modern dark theme design
- 🎨 **Tailwind CSS v4** — Utility-first styling with latest Tailwind
- ✨ **Smooth Animations** — Motion/Framer Motion powered scroll reveals and transitions
- 📱 **Fully Responsive** — Mobile-first design that looks great on all devices
- 📝 **Markdown Content** — Write and update content in Markdown/MDX
- 🔍 **SEO Optimized** — Built-in SEO meta tags and sitemap generation
- 🏷️ **Categories & Tags** — Organized blog content
- 📎 **Google Tag Manager** — Analytics ready
- 🧩 **React Islands** — Interactive components with Astro's island architecture
- 🎯 **TypeScript** — Full type safety throughout

### 📄 14 Pre-built Pages

- 🏠 **Homepage** — Hero, trusted clients, key features, statistics, pricing, testimonials, FAQ, CTA
- 📖 **About** — Company story, team, gallery, goals
- ✨ **Features** — Essential features & why choose us sections
- 💰 **Pricing** — Monthly/Yearly Pricing Details
- 📞 **Contact** — Contact form with company details
- 📝 **Blog** — Blog listing with pagination + 6 blog posts
- 📋 **Changelog** — Version history timeline
- 📊 **Case Studies** — Case study listing with pagination + 4 case studies
- 💼 **Careers** — Job listings + 8 individual career pages
- 📋 **Changelog** — Version history timeline
- 🔗 **Integrations** — Integration showcase + 15 individual integration pages
- 📄 **Regular Pages** — Elements, Privacy Policy, Terms of Service
- 🚫 **404** — Custom not found page

## 🔗 Integrations

- astro/react
- astro/sitemap
- astro/tailwind
- Cloudflare Workers (optional deployment)

## 🚀 Getting Started

### 📦 Dependencies

- astro v5.15+
- node v22.0+
- yarn v1.22+
- tailwind v4+

### 👉 Install Dependencies

```bash
yarn install
```

### 👉 Development Command

```bash
yarn run dev
```

### 👉 Build Command

```bash
yarn run build
```

## 🚀 Deployment

This project supports multiple deployment options. Choose the one that best fits your needs.

### ☁️ Cloudflare Workers/Pages

Deploy to Cloudflare's global network for optimal performance and low latency.

#### Prerequisites

- [Cloudflare Account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

#### Deploy to Cloudflare Workers

```bash
# Install Wrangler CLI (if not already installed)
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Deploy to production
yarn deploy:cf-workers
```

#### Preview Locally with Cloudflare

```bash
yarn preview:cf-workers
```

This will start a local development server that mimics the Cloudflare Workers environment.

### 🌐 Netlify

Deploy to Netlify for easy CI/CD and global CDN.

#### Automatic Deployment

1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Set the build command: `yarn build`
3. Set the publish directory: `dist`
4. Deploy!

````

### 🐳 Docker

Deploy using Docker containers for consistent environments.

#### Build and Run With Docker

```bash
docker build -t powerai-astro .
# or
# docker build --build-arg INSTALLER=npm -t powerai-astro .
# or
# docker build --build-arg INSTALLER=pnpm -t powerai-astro .

docker run -p 3000:80 powerai-astro
# or
# docker run --rm -p 3000:80 powerai-astro
````

To access the shell within the container:

```bash
docker run -it --rm powerai-astro ash
```

<!-- edit with sitepins -->

## 📝 Edit Content with CMS

This template comes pre-configured with [**Sitepins**](https://sitepins.com), a Git-based Headless CMS designed for seamless content management. You can update your website’s text, images, and configuration without touching a single line of code.

**How to get started:**

Click the Edit with Sitepins button below and follow the on-screen instructions to start editing your content visually.

  <a target="_blank" href="https://app.sitepins.com/new/clone?name=PoweraiAstro&repository=https://github.com/sitepins/powerai-astro/">
    <img src="https://sitepins.com/button.svg" alt="Edit with Sitepins">
  </a>

## 📁 Project Structure

```
powerai-astro/
├── public/                  # Static assets (images, icons, fonts)
│   └── images/
├── scripts/                 # Build scripts
│   ├── themeGenerator.js    # Generates CSS from theme.json
│   └── jsonGenerator.js     # Generates JSON search index
├── src/
│   ├── config/              # Site configuration
│   │   ├── config.json      # Site settings, metadata, GTM
│   │   ├── menu.json        # Navigation menu structure
│   │   ├── social.json      # Social media links
│   │   └── theme.json       # Colors, fonts, sizing
│   ├── content/             # Markdown content (Astro Content Collections)
│   │   ├── homepage/        # Homepage content
│   │   ├── blog/            # Blog posts
│   │   ├── case-studies/    # Case study entries
│   │   ├── careers/         # Job listings
│   │   ├── integrations/    # Integration pages
│   │   ├── sections/        # Reusable section content (CTA, FAQ, etc.)
│   │   └── pages/           # Regular pages (privacy, terms)
│   ├── layouts/
│   │   ├── Base.astro       # Main HTML layout
│   │   ├── components/      # UI components (.astro + .tsx)
│   │   │   ├── animations/  # Motion animation wrappers
│   │   │   └── shape/       # SVG decorative shapes
│   │   ├── helpers/         # Helper components (DynamicIcon, etc.)
│   │   ├── partials/        # Page sections (Header, Footer, etc.)
│   │   └── shortcodes/      # MDX shortcodes (Accordion, Tabs, etc.)
│   ├── lib/                 # Utility libraries
│   │   ├── animations.ts    # Animation variant definitions
│   │   ├── contentParser.ts # Content loading utilities
│   │   └── utils/           # Helper functions
│   ├── pages/               # Astro file-based routing
│   ├── styles/              # CSS files
│   │   ├── main.css         # Main entry point
│   │   ├── base.css         # Base/reset styles
│   │   ├── buttons.css      # Button styles
│   │   ├── components.css   # Component styles
│   │   ├── navigation.css   # Nav/header styles
│   │   └── utilities.css    # Utility classes
│   ├── types/               # TypeScript type definitions
│   └── content.config.ts    # Astro content collection config
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## ⚙️ Configuration

### Site Settings (`src/config/config.json`)

```json
{
  "site": {
    "title": "Power AI",
    "base_url": "https://your-domain.com",
    "favicon": "/images/favicon.png"
  },
  "settings": {
    "pagination": 3,
    "sticky_header": true
  }
}
```

### Theme Customization (`src/config/theme.json`)

Customize colors, fonts, and sizing:

```json
{
  "colors": {
    "default": {
      "theme_color": {
        "primary": "#8F2FFE",
        "secondary": "#DF53FE",
        "body": "#0E0912",
        "card": "#151019"
      }
    }
  },
  "fonts": {
    "font_family": {
      "primary": "Inter:wght@300;400;500;600"
    }
  }
}
```

### Navigation (`src/config/menu.json`)

Supports regular links, dropdowns, and mega menus:

```json
{
  "main": [
    { "name": "Home", "url": "/" },
    { "name": "Features", "url": "/features" },
    {
      "name": "Pages",
      "hasChildren": true,
      "mega_menu": { ... }
    }
  ]
}
```

## 📝 Adding Content

### Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Post description"
image: "/images/blog/your-image.png"
category: "Technology"
author:
  name: "Author Name"
  avatar: "/images/avatars/avatar.jpg"
date: 2026-01-01
draft: false
featured: false
---

Your markdown content here...
```

### Case Studies

Create a new `.md` file in `src/content/case-studies/`:

```markdown
---
title: "Case Study Title"
description: "Brief description"
image: "/images/case-studies/image.png"
logo: "/images/case-studies/logo.png"
date: 2026-01-01
featured: false
---

Case study content...
```

### Career Listings

Create a new `.md` file in `src/content/careers/`:

```markdown
---
title: "Job Title"
description: "Role description"
job_info:
  employ_type: "Full-time"
  experience: "3+ years"
  salary_range: "$80k - $120k"
  location: "Remote"
  department: "Engineering"
  deadline: "2026-12-31"
---

Job details...
```

## 🐞 Reporting Issues

Found a bug? Please [open an issue](https://github.com/sitepins/powerai-astro/issues).

## 📝 License

Copyright (c) 2026 - Present, Designed by [Sitepins](https://sitepins.com/)

**Code License:** Released under the [MIT](https://github.com/sitepins/powerai-astro/blob/main/LICENSE) license.
