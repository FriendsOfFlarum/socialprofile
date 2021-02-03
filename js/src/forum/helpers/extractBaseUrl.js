/**
 * Extracts the base URL of a specified URL. Returns `null` if the URL is invalid.
 *
 * @example
 * // https://www.google.com
 * extractBaseUrl("https://www.google.com/search?q=flarum")
 *
 * @example
 * // https://discuss.flarum.org
 * extractBaseUrl("https://discuss.flarum.org/u/admin")
 *
 * @example
 * // null
 * extractBaseUrl("javascript:alert('hello!'")
 *
 * @param {string|null} url URL to extract base from
 */
export default function extractBaseUrl(url) {
    let urlInstance;

    try {
        urlInstance = new URL(url);
    } catch (_) {
        return null;
    }

    if (['http:', 'https:'].includes(urlInstance.protocol)) {
        return urlInstance.origin;
    }

    return null;
}
