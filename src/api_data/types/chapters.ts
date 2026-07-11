export type ChapterStepType = 'shloka' | 'teaching' | 'task' | 'reflect' | 'complete';

export type ShlokaStep = {
  type: 'shloka';
  chipHi: string;
  chipEn: string;
  lines: string[];
  subLines: string[];
  transliteration: string;
  reference: string;
};

export type TeachingStep = {
  type: 'teaching';
  chipHi: string;
  chipEn: string;
  title: string;
  titleItalic: string;
  body: string;
  reflectPrompt: string;
};

export type TaskStepItem = {
  n: number;
  text: string;
  done?: boolean;
  current?: boolean;
};

export type TaskStep = {
  type: 'task';
  chipHi: string;
  chipEn: string;
  title: string;
  hindiTitle: string;
  steps: TaskStepItem[];
  note: string;
};

export type FeelingTag = {
  id: string;
  label: string;
  active?: boolean;
};

export type ReflectStep = {
  type: 'reflect';
  chipHi: string;
  chipEn: string;
  question: string;
  questionHi: string;
  sampleText: string;
  feelings: FeelingTag[];
  privacyNote: string;
};

export type CompleteStep = {
  type: 'complete';
  chipHi: string;
  chipEn: string;
  title: string;
  hindiTitle: string;
  body: string;
};

export type DailyPractice = {
  dayId: number;
  totalSteps: number;
  shloka: ShlokaStep;
  teaching: TeachingStep;
  task: TaskStep;
  reflect: ReflectStep;
  complete: CompleteStep;
};

export type CtaLabels = {
  shloka: { label: string; subLabel: string };
  teaching: { label: string; subLabel: string };
  task: { label: string; subLabel: string };
  reflect: { label: string; subLabel: string };
  complete: { label: string; subLabel: string };
};
