/**
 * Checks if the content is published based on the publish date.
 * @param publishAt The date when the content is published
 * @returns A boolean indicating if the content is published
 */
export function isPublished(publishAt: string | Date): boolean {
  const publishDate = new Date(publishAt);
  const now = new Date();

  // Validación segura
  if (isNaN(publishDate.getTime())) {
    return false;
  }

  return publishDate.getTime() <= now.getTime();
}
