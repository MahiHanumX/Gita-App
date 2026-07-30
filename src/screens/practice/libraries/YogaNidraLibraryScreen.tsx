import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryFrame, SessionRow, NidraIcon } from '../components/PracticeUI';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function YogaNidraLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';

  const cardGradient = theme.featuredGradient;
  const iconColor = isLight ? theme.accentDeep : theme.accentBright;

  const journeys = [
    { id: 'ocean', en: 'Ocean of Rest', hi: 'विश्राम सागर', teacher: 'Meera J.', duration: '25 min', tag: 'Deep sleep', accent: cardGradient, icon: <NidraIcon color={iconColor} />, isFav: true },
    { id: 'chariot', en: 'The Chariot Rests', hi: 'रथ विश्राम', teacher: 'Pandit R.', duration: '35 min', tag: 'Story', accent: cardGradient, icon: <NidraIcon color={iconColor} />, isNew: true },
    { id: 'bodyscan', en: 'Body Scan · 61 points', hi: 'अंग न्यास', teacher: 'Vidya R.', duration: '20 min', tag: 'Body', accent: cardGradient, icon: <NidraIcon color={iconColor} />, isPlaying: true },
    { id: 'krishna', en: 'Return to Krishna', hi: 'कृष्ण-गमन', teacher: 'Deepa M.', duration: '30 min', tag: 'Bhakti', accent: cardGradient, icon: <NidraIcon color={iconColor} /> },
    { id: 'sankalpa', en: 'Sankalpa · Intention', hi: 'संकल्प', teacher: 'Vidya R.', duration: '18 min', tag: 'Manifest', accent: cardGradient, icon: <NidraIcon color={iconColor} /> },
    { id: 'silent', en: 'Silent Witness', hi: 'मौन साक्षी', teacher: 'No voice', duration: '40 min', tag: 'Advanced', accent: cardGradient, icon: <NidraIcon color={iconColor} /> },
  ];

  return (
    <LibraryFrame
      hi="निद्रा" 
      en="Yoga Nidra" 
      count="6 journeys"
      tint={isLight ? theme.accentDeep : theme.accentBright}
      glow={theme.accentSoft}
      subtitle="Conscious sleep — a state between waking and dreaming. 30 minutes here is said to equal 3 hours of ordinary rest."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Deep sleep', active: false },
        { label: 'Story', active: false },
        { label: 'Body', active: false },
        { label: 'Bhakti', active: false },
      ]}
    >
      {journeys.map((s, i) => (
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



