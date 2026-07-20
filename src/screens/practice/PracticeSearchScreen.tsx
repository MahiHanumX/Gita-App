import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme, AppTheme } from '../../theme';
import { MandalaBG } from '../../components/MandalaBG';
import { SessionRow, BreathIcon, MeditationIcon } from './components/PracticeUI';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export function PracticeSearchScreen() {
  const { theme, resolvedMode } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isLight = resolvedMode === 'light';

  const results = [
    { id: 'nadi', en: 'Nadi Shodhana', hi: 'नाड़ी शोधन', teacher: 'Alternate nostril', duration: '8 min', tag: 'Anxiety', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon />, isFav: true },
    { id: 'box', en: 'Box breath 4-4-4-4', hi: 'बॉक्स श्वास', teacher: 'Beginner', duration: '4 min', tag: 'Anxiety', accent: ['#4fb59f', '#1a3d3a'] as const, icon: <BreathIcon /> },
    { id: 'flame', en: 'The Steady Flame', hi: 'स्थिर दीप', teacher: 'Vidya R.', duration: '20 min', tag: 'Anxiety', accent: ['#6a4a9c', '#3a2358'] as const, icon: <MeditationIcon /> },
  ];
  
  const moods = [
    { hi: 'चिंतित', en: 'Anxious', a: true },
    { hi: 'क्रोध', en: 'Angry', a: false },
    { hi: 'उदास', en: 'Sad', a: false },
    { hi: 'बेचैन', en: 'Restless', a: false },
    { hi: 'थका', en: 'Tired', a: false },
    { hi: 'खुश', en: 'Grateful', a: false },
  ];

  return (
    <View style={styles.container}>
      <MandalaBG opacity={isLight ? 0.08 : 0.04} />
      
      <View style={styles.content}>
        {/* Header with Search Bar */}
        <View style={styles.header}>
          <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Svg width="14" height="14" viewBox="0 0 24 24">
              <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          
          <View style={styles.searchBar}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Circle cx="11" cy="11" r="7" stroke={theme.accentBright} strokeWidth="1.8" />
              <Path d="M16 16 l 5 5" stroke={theme.accentBright} strokeWidth="1.8" strokeLinecap="round" />
            </Svg>
            <TextInput
              style={styles.searchInput}
              value="anxious"
              placeholderTextColor={theme.textMuted}
            />
            <Pressable style={styles.clearBtn}>
              <Svg width="8" height="8" viewBox="0 0 24 24">
                <Path d="M5 5 L 19 19 M 19 5 L 5 19" stroke={theme.text} strokeWidth="3" strokeLinecap="round" />
              </Svg>
            </Pressable>
          </View>
        </View>

        {/* Mood Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling? · भाव</Text>
          <View style={styles.moodGrid}>
            {moods.map((m, i) => (
              <LinearGradient
                key={i}
                colors={m.a ? theme.ctaGradient : [theme.surfaceSoft, theme.surfaceSoft]}
                style={[styles.moodChip, !m.a && styles.moodChipInactive]}
              >
                <Text style={[styles.moodChipHi, m.a ? { color: theme.ctaText } : { color: theme.text }]}>{m.hi}</Text>
                <Text style={[styles.moodChipDot, m.a ? { color: theme.ctaText } : { color: theme.text }]}>·</Text>
                <Text style={[styles.moodChipEn, m.a ? { color: theme.ctaText } : { color: theme.text }]}>{m.en}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Duration Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time you have · समय</Text>
          <View style={styles.durationGrid}>
            {['Any', '< 5 min', '5-15', '15-30', '30+'].map((d, i) => (
              <View 
                key={i} 
                style={[
                  styles.durationChip, 
                  i === 2 ? { backgroundColor: theme.accentSoft, borderColor: theme.accentBorder } : { backgroundColor: theme.surfaceSoft, borderColor: theme.cardBorder }
                ]}
              >
                <Text style={[styles.durationChipText, i === 2 ? { color: theme.accentBright } : { color: theme.text }]}>{d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Results */}
        <ScrollView style={styles.resultsArea} contentContainerStyle={styles.resultsContent} showsVerticalScrollIndicator={false}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>3 practices for you</Text>
            <Text style={styles.sortText}>Sort</Text>
          </View>
          
          {results.map((s, i) => (
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
        </ScrollView>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.iconButtonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.accentBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.text,
    padding: 0,
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.iconButtonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    gap: 6,
  },
  moodChipInactive: {
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  moodChipHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 12,
  },
  moodChipDot: {
    fontSize: 12,
    opacity: 0.6,
  },
  moodChipEn: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
  },
  durationGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  durationChip: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  durationChipText: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
  },
  resultsArea: {
    flex: 1,
    marginTop: 22,
  },
  resultsContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  sortText: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.accentBright,
  },
});
