import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

import type { Topic } from '@/types/topic';
import { gradientColors, type HexColor } from '@/utils/color';

type TopicPage = Pick<Required<Topic>, 'title' | 'description'> & {
  color: HexColor;
};
type Pages = Record<string, TopicPage>;

const topic = await getCollection('topics');

const pages = topic.reduce<Pages>(
  (acc, topic) => ({
    ...acc,
    [topic.slug]: {
      title: topic.data.title,
      description: topic.data.description,
      color: topic.data.color as HexColor,
    },
  }),
  {},
);

export const { getStaticPaths, GET } = await OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: 'route',

  // A collection of pages to generate images for.
  // The keys of this object are used to generate the path for that image.
  // In this example, we generate one image at `/open-graph/example.png`.
  pages: pages,

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,

    bgGradient: gradientColors(page.color),
    padding: 80,

    font: {
      title: {
        size: 64,
        weight: 'ExtraBold',
        color: [255, 255, 255],
        lineHeight: 1.1,
      },
      description: {
        size: 32,
        weight: 'Medium',
        color: [255, 255, 255],
        lineHeight: 1.2,
      },
    },

    cacheDir: './node_modules/.cache/astro-og-canvas',
  }),
});
