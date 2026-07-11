import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGE_OPTIONS, resolveDeviceLanguage } from './languages';
import { getTranslations } from './locales';
import type { AppLanguage, TranslationSchema } from './types';

const STORAGE_KEY = '@gita_journey/language';

type LocaleContextValue = {
  language: AppLanguage;
  t: TranslationSchema;
  setLanguage: (lang: AppLanguage) => Promise<void>;
  languages: typeof LANGUAGE_OPTIONS;
  ready: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(resolveDeviceLanguage());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved && LANGUAGE_OPTIONS.some((l) => l.code === saved)) {
          setLanguageState(saved as AppLanguage);
        }
      })
      .finally(() => setReady(true));
  }, []);

  const setLanguage = useCallback(async (lang: AppLanguage) => {
    setLanguageState(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const value = useMemo(
    () => ({
      language,
      t: getTranslations(language),
      setLanguage,
      languages: LANGUAGE_OPTIONS,
      ready,
    }),
    [language, setLanguage, ready],
  );

  if (!ready) return null;

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useTranslation() {
  return useLocale().t;
}
