import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';
import { LightShell } from '../../components/LightShell';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { DiyaIcon } from '../../components/DiyaIcon';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Reminder'>;

export function ReminderScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const active = [1, 1, 1, 1, 1, 0, 1];

  return (
    <LightShell glow={false}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View style={styles.headerTitles}>
          <Text style={styles.titleHi}>दैनिक स्मरण</Text>
          <Text style={styles.titleEn}>Daily Reminder</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Time picker */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ring the bell at</Text>
          <LinearGradient
            colors={[theme.accentSoft, theme.surface]}
            style={styles.timeBox}
          >
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>7:00</Text>
              <Text style={styles.amPmText}>AM</Text>
            </View>
            <Text style={styles.timeHint}>brahma muhurta · brahma मुहूर्त</Text>
          </LinearGradient>
        </View>

        {/* Days of week */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Repeat</Text>
          <View style={styles.daysRow}>
            {days.map((d, i) => {
              const isActive = active[i] === 1;
              return (
                <View key={i} style={{ flex: 1 }}>
                  {isActive ? (
                    <LinearGradient
                      colors={[theme.accentBright || '#ffe08a', theme.accentDeep || '#e8a838']}
                      style={[styles.dayCircle, styles.dayCircleActive]}
                    >
                      <Text style={[styles.dayText, styles.dayTextActive]}>{d}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                      <Text style={[styles.dayText, styles.dayTextInactive]}>{d}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <View style={styles.prefCard}>
            <ReminderOpt label="Sound" value="Temple bell · मंदिर घंटा" chevron theme={theme} styles={styles} />
            <ReminderOpt label="Gentle 3-min pre-bell" toggle on divider={false} theme={theme} styles={styles} />
          </View>
        </View>

        {/* Preview */}
        <View style={[styles.section, { flex: 1, paddingBottom: 40 }]}>
          <Text style={styles.sectionLabel}>Preview</Text>
          <MiniNotif theme={theme} styles={styles} />
        </View>
      </ScrollView>

      {/* CTA Bottom */}
      <View style={styles.ctaContainer}>
        <Pressable style={styles.ctaBtn}>
          <Text style={styles.ctaBtnText}>Save Reminder</Text>
          <Text style={styles.ctaBtnSub}>स्मरण सहेजें</Text>
        </Pressable>
      </View>
    </LightShell>
  );
}

function ReminderOpt({ label, value, chevron, toggle, on, divider = true, theme, styles }: any) {
  return (
    <View style={[styles.optRow, divider && styles.optDivider]}>
      <Text style={styles.optLabel}>{label}</Text>
      {value && <Text style={styles.optValue}>{value}</Text>}
      {toggle && (
        <View style={[styles.toggleBg, on && styles.toggleBgOn]}>
          <View style={[styles.toggleKnob, on && styles.toggleKnobOn]} />
        </View>
      )}
      {chevron && (
        <Svg width="7" height="12" viewBox="0 0 8 14">
          <Path d="M1 1 L 7 7 L 1 13" stroke={theme.textMuted} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}
    </View>
  );
}

function MiniNotif({ theme, styles }: any) {
  return (
    <View style={styles.notifCard}>
      <LinearGradient colors={[theme.accentBright || '#f4c257', theme.accentDeep || '#c67a1a']} style={styles.notifIconWrap}>
        <DiyaIcon size={20} color={theme.surface} flameColor="#ffffff" />
      </LinearGradient>
      <View style={styles.notifBody}>
        <View style={styles.notifHeaderRow}>
          <Text style={styles.notifTitle}>Deep</Text>
          <Text style={styles.notifTime}>now</Text>
        </View>
        <Text style={styles.notifText}>
          Day 14 is ready — the lamp waits.{'\n'}
          <Text style={styles.notifTextHi}>दीप प्रतीक्षा में है।</Text>
        </Text>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: { flex: 1 },
  titleHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 13,
    color: theme.textMuted,
  },
  titleEn: {
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    color: theme.text,
  },
  scrollContent: {
    paddingTop: 8,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  timeBox: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.accentBorder,
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
  },
  timeText: {
    fontFamily: theme.fonts.serif,
    fontSize: 80,
    lineHeight: 88,
    color: theme.text,
    letterSpacing: -3,
  },
  amPmText: {
    fontFamily: theme.fonts.medium,
    fontSize: 22,
    color: theme.accent,
    marginLeft: 6,
  },
  timeHint: {
    marginTop: 12,
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dayCircle: {
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleActive: {
    elevation: 4,
    shadowColor: theme.accent,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  dayCircleInactive: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  dayText: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
  },
  dayTextActive: {
    color: theme.surface,
  },
  dayTextInactive: {
    color: theme.textMuted,
  },
  prefCard: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 18,
    overflow: 'hidden',
  },
  optRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  optLabel: {
    flex: 1,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  optValue: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
  },
  toggleBg: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.cardBorder,
    padding: 2,
    justifyContent: 'center',
  },
  toggleBgOn: {
    backgroundColor: theme.accent,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleKnobOn: {
    transform: [{ translateX: 18 }],
  },
  notifCard: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: {
    flex: 1,
  },
  notifHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  notifTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 13,
    color: theme.text,
  },
  notifTime: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
  notifText: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.text,
    lineHeight: 18,
    marginTop: 2,
  },
  notifTextHi: {
    color: theme.accent,
    fontStyle: 'italic',
  },
  ctaContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
  },
  ctaBtn: {
    backgroundColor: theme.text,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnText: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
    color: theme.background,
  },
  ctaBtnSub: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 12,
    color: theme.background,
    opacity: 0.7,
  },
});
