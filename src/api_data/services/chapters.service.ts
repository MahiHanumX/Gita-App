import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { getLocalizedChapterCta, getLocalizedDailyPractice } from '../locales';
import type { CtaLabels, DailyPractice } from '../types';
import { apiGet, apiPost } from './apiClient';

export async function fetchDailyPractice(dayId = 13, lang: AppLanguage = 'en'): Promise<DailyPractice> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedDailyPractice(lang, dayId));
  return apiGet<DailyPractice>(`${API_ENDPOINTS.practice.daily(dayId)}?lang=${lang}`);
}

export async function fetchChapterCtaLabels(lang: AppLanguage = 'en'): Promise<CtaLabels> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedChapterCta(lang));
  return apiGet<CtaLabels>(`${API_ENDPOINTS.practice.flow}/cta-labels?lang=${lang}`);
}

export async function saveReflection(dayId: number, text: string, feelingIds: string[]): Promise<void> {
  if (API_CONFIG.useMock) return Promise.resolve();
  await apiPost<void>(`${API_ENDPOINTS.practice.daily(dayId)}/reflection`, { text, feelingIds });
}
