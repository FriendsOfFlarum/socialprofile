import app from 'flarum/forum/app';

import isValidUrl from './isValidUrl';
import extractUriHost from './extractUriHost';

export type FaviconProvider = 'google' | 'duckduckgo' | 'yandex';

export const PROVIDERS: Record<FaviconProvider, (host: string) => string> = {
  google: (host: string) => `https://www.google.com/s2/favicons?domain=${host}`,
  duckduckgo: (host: string) => `https://icons.duckduckgo.com/ip3/${host}.ico`,
  yandex: (host: string) => `https://favicon.yandex.net/favicon/${host}`,
};

export default function getFaviconUrl(url: string): string | null {
  const faviconProvider = app.forum.attribute<FaviconProvider>('fof-socialprofile.favicon_provider');

  if (!isValidUrl(url) || !faviconProvider || !(faviconProvider in PROVIDERS)) return null;

  const host = extractUriHost(url);

  if (!host) return null;

  return PROVIDERS[faviconProvider](host);
}
