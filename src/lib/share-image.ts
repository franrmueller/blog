import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori, { type Font } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { decompress } from 'wawoff2';
import { SITE, SECTIONS } from '../site';
import { coverUrl, type Post } from './posts';

/**
 * The link-preview image for a post: the cover, cropped to the 1.91:1 card
 * that LinkedIn and friends show, with the title set in the site's serif so
 * the card in a feed looks like the page it opens. Served as JPEG because
 * LinkedIn's crawler is unreliable with WebP.
 */

export const SHARE_WIDTH = 1200;
export const SHARE_HEIGHT = 630;

// Palette of the dark theme, which the card always uses: feeds are white, and
// a dark card with a warm accent is the one thing that reads as "this site".
const BG = '#0b0f14';
const TEXT = '#d6d9de';
const MUTED = '#9aa1ab';
const ACCENT = '#e07a6a';

// Paths are anchored to the project root: the built chunk lives elsewhere.
const ROOT = process.cwd();

let fontsPromise: Promise<Font[]> | undefined;

function loadFonts(): Promise<Font[]> {
  return (fontsPromise ??= (async () => {
    const load = async (file: string) =>
      Buffer.from(await decompress(await readFile(resolve(ROOT, 'src/fonts', file))));
    const [serif, sans] = await Promise.all([
      load('instrument-serif-latin-400-normal.woff2'),
      load('inter-latin-400-normal.woff2'),
    ]);
    return [
      {
        name: 'Instrument Serif',
        data: serif,
        weight: 400 as const,
        style: 'normal' as const,
      },
      {
        name: 'Inter',
        data: sans,
        weight: 400 as const,
        style: 'normal' as const,
      },
    ];
  })());
}

async function coverDataUri(cover: string): Promise<string> {
  const path = resolve(ROOT, 'public', coverUrl(cover).slice(1));
  const jpeg = await sharp(await readFile(path))
    .resize(SHARE_WIDTH, SHARE_HEIGHT, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 88 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
}

/** Long titles step down so they stay on at most three lines. */
function titleSize(title: string): number {
  if (title.length > 70) return 56;
  if (title.length > 40) return 68;
  return 80;
}

export async function renderShareImage(post: Post): Promise<Buffer> {
  const fonts = await loadFonts();
  const cover = await coverDataUri(post.data.cover);
  const title = post.data.title;
  const kicker = `${SECTIONS[post.collection].title} · ${SITE.shortName}`;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: SHARE_WIDTH,
          height: SHARE_HEIGHT,
          display: 'flex',
          position: 'relative',
          background: BG,
        },
        children: [
          {
            type: 'img',
            props: {
              src: cover,
              width: SHARE_WIDTH,
              height: SHARE_HEIGHT,
              style: { position: 'absolute', top: 0, left: 0 },
            },
          },
          // Darkens the lower half so the title sits on the palette, not the photo.
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: SHARE_WIDTH,
                height: SHARE_HEIGHT,
                background:
                  'linear-gradient(to bottom, rgba(11,15,20,0.05) 30%, rgba(11,15,20,0.92) 78%)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                left: 72,
                right: 72,
                bottom: 64,
                display: 'flex',
                flexDirection: 'column',
                color: TEXT,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 22,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: 28,
                            height: 2,
                            background: ACCENT,
                            marginRight: 14,
                          },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Inter',
                            fontSize: 22,
                            letterSpacing: 1,
                            color: MUTED,
                          },
                          children: kicker,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: 'Instrument Serif',
                      fontSize: titleSize(title),
                      lineHeight: 1.08,
                      letterSpacing: -0.5,
                    },
                    children: title,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: SHARE_WIDTH, height: SHARE_HEIGHT, fonts },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: SHARE_WIDTH } }).render().asPng();
  return sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}
