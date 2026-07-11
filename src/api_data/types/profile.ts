export type ProfileStat = {
  id: string;
  value: string;
  label: string;
  hindi: string;
  accent?: boolean;
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
};
