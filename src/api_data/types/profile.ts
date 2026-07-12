export type ProfileStat = {
  id: string;
  value: string;
  label: string;
  hindi: string;
  accent?: boolean;
};

export type JourneyEntry = {
  day: number;
  date: string;
  hi: string;
  en: string;
  quote: string | null;
  mood: string | null;
  skipped?: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  avatarInitial: string;
  subtitle: string;
  stats: ProfileStat[];
  heatmapWeeks: number;
  heatmapLevels: string[];
  heatmapData: number[];
  journeyEntries: JourneyEntry[];
};
