/**
 * Extracts the host of a specified URI. Returns `null` if the URL is invalid.
 *
 * @example
 * // www.google.com
 * extractBaseUrl("https://www.google.com/search?q=flarum")
 *
 * @example
 * // discuss.flarum.org
 * extractBaseUrl("https://discuss.flarum.org/u/admin")
 *
 * @example
 * // null
 * extractBaseUrl("javascript:alert('hello!')")
 */
export default function extractUriHost(url: string | null): string | null;
