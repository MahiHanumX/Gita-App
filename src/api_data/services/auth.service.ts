import { API_CONFIG, API_ENDPOINTS } from '../config';
import type { AppLanguage } from '../../i18n/types';
import { getLocalizedAuth } from '../locales';
import type { AuthContent, AuthProvider, AuthSession } from '../types';
import { apiPost } from './apiClient';

export async function fetchAuthContent(lang: AppLanguage = 'en'): Promise<AuthContent> {
  if (API_CONFIG.useMock) return Promise.resolve(getLocalizedAuth(lang));
  return apiPost<AuthContent>(`${API_ENDPOINTS.auth.session}/content`, { lang });
}

export async function signIn(provider: AuthProvider): Promise<AuthSession> {
  if (API_CONFIG.useMock) {
    return Promise.resolve({
      userId: 'mock-user-001',
      token: 'mock-token',
      provider,
      isGuest: provider === 'guest',
    });
  }
  const endpoint = provider === 'guest' ? API_ENDPOINTS.auth.guest : API_ENDPOINTS.auth.signIn;
  return apiPost<AuthSession>(endpoint, { provider });
}
