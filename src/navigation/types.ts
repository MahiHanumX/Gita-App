export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ChapterFlow: undefined;
  MantraJaap: undefined;
  MeditationSession: { sessionId?: string; titleEn?: string; titleHi?: string } | undefined;
  SessionDetail: { sessionId?: string; titleEn?: string; titleHi?: string } | undefined;
  SessionPause: undefined;
  SessionComplete: undefined;
};

export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Intention: undefined;
  Commitment: undefined;
  SignIn: undefined;
};

export type MainTabParamList = {
  Path: undefined;
  Library: undefined;
  Practice: undefined;
  Profile: undefined;
};

export type PracticeStackParamList = {
  PracticeHome: undefined;
  MeditationLibrary: undefined;
  MantraLibrary: undefined;
  BreathworkLibrary: undefined;
  YogaNidraLibrary: undefined;
  PracticeHistory: undefined;
  PracticeSearch: undefined;
};

export type ChapterFlowParamList = {
  Shloka: undefined;
  Teaching: undefined;
  Task: undefined;
  Reflect: undefined;
  Complete: undefined;
  MilestoneComplete: { day: number };
};

export type LibraryStackParamList = {
  LibraryHome: undefined;
  ChapterDetail: { chapterId: number; titleHi: string; titleEn: string; verses: number };
  Search: undefined;
  VerseDetail: { chapterId: number; verseNum: number; hi: string; en: string; isKeyVerse?: boolean };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Journey: undefined;
  Settings: undefined;
  Reminder: undefined;
  LockScreenNotif: undefined;
  PathOverview: undefined;
  Support: undefined;
  SessionLength: undefined;
  RestDays: undefined;
  LanguagePicker: undefined;
  TranslationSource: undefined;
  ThemePicker: undefined;
  TextSize: undefined;
  NotificationsHub: undefined;
  Account: undefined;
  DataPrivacy: undefined;
  About: undefined;
  SignOutConfirm: undefined;
};
