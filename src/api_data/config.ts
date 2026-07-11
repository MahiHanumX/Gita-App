/**
 * API configuration — swap `useMock` to false and set `baseUrl` when backend is ready.
 */
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com/v1',
  useMock: true,
  timeoutMs: 15000,
};

export const API_ENDPOINTS = {
  onboarding: '/onboarding',
  auth: {
    signIn: '/auth/sign-in',
    guest: '/auth/guest',
    session: '/auth/session',
  },
  path: {
    journey: '/path/journey',
    day: (day: number) => `/path/days/${day}`,
  },
  practice: {
    daily: (dayId: number) => `/practice/daily/${dayId}`,
    flow: '/practice/flow',
  },
  library: {
    home: '/library',
    chapters: '/library/chapters',
    search: '/library/search',
  },
  practiceHub: {
    home: '/practice-hub',
    sessions: '/practice-hub/sessions',
  },
  profile: {
    me: '/profile/me',
    stats: '/profile/stats',
    heatmap: '/profile/heatmap',
  },
} as const;
