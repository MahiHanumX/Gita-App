import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryFrame, SessionRow, MeditationIcon } from '../components/PracticeUI';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function MeditationLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  const sessions = [
    { id: 'stillness', en: 'Stillness of the River', hi: 'नदी की शांति', teacher: 'Vidya R.', duration: '12 min', tag: 'Morning', accent: ['#6a4a9c', '#3a2358'] as const, icon: <MeditationIcon />, isPlaying: true, isFav: true },
    { id: 'witness', en: 'Witness the Mind', hi: 'साक्षी भाव', teacher: 'Pandit R.', duration: '8 min', tag: 'Anytime', accent: ['#6a4a9c', '#3a2358'] as const, icon: <MeditationIcon />, isNew: true },
    { id: 'detachment', en: 'Detachment · Vairagya', hi: 'वैराग्य', teacher: 'Deepa M.', duration: '15 min', tag: 'Focus', accent: ['#6a4a9c', '#3a2358'] as const, icon: <MeditationIcon /> },
    { id: 'flame', en: 'The Steady Flame', hi: 'स्थिर दीप', teacher: 'Vidya R.', duration: '20 min', tag: 'Anxiety', accent: ['#6a4a9c', '#3a2358'] as const, icon: <MeditationIcon />, isFav: true },
    { id: 'arjuna', en: 'Arjuna\'s Doubt', hi: 'अर्जुन विषाद', teacher: 'Pandit R.', duration: '10 min', tag: 'Grief', accent: ['#6a4a9c', '#3a2358'] as const, icon: <MeditationIcon /> },
  ];

  return (
    <LibraryFrame
      hi="ध्यान" en="Meditation" count="24 sessions"
      tint="#c9a3ff"
      glow="rgba(138,94,184,0.28)"
      subtitle="Guided practices rooted in the Gita — one for every mood, from before-work stillness to before-sleep surrender."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Morning', active: false },
        { label: 'Anxiety', active: false },
        { label: 'Focus', active: false },
        { label: 'Sleep', active: false },
      ]}
    >
      {sessions.map((s, i) => (
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
