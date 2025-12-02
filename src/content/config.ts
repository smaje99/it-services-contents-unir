import { defineCollection, z } from "astro:content";

const topics = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { topics };
