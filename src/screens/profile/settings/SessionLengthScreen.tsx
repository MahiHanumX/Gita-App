import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRadioRow } from '../components/SettingsUI';
import { DiyaIcon } from '../../../components/Icons';

export function SessionLengthScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const options = [
    { title: 'Brief', hi: 'क्षणिक', sub: 'Just 5 minutes — a lit match', min: 5, active: false },
    { title: 'Gentle', hi: 'सौम्य', sub: 'A comfortable start', min: 7, active: false },
    { title: 'Steady', hi: 'स्थिर', sub: 'The full daily reading + task', min: 10, active: true },
    { title: 'Deep', hi: 'गहन', sub: 'Includes extra reflection time', min: 15, active: false },
    { title: 'Complete', hi: 'सम्पूर्ण', sub: 'Full study + audio recitation', min: 25, active: false },
  ];

  return (
    <SettingsPageFrame title="Session length" hi="अभ्यास अवधि">
      <LinearGradient
        colors={[theme.accentSoft, 'transparent']}
        style={styles.heroCard}
      >
        <LinearGradient
          colors={[theme.accentBright, theme.accent]}
          style={styles.heroIconBox}
        >
          <DiyaIcon size={28} color={theme.background} flameColor={theme.accentDeep} />
        </LinearGradient>
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroTag}>Right now</Text>
          <Text style={styles.heroValue}>Steady · 10 minutes</Text>
          <Text style={styles.heroSub}>You've kept this for 12 days</Text>
        </View>
      </LinearGradient>

      <SettingsGroup title="Choose a rhythm">
        {options.map((o, i) => (
          <SettingsRadioRow
            key={o.title}
            title={o.title}
            hi={o.hi}
            subtitle={o.sub}
            active={o.active}
            divider={i < options.length - 1}
            right={
              <View style={[styles.minBadge, o.active && styles.minBadgeActive]}>
                <Text style={[styles.minBadgeText, o.active && styles.minBadgeTextActive]}>{o.min} min</Text>
              </View>
            }
          />
        ))}
      </SettingsGroup>

      <SettingsGroup title="On busy days" footnote="If you skip your chosen length, a brief 3-minute version will offer itself instead of nothing.">
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextWrap}>
            <Text style={styles.toggleTitle}>Allow "3-minute rescue"</Text>
            <Text style={styles.toggleHi}>तीन-मिनट का बचाव</Text>
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
  heroCard: {
    marginHorizontal: 4,
    marginBottom: 20,
    marginTop: 4,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.accentBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: theme.accent,
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  heroTextWrap: {
    flex: 1,
  },
  heroTag: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accentDeep,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroValue: {
    marginTop: 2,
    fontFamily: theme.fonts.heading,
    fontSize: 15,
    color: theme.text,
  },
  heroSub: {
    marginTop: 1,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
  },
  minBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: theme.surfaceSoft,
  },
  minBadgeActive: {
    backgroundColor: theme.accent,
  },
  minBadgeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    color: theme.textMuted,
    letterSpacing: 0.3,
  },
  minBadgeTextActive: {
    color: theme.textOnAccent,
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
  toggleHi: {
    marginTop: 1,
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.textMuted,
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
