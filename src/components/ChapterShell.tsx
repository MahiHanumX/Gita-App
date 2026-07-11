import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle, Defs, G, Line, Pattern, Rect } from 'react-native-svg';
import { ChapterHeader } from './ChapterHeader';
import { CTA } from './CTA';
import { MandalaBG } from './MandalaBG';
import { darkTheme, lightLotusTheme } from '../theme/themes';
import type { ThemeMode } from '../theme/themes';

type ChapterShellProps = {
  step: number;
  total: number;
  children: ReactNode;
  cta: ReactNode;
  tone?: ThemeMode;
  onBack?: () => void;
  onClose?: () => void;
};

export function ChapterShell({
  step,
  total,
  children,
  cta,
  tone = 'dark',
  onBack,
  onClose,
}: ChapterShellProps) {
  const isLight = tone === 'light';
  const t = isLight ? lightLotusTheme : darkTheme;

  return (
    <View style={[styles.root, { backgroundColor: t.background }]}>
      {isLight ? <StatusBar style="dark" /> : null}
      {isLight ? <LotusMandalaBG /> : <MandalaBG opacity={0.05} from="#0f102b" via="#1a1b3a" to="#2d2b5f" />}
      <SafeAreaView style={styles.content}>
        <ChapterHeader step={step} total={total} onBack={onBack} onClose={onClose} tone={tone} />
        <View style={styles.body}>{children}</View>
        <View style={styles.footer}>{cta}</View>
      </SafeAreaView>
    </View>
  );
}

function LotusMandalaBG() {
  const t = lightLotusTheme;
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[t.gradientStart, t.gradientMid, t.gradientEnd]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.lotusGlow} />
      <Svg width="100%" height="100%" style={{ opacity: 0.08 }}>
        <Defs>
          <Pattern id="mandala-light" patternUnits="userSpaceOnUse" width={180} height={180}>
            <G stroke={t.mandalaStroke} strokeWidth={0.8} fill="none">
              <Circle cx={90} cy={90} r={70} />
              <Circle cx={90} cy={90} r={52} />
              <Circle cx={90} cy={90} r={34} />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 * Math.PI) / 180;
                return (
                  <Line
                    key={i}
                    x1={90 + Math.cos(a) * 16}
                    y1={90 + Math.sin(a) * 16}
                    x2={90 + Math.cos(a) * 70}
                    y2={90 + Math.sin(a) * 70}
                  />
                );
              })}
            </G>
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#mandala-light)" />
      </Svg>
    </View>
  );
}

export { CTA };

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, zIndex: 2 },
  body: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
  lotusGlow: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(250, 217, 227, 0.5)',
  },
});
