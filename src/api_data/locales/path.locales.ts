import type { AppLanguage } from '../../i18n/types';
import type { DayPreview, PathMilestone } from '../types';
import { PATH_JOURNEY_META_MOCK, PATH_MILESTONES_MOCK, ACTIVE_DAY_PREVIEW_MOCK } from '../mock/path.mock';

type PathMeta = {
  totalDays: number;
  currentDay: number;
  streak: number;
  headerHi: string;
  headerEn: string;
  milestones: PathMilestone[];
  activeDayPreview: DayPreview;
};

const pathMeta: Record<AppLanguage, PathMeta> = {
  en: {
    ...PATH_JOURNEY_META_MOCK,
    milestones: PATH_MILESTONES_MOCK,
    activeDayPreview: ACTIVE_DAY_PREVIEW_MOCK,
  },
  hi: {
    ...PATH_JOURNEY_META_MOCK,
    headerHi: 'भगवद्‌गीता यात्रा',
    headerEn: 'गीता यात्रा · 40 दिन',
    milestones: [
      { day: 7, label: 'कर्म योग', hindi: 'कर्मयोग', reached: false },
      { day: 21, label: 'भक्ति योग', hindi: 'भक्तियोग', reached: false },
    ],
    activeDayPreview: {
      ...ACTIVE_DAY_PREVIEW_MOCK,
      section: 'परिचय',
      title: 'गीता परिचय',
      description: 'अपनी यात्रा शुरू करें। आज हम भगवद्गीता के संदर्भ, पृष्ठभूमि और सार से जुड़ते हैं।',
    },
  },
  mr: {
    ...PATH_JOURNEY_META_MOCK,
    headerEn: 'गीता प्रवास · 40 दिवस',
    milestones: PATH_MILESTONES_MOCK,
    activeDayPreview: {
      ...ACTIVE_DAY_PREVIEW_MOCK,
      section: 'ओळख',
      title: 'गीतेची ओळख',
      description: 'तुमचा प्रवास सुरू करा. आज आपण भगवद्गीतेचा संदर्भ, पार्श्वभूमी आणि सार जाणून घेऊ.',
    },
  },
  gu: {
    ...PATH_JOURNEY_META_MOCK,
    headerEn: 'ગીતા યાત્રા · 40 દિવસ',
    milestones: PATH_MILESTONES_MOCK,
    activeDayPreview: {
      ...ACTIVE_DAY_PREVIEW_MOCK,
      section: 'પરિચય',
      title: 'ગીતા પરિચય',
      description: 'તમારી યાત્રા શરૂ કરો. આજે આપણે ભગવદ્ ગીતાના સંદર્ભ, પૃષ્ઠભૂમિ અને સાર સાથે જોડાઈએ.',
    },
  },
  ta: {
    ...PATH_JOURNEY_META_MOCK,
    headerEn: 'கீதை பயணம் · 40 நாட்கள்',
    milestones: PATH_MILESTONES_MOCK,
    activeDayPreview: {
      ...ACTIVE_DAY_PREVIEW_MOCK,
      section: 'அறிமுகம்',
      title: 'கீதை அறிமுகம்',
      description: 'உங்கள் பயணத்தைத் தொடங்குங்கள். இன்று நாம் பகவத் கீதையின் சூழல், பின்னணி மற்றும் சாராம்சத்துடன் இணைகிறோம்.',
    },
  },
  te: {
    ...PATH_JOURNEY_META_MOCK,
    headerEn: 'గీతా ప్రయాణం · 40 రోజులు',
    milestones: PATH_MILESTONES_MOCK,
    activeDayPreview: {
      ...ACTIVE_DAY_PREVIEW_MOCK,
      section: 'పరిచయం',
      title: 'గీత పరిచయం',
      description: 'మీ ప్రయాణాన్ని ప్రారంభించండి. ఈ రోజు మనం భగవద్గీత యొక్క సందర్భం, నేపథ్యం మరియు సారాంశంతో కనెక్ట్ అవుతాము.',
    },
  },
};

export function getPathContent(lang: AppLanguage): PathMeta {
  const content = pathMeta[lang] ?? pathMeta.en;
  return {
    ...content,
    currentDay: PATH_JOURNEY_META_MOCK.currentDay,
    activeDayPreview: {
      ...content.activeDayPreview,
      day: PATH_JOURNEY_META_MOCK.currentDay,
    },
  };
}
