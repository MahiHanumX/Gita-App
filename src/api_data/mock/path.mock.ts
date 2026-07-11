import type { PathLayoutConfig, PathNode, PathNodeState } from '../types';

export const PATH_LAYOUT_MOCK: PathLayoutConfig = {
  screenWidth: 375,
  startY: 260,
  spacing: 108,
  amplitude: 92,
};

let mockCurrentDay = 1;

export function getMockCurrentDay() {
  return mockCurrentDay;
}

export function setMockCurrentDay(day: number) {
  mockCurrentDay = day;
}

export function advanceMockCurrentDay() {
  if (mockCurrentDay < 40) {
    mockCurrentDay += 1;
  }
}

export const PATH_JOURNEY_META_MOCK = {
  totalDays: 40,
  get currentDay() {
    return mockCurrentDay;
  },
  streak: 0,
  headerHi: 'भगवद्‌गीता यात्रा',
  headerEn: 'The Gita Journey · 40 Days',
};

export const PATH_MILESTONES_MOCK = [
  { day: 7, label: 'Karma Yoga', hindi: 'कर्मयोग', reached: false },
  { day: 21, label: 'Bhakti Yoga', hindi: 'भक्तियोग', reached: false },
];

export const ACTIVE_DAY_PREVIEW_MOCK = {
  day: 1,
  section: 'Introduction',
  hindiTitle: 'गीता परिचय',
  title: 'Introduction to the Gita',
  description:
    "Embark on your journey. Today we connect with the context, background, and essence of the Bhagavad Gita.",
  durationMin: 5,
  chapterCount: 1,
  includesReflect: false,
};

export function buildPathNodes(
  totalDays: number,
  currentDay: number,
  layout: PathLayoutConfig = PATH_LAYOUT_MOCK,
): PathNode[] {
  const nodes: PathNode[] = [];
  const { screenWidth, startY, spacing, amplitude } = layout;
  const cx = screenWidth / 2;

  for (let i = 0; i < totalDays; i++) {
    const t = i * (Math.PI / 2);
    const x = cx + Math.sin(t) * amplitude;
    const y = startY + i * spacing;
    let state: PathNodeState = 'locked';
    if (i + 1 < currentDay) state = 'completed';
    else if (i + 1 === currentDay) state = 'active';
    nodes.push({ day: i + 1, x, y, state });
  }
  return nodes;
}

export function buildPathSvgD(nodes: PathNode[]): string {
  if (nodes.length === 0) return '';
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}
