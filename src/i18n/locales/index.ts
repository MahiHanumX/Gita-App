import type { AppLanguage, TranslationSchema } from '../types';
import en from './en';
import hi from './hi';
import mr from './mr';
import gu from './gu';
import ta from './ta';
import te from './te';

const translations: Record<AppLanguage, TranslationSchema> = { en, hi, mr, gu, ta, te };

export function getTranslations(lang: AppLanguage): TranslationSchema {
  return translations[lang] ?? translations.en;
}
