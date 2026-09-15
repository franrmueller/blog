// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://franrmueller.dev',
  integrations: [mdx(), sitemap()],
  build: {
    // The stylesheet is small; inlining it removes a render-blocking request.
    inlineStylesheets: 'always',
  },
  markdown: {
    // Plain monospace code blocks. No highlighter colours outside the palette.
    syntaxHighlight: false,
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Instrument Serif',
      cssVariable: '--font-serif',
      display: 'swap',
      fallbacks: ['Times New Roman', 'serif'],
      options: {
        variants: [
          {
            src: ['./src/fonts/instrument-serif-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/fonts/instrument-serif-latin-400-italic.woff2'],
            weight: 400,
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Newsreader',
      cssVariable: '--font-body',
      display: 'swap',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['./src/fonts/newsreader-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/fonts/newsreader-latin-400-italic.woff2'],
            weight: 400,
            style: 'italic',
          },
          {
            src: ['./src/fonts/newsreader-latin-700-normal.woff2'],
            weight: 700,
            style: 'normal',
          },
          {
            src: ['./src/fonts/newsreader-latin-700-italic.woff2'],
            weight: 700,
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-sans',
      display: 'swap',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          // Inter only sets the small chrome (nav, dates, footer), so one static cut is enough.
          {
            src: ['./src/fonts/inter-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
  ],
});
