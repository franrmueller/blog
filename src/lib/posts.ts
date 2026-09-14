import { getCollection, type CollectionEntry } from 'astro:content';
import type { Section } from '../site';

export type Post = CollectionEntry<'work'> | CollectionEntry<'mind'>;

export const byDateDesc = (a: Post, b: Post) =>
  b.data.date.valueOf() - a.data.date.valueOf();

/** Published posts of one section, latest first. Drafts show in dev only. */
export async function getPosts(section: Section): Promise<Post[]> {
  const entries = await getCollection(
    section,
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return entries.sort(byDateDesc);
}

export function postUrl(post: Post): string {
  return `/${post.collection}/${post.id}/`;
}

/** Resolves the `cover` frontmatter value to a URL under /covers/. */
export function coverUrl(cover: string): string {
  return cover.startsWith('/') ? cover : `/covers/${cover}`;
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
