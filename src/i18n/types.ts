export const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr', 'gu', 'ta', 'te'] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type LanguageOption = {
  code: AppLanguage;
  name: string;
  nativeName: string;
};

export type TranslationSchema = {
  tabs: {
    path: string;
    library: string;
    practice: string;
    profile: string;
  };
  common: {
    skip: string;
    begin: string;
    continue: string;
    or: string;
    reflect: string;
    chapters: string;
    explore: string;
    verses: string;
    weeks: string;
    language: string;
    selectLanguage: string;
    currentLanguage: string;
  };
  onboarding: {
    step1of2: string;
    step2of2: string;
    whyHere: string;
    whyHereSub: string;
    chooseResonate: string;
    timeQuestion: string;
    lightLamp: string;
  };
  auth: {
    guest: string;
  };
  path: {
    day: string;
    min: string;
    chapterCount: string;
    reflect: string;
    startPractice: string;
    startPracticeSub: string;
  };
  profile: {
    you: string;
    practiceHeatmap: string;
  };
};
