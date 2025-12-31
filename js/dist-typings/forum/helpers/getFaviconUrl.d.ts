export type FaviconProvider = 'google' | 'duckduckgo' | 'yandex';
export declare const PROVIDERS: Record<FaviconProvider, (host: string) => string>;
export default function getFaviconUrl(url: string): string | null;
