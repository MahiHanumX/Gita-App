import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme, AppTheme } from '../../../theme';
import { MandalaBG } from '../../../components/MandalaBG';
import { CTA } from '../../../components/CTA';
import { DiyaIcon } from '../../../components/Icons';
import { useNavigation } from '@react-navigation/native';

export function SessionCompleteScreen() {
  const { theme, resolvedMode } = useTheme();
  const navigation = useNavigation<any>();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isLight = resolvedMode === 'light';

  const accentColor = isLight ? theme.accentDeep : theme.accentBright;

  return (
    <View style={styles.container}>
      <MandalaBG />

      <View style={styles.content}>
        {/* Close button */}
        <View style={styles.header}>
          <Pressable style={styles.closeBtn} onPress={() => navigation.navigate('Main')}>
            <Svg width="12" height="12" viewBox="0 0 24 24">
              <Path d="M5 5 L 19 19 M 19 5 L 5 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" />
            </Svg>
          </Pressable>
        </View>

        {/* Completed Diya */}
        <View style={styles.diyaArea}>
          <View style={styles.diyaContainer}>
            <View style={[styles.pulseRing, { backgroundColor: theme.accentSoft }]} />
            <DiyaIcon size={72} color={theme.background} flameColor={theme.accentDeep} />
          </View>
        </View>

        {/* Message */}
        <View style={styles.messageArea}>
          <Text style={[styles.completeTag, { color: accentColor }]}>Session complete · पूर्ण</Text>
          <Text style={styles.messageEn}>You returned{'\n'}<Text style={{ fontStyle: 'italic', color: accentColor }}>to your breath.</Text></Text>
          <Text style={styles.messageHi}>श्वास लौट आई</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { v: '8:00', hi: 'समय', en: 'Minutes' },
            { v: '32', hi: 'श्वास', en: 'Breaths' },
            { v: '+1', hi: 'दिन', en: 'Streak day' },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={[styles.statVal, { color: accentColor }]}>{s.v}</Text>
              <Text style={styles.statEn}>{s.en}</Text>
              <Text style={styles.statHi}>{s.hi}</Text>
            </View>
          ))}
        </View>

        {/* Mood Check */}
        <View style={styles.moodArea}>
          <View style={styles.moodCard}>
            <Text style={styles.moodTitle}>How do you feel? · अभी कैसा है?</Text>
            <View style={styles.moodOptions}>
              {[
                { e: '🌫', l: 'Foggy', a: false },
                { e: '☁', l: 'Meh', a: false },
                { e: '🌤', l: 'Better', a: true },
                { e: '☀', l: 'Clear', a: false },
                { e: '✨', l: 'Radiant', a: false },
              ].map((m, i) => (
                <View key={i} style={[styles.moodOption, m.a && styles.moodOptionActive]}>
                  <Text style={[styles.moodEmoji, !m.a && { opacity: 0.5 }]}>{m.e}</Text>
                  <Text style={[styles.moodLabel, m.a ? { color: accentColor } : { color: theme.textMuted }]}>{m.l}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Actions */}
        <View style={styles.actionsArea}>
          <CTA 
            label="Save & return to Practice" 
            subLabel="अभ्यास पर लौटें" 
            onPress={() => navigation.navigate('Main')}
          />
          <Pressable style={styles.reflectBtn}>
            <Text style={[styles.reflectBtnText, { color: accentColor }]}>Add a reflection ›</Text>
          </Pressable>
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
  content: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.iconButtonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diyaArea: {
    paddingTop: 30,
    alignItems: 'center',
  },
  diyaContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.accent,
    borderWidth: 3,
    borderColor: theme.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    top: -22, left: -22, right: -22, bottom: -22,
    borderRadius: 100,
    opacity: 0.45,
  },
  messageArea: {
    paddingTop: 32,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  completeTag: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  messageEn: {
    marginTop: 14,
    fontFamily: theme.fonts.serif,
    fontSize: 30,
    color: theme.text,
    textAlign: 'center',
    lineHeight: 34,
  },
  messageHi: {
    marginTop: 12,
    fontFamily: theme.fonts.hindi,
    fontSize: 14,
    color: theme.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingTop: 32,
    paddingHorizontal: 24,
    gap: 10,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    alignItems: 'center',
  },
  statVal: {
    fontFamily: theme.fonts.serif,
    fontSize: 26,
  },
  statEn: {
    marginTop: 6,
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.text,
  },
  statHi: {
    marginTop: 1,
    fontFamily: theme.fonts.hindi,
    fontSize: 10,
    color: theme.textMuted,
  },
  moodArea: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  moodCard: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  moodTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    color: theme.text,
    marginBottom: 10,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  moodOptionActive: {
    backgroundColor: theme.accentSoft,
    borderColor: theme.accentBorder,
  },
  moodEmoji: {
    fontSize: 20,
  },
  moodLabel: {
    marginTop: 2,
    fontFamily: theme.fonts.medium,
    fontSize: 9,
  },
  actionsArea: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  reflectBtn: {
    marginTop: 8,
    padding: 12,
    alignItems: 'center',
  },
  reflectBtnText: {
    fontFamily: theme.fonts.medium,
    fontSize: 13,
  },
});
