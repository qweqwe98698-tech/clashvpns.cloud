import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const articlesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    author: z.string().default('柳如烟'),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'articles': articlesCollection,
};
