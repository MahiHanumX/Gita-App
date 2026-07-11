import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MandalaBG } from '../../components/MandalaBG';
import { LanguagePicker } from '../../components/LanguagePicker';
import { useUserProfile } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { PALETTE } from '../../theme/palette';

export function ProfileScreen() {
  const { data: profile } = useUserProfile();
  const t = useTranslation();
  if (!profile) return null;

  return (
    <View style={styles.root}>
      <MandalaBG opacity={0.05} />
      <SafeAreaView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <Text style={styles.screenTitle}>{t.profile.you}</Text>
          </View>

          <View style={styles.profileRow}>
            <LinearGradient colors={['#f4c257', '#c67a1a']} style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.avatarInitial}</Text>
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.subtitle}>{profile.subtitle}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {profile.stats.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </View>

          <View style={styles.heatmapSection}>
            <Text style={styles.heatmapLabel}>
              {t.profile.practiceHeatmap} · {profile.heatmapWeeks} {t.common.weeks}
            </Text>
            <View style={styles.heatmapBox}>
              <View style={styles.heatmapGrid}>
                {profile.heatmapData.map((level, idx) => (
                  <View
                    key={idx}
                    style={[styles.heatCell, { backgroundColor: profile.heatmapLevels[level] || profile.heatmapLevels[0] }]}
                  />
                ))}
              </View>
            </View>
          </View>

          <LanguagePicker />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function StatCard({
  value,
  label,
  hindi,
  accent,
}: {
  value: string;
  label: string;
  hindi: string;
  accent?: boolean;
}) {
  return (
    <View style={[styles.statCard, accent && styles.statCardAccent]}>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {label !== hindi ? <Text style={styles.statHindi}>{hindi}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: PALETTE.indigoDeep },
  content: { flex: 1, zIndex: 2 },
  topRow: { paddingHorizontal: 24, paddingBottom: 8 },
  screenTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: PALETTE.cream,
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
    borderColor: '#fff4d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 28,
    color: PALETTE.indigoDeep,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: PALETTE.cream,
  },
  subtitle: {
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 14,
    color: PALETTE.saffronBright,
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
    backgroundColor: 'rgba(245,236,216,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(245,236,216,0.08)',
  },
  statCardAccent: {
    backgroundColor: 'rgba(232,168,56,0.12)',
    borderColor: 'rgba(232,168,56,0.25)',
  },
  statValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: PALETTE.cream,
  },
  statValueAccent: { color: PALETTE.saffronBright },
  statLabel: {
    marginTop: 2,
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: PALETTE.textOnDarkMuted,
  },
  statHindi: {
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 11,
    color: PALETTE.textOnDarkMuted,
  },
  heatmapSection: { paddingHorizontal: 24, paddingTop: 18 },
  heatmapLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: PALETTE.textOnDarkMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heatmapBox: {
    padding: 14,
    backgroundColor: 'rgba(245,236,216,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(245,236,216,0.08)',
    borderRadius: 16,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  heatCell: {
    width: '11%',
    aspectRatio: 1,
    borderRadius: 4,
  },
});
