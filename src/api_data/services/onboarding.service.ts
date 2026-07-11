import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { getLocalizedOnboarding } from '../locales';
import type { OnboardingContent } from '../types';
import { apiGet } from './apiClient';

export async function fetchOnboardingContent(lang: AppLanguage = 'en'): Promise<OnboardingContent> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedOnboarding(lang));
  return apiGet<OnboardingContent>(`${API_ENDPOINTS.onboarding}?lang=${lang}`);
}
