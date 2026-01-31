import rss, { rssSchema } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const topics = await getCollection('topics');

  return rss({
    title: "Proyecto de Aula - Servicios de Tecnología de la Información",
    description: "Proyecto de aula de la asignatura Servicios de Tecnología de la " +
    "Información de la carrera Ingeniería Informática en la Fundación Universitaria " +
    "Internacional de La Rioja (UNIR).",
    schema: rssSchema,
    site: context.site,
    items: topics.map((topic) => ({
      title: topic.data.title,
      description: topic.data.description,
      link: `/temas/${topic.slug}/`,
      pubDate: topic.data.publishAt,
    })),
    customData: `<language>es</language>`,
  });
}
