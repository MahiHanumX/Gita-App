import type { TranslationSchema } from '../types';

const en: TranslationSchema = {
  tabs: { path: 'Path', library: 'Library', practice: 'Practice', profile: 'You' },
  common: {
    skip: 'Skip',
    begin: 'Begin',
    continue: 'Continue',
    or: 'or',
    reflect: 'Reflect',
    chapters: 'Chapters',
    explore: 'Explore',
    verses: 'verses',
    weeks: 'weeks',
    language: 'Language',
    selectLanguage: 'Choose your language',
    currentLanguage: 'App language',
  },
  onboarding: {
    step1of2: 'Step 1 of 2',
    step2of2: 'Step 2 of 2',
    whyHere: 'Why are you here?',
    whyHereSub: 'What brings you to this journey?',
    chooseResonate: 'Choose any that resonate. You can change these later.',
    timeQuestion: 'How much time each day?',
    lightLamp: 'Light the First Lamp',
  },
  auth: { guest: 'Continue as guest' },
  path: { day: 'Day', min: 'min', chapterCount: 'chapters', reflect: 'Reflect', startPractice: "Start Today's Practice", startPracticeSub: 'Begin today\'s practice' },
  profile: { you: 'You', practiceHeatmap: 'Practice' },
};

export default en;
