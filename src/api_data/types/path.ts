export type PathNodeState = 'locked' | 'active' | 'completed';

export type PathNode = {
  day: number;
  x: number;
  y: number;
  state: PathNodeState;
};

export type PathMilestone = {
  day: number;
  label: string;
  hindi: string;
  reached: boolean;
};

export type DayPreview = {
  day: number;
  section: string;
  hindiTitle: string;
  title: string;
  description: string;
  durationMin: number;
  chapterCount: number;
  includesReflect: boolean;
};

export type PathJourney = {
  totalDays: number;
  currentDay: number;
  streak: number;
  headerHi: string;
  headerEn: string;
  nodes: PathNode[];
  milestones: PathMilestone[];
  activeDayPreview: DayPreview;
};

export type PathLayoutConfig = {
  screenWidth: number;
  startY: number;
  spacing: number;
  amplitude: number;
};
