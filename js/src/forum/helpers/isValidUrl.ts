/**
 * Verifies if a string is a valid URL (http/https only).
 */
export default function isValidUrl(url: string): boolean {
  let urlInstance: URL;

  try {
    urlInstance = new URL(url);
  } catch (_) {
    return false;
  }

  return ['http:', 'https:'].includes(urlInstance.protocol);
}
