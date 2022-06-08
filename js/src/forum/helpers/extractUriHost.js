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
 *
 * @param {string|null} url URL to extract base from
 */
export default function extractUriHost(url) {
  let urlInstance;

  try {
    urlInstance = new URL(url);
  } catch (_) {
    return null;
  }

  if (['http:', 'https:'].includes(urlInstance.protocol)) {
    return urlInstance.host;
  }

  return null;
}
