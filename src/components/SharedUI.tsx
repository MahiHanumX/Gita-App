import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DiyaIcon, FlameIcon, LockIcon } from './Icons';
import { PALETTE } from '../theme/palette';
import { useTheme, lightLotusTheme } from '../theme';

export function StreakBadge({ count = 12 }: { count?: number }) {
  return (
    <LinearGradient
      colors={['#e8a838', '#c67a1a'] as const}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.badge}
    >
      <FlameIcon size={17} />
      <Text style={styles.text}>{count}</Text>
    </LinearGradient>
  );
}

export function ChapterChip({
  hindi,
  english,
  variant = 'dark',
}: {
  hindi: string;
  english: string;
  variant?: 'dark' | 'light';
}) {
  const isLight = variant === 'light';
  return (
    <View
      style={[
        styles.chip,
        isLight && {
          backgroundColor: lightLotusTheme.accentSoft,
          borderColor: lightLotusTheme.accentBorder,
        },
      ]}
    >
      <View style={[styles.dot, isLight && { backgroundColor: lightLotusTheme.accentDeep }]} />
      <Text style={[styles.hindi, isLight && { color: lightLotusTheme.accentDeep }]}>{hindi}</Text>
      <Text style={[styles.sep, isLight && { color: lightLotusTheme.accent }]}>·</Text>
      <Text style={[styles.english, isLight && { color: lightLotusTheme.accentDeep }]}>{english}</Text>
    </View>
  );
}

type PathNodeProps = {
  state: 'locked' | 'active' | 'completed';
  day?: number;
  style?: object;
};

export function PathNode({ state, day, style }: PathNodeProps) {
  const size = state === 'active' ? 72 : 62;
  const { theme, resolvedMode } = useTheme();

  if (state === 'locked') {
    const colors = (resolvedMode === 'light'
      ? ['#F0E0E4', '#E2D0D4']
      : ['#3d3f65', '#2a2c50']) as [string, string, ...string[]];
    const lockColor = resolvedMode === 'light' ? theme.textMuted : 'rgba(245,236,216,0.55)';

    return (
      <View style={[styles.nodeBase, { width: size, height: size }, style]}>
        <LinearGradient colors={colors} style={styles.nodeCircle}>
          <LockIcon size={22} color={lockColor} />
        </LinearGradient>
      </View>
    );
  }

  if (state === 'completed') {
    const colors = (resolvedMode === 'light'
      ? [theme.accentBright, theme.accent, theme.accentDeep]
      : ['#f4c257', '#e8a838', '#b8811d']) as [string, string, ...string[]];
    const iconColor = resolvedMode === 'light' ? theme.background : PALETTE.indigoDeep;
    const flameColor = resolvedMode === 'light' ? '#ffffff' : '#fff2c9';

    return (
      <View style={[styles.nodeBase, { width: size, height: size }, style]}>
        <LinearGradient colors={colors} style={styles.nodeCircle}>
          <DiyaIcon size={30} lit color={iconColor} flameColor={flameColor} />
        </LinearGradient>
      </View>
    );
  }

  const colors = (resolvedMode === 'light'
    ? ['#FFF0F3', theme.accentBright, theme.accent]
    : ['#ffe08a', '#f4c257', '#e8a838']) as [string, string, ...string[]];
  const iconColor = resolvedMode === 'light' ? theme.background : PALETTE.indigoDeep;
  const flameColor = resolvedMode === 'light' ? theme.accentDeep : '#c67a1a';

  return (
    <View style={[styles.nodeBase, { width: size, height: size }, style]}>
      <View style={[styles.pulseOuter, resolvedMode === 'light' && { backgroundColor: theme.accentSoft }]} />
      <LinearGradient
        colors={colors}
        style={[styles.nodeCircle, styles.activeCircle, resolvedMode === 'light' && { borderColor: theme.accentBorder }]}
      >
        <DiyaIcon size={34} lit color={iconColor} flameColor={flameColor} />
      </LinearGradient>
      {day ? (
        <View style={[styles.dayChip, resolvedMode === 'light' && { backgroundColor: theme.text, borderColor: theme.background }]}>
          <Text style={[styles.dayText, resolvedMode === 'light' && { color: theme.background }]}>Day {day}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 14,
    borderRadius: 999,
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#fff',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 12,
    backgroundColor: 'rgba(232,168,56,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.35)',
    borderRadius: 999,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PALETTE.saffronBright,
  },
  hindi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 12,
    color: PALETTE.saffronBright,
  },
  sep: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: PALETTE.saffronBright,
    opacity: 0.5,
  },
  english: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: PALETTE.saffronBright,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  nodeBase: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -31 }, { translateY: -31 }],
  },
  nodeCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    borderWidth: 3,
    borderColor: '#fff4d6',
  },
  pulseOuter: {
    position: 'absolute',
    inset: -12,
    borderRadius: 999,
    backgroundColor: 'rgba(244,194,87,0.35)',
  },
  dayChip: {
    position: 'absolute',
    top: '100%',
    marginTop: 8,
    backgroundColor: PALETTE.cream,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  dayText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: PALETTE.indigoDeep,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
