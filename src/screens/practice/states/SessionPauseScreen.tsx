import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme, AppTheme } from '../../../theme';
import { MandalaBG } from '../../../components/MandalaBG';
import { CTA } from '../../../components/CTA';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function SessionPauseScreen() {
  const { theme, resolvedMode } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isLight = resolvedMode === 'light';

  return (
    <View style={styles.container}>
      <MandalaBG opacity={isLight ? 0.05 : 0.03} />
      <View style={styles.scrim} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Svg width="12" height="12" viewBox="0 0 24 24">
              <Path d="M5 5 L 19 19 M 19 5 L 5 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" />
            </Svg>
          </Pressable>
        </View>

        {/* Paused label */}
        <View style={styles.titleArea}>
          <Text style={styles.pausedTag}>Paused · विराम</Text>
          <Text style={styles.titleEn}>Breath of the Warrior</Text>
          <Text style={styles.titleHi}>वीर श्वास</Text>
        </View>

        {/* Time card */}
        <View style={styles.timeCardArea}>
          <View style={styles.timeCard}>
            <Text style={styles.timeBig}>3:12</Text>
            <Text style={styles.timeSub}>of 8:00 · 40% complete</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%', backgroundColor: theme.accent }]} />
            </View>
          </View>
        </View>

        {/* Verse */}
        <View style={styles.verseArea}>
          <View style={[styles.verseCard, { backgroundColor: theme.surfaceSoft }]}>
            <Text style={styles.verseTag}>Rest in this · विश्राम</Text>
            <Text style={styles.verseText}>
              "When your intellect crosses beyond the tangle of delusion — then you will attain indifference to what is heard and what is yet to be heard."
            </Text>
            <Text style={styles.verseSource}>— Bhagavad Gita 2.52</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Controls */}
        <View style={styles.controlsArea}>
          <CTA 
            label="Continue" 
            onPress={() => navigation.goBack()} 
          />
          <View style={styles.secondaryControls}>
            <Pressable style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Restart</Text>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate('SessionComplete')}>
              <Text style={styles.secondaryBtnText}>End session</Text>
            </Pressable>
          </View>
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
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,16,43,0.55)',
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
  titleArea: {
    paddingTop: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  pausedTag: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accentBright,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  titleEn: {
    marginTop: 12,
    fontFamily: theme.fonts.serif,
    fontSize: 28,
    color: theme.text,
  },
  titleHi: {
    marginTop: 4,
    fontFamily: theme.fonts.hindi,
    fontSize: 14,
    color: theme.textMuted,
  },
  timeCardArea: {
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  timeCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    alignItems: 'center',
  },
  timeBig: {
    fontFamily: theme.fonts.serif,
    fontSize: 56,
    color: theme.text,
    letterSpacing: -2,
    lineHeight: 60,
  },
  timeSub: {
    marginTop: 4,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
  },
  progressBar: {
    marginTop: 16,
    height: 4,
    width: '100%',
    borderRadius: 2,
    backgroundColor: theme.progressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  verseArea: {
    paddingTop: 22,
    paddingHorizontal: 24,
  },
  verseCard: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.accentBorder,
  },
  verseTag: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    color: theme.accentBright,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  verseText: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 14,
    lineHeight: 22,
    color: theme.text,
  },
  verseSource: {
    marginTop: 8,
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.accentBright,
  },
  controlsArea: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  secondaryControls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  secondaryBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 14,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: theme.fonts.medium,
    fontSize: 13,
    color: theme.text,
  },
});
