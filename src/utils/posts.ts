import { getCollection, type CollectionEntry } from 'astro:content';

export const PAGE_SIZE = 12;

export type Post = CollectionEntry<'posts'>;
export type Category = CollectionEntry<'categories'>;

/** Published posts, newest first. Drafts are only shown in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getCategoryMap(): Promise<Map<string, Category>> {
  const categories = await getCollection('categories');
  return new Map(categories.map((c) => [c.id, c]));
}

/** Pull the 11-char video id out of any YouTube URL (watch, youtu.be, shorts, embed) or a bare id. */
export function getYouTubeId(url: string): string | null {
  const trimmed = url.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Turn a pattern file path into a friendly filename for the download attribute. */
export function fileName(path: string): string {
  return decodeURIComponent(path.split('/').pop() ?? path);
}

export interface PostPage {
  posts: Post[];
  pageNumber: number;
  prevUrl?: string;
  nextUrl?: string;
}

/** Split posts into pages. Page 1 lives at `basePath`, later pages at `${basePath}page/N/`. */
export function paginatePosts(posts: Post[], basePath: string): PostPage[] {
  const total = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const urlFor = (n: number) => (n === 1 ? basePath : `${basePath}page/${n}/`);
  return Array.from({ length: total }, (_, i) => {
    const n = i + 1;
    return {
      posts: posts.slice(i * PAGE_SIZE, n * PAGE_SIZE),
      pageNumber: n,
      prevUrl: n > 1 ? urlFor(n - 1) : undefined,
      nextUrl: n < total ? urlFor(n + 1) : undefined,
    };
  });
}

export async function getCategoryPages() {
  const [posts, categoryMap] = await Promise.all([getPosts(), getCategoryMap()]);
  return [...categoryMap.values()].map((category) => ({
    category,
    pages: paginatePosts(
      posts.filter((p) => p.data.categories.includes(category.id)),
      `/category/${category.id}/`,
    ),
  }));
}
