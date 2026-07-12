import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { LightShell } from '../../components/LightShell';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';
import { useUserProfile } from '../../api_data/hooks';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Journey'>;

export function JourneyScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { data: profile } = useUserProfile();
  const entries = profile?.journeyEntries || [];

  return (
    <LightShell glow={false}>
        <View style={styles.header}>

          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          <View style={styles.headerTitles}>
            <Text style={styles.titleHi}>यात्रा</Text>
            <Text style={styles.titleEn}>Journey · Your reflections</Text>
          </View>
          <Pressable style={styles.noteBtn}>
            <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <Path d="M12 3 v 18 M 3 12 h 18" stroke={theme.textOnAccent} strokeWidth="2" strokeLinecap="round" />
            </Svg>
            <Text style={styles.noteBtnText}>Note</Text>
          </Pressable>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {['All', 'This week', 'Milestones', 'Notes'].map((t, i) => (
              <View key={t} style={[styles.filterChip, i === 0 && styles.filterChipActive]}>
                <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{t}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.timelineContainer}>
          <LinearGradient
            colors={[theme.accentSoft, theme.surfaceSoft]}
            style={styles.verticalLine}
          />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.timelineScroll}>
            {entries.map((e) => (
              <TimelineEntry key={e.day} {...e} />
            ))}
          </ScrollView>
        </View>
    </LightShell>
  );
}

function TimelineEntry({ day, date, hi, en, quote, mood, skipped }: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.entryRow}>
      <View style={[styles.dayCircleWrap, skipped && styles.dayCircleWrapSkipped]}>
        <View style={[styles.dayCircle, skipped && styles.dayCircleSkipped]}>
          {!skipped && (
            <LinearGradient colors={[theme.accentBright, theme.accentDeep]} style={[StyleSheet.absoluteFillObject, { borderRadius: 16 }]} />
          )}
          <Text style={[styles.dayText, skipped && styles.dayTextSkipped]}>{day}</Text>
        </View>
      </View>
      
      <View style={[styles.entryCard, skipped && styles.entryCardSkipped]}>
        <View style={styles.entryMeta}>
          <Text style={styles.entryDate}>{date}</Text>
          {mood && <Text style={styles.entryMood}>· felt {mood}</Text>}
        </View>
        {!skipped ? (
          <>
            <View style={styles.entryTitleRow}>
              <Text style={styles.entryHi}>{hi}</Text>
              <Text style={styles.entryEn}>{en}</Text>
            </View>
            {quote && (
              <View style={styles.quoteWrap}>
                <Text style={styles.quoteText}>"{quote}"</Text>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.skippedText}>Rest day — {hi} · {en}</Text>
        )}
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.background },
  content: { flex: 1, zIndex: 2 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surfaceSoft,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.06)',
    shadowOpacity: 1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitles: { flex: 1 },
  titleHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 26,
    lineHeight: 30,
    color: theme.text,
  },
  titleEn: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.textMuted,
    marginTop: 2,
  },
  noteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.accent,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.06)',
    shadowOpacity: 1,
    shadowRadius: 8,
    gap: 6,
  },
  noteBtnText: {
    fontFamily: theme.fonts.medium,
    fontSize: 13,
    color: theme.textOnAccent,
  },
  filterRow: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    backgroundColor: 'transparent',
  },
  filterChipActive: {
    borderColor: 'transparent',
    backgroundColor: theme.accent,
  },
  filterText: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: theme.text,
  },
  filterTextActive: {
    color: theme.textOnAccent,
  },
  timelineContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 24,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 40,
    width: 2,
  },
  timelineScroll: {
    paddingBottom: 40,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 20,
  },
  dayCircleWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.surface,
    elevation: 4,
    shadowColor: 'rgba(232,168,56,0.35)',
    shadowOpacity: 1,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    zIndex: 2,
    backgroundColor: theme.surface,
  },
  dayCircleWrapSkipped: {
    borderWidth: 1.5,
    borderColor: theme.cardBorder,
    borderStyle: 'dashed',
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: theme.surfaceSoft,
  },
  dayCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dayCircleSkipped: {},
  dayText: {
    fontFamily: theme.fonts.serif,
    fontSize: 13,
    color: theme.textOnAccent,
    zIndex: 2,
  },
  dayTextSkipped: {
    color: theme.textMuted,
  },
  entryCard: {
    flex: 1,
    backgroundColor: theme.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.05)',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  entryCardSkipped: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderStyle: 'dashed',
    paddingVertical: 10,
    elevation: 0,
    shadowOpacity: 0,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entryDate: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accent,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  entryMood: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.textMuted,
  },
  entryTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  entryHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 16,
    color: theme.text,
  },
  entryEn: {
    fontFamily: theme.fonts.medium,
    fontSize: 13,
    color: theme.textMuted,
  },
  quoteWrap: {
    marginTop: 8,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: theme.accentSoft,
  },
  quoteText: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 14,
    color: theme.textMuted,
    lineHeight: 20,
  },
  skippedText: {
    marginTop: 4,
    fontFamily: theme.fonts.medium,
    fontSize: 13,
    color: theme.textMuted,
    fontStyle: 'italic',
  },
});
