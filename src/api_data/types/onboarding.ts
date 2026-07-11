import type { BilingualText } from './common';

export type IntentionOption = BilingualText & {
  id: string;
  selected?: boolean;
};

export type CommitmentOption = {
  id: string;
  min: number;
  label: string;
  hi: string;
  desc: string;
  selected?: boolean;
};

export type WelcomeContent = {
  title: string;
  subtitle: string;
  carouselDots: number;
  activeDot: number;
};

export type SplashContent = {
  hindiTitle: string;
  englishTitle: string;
  tagline: string;
  footerText: string;
  autoAdvanceMs: number;
};

export type OnboardingContent = {
  splash: SplashContent;
  welcome: WelcomeContent;
  intentions: IntentionOption[];
  commitments: CommitmentOption[];
};
