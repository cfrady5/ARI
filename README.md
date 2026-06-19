# ARI — Applied Research Institute Website

A premium, dark-mode, component-based rebuild of the Applied Research Institute
(ARI) website. Built to feel like a defense-innovation command center:
institutional, mission-focused, fast, and easy to maintain.

> ARI catalyzes opportunities that enhance national security and drive economic
> prosperity.

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` tokens) + a small set of brand
  component classes
- Dynamic OpenGraph/Twitter images via `next/og` (no static asset required)
- Zero runtime UI dependencies — icons are inline SVG

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project Structure

```
src/
├── app/                     # Routes (App Router)
│   ├── layout.tsx           # Root layout: fonts, metadata, header, footer
│   ├── globals.css          # Design system: tokens + component classes
│   ├── page.tsx             # Home
│   ├── about/               # About
│   ├── initiatives/         # Initiatives + [slug] detail
│   ├── markets-capabilities/
│   ├── impact/
│   ├── press-insights/      # Press hub + [slug] article template
│   ├── events/
│   ├── contact/
│   ├── privacy / terms / accessibility/   # Legal (templates)
│   ├── api/og/              # Dynamic social image route
│   ├── sitemap.ts / robots.ts / icon.svg / not-found.tsx
├── components/
│   ├── layout/              # SiteHeader, SiteFooter, PageHero, CTASection, …
│   ├── content/             # Cards, Timeline, NewsletterSignup, …
│   ├── interactive/         # FilterBar, forms, Accordion (client components)
│   ├── ui/                  # Button
│   └── visual/              # Icon set, IconBadge, decorative patterns
├── data/                    # Structured content (single source of truth)
│   ├── site.ts navigation.ts metrics.ts initiatives.ts capabilities.ts
│   ├── leadership.ts articles.ts events.ts approach.ts impact.ts
└── lib/                     # seo.ts, format.ts, ogImage.tsx
```

## Design System

All brand tokens live in `src/app/globals.css` under `@theme` (colors, radii,
font) plus plain CSS variables (shadows, borders). Reusable patterns —
`.card`, `.btn-primary`, `.eyebrow`, `.stat-figure`, `.field-input`,
`.filter-pill`, etc. — are defined once and used everywhere.

- **Canvas:** Site Black `#030605` with subtle navy/green radial gradients
- **Surfaces:** ARI Navy `#1F3655` gradients for cards and panels
- **Accent:** ARI Green `#3BAE48 → #007941` for CTAs, stats, icons, focus
- **Type:** Plus Jakarta Sans (via `next/font`)

## Content

Content is centralized in `src/data/*.ts`. Update those files to change copy,
metrics, initiatives, capabilities, leadership, articles, and events without
touching components.

> **Note:** Articles, events, and leadership bios are representative sample
> content for the rebuild and are intended to be replaced with finalized
> material. Legal pages are templates to be reviewed by ARI's counsel.

## Accessibility

Semantic HTML, a single `<h1>` per page, skip link, keyboard-operable
navigation and mobile menu, visible focus states, real form `<label>`s, native
`<details>` accordions, descriptive link text, and `prefers-reduced-motion`
support.

## SEO

Per-page titles, descriptions, and canonical URLs; OpenGraph/Twitter cards with
a dynamic branded image; `sitemap.xml` and `robots.txt`.
