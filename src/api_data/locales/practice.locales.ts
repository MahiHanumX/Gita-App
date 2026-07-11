import type { AppLanguage } from '../../i18n/types';
import type { PracticeContent } from '../types';
import { PRACTICE_MOCK } from '../mock/practice.mock';

const practice: Record<AppLanguage, PracticeContent> = {
  en: PRACTICE_MOCK,
  hi: {
    headerHi: 'अभ्यास',
    headerEn: 'अभ्यास',
    suggestion: {
      label: 'आज के लिए सुझाव',
      title: 'योद्धा की साँस',
      hindiSubtitle: 'वीर श्वास · 8 मिनट',
    },
    tiles: PRACTICE_MOCK.tiles,
  },
  mr: {
    headerHi: 'साधना',
    headerEn: 'साधना',
    suggestion: {
      label: 'आजसाठी सूचना',
      title: 'योद्ध्याचा श्वास',
      hindiSubtitle: '8 मिनिटे',
    },
    tiles: PRACTICE_MOCK.tiles,
  },
  gu: {
    headerHi: 'સાધના',
    headerEn: 'સાધના',
    suggestion: {
      label: 'આજ માટે સૂચન',
      title: 'યોદ્ધાનો શ્વાસ',
      hindiSubtitle: '8 મિનિટ',
    },
    tiles: PRACTICE_MOCK.tiles,
  },
  ta: {
    headerHi: 'பயிற்சி',
    headerEn: 'பயிற்சி',
    suggestion: {
      label: 'இன்றைய பரிந்துரை',
      title: 'வீரரின் மூச்சு',
      hindiSubtitle: '8 நிமிடம்',
    },
    tiles: PRACTICE_MOCK.tiles,
  },
  te: {
    headerHi: 'అభ్యాసం',
    headerEn: 'అభ్యాసం',
    suggestion: {
      label: 'నేటి సూచన',
      title: 'యోధుని శ్వాస',
      hindiSubtitle: '8 నిమిషాలు',
    },
    tiles: PRACTICE_MOCK.tiles,
  },
};

export function getPracticeContent(lang: AppLanguage): PracticeContent {
  return practice[lang] ?? practice.en;
}
