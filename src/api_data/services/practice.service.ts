import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { CONTINUE_SESSION_MOCK } from '../mock/practice.mock';
import { getLocalizedPracticeHub } from '../locales';
import type { ContinueSession, PracticeContent } from '../types';
import { apiGet } from './apiClient';

export async function fetchPracticeHub(lang: AppLanguage = 'en'): Promise<PracticeContent> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedPracticeHub(lang));
  return apiGet<PracticeContent>(`${API_ENDPOINTS.practiceHub.home}?lang=${lang}`);
}

export async function fetchContinueSession(): Promise<ContinueSession | null> {
  if (API_CONFIG.useMock) return Promise.resolve(CONTINUE_SESSION_MOCK);
  return apiGet<ContinueSession | null>(`${API_ENDPOINTS.practiceHub.sessions}/continue`);
}
