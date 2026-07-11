import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LightShell } from '../../components/LightShell';
import { useLibraryContent } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { lightLotusTheme } from '../../theme/themes';

const theme = lightLotusTheme;

export function LibraryScreen() {
  const { data } = useLibraryContent();
  const tr = useTranslation();
  if (!data) return null;

  const { title, hindiTitle, verseOfDay, chapters } = data;

  return (
    <LightShell title={title} hindiTitle={hindiTitle}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredWrap}>
          <LinearGradient
            colors={[...theme.featuredGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featured}
          >
            <Text style={styles.featuredLabel}>{verseOfDay.label}</Text>
            <Text style={styles.featuredShloka}>{verseOfDay.shloka}</Text>
            <Text style={styles.featuredQuote}>{verseOfDay.quote}</Text>
            <Text style={styles.featuredRef}>{verseOfDay.reference}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionLabel}>{tr.common.chapters}</Text>
        {chapters.map((ch) => (
          <View key={ch.id} style={styles.chapterCard}>
            <View style={[styles.chapterNum, ch.tone === 'active' && styles.chapterNumActive]}>
              <Text style={[styles.chapterNumText, ch.tone === 'active' && styles.chapterNumTextActive]}>
                {ch.id}
              </Text>
            </View>
            <View style={styles.chapterBody}>
              <Text style={styles.chapterHi}>{ch.hi}</Text>
              <Text style={styles.chapterEn}>{ch.en}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${ch.progress}%` }]} />
              </View>
              <Text style={styles.verseCount}>{ch.verses} {tr.common.verses}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LightShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  featuredWrap: { paddingHorizontal: 24, paddingBottom: 20 },
  featured: {
    borderRadius: 22,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  featuredLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: theme.textOnAccent,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  featuredShloka: {
    marginTop: 8,
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 19,
    color: theme.textOnAccent,
    lineHeight: 28,
  },
  featuredQuote: {
    marginTop: 8,
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  featuredRef: {
    marginTop: 14,
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: theme.textOnAccent,
    opacity: 0.9,
  },
  sectionLabel: {
    paddingHorizontal: 24,
    marginBottom: 12,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  chapterCard: {
    marginHorizontal: 24,
    marginBottom: 10,
    padding: 16,
    backgroundColor: theme.surface,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 14,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    shadowColor: '#E8A4B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 2,
  },
  chapterNum: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: theme.blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumActive: { backgroundColor: theme.accentSoft },
  chapterNumText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: theme.text,
  },
  chapterNumTextActive: { color: theme.accentDeep },
  chapterBody: { flex: 1 },
  chapterHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 16,
    color: theme.text,
  },
  chapterEn: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: theme.textMuted,
    marginTop: 2,
  },
  progressTrack: {
    marginTop: 10,
    height: 4,
    borderRadius: 4,
    backgroundColor: theme.progressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.progressFill,
    borderRadius: 4,
  },
  verseCount: {
    marginTop: 6,
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: theme.textMuted,
  },
});
