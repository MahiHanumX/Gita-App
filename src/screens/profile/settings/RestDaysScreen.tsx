import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRadioRow } from '../components/SettingsUI';

export function RestDaysScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const days = [
    { l: 'M', hi: 'सो', active: false },
    { l: 'T', hi: 'मं', active: false },
    { l: 'W', hi: 'बु', active: false },
    { l: 'T', hi: 'गु', active: false },
    { l: 'F', hi: 'शु', active: false },
    { l: 'S', hi: 'श', active: false },
    { l: 'S', hi: 'र', active: true },
  ];

  return (
    <SettingsPageFrame title="Rest days" hi="विश्राम दिवस">
      <View style={styles.quoteArea}>
        <Text style={styles.quoteText}>
          "Rest is not the opposite of practice — it is part of it. Even Arjuna paused between arrows."
        </Text>
      </View>

      <SettingsGroup title="Weekly pattern">
        <View style={styles.daysRow}>
          {days.map((d, i) => (
            <View key={i} style={styles.dayCol}>
              <LinearGradient
                colors={d.active ? [theme.accentBright, theme.accent] : [theme.surface, theme.surface]}
                style={[styles.dayBox, !d.active && styles.dayBoxInactive]}
              >
                <Text style={[styles.dayLabel, d.active ? { color: theme.textOnAccent } : { color: theme.textMuted }]}>{d.l}</Text>
              </LinearGradient>
              <Text style={[styles.dayHi, d.active ? { color: theme.accentDeep } : { color: theme.textMuted, opacity: 0.4 }]}>{d.hi}</Text>
            </View>
          ))}
        </View>
      </SettingsGroup>

      <SettingsGroup title="Presets">
        <SettingsRadioRow title="No rest days" subtitle="Practice every day" active={false} />
        <SettingsRadioRow title="Sunday only" hi="रविवार" subtitle="Traditional weekly pause" active={true} />
        <SettingsRadioRow title="Weekends" subtitle="Saturday & Sunday" active={false} />
        <SettingsRadioRow title="Ekadashi days" hi="एकादशी" subtitle="Twice a month · lunar" divider={false} active={false} />
      </SettingsGroup>

      <SettingsGroup footnote="Streak is preserved through rest days — Krishna doesn't count against you for what you chose to pause.">
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextWrap}>
            <Text style={styles.toggleTitle}>Rest days count for streak</Text>
          </View>
          <View style={styles.toggleTrackOn}>
            <View style={styles.toggleThumbOn} />
          </View>
        </View>
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  quoteArea: {
    paddingHorizontal: 4,
    paddingBottom: 18,
    paddingTop: 4,
  },
  quoteText: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 13.5,
    lineHeight: 21,
    color: theme.textMuted,
  },
  daysRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 8,
  },
  dayCol: {
    flex: 1,
    alignItems: 'center',
  },
  dayBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBoxInactive: {
    borderWidth: 1.5,
    borderColor: theme.cardBorder,
  },
  dayLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
  },
  dayHi: {
    marginTop: 6,
    fontFamily: theme.fonts.hindi,
    fontSize: 11,
  },
  toggleRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  toggleTextWrap: {
    flex: 1,
  },
  toggleTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  toggleTrackOn: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.accent,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumbOn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.textOnAccent,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOpacity: 1,
    shadowRadius: 4,
    transform: [{ translateX: 18 }],
  },
});
