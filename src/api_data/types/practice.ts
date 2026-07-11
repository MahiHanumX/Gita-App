export type PracticeTile = {
  id: string;
  hi: string;
  en: string;
  count: string;
  gradient: readonly [string, string];
};

export type PracticeSuggestion = {
  label: string;
  title: string;
  hindiSubtitle: string;
};

export type PracticeContent = {
  headerHi: string;
  headerEn: string;
  suggestion: PracticeSuggestion;
  tiles: PracticeTile[];
};

export type ContinueSession = {
  id: string;
  title: string;
  progress: number;
};
