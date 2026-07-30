import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryFrame, SessionRow, BreathIcon } from '../components/PracticeUI';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function BreathworkLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';

  const cardGradient = theme.featuredGradient;
  const iconColor = isLight ? theme.accentDeep : theme.accentBright;

  const techniques = [
    { id: 'nadi', en: 'Nadi Shodhana', hi: 'नाड़ी शोधन', teacher: 'Alternate nostril', duration: '8 min', tag: 'Balance', accent: cardGradient, icon: <BreathIcon color={iconColor} />, isFav: true, isPlaying: true },
    { id: 'bhramari', en: 'Bhramari · Bee Breath', hi: 'भ्रामरी', teacher: 'Humming', duration: '6 min', tag: 'Calm', accent: cardGradient, icon: <BreathIcon color={iconColor} /> },
    { id: 'kapalabhati', en: 'Kapalabhati', hi: 'कपालभाति', teacher: 'Skull-shining', duration: '5 min', tag: 'Energize', accent: cardGradient, icon: <BreathIcon color={iconColor} /> },
    { id: 'ujjayi', en: 'Ujjayi · Victorious', hi: 'उज्जायी', teacher: 'Ocean breath', duration: '10 min', tag: 'Focus', accent: cardGradient, icon: <BreathIcon color={iconColor} /> },
    { id: 'sheetali', en: 'Sheetali · Cooling', hi: 'शीतली', teacher: 'Tongue breath', duration: '7 min', tag: 'Anger', accent: cardGradient, icon: <BreathIcon color={iconColor} />, isNew: true },
    { id: 'box', en: 'Box breath 4-4-4-4', hi: 'बॉक्स श्वास', teacher: 'Beginner', duration: '4 min', tag: 'Anxiety', accent: cardGradient, icon: <BreathIcon color={iconColor} /> },
  ];

  return (
    <LibraryFrame
      hi="प्राणायाम" 
      en="Breathwork" 
      count="8 techniques"
      tint={isLight ? theme.accentDeep : theme.accentBright}
      glow={theme.accentSoft}
      subtitle="Pranayama — the ancient science of breath as bridge between body and mind."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Calm', active: false },
        { label: 'Energize', active: false },
        { label: 'Anger', active: false },
        { label: 'Focus', active: false },
      ]}
    >
      {techniques.map((s, i) => (
        <SessionRow 
          key={i} 
          {...s}
          onPress={() => navigation.navigate('SessionDetail', { 
            sessionId: s.id, 
            titleEn: s.en, 
            titleHi: s.hi 
          })}
        />
      ))}
    </LibraryFrame>
  );
}



