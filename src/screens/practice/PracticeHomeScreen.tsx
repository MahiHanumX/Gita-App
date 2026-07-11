import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { MandalaBG } from '../../components/MandalaBG';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePracticeHub } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { PALETTE } from '../../theme/palette';

export function PracticeHomeScreen() {
  const { data } = usePracticeHub();
  const t = useTranslation();
  if (!data) return null;

  const { headerHi, headerEn, suggestion, tiles } = data;

  return (
    <View style={styles.root}>
      <MandalaBG opacity={0.05} from={PALETTE.indigoDeep} via={PALETTE.indigo} to="#2d2b5f" />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerHi}>{headerHi}</Text>
          <Text style={styles.headerEn}>{headerEn}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.suggestion}>
            <LinearGradient colors={['rgba(232,168,56,0.22)', 'rgba(232,168,56,0.08)']} style={styles.suggestionInner}>
              <View style={styles.playIcon}>
                <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={9} stroke={PALETTE.indigoDeep} strokeWidth={1.5} opacity={0.4} />
                  <Path d="M9 8 v 8 l 7 -4 z" fill={PALETTE.indigoDeep} />
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.suggestedLabel}>{suggestion.label}</Text>
                <Text style={styles.suggestedTitle}>{suggestion.title}</Text>
                <Text style={styles.suggestedHi}>{suggestion.hindiSubtitle}</Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.sectionLabel}>{t.common.explore}</Text>
          <View style={styles.grid}>
            {tiles.map((tile) => (
              <LinearGradient key={tile.id} colors={tile.gradient} style={styles.tile}>
                <Text style={styles.tileHi}>{tile.hi}</Text>
                <Text style={styles.tileEn}>{tile.en}</Text>
                <Text style={styles.tileCount}>{tile.count}</Text>
              </LinearGradient>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: PALETTE.indigoDeep },
  content: { flex: 1, zIndex: 2 },
  header: { paddingHorizontal: 24, paddingBottom: 12 },
  headerHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 26,
    color: PALETTE.cream,
  },
  headerEn: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: PALETTE.textOnDarkMuted,
    marginTop: 2,
  },
  scroll: { paddingBottom: 24 },
  suggestion: { paddingHorizontal: 24, paddingBottom: 18 },
  suggestionInner: {
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.3)',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  playIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#ffe08a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestedLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: PALETTE.saffronBright,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  suggestedTitle: {
    marginTop: 3,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: PALETTE.cream,
  },
  suggestedHi: {
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 13,
    color: PALETTE.textOnDarkMuted,
    marginTop: 2,
  },
  sectionLabel: {
    paddingHorizontal: 24,
    marginBottom: 12,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: PALETTE.textOnDarkMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  grid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '47%',
    borderRadius: 18,
    padding: 16,
    minHeight: 120,
  },
  tileHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 18,
    color: PALETTE.cream,
  },
  tileEn: {
    marginTop: 4,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: PALETTE.cream,
  },
  tileCount: {
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(245,236,216,0.65)',
  },
});
