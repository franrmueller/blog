import type { APIRoute } from 'astro';
import { SECTION_KEYS } from '../../../site';
import { getPosts, type Post } from '../../../lib/posts';
import { renderShareImage } from '../../../lib/share-image';

export async function getStaticPaths() {
  const paths = [];
  for (const section of SECTION_KEYS) {
    for (const post of await getPosts(section)) {
      paths.push({ params: { section, slug: post.id }, props: { post } });
    }
  }
  return paths;
}

export const GET: APIRoute<{ post: Post }> = async ({ props }) => {
  const body = await renderShareImage(props.post);
  return new Response(new Uint8Array(body), { headers: { 'Content-Type': 'image/jpeg' } });
};
