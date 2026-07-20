import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryFrame, SessionRow, MantraBeadIcon } from '../components/PracticeUI';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function MantraLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  const mantras = [
    { en: 'Om Namah Shivaya', hi: 'ॐ नमः शिवाय', teacher: '108 beads', duration: '11 min', tag: 'Everyday', accent: ['#e8a838', '#8a5010'] as const, icon: <MantraBeadIcon />, isFav: true },
    { en: 'Gayatri Mantra', hi: 'गायत्री मंत्र', teacher: '108 beads', duration: '14 min', tag: 'Sunrise', accent: ['#e8a838', '#8a5010'] as const, icon: <MantraBeadIcon />, isPlaying: true, isFav: true },
    { en: 'Maha Mrityunjaya', hi: 'महामृत्युंजय', teacher: '108 beads', duration: '18 min', tag: 'Healing', accent: ['#e8a838', '#8a5010'] as const, icon: <MantraBeadIcon /> },
    { en: 'Hare Krishna', hi: 'हरे कृष्ण', teacher: '32 rounds', duration: '25 min', tag: 'Bhakti', accent: ['#e8a838', '#8a5010'] as const, icon: <MantraBeadIcon /> },
    { en: 'Om Mani Padme Hum', hi: 'ॐ मणि पद्मे हूँ', teacher: '108 beads', duration: '9 min', tag: 'Compassion', accent: ['#e8a838', '#8a5010'] as const, icon: <MantraBeadIcon />, isNew: true },
    { en: 'Sarveshaam Svastir', hi: 'सर्वेषां स्वस्तिः', teacher: '54 beads', duration: '6 min', tag: 'Blessing', accent: ['#e8a838', '#8a5010'] as const, icon: <MantraBeadIcon /> },
  ];

  return (
    <LibraryFrame
      hi="मंत्र जाप" en="Mantra Chanting" count="12 mantras"
      tint="#e8a838"
      glow="rgba(232,168,56,0.28)"
      subtitle="Bead-counted repetition. Each mantra carries a specific vibration — pick one and stay with it for 40 days."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Everyday', active: false },
        { label: 'Healing', active: false },
        { label: 'Bhakti', active: false },
        { label: 'Sunrise', active: false },
      ]}
    >
      {mantras.map((s, i) => (
        <SessionRow 
          key={i} 
          {...s} 
          onPress={() => navigation.navigate('MantraJaap')}
        />
      ))}
    </LibraryFrame>
  );
}
