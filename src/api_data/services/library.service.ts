import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { getLocalizedLibrary } from '../locales';
import type { LibraryContent } from '../types';
import { apiGet } from './apiClient';

export async function fetchLibraryContent(lang: AppLanguage = 'en'): Promise<LibraryContent> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedLibrary(lang));
  return apiGet<LibraryContent>(`${API_ENDPOINTS.library.home}?lang=${lang}`);
}
