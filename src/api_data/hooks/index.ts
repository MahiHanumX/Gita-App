import { useLocale } from '../../i18n';
import { useApiData } from './useApiData';
import {
  getLocalizedChapterCta,
  getLocalizedDailyPractice,
  getLocalizedOnboarding,
  getLocalizedAuth,
  getLocalizedLibrary,
  getLocalizedPathJourney,
  getLocalizedPracticeHub,
  getLocalizedProfile,
} from '../locales';
import { PATH_LAYOUT_MOCK, buildPathNodes } from '../mock/path.mock';
import {
  fetchOnboardingContent,
  fetchAuthContent,
  fetchPathJourney,
  fetchDailyPractice,
  fetchChapterCtaLabels,
  fetchLibraryContent,
  fetchPracticeHub,
  fetchUserProfile,
} from '../services';
import type { PathJourney } from '../types';

function buildPathFallback(language: ReturnType<typeof useLocale>['language']): PathJourney {
  const meta = getLocalizedPathJourney(language);
  return {
    ...meta,
    nodes: buildPathNodes(meta.totalDays, meta.currentDay, PATH_LAYOUT_MOCK),
  };
}

export function useOnboardingContent() {
  const { language } = useLocale();
  return useApiData(() => fetchOnboardingContent(language), getLocalizedOnboarding(language), [language]);
}

export function useAuthContent() {
  const { language } = useLocale();
  return useApiData(() => fetchAuthContent(language), getLocalizedAuth(language), [language]);
}

export function usePathJourney() {
  const { language } = useLocale();
  return useApiData(() => fetchPathJourney(language), buildPathFallback(language), [language]);
}

export function useDailyPractice(dayId?: number) {
  const { language } = useLocale();
  const { data: journey } = usePathJourney();
  const resolvedDayId = dayId ?? journey?.currentDay ?? 13;
  return useApiData(
    () => fetchDailyPractice(resolvedDayId, language),
    getLocalizedDailyPractice(language, resolvedDayId),
    [resolvedDayId, language],
  );
}

export function useChapterCtaLabels() {
  const { language } = useLocale();
  return useApiData(() => fetchChapterCtaLabels(language), getLocalizedChapterCta(language), [language]);
}

export function useLibraryContent() {
  const { language } = useLocale();
  return useApiData(() => fetchLibraryContent(language), getLocalizedLibrary(language), [language]);
}

export function usePracticeHub() {
  const { language } = useLocale();
  return useApiData(() => fetchPracticeHub(language), getLocalizedPracticeHub(language), [language]);
}

export function useUserProfile() {
  const { language } = useLocale();
  return useApiData(() => fetchUserProfile(language), getLocalizedProfile(language), [language]);
}
