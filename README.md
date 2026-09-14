# Blog

Personal blog of Francisco Rodriguez Müller. Astro, static output, no client-side JavaScript. See [BRIEF.md](BRIEF.md) for the design brief.

## Commands

```sh
npm install      # once
npm run dev      # http://localhost:4321
npm run build    # writes dist/
npm run preview  # serves dist/
```

## Writing a post

Add a Markdown file to `src/content/work/` or `src/content/mind/`. The file name becomes the URL slug.

```md
---
title: "The title"
date: 2026-09-14
cover: my-cover.webp        # a file in public/covers/
description: "Optional, used for the <meta> description."
draft: true                  # optional; drafts show in dev and are left out of builds
---
```

Covers go in `public/covers/` as WebP. Keep them wide (2:1 or wider, around 2400px across) and light (under about 100 KB; heavy grain or noise compresses badly). The page crops them to 3:1 on desktop and 3:2 on phones.

## Deploying to Cloudflare Pages

Connect the GitHub repository, production branch `main`, build command `npm run build`, output directory `dist`. The public URL is `site` in `astro.config.mjs` (https://franrmueller.dev); the sitemap and canonical links are built from it.
