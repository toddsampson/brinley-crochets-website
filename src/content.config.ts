import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional().nullable(),
    excerpt: z.string().optional().nullable(),
    heroImage: z.string().optional().nullable(),
    draft: z.boolean().default(false),
    categories: z.array(z.string()).default([]),
    videos: z
      .array(z.object({ url: z.string(), title: z.string().optional().nullable() }))
      .default([]),
    patterns: z
      .array(z.object({ title: z.string(), file: z.string() }))
      .default([]),
  }),
});

const categories = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
  }),
});

export const collections = { posts, categories };
