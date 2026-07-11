import type { AppLanguage } from '../../i18n/types';
import type { UserProfile } from '../types';
import { buildHeatmapData, HEATMAP_COLORS_MOCK, PROFILE_MOCK } from '../mock/profile.mock';

const profile: Record<AppLanguage, UserProfile> = {
  en: PROFILE_MOCK,
  hi: {
    ...PROFILE_MOCK,
    subtitle: 'आत्म-अभ्यासी · दिवस 13',
    stats: [
      { id: 'streak', value: '12', label: 'लगातार', hindi: 'निरंतरता', accent: true },
      { id: 'days', value: '13', label: 'पूर्ण दिवस', hindi: 'पूर्ण दिवस' },
      { id: 'reflections', value: '47', label: 'चिंतन', hindi: 'चिंतन' },
    ],
  },
  mr: {
    ...PROFILE_MOCK,
    subtitle: 'साधक · दिवस 13',
    stats: [
      { id: 'streak', value: '12', label: 'सलग', hindi: 'सलग', accent: true },
      { id: 'days', value: '13', label: 'पूर्ण दिवस', hindi: 'पूर्ण दिवस' },
      { id: 'reflections', value: '47', label: 'चिंतन', hindi: 'चिंतन' },
    ],
  },
  gu: {
    ...PROFILE_MOCK,
    subtitle: 'સાધક · દિવસ 13',
    stats: [
      { id: 'streak', value: '12', label: 'સતત', hindi: 'સતત', accent: true },
      { id: 'days', value: '13', label: 'પૂર્ણ દિવસ', hindi: 'પૂર્ણ દિવસ' },
      { id: 'reflections', value: '47', label: 'ચિંતન', hindi: 'ચિંતન' },
    ],
  },
  ta: {
    ...PROFILE_MOCK,
    subtitle: 'பயிற்சியாளர் · நாள் 13',
    stats: [
      { id: 'streak', value: '12', label: 'தொடர்', hindi: 'தொடர்', accent: true },
      { id: 'days', value: '13', label: 'முடிந்த நாட்கள்', hindi: 'முடிந்த நாட்கள்' },
      { id: 'reflections', value: '47', label: 'சிந்தனை', hindi: 'சிந்தனை' },
    ],
  },
  te: {
    ...PROFILE_MOCK,
    subtitle: 'సాధకుడు · రోజు 13',
    stats: [
      { id: 'streak', value: '12', label: 'వరుస', hindi: 'వరుస', accent: true },
      { id: 'days', value: '13', label: 'పూర్తి రోజులు', hindi: 'పూర్తి రోజులు' },
      { id: 'reflections', value: '47', label: 'ఆలోచన', hindi: 'ఆలోచన' },
    ],
  },
};

export function getProfileContent(lang: AppLanguage): UserProfile {
  const data = profile[lang] ?? profile.en;
  return {
    ...data,
    heatmapLevels: HEATMAP_COLORS_MOCK,
    heatmapData: buildHeatmapData(),
  };
}
