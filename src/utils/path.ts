/**
 * Normalizes a path by removing trailing slashes, except for the root path.
 * @param path - The path to normalize.
 * @returns The normalized path.
 */
export const normalizePath = (path: string) => (path !== '/' ? path.replace(/\/+$/, '') : '/');

/**
 * Prepends the base URL to a given path, ensuring that there are no double
 * slashes and that the path can be provided with or without an initial slash.
 * @param path - The path to prepend the base URL to.
 * @returns The full URL with the base URL prepended.
 */
export const withBaseUrl = (path = '') => {
  const baseUrl = import.meta.env.BASE_URL;
  // evita double slash y soporta path con o sin slash inicial
  const cleanPath = String(path).replace(/^\/+/, '');
  return `${baseUrl}${cleanPath}`;
};
