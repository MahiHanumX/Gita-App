import { useState, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const { theme, resolvedMode } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  if (!profile) return null;

  return (
    <LightShell glow={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <Text style={styles.screenTitle}>{t.profile.you}</Text>
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => [styles.settingsBtn, pressed && { opacity: 0.7 }]}
            >
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="3" stroke={theme.text} strokeWidth="1.8" />
                <Path d="M12 3 v 3 M 12 18 v 3 M 3 12 h 3 M 18 12 h 3 M 5 5 l 2 2 M 17 17 l 2 2 M 5 19 l 2 -2 M 17 7 l 2 -2" stroke={theme.text} strokeWidth="1.8" strokeLinecap="round" />
              </Svg>
            </Pressable>
          </View>

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

          <LanguagePicker />
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
  root: { flex: 1, backgroundColor: theme.background },
  content: { flex: 1, zIndex: 2 },
  topRow: { paddingHorizontal: 24, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
  screenTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    color: theme.text,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surfaceSoft,
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
