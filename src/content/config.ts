import { defineCollection } from 'astro:content';

import { topicSchema } from '@/types/topic';

const topicsCollection = defineCollection({
  type: 'content',
  schema: topicSchema,
});

export const collections = { topicsCollection };
