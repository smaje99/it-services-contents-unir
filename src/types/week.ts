import { z } from 'astro:content';

export const weekSchema = z.object({
  numberWeek: z.number().readonly(),
  startDateAt: z
    .string()
    .transform((value) => new Date(value))
    .readonly(),
});

export type Week = z.infer<typeof weekSchema>;
