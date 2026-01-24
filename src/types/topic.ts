import { z } from 'astro:content';

export const topicSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  publishAt: z.string().transform((value) => new Date(value)),
});

export type Topic = z.infer<typeof topicSchema>;
