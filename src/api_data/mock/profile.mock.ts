import type { UserProfile, JourneyEntry } from '../types';

export const HEATMAP_COLORS_MOCK = [
  'rgba(245,236,216,0.08)',
  'rgba(232,168,56,0.25)',
  'rgba(232,168,56,0.55)',
  '#f4c257',
];

export function buildHeatmapData(length = 56): number[] {
  return Array.from({ length }).map((_, i) => {
    const s = Math.sin(i * 12.9898) * 43758.5453;
    const r = s - Math.floor(s);
    if (i > 48) return 0;
    if (r < 0.15) return 0;
    if (r < 0.4) return 1;
    if (r < 0.7) return 2;
    return 3;
  });
}

export const JOURNEY_ENTRIES_MOCK: JourneyEntry[] = [
  { day: 13, date: 'Today', hi: 'निष्काम कर्म', en: 'Action Without Attachment', quote: 'I noticed the pull when I checked my phone after sending the email…', mood: 'softer' },
  { day: 12, date: 'Yesterday', hi: 'सत्य', en: 'Truthfulness', quote: 'It\'s easier to be kind than honest — today I tried to be both.', mood: 'clear' },
  { day: 11, date: 'Sun, Jul 6', hi: 'क्षमा', en: 'Forgiveness', quote: 'Wrote a letter I\'ll never send. That was the whole point.', mood: 'lighter' },
  { day: 10, date: 'Sat, Jul 5', hi: 'दान', en: 'Giving', quote: null, mood: null, skipped: true },
  { day: 9, date: 'Fri, Jul 4', hi: 'साक्षी', en: 'The Witness', quote: 'Watching thoughts without becoming them. Difficult and freeing.', mood: 'observing' },
];

export const PROFILE_MOCK: UserProfile = {
  id: 'user-001',
  name: 'Ananya Sharma',
  avatarInitial: 'अ',
  subtitle: 'आत्म-अभ्यासी · Day 13',
  stats: [
    { id: 'streak', value: '12', label: 'Streak', hindi: 'निरंतरता', accent: true },
    { id: 'days', value: '13', label: 'Days done', hindi: 'पूर्ण दिवस' },
    { id: 'reflections', value: '47', label: 'Reflections', hindi: 'चिंतन' },
  ],
  heatmapWeeks: 8,
  heatmapLevels: HEATMAP_COLORS_MOCK,
  heatmapData: buildHeatmapData(),
  journeyEntries: JOURNEY_ENTRIES_MOCK,
};
