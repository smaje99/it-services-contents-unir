import { defineCollection } from 'astro:content';

import { supplementSchema } from '@/types/supplement';
import { topicSchema } from '@/types/topic';

const topicsCollection = defineCollection({
  type: 'content',
  schema: topicSchema,
});

const supplementCollection = defineCollection({
  type: 'content',
  schema: supplementSchema,
});

export const collections = {
  topics: topicsCollection,
  supplements: supplementCollection,
};
