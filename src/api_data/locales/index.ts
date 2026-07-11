import type { AppLanguage } from '../../i18n/types';
import type {
  AuthContent,
  CtaLabels,
  DailyPractice,
  LibraryContent,
  OnboardingContent,
  PathJourney,
  PracticeContent,
  UserProfile,
} from '../types';
import { getAuthContent } from './auth.locales';
import { getChapterContent } from './chapters.locales';
import { getLibraryContent } from './library.locales';
import { getOnboardingContent } from './onboarding.locales';
import { getPathContent } from './path.locales';
import { getPracticeContent } from './practice.locales';
import { getProfileContent } from './profile.locales';

export function getLocalizedOnboarding(lang: AppLanguage): OnboardingContent {
  return getOnboardingContent(lang);
}

export function getLocalizedAuth(lang: AppLanguage): AuthContent {
  return getAuthContent(lang);
}

export function getLocalizedPathJourney(lang: AppLanguage): Omit<PathJourney, 'nodes'> {
  return getPathContent(lang);
}

export function getLocalizedDailyPractice(lang: AppLanguage, dayId = 13): DailyPractice {
  return getChapterContent(lang, dayId).practice;
}

export function getLocalizedChapterCta(lang: AppLanguage): CtaLabels {
  return getChapterContent(lang).cta;
}

export function getLocalizedLibrary(lang: AppLanguage): LibraryContent {
  return getLibraryContent(lang);
}

export function getLocalizedPracticeHub(lang: AppLanguage): PracticeContent {
  return getPracticeContent(lang);
}

export function getLocalizedProfile(lang: AppLanguage): UserProfile {
  return getProfileContent(lang);
}
