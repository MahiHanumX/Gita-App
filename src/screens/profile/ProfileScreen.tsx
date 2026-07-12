import { useState, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LightShell } from '../../components/LightShell';
import { LanguagePicker } from '../../components/LanguagePicker';
import { useUserProfile } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

export function ProfileScreen({ navigation }: Props) {
  const { data: profile } = useUserProfile();
  const t = useTranslation();
  const { theme, resolvedMode, toggleMode } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  if (!profile) return null;

  return (
    <LightShell
      glow={false}
      title={t.profile.you}
      rightSlot={
        <View style={styles.topActions}>
          {/* Theme toggle: sun in dark mode, moon in light mode */}
          <Pressable
            onPress={toggleMode}
            style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.7 }]}
            accessibilityLabel="Toggle theme"
          >
            {resolvedMode === 'dark' ? (
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="4" stroke={theme.text} strokeWidth="1.8" />
                <Path
                  d="M12 2 v 2 M 12 20 v 2 M 2 12 h 2 M 20 12 h 2 M 4.93 4.93 l 1.41 1.41 M 17.66 17.66 l 1.41 1.41 M 4.93 19.07 l 1.41 -1.41 M 17.66 6.34 l 1.41 -1.41"
                  stroke={theme.text}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </Svg>
            ) : (
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke={theme.text}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </Pressable>

          {/* Settings sliders */}
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.7 }]}
            accessibilityLabel="Open settings"
          >
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M3 6 h18" stroke={theme.text} strokeWidth="1.8" strokeLinecap="round" />
              <Circle cx="8" cy="6" r="2.2" fill={theme.background} stroke={theme.text} strokeWidth="1.8" />
              <Path d="M3 12 h18" stroke={theme.text} strokeWidth="1.8" strokeLinecap="round" />
              <Circle cx="16" cy="12" r="2.2" fill={theme.background} stroke={theme.text} strokeWidth="1.8" />
              <Path d="M3 18 h18" stroke={theme.text} strokeWidth="1.8" strokeLinecap="round" />
              <Circle cx="11" cy="18" r="2.2" fill={theme.background} stroke={theme.text} strokeWidth="1.8" />
            </Svg>
          </Pressable>
        </View>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.profileRow}>
            <LinearGradient colors={[theme.accentBright, theme.accentDeep]} style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.avatarInitial}</Text>
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.subtitle}>{profile.subtitle}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {profile.stats.map((stat) => (
              <StatCard
                key={stat.id}
                {...stat}
                onPress={() => {
                  if (stat.label === 'Reflections') navigation.navigate('Journey');
                }}
              />
            ))}
          </View>

          <View style={styles.heatmapSection}>
            <Text style={styles.heatmapLabel}>
              {t.profile.practiceHeatmap} · {profile.heatmapWeeks} {t.common.weeks}
            </Text>
            <View style={styles.heatmapBox}>
              <View style={styles.heatmapGrid}>
                {profile.heatmapData.map((level, idx) => {
                  const heatColors = [
                    theme.progressTrack,
                    theme.accentSoft,
                    theme.accentBorder,
                    theme.accent,
                  ];
                  return (
                    <View
                      key={idx}
                      style={[styles.heatCell, { backgroundColor: heatColors[level] || heatColors[0] }]}
                    />
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.badgesSection}>
            <View style={styles.badgesHeader}>
              <Text style={styles.badgesLabel}>Badges</Text>
              <Text style={styles.badgesSeeAll}>See all →</Text>
            </View>
            <View style={styles.badgesRow}>
              <BadgeChip day={7} label="Karma" hindi="कर्म" earned />
              <BadgeChip day={21} label="Bhakti" hindi="भक्ति" />
              <BadgeChip day={40} label="Journey" hindi="यात्रा" />
              <BadgeChip icon="fire" label="30-day" hindi="अग्नि" earned mini />
            </View>
          </View>

          <View style={{ paddingBottom: 32 }}>
            <LanguagePicker />
          </View>
        </ScrollView>
    </LightShell>
  );
}

function StatCard({
  value,
  label,
  hindi,
  accent,
  onPress,
}: {
  value: string;
  label: string;
  hindi: string;
  accent?: boolean;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const Component = onPress ? Pressable : View;
  return (
    <Component onPress={onPress} style={[styles.statCard, accent && styles.statCardAccent]}>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {label !== hindi ? <Text style={styles.statHindi}>{hindi}</Text> : null}
    </Component>
  );
}

function BadgeChip({ day, label, hindi, earned, mini, icon }: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={[styles.badgeChip, earned && styles.badgeChipEarned]}>
      <View style={[styles.badgeIconWrap, earned && styles.badgeIconWrapEarned]}>
        <Text style={[styles.badgeIconText, earned && styles.badgeIconTextEarned]}>
          {icon === 'fire' ? '🔥' : day}
        </Text>
      </View>
      <Text style={[styles.badgeLabel, earned && styles.badgeLabelEarned]}>{label}</Text>
      <Text style={[styles.badgeHindi, earned && styles.badgeHindiEarned]}>{hindi}</Text>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: theme.fonts.serif,
    fontSize: 28,
    color: theme.textOnAccent,
  },
  name: {
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    color: theme.text,
  },
  subtitle: {
    fontFamily: theme.fonts.hindi,
    fontSize: 14,
    color: theme.accent,
    marginTop: 2,
  },
  statsRow: {
    paddingHorizontal: 24,
    paddingTop: 22,
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  statCardAccent: {
    backgroundColor: theme.accentSoft,
    borderColor: theme.accentBorder,
  },
  statValue: {
    fontFamily: theme.fonts.heading,
    fontSize: 22,
    color: theme.text,
  },
  statValueAccent: { color: theme.accent },
  statLabel: {
    marginTop: 2,
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.textMuted,
  },
  statHindi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 11,
    color: theme.textMuted,
  },
  heatmapSection: { paddingHorizontal: 24, paddingTop: 18 },
  heatmapLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heatmapBox: {
    padding: 14,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 16,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  heatCell: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  badgesSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  badgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgesLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  badgesSeeAll: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: theme.accent,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  badgeChip: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 16,
    alignItems: 'center',
    opacity: 0.6,
  },
  badgeChipEarned: {
    backgroundColor: theme.accentSoft,
    borderColor: theme.accentBorder,
    opacity: 1,
  },
  badgeIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  badgeIconWrapEarned: {
    backgroundColor: theme.accentBright,
    borderWidth: 2,
    borderColor: theme.surface,
    elevation: 4,
    shadowColor: theme.accentSoft,
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  badgeIconText: {
    fontFamily: theme.fonts.serif,
    fontSize: 16,
    color: theme.textMuted,
  },
  badgeIconTextEarned: {
    color: theme.textOnAccent,
  },
  badgeLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.textMuted,
  },
  badgeLabelEarned: {
    color: theme.text,
  },
  badgeHindi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 10,
    color: theme.textMuted,
  },
  badgeHindiEarned: {
    color: theme.accent,
  },
});
