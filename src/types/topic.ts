import { z } from 'astro:content';

export type TopicId =
  | 'topic1'
  | 'topic2'
  | 'topic3'
  | 'topic4'
  | 'topic5'
  | 'topic6'
  | 'topic7'
  | 'topic8'
  | 'topic9';

export const topicSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  publishAt: z.string().transform((value) => new Date(value)),
});

export type Topic = z.infer<typeof topicSchema>;
