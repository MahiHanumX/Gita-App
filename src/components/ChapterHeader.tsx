import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { darkTheme, lightLotusTheme } from '../theme/themes';
import type { ThemeMode } from '../theme/themes';

type ChapterHeaderProps = {
  step: number;
  total: number;
  onBack?: () => void;
  onClose?: () => void;
  tone?: ThemeMode;
};

function ProgressBar({ step, total, tone }: { step: number; total: number; tone: ThemeMode }) {
  const t = tone === 'light' ? lightLotusTheme : darkTheme;
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.progressTrack, { backgroundColor: t.progressTrack }]}>
          {i < step ? <View style={[styles.progressFill, { backgroundColor: t.progressFill }]} /> : null}
        </View>
      ))}
    </View>
  );
}

export function ChapterHeader({ step, total, onBack, onClose, tone = 'dark' }: ChapterHeaderProps) {
  const t = tone === 'light' ? lightLotusTheme : darkTheme;

  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} style={[styles.iconBtn, { backgroundColor: t.iconButtonBg }]}>
        <Svg width={16} height={16} viewBox="0 0 24 24">
          <Path
            d="M15 5 L 8 12 L 15 19"
            stroke={t.iconStroke}
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>
      <View style={styles.progressWrap}>
        <ProgressBar step={step} total={total} tone={tone} />
      </View>
      <Pressable onPress={onClose} style={[styles.iconBtn, { backgroundColor: t.iconButtonBg }]}>
        <Svg width={12} height={12} viewBox="0 0 24 24">
          <Path
            d="M5 5 L 19 19 M 19 5 L 5 19"
            stroke={t.iconStroke}
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrap: { flex: 1 },
  progressRow: { flexDirection: 'row', gap: 6 },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
  },
});
