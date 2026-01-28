import weeksData from '@/data/weeks.json';
import { weekSchema } from '@/types/week';
import { isPublished } from '@/utils/isPublished';

/**
 * Gets the number of published weeks and the total number of weeks.
 * @returns A tuple containing the number of published weeks and the total number of weeks
 */
export function getAdvancedWeekNumber(): [number, number] {
  const weeks = weeksData.map((week) => weekSchema.parse(week));
  const publishedWeeks = weeks.filter((week) => isPublished(week.startDateAt));

  return [publishedWeeks.length, weeks.length];
}
