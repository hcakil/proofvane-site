import { en } from './en';
import { tr } from './tr';
import type { Locale, SiteText } from './types';

export type { Locale, SiteText } from './types';

export const LOCALES: readonly Locale[] = ['tr', 'en'];

export const TEXT: Record<Locale, SiteText> = { tr, en };
