import type { AppLanguage, LanguageOption } from './types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

export function isAppLanguage(value: string | null | undefined): value is AppLanguage {
  return LANGUAGE_OPTIONS.some((l) => l.code === value);
}

export function resolveDeviceLanguage(): AppLanguage {
  try {
    const { getLocales } = require('expo-localization');
    const code = getLocales()[0]?.languageCode;
    return isAppLanguage(code) ? code : 'en';
  } catch {
    return 'en';
  }
}
