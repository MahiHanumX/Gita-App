import type { OnboardingContent } from '../types';

export const ONBOARDING_MOCK: OnboardingContent = {
  splash: {
    hindiTitle: 'दीप',
    englishTitle: 'Deep',
    tagline: 'the inner lamp',
    footerText: 'A 40-day journey with the Gita',
    autoAdvanceMs: 2200,
  },
  welcome: {
    title: 'Ancient wisdom, held gently in your day.',
    subtitle: 'प्राचीन ज्ञान, आज के जीवन में।',
    carouselDots: 3,
    activeDot: 0,
  },
  intentions: [
    { id: 'calm', en: 'Find calm', hi: 'शांति' },
    { id: 'habit', en: 'Build a habit', hi: 'नियम' },
    { id: 'understand', en: 'Understand the Gita', hi: 'गीता को समझना', selected: true },
    { id: 'detach', en: 'Detach from outcomes', hi: 'फल त्याग', selected: true },
    { id: 'spiritual', en: 'Grow spiritually', hi: 'आध्यात्मिक विकास' },
    { id: 'grief', en: 'Heal from grief', hi: 'शोक से मुक्ति' },
    { id: 'serve', en: 'Serve others', hi: 'सेवा' },
    { id: 'purpose', en: 'Discover purpose', hi: 'उद्देश्य' },
  ],
  commitments: [
    { id: 'light', min: 5, label: 'Light', hi: 'सरल', desc: '1 shloka · quick reflect' },
    { id: 'steady', min: 10, label: 'Steady', hi: 'नियमित', desc: 'Full 5-chapter flow', selected: true },
    { id: 'deep', min: 20, label: 'Deep', hi: 'गहन', desc: 'Includes meditation + mantra' },
  ],
};
