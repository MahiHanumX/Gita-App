import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { PATH_LAYOUT_MOCK, buildPathNodes, advanceMockCurrentDay } from '../mock/path.mock';
import { getLocalizedPathJourney } from '../locales';
import type { DayPreview, PathJourney } from '../types';
import { apiGet } from './apiClient';

export async function advancePathJourneyDay(): Promise<void> {
  if (API_CONFIG.useMock) {
    advanceMockCurrentDay();
    return Promise.resolve();
  }
}

export async function fetchPathJourney(lang: AppLanguage = 'en'): Promise<PathJourney> {
  if (API_CONFIG.useMock) {
    const meta = getLocalizedPathJourney(lang);
    return Promise.resolve({
      ...meta,
      nodes: buildPathNodes(meta.totalDays, meta.currentDay, PATH_LAYOUT_MOCK),
    });
  }
  return apiGet<PathJourney>(`${API_ENDPOINTS.path.journey}?lang=${lang}`);
}

export async function fetchDayPreview(day: number, lang: AppLanguage = 'en'): Promise<DayPreview> {
  if (API_CONFIG.useMock) {
    const meta = getLocalizedPathJourney(lang);
    return Promise.resolve({ ...meta.activeDayPreview, day });
  }
  return apiGet<DayPreview>(`${API_ENDPOINTS.path.day(day)}?lang=${lang}`);
}
