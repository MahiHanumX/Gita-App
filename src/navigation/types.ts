export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ChapterFlow: undefined;
  MantraJaap: undefined;
  MeditationSession: { sessionId?: string; titleEn?: string; titleHi?: string } | undefined;
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
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Journey: undefined;
  Settings: undefined;
  Reminder: undefined;
  LockScreenNotif: undefined;
  PathOverview: undefined;
};
