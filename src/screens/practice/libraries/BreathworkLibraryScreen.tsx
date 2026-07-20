import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryFrame, SessionRow, BreathIcon } from '../components/PracticeUI';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function BreathworkLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  const techniques = [
    { id: 'nadi', en: 'Nadi Shodhana', hi: 'नाड़ी शोधन', teacher: 'Alternate nostril', duration: '8 min', tag: 'Balance', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon />, isFav: true, isPlaying: true },
    { id: 'bhramari', en: 'Bhramari · Bee Breath', hi: 'भ्रामरी', teacher: 'Humming', duration: '6 min', tag: 'Calm', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon /> },
    { id: 'kapalabhati', en: 'Kapalabhati', hi: 'कपालभाति', teacher: 'Skull-shining', duration: '5 min', tag: 'Energize', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon /> },
    { id: 'ujjayi', en: 'Ujjayi · Victorious', hi: 'उज्जायी', teacher: 'Ocean breath', duration: '10 min', tag: 'Focus', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon /> },
    { id: 'sheetali', en: 'Sheetali · Cooling', hi: 'शीतली', teacher: 'Tongue breath', duration: '7 min', tag: 'Anger', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon />, isNew: true },
    { id: 'box', en: 'Box breath 4-4-4-4', hi: 'बॉक्स श्वास', teacher: 'Beginner', duration: '4 min', tag: 'Anxiety', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon /> },
  ];

  return (
    <LibraryFrame
      hi="प्राणायाम" en="Breathwork" count="8 techniques"
      tint="#7fd196"
      glow="rgba(95,200,180,0.24)"
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
