import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme, AppTheme } from '../../../theme';
import { MandalaBG } from '../../../components/MandalaBG';
import { CTA } from '../../../components/CTA';
import { useNavigation, useRoute } from '@react-navigation/native';

export function SessionDetailScreen() {
  const { theme, resolvedMode } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isLight = resolvedMode === 'light';

  const accentColor = isLight ? theme.accentDeep : theme.accentBright;

  const titleEn = route.params?.titleEn || 'Breath of the Warrior';
  const titleHi = route.params?.titleHi || 'वीर श्वास';

  const chapters = [
    { time: '0:00', label: 'Opening invocation', hi: 'आवाहन' },
    { time: '1:30', label: 'Setting the intention', hi: 'संकल्प' },
    { time: '3:00', label: 'Warrior breath — 4 rounds', hi: 'वीर श्वास' },
    { time: '6:30', label: 'Extended hold', hi: 'कुंभक' },
    { time: '8:00', label: 'Closing · Om', hi: 'ॐ' },
  ];

  return (
    <View style={styles.container}>
      <MandalaBG />
      
      {/* Hero backdrop image area */}
      <LinearGradient
        colors={[theme.accentSoft, 'transparent']}
        style={styles.heroBackdrop}
      />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Svg width="14" height="14" viewBox="0 0 24 24">
              <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          <View style={styles.headerRight}>
            <Pressable style={styles.headerBtn}>
              <Svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <Path d="M12 4 C 8 4, 6 7, 6 10 c 0 4 6 8 6 8 s 6 -4 6 -8 c 0 -3 -2 -6 -6 -6 z" stroke={theme.text} strokeWidth="1.8" />
              </Svg>
            </Pressable>
            <Pressable style={styles.headerBtn}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <Path d="M4 12 v 8 h 16 v -8 M 12 4 v 12 M 8 8 l 4 -4 l 4 4" stroke={theme.text} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Central play badge */}
          <View style={styles.playBadgeArea}>
            <View style={styles.playBadge}>
              <View style={[styles.pulseRing, { backgroundColor: theme.accentSoft }]} />
              <Svg width="46" height="46" viewBox="0 0 24 24">
                <Path d="M8 5 v 14 l 12 -7 z" fill={theme.ctaText} />
              </Svg>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleArea}>
            <Text style={[styles.suggestedTag, { color: accentColor }]}>Suggested for today</Text>
            <Text style={styles.titleEn}>{titleEn}</Text>
            <Text style={styles.titleHi}>{titleHi}</Text>
          </View>

          {/* Meta pills */}
          <View style={styles.metaArea}>
            {[
              { icon: '⏱', label: '8 min' },
              { icon: '◔', label: 'Beginner' },
              { icon: '☾', label: 'Anytime' },
            ].map((p, i) => (
              <View key={i} style={styles.metaPill}>
                <Text style={[styles.metaPillIcon, { color: accentColor }]}>{p.icon}</Text>
                <Text style={styles.metaPillLabel}>{p.label}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View style={styles.descriptionArea}>
            <Text style={styles.descriptionText}>
              "Before Arjuna raised his bow, he steadied his breath. This practice draws from Ch. 2 — the warrior's calm before decisive action."
            </Text>
          </View>

          {/* Chapters */}
          <View style={styles.chaptersArea}>
            <Text style={styles.chaptersTitle}>Chapters · अध्याय</Text>
            <View style={styles.chaptersList}>
              {chapters.map((c, i) => (
                <View key={i} style={[styles.chapterRow, i === chapters.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={[styles.chapterTime, { color: accentColor }]}>{c.time}</Text>
                  <View style={styles.chapterInfo}>
                    <Text style={styles.chapterLabel}>{c.label}</Text>
                    <Text style={styles.chapterHi}>{c.hi}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={styles.ctaArea}>
          <CTA 
            label="Begin practice" 
            subLabel="अभ्यास प्रारंभ" 
            onPress={() => navigation.navigate('MeditationSession')} 
          />
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  heroBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 380,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.iconButtonBg,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  playBadgeArea: {
    paddingTop: 40,
    alignItems: 'center',
  },
  playBadge: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: theme.accent,
    borderWidth: 3,
    borderColor: theme.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    top: -18, left: -18, right: -18, bottom: -18,
    borderRadius: 100,
    opacity: 0.5,
  },
  titleArea: {
    paddingTop: 28,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  suggestedTag: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  titleEn: {
    marginTop: 8,
    fontFamily: theme.fonts.serif,
    fontSize: 28,
    color: theme.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  titleHi: {
    marginTop: 4,
    fontFamily: theme.fonts.hindi,
    fontSize: 16,
    color: theme.textMuted,
  },
  metaArea: {
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    gap: 5,
  },
  metaPillIcon: {
    fontSize: 12,
  },
  metaPillLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.text,
  },
  descriptionArea: {
    paddingTop: 20,
    paddingHorizontal: 32,
  },
  descriptionText: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 14,
    lineHeight: 22,
    color: theme.textMuted,
    textAlign: 'center',
  },
  chaptersArea: {
    paddingTop: 22,
    paddingHorizontal: 24,
  },
  chaptersTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  chaptersList: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 16,
    overflow: 'hidden',
  },
  chapterRow: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  chapterTime: {
    width: 44,
    fontFamily: theme.fonts.heading,
    fontSize: 12,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 13,
    color: theme.text,
  },
  chapterHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 11,
    color: theme.textMuted,
    marginTop: 1,
  },
  ctaArea: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
});
