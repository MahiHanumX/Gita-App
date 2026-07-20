import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { LightShell } from '../../components/LightShell';
import { usePracticeHub } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { PracticeStackParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';

type Props = CompositeScreenProps<
  NativeStackScreenProps<PracticeStackParamList, 'PracticeHome'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function PracticeHomeScreen({ navigation }: Props) {
  const { data } = usePracticeHub();
  const t = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  if (!data) return null;

  const { headerHi, headerEn, suggestion, tiles } = data;

  return (
    <LightShell hindiTitle={headerHi} title={headerEn} glow>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Suggested session */}
        <Pressable
          style={({ pressed }) => [styles.suggestion, pressed && { opacity: 0.95 }]}
          onPress={() => navigation.navigate('MeditationSession', {
            sessionId: 'breathwork-warrior',
            titleEn: 'Breath of the Warrior',
            titleHi: 'वीर श्वास',
          })}
        >
          <LinearGradient
            colors={[theme.accentSoft, `${theme.accentSoft}55`]}
            style={styles.suggestionInner}
          >
            <View style={styles.playIcon}>
              <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                <Circle cx={12} cy={12} r={9} stroke={theme.accent} strokeWidth={1.5} opacity={0.5} />
                <Path d="M9 8 v 8 l 7 -4 z" fill={theme.accent} />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.suggestedLabel}>{suggestion.label}</Text>
              <Text style={styles.suggestedTitle}>{suggestion.title}</Text>
              <Text style={styles.suggestedHi}>{suggestion.hindiSubtitle}</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Explore grid */}
        <Text style={styles.sectionLabel}>{t.common.explore}</Text>
        <View style={styles.grid}>
          {tiles.map((tile) => (
            <Pressable
              key={tile.id}
              style={({ pressed }) => [styles.tilePressable, pressed && { opacity: 0.85 }]}
              onPress={() => {
                if (tile.id === 'mantra') {
                  navigation.navigate('MantraLibrary');
                } else if (tile.id === 'breathwork') {
                  navigation.navigate('BreathworkLibrary');
                } else if (tile.id === 'yoganidra') {
                  navigation.navigate('YogaNidraLibrary');
                } else {
                  navigation.navigate('MeditationLibrary');
                }
              }}
            >
              <LinearGradient colors={tile.gradient} style={styles.tile}>
                <Text style={styles.tileHi}>{tile.hi}</Text>
                <Text style={styles.tileEn}>{tile.en}</Text>
                <Text style={styles.tileCount}>{tile.count}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </LightShell>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  scroll: { paddingBottom: 24 },
  suggestion: { paddingHorizontal: 24, paddingBottom: 18 },
  suggestionInner: {
    borderWidth: 1,
    borderColor: theme.accentBorder,
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
    backgroundColor: theme.accentSoft,
    borderWidth: 1,
    borderColor: theme.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestedLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  suggestedTitle: {
    marginTop: 3,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    color: theme.text,
  },
  suggestedHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 13,
    color: theme.textMuted,
    marginTop: 2,
  },
  sectionLabel: {
    paddingHorizontal: 24,
    marginBottom: 12,
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  grid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tilePressable: {
    width: '47%',
  },
  tile: {
    width: '100%',
    borderRadius: 18,
    padding: 16,
    minHeight: 120,
  },
  tileHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 18,
    color: theme.text,
  },
  tileEn: {
    marginTop: 4,
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.text,
  },
  tileCount: {
    marginTop: 10,
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
});
