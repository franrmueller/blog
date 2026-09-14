import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  /** File name inside public/covers/, e.g. `rings-horizon.webp`. */
  cover: z.string(),
  /** Used for the <meta> description. Optional. */
  description: z.string().optional(),
  /** Drafts are visible in `npm run dev` and excluded from builds. */
  draft: z.boolean().optional(),
});

const posts = (base: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base }),
    schema,
  });

export const collections = {
  work: posts('./src/content/work'),
  mind: posts('./src/content/mind'),
};
