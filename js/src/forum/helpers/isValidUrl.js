/**
 * Verifies if a string is a valid URL (http/https only).
 *
 * @param {string} url URL to test
 */
export default function isValidUrl(url) {
    let urlInstance;

    try {
        urlInstance = new URL(url);
    } catch (_) {
        return false;
    }

    return ['http:', 'https:'].includes(urlInstance.protocol);
}
