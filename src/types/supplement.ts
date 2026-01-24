import { z } from 'astro:content';

const badgeVariantEnum = z.enum([
  'default',
  'secondary',
  'outline',
  'success',
  'warning',
  'danger',
]);

export const supplementBadgeSchema = z.object({
  variant: badgeVariantEnum,
  icon: z.string(),
  label: z.string(),
});

export type SupplementBadge = z.infer<typeof supplementBadgeSchema>;

export const supplementSchema = z.object({
  order: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  iconBg: z.string(),
  triggerId: z.string(),
  badges: z.array(supplementBadgeSchema),
});

export type Supplement = z.infer<typeof supplementSchema>;
