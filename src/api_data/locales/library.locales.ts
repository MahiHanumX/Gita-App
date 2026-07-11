import type { AppLanguage } from '../../i18n/types';
import type { LibraryContent } from '../types';
import { LIBRARY_MOCK } from '../mock/library.mock';

const library: Record<AppLanguage, LibraryContent> = {
  en: LIBRARY_MOCK,
  hi: {
    title: 'ग्रंथालय',
    hindiTitle: 'ग्रंथालय',
    verseOfDay: {
      label: 'आज का श्लोक',
      shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
      quote: '"जब-जब धर्म की हानि होती है, हे भारत…"',
      reference: 'गीता 4.7',
    },
    chapters: LIBRARY_MOCK.chapters,
  },
  mr: {
    title: 'ग्रंथालय',
    hindiTitle: 'ग्रंथालय',
    verseOfDay: {
      label: 'आजचा श्लोक',
      shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
      quote: '"जेव्हा धर्माची हानी होते…"',
      reference: 'गीता 4.7',
    },
    chapters: LIBRARY_MOCK.chapters,
  },
  gu: {
    title: 'પુસ્તકાલય',
    hindiTitle: 'પુસ્તકાલય',
    verseOfDay: {
      label: 'આજનો શ્લોક',
      shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
      quote: '"જ્યારે ધર્મનો નાશ થાય…"',
      reference: 'ગીતા 4.7',
    },
    chapters: LIBRARY_MOCK.chapters,
  },
  ta: {
    title: 'நூலகம்',
    hindiTitle: 'நூலகம்',
    verseOfDay: {
      label: 'இன்றைய ஸ்லோகம்',
      shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
      quote: '"தர்மம் சிதையும்போது…"',
      reference: 'கீதை 4.7',
    },
    chapters: LIBRARY_MOCK.chapters,
  },
  te: {
    title: 'గ్రంథాలయం',
    hindiTitle: 'గ్రంథాలయం',
    verseOfDay: {
      label: 'నేటి శ్లోకం',
      shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
      quote: '"ధర్మం క్షీణించినప్పుడు…"',
      reference: 'గీత 4.7',
    },
    chapters: LIBRARY_MOCK.chapters,
  },
};

export function getLibraryContent(lang: AppLanguage): LibraryContent {
  return library[lang] ?? library.en;
}
