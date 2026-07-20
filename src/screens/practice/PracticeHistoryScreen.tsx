import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme, AppTheme } from '../../theme';
import { MandalaBG } from '../../components/MandalaBG';
import { useNavigation } from '@react-navigation/native';

export function PracticeHistoryScreen() {
  const { theme, resolvedMode } = useTheme();
  const navigation = useNavigation();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isLight = resolvedMode === 'light';

  // 12 weeks of practice minutes (mock data)
  const weeks = Array.from({ length: 12 }).map((_, i) => {
    const s = Math.sin(i * 4.2) * 43758.5;
    const r = s - Math.floor(s);
    return Math.floor(30 + r * 90); // 30-120 min
  });
  const max = Math.max(...weeks);

  const breakdown = [
    { hi: 'ध्यान', en: 'Meditation', min: 186, pct: 42, color: '#8a5eb8' },
    { hi: 'मंत्र', en: 'Mantra', min: 124, pct: 28, color: '#e8a838' },
    { hi: 'प्राणायाम', en: 'Breathwork', min: 89, pct: 20, color: '#4fb59f' },
    { hi: 'निद्रा', en: 'Yoga Nidra', min: 42, pct: 10, color: '#4a7c99' },
  ];

  return (
    <View style={styles.container}>
      <MandalaBG opacity={isLight ? 0.08 : 0.04} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Svg width="14" height="14" viewBox="0 0 24 24">
              <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          <View style={styles.headerTitleArea}>
            <Text style={styles.headerTitle}>Practice History</Text>
            <Text style={styles.headerSubtitle}>अभ्यास इतिहास</Text>
          </View>
          <Pressable style={styles.headerBtn}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <Path d="M12 4 v 12 M 7 11 l 5 5 l 5 -5 M 4 20 h 16" stroke={theme.text} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Headline Stat */}
          <View style={styles.section}>
            <LinearGradient
              colors={[theme.accentSoft, theme.surfaceSoft]}
              style={styles.statCard}
            >
              <Text style={styles.statLabel}>Total time in practice</Text>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>7h 21m</Text>
                <View style={styles.statBadge}>
                  <Text style={styles.statBadgeText}>↑ 34%</Text>
                </View>
              </View>
              <Text style={styles.statCompare}>vs the 12 weeks before · 441 min total</Text>
            </LinearGradient>
          </View>

          {/* Bar Chart */}
          <View style={styles.section}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Last 12 weeks</Text>
              <View style={styles.chartTabs}>
                {['Week', 'Month', 'Year'].map((t, i) => (
                  <View key={i} style={[styles.chartTab, i === 0 && { backgroundColor: theme.accentSoft }]}>
                    <Text style={[styles.chartTabText, i === 0 ? { color: theme.accentBright } : { color: theme.textMuted }]}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.chartArea}>
              {weeks.map((v, i) => (
                <View key={i} style={styles.chartBarWrapper}>
                  {i === 11 && (
                    <View style={[styles.chartTooltip, { backgroundColor: theme.accentBright }]}>
                      <Text style={[styles.chartTooltipText, { color: theme.background }]}>{v}m</Text>
                    </View>
                  )}
                  <LinearGradient
                    colors={i === 11 ? theme.ctaGradient : [theme.accentBorder, theme.accentSoft]}
                    style={[styles.chartBar, { height: `${(v / max) * 100}%` }]}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Breakdown */}
          <View style={[styles.section, styles.breakdownSection]}>
            <Text style={styles.chartTitle}>By practice · अभ्यास अनुसार</Text>
            {breakdown.map((b, i) => (
              <View key={i} style={styles.breakdownRow}>
                <View style={styles.breakdownInfo}>
                  <View style={[styles.breakdownDot, { backgroundColor: b.color }]} />
                  <Text style={styles.breakdownEn}>{b.en}</Text>
                  <Text style={styles.breakdownHi}>{b.hi}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={styles.breakdownMin}>{b.min} min</Text>
                  <Text style={styles.breakdownPct}>{b.pct}%</Text>
                </View>
                <View style={styles.breakdownTrack}>
                  <View style={[styles.breakdownFill, { width: `${b.pct}%`, backgroundColor: b.color }]} />
                </View>
              </View>
            ))}
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleArea: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
    color: theme.text,
  },
  headerSubtitle: {
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.textMuted,
    marginTop: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  statCard: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.accentBorder,
  },
  statLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accentBright,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginTop: 6,
  },
  statValue: {
    fontFamily: theme.fonts.serif,
    fontSize: 52,
    color: theme.text,
    letterSpacing: -2,
    lineHeight: 52,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(127,209,150,0.15)',
  },
  statBadgeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: '#7fd196',
  },
  statCompare: {
    marginTop: 4,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  chartTabs: {
    flexDirection: 'row',
    gap: 4,
  },
  chartTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  chartTabText: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
  },
  chartArea: {
    paddingTop: 18,
    paddingHorizontal: 12,
    paddingBottom: 14,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 140,
  },
  chartBarWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chartBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 12,
  },
  chartTooltip: {
    position: 'absolute',
    top: -18,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    zIndex: 10,
  },
  chartTooltipText: {
    fontFamily: theme.fonts.heading,
    fontSize: 9,
  },
  breakdownSection: {
    flex: 1,
  },
  breakdownRow: {
    marginBottom: 10,
  },
  breakdownInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  breakdownDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breakdownEn: {
    fontFamily: theme.fonts.medium,
    fontSize: 13,
    color: theme.text,
  },
  breakdownHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 11,
    color: theme.textMuted,
  },
  breakdownMin: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: theme.text,
  },
  breakdownPct: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
    width: 32,
    textAlign: 'right',
  },
  breakdownTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.progressTrack,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    borderRadius: 2,
  },
});
