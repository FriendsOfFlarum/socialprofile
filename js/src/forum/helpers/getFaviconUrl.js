import app from 'flarum/forum/app';

import isValidUrl from './isValidUrl';
import extractUriHost from './extractUriHost';

export const PROVIDERS = {
  google: (host) => `https://www.google.com/s2/favicons?domain=${host}`,
  duckduckgo: (host) => `https://icons.duckduckgo.com/ip3/${host}.ico`,
  yandex: (host) => `https://favicon.yandex.net/favicon/${host}`,
};

export default (url) => {
  const faviconProvider = app.forum.attribute('fof-socialprofile.favicon_provider');

  if (!isValidUrl(url) || !(faviconProvider in PROVIDERS)) return null;

  const host = extractUriHost(url);

  return PROVIDERS[faviconProvider]?.(host);
};
