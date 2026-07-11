export type LibraryChapterTone = 'gold' | 'active' | 'default';

export type LibraryChapter = {
  id: number;
  hi: string;
  en: string;
  verses: number;
  progress: number;
  tone?: LibraryChapterTone;
};

export type VerseOfDay = {
  label: string;
  shloka: string;
  quote: string;
  reference: string;
};

export type LibraryContent = {
  title: string;
  hindiTitle: string;
  verseOfDay: VerseOfDay;
  chapters: LibraryChapter[];
};
