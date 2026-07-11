import type { PracticeContent, ContinueSession } from '../types';

export const PRACTICE_MOCK: PracticeContent = {
  headerHi: 'अभ्यास',
  headerEn: 'Practice',
  suggestion: {
    label: 'Suggested for today',
    title: 'Breath of the Warrior',
    hindiSubtitle: 'वीर श्वास · 8 min',
  },
  tiles: [
    { id: 'meditation', hi: 'ध्यान', en: 'Meditation', count: '24 sessions', gradient: ['#3a2358', '#2d2b5f'] },
    { id: 'mantra', hi: 'मंत्र जाप', en: 'Mantra Chanting', count: '12 mantras', gradient: ['#c67a1a', '#8a5010'] },
    { id: 'breathwork', hi: 'प्राणायाम', en: 'Breathwork', count: '8 techniques', gradient: ['#2d5f5a', '#1a3d3a'] },
    { id: 'nidra', hi: 'निद्रा', en: 'Yoga Nidra', count: '6 journeys', gradient: ['#1a1b3a', '#0f102b'] },
  ],
};

export const CONTINUE_SESSION_MOCK: ContinueSession = {
  id: 'stillness-river',
  title: 'Stillness of the River',
  progress: 42,
};
