import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The CMS saves blank optional fields as '' — treat those as "not set".
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const optionalString = z.preprocess(blank, z.string().optional());
const optionalDate = z.preprocess(blank, z.coerce.date().optional());

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: optionalDate,
    excerpt: optionalString,
    heroImage: optionalString,
    draft: z.preprocess(blank, z.boolean().default(false)),
    categories: z.preprocess(blank, z.array(z.string()).default([])),
    videos: z
      .array(z.object({ url: z.string(), title: optionalString }))
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
    description: optionalString,
  }),
});

export const collections = { posts, categories };
