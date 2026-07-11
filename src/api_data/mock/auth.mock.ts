import type { AuthContent } from '../types';

export const AUTH_MOCK: AuthContent = {
  title: 'Welcome back',
  hindiTitle: 'पुनः स्वागत है',
  description: 'Your lamp is waiting. Sign in to continue your journey.',
  providers: [
    { provider: 'apple', label: 'Continue with Apple' },
    { provider: 'google', label: 'Continue with Google' },
    { provider: 'email', label: 'Continue with Email' },
  ],
  guestLabel: 'Continue as guest',
};
