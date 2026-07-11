import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { getLocalizedProfile } from '../locales';
import type { UserProfile } from '../types';
import { apiGet } from './apiClient';

export async function fetchUserProfile(lang: AppLanguage = 'en'): Promise<UserProfile> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedProfile(lang));
  return apiGet<UserProfile>(`${API_ENDPOINTS.profile.me}?lang=${lang}`);
}
