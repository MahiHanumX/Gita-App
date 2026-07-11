import type { LibraryContent } from '../types';

export const LIBRARY_MOCK: LibraryContent = {
  title: 'Library',
  hindiTitle: 'ग्रंथालय',
  verseOfDay: {
    label: 'Verse of the Day',
    shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
    quote: '"Whenever righteousness declines, O Bharata…"',
    reference: 'Gita 4.7',
  },
  chapters: [
    { id: 1, hi: 'अर्जुनविषादयोग', en: "Arjuna's Sorrow", verses: 47, progress: 100, tone: 'gold' },
    { id: 2, hi: 'सांख्ययोग', en: 'The Path of Knowledge', verses: 72, progress: 68, tone: 'gold' },
    { id: 3, hi: 'कर्मयोग', en: 'The Path of Action', verses: 43, progress: 34, tone: 'active' },
    { id: 4, hi: 'ज्ञानकर्मसंन्यासयोग', en: 'Renunciation of Action', verses: 42, progress: 0 },
    { id: 5, hi: 'कर्मसंन्यासयोग', en: 'True Renunciation', verses: 29, progress: 0 },
  ],
};
