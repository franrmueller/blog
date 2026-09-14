# Blog build brief

Personal blog for Francisco Rodriguez Müller (Fran). Read this fully before touching the repo.

## Intent

The most minimal, calm blog possible. It should feel like an extension of the reader's mind: a cover image, a title, the text. Nothing competes for attention. When in doubt, remove.

Visual reference: Perplexity's wallpaper art — dark expanses, a single small figure, thin luminous rings, a dusty coral accent. The covers carry the atmosphere; the page must get out of their way.

## Stack

- Astro (latest), static output
- Two content collections: `work` and `mind`
- Markdown posts, no MDX unless needed later
- Zero client-side JavaScript. No frameworks, no islands.
- Deployed to Cloudflare Pages from the `main` branch
- RSS feed for each section (`/work/rss.xml`, `/mind/rss.xml`) via `@astrojs/rss`
- Sitemap via `@astrojs/sitemap`

## Site map

```
/            Home: name, two-item nav, list of latest posts from both sections
/work        Posts on SAP, AI, cloud, enterprise technology
/mind        Posts on philosophy, neuroscience, psychology, consciousness, physics, religion
/work/[slug] Single post
/mind/[slug] Single post
/about       Two or three sentences + LinkedIn link (https://www.linkedin.com/in/franrmueller)
```

Nav is exactly: `Work` · `Mind` · `About`. Site name links home.

## Post schema

```ts
{
  title: string,
  date: Date,
  cover: string,        // path under /public/covers/
  description?: string, // for <meta>, optional
  draft?: boolean
}
```

Covers live in `/public/covers/`. Fran supplies them. Serve as WebP, wide aspect (roughly 3:1 on post pages, cropped from the source).

## Layout

Home and section lists: each post is a wide cover thumbnail, the title beneath it, the date in small muted text. Single column, no grid, no cards, no borders. Latest first.

Post page, top to bottom:
1. Cover, full-bleed edge to edge, roughly 3:1 on desktop, taller crop on mobile
2. Title, large serif, left-aligned within the reading column
3. Date, small and muted
4. Body text
5. At the very end, a single line: link back to the section

Nothing else on a post page. No sidebar, tags, reading time, share buttons, comments, related posts, author box, newsletter form.

## Typography

- Headings and post titles: a serif with narrow, elegant letterforms (Instrument Serif or Newsreader). Titles large — around 2.5–3rem on desktop.
- Body: a clean humanist sans (Inter or Geist). 1.1rem, line-height 1.7.
- Reading column max-width 65ch, centred.
- Self-host the fonts. No Google Fonts requests at runtime.

## Colour

Dark by default; honour `prefers-color-scheme: light` with a paper-toned light theme.

Dark:
- Background `#0b0f14` (near-black blue, so covers blend into the page)
- Text `#d6d9de`
- Muted `#6f7680`
- Accent `#e07a6a` (dusty coral, from the rings in the reference art). Use only for link hover and the active nav item.

Light:
- Background `#f5f2ec`
- Text `#1c1e22`
- Muted `#7b7f86`
- Accent same coral.

No pure white, no pure black, no borders, no drop shadows.

## Motion

Only two things move:
- Page transitions via Astro view transitions, with the cover morphing from the list thumbnail to the full-bleed post header.
- Link hover colour fade, 150ms.

Nothing else animates. Respect `prefers-reduced-motion`.

## Not included

No analytics, cookie banners, comments, search, tags, categories beyond the two sections, dark-mode toggle (system preference only), social icons, or footer beyond a single muted line with the name and the RSS links.

## Content to seed

- One placeholder post in each collection so the layouts can be reviewed, clearly marked as placeholder text. Fran replaces these.
- About page text: leave a `TODO` for Fran.

## Definition of done

- `npm run build` passes with no warnings
- Lighthouse: performance and accessibility 100 on the post page
- Works with JavaScript disabled
- Looks correct at 375px and 1440px widths
- Deploys to Cloudflare Pages preview URL
