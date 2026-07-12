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
    chapterPrefix: string;
    explore: string;
    verses: string;
    done: string;
    keyVerse: string;
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
  milestones: {
    unlocked: string;
    share: string;
    continue: string;
    continueSub: string;
    d7: {
      label: string;
      hindi: string;
      quote: string;
      quoteHindi: string;
      desc: string;
    };
    d21: {
      label: string;
      hindi: string;
      quote: string;
      quoteHindi: string;
      desc: string;
    };
    d40: {
      label: string;
      hindi: string;
      quote: string;
      quoteHindi: string;
      desc: string;
    };
    default: {
      label: string;
      hindi: string;
      quote: string;
      quoteHindi: string;
      desc: string;
    };
  };
};
