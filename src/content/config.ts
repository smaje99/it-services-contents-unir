import { defineCollection, z } from "astro:content";

const topics = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string(),
    color: z.string(),
    publishAt: z.string().transform((value) => new Date(value)),
  }),
});

export const collections = { topics };
