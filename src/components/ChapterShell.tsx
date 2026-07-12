import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChapterHeader } from './ChapterHeader';
import { CTA } from './CTA';
import { MandalaBG } from './MandalaBG';
import { useTheme } from '../theme';

type ChapterShellProps = {
  step: number;
  total: number;
  children: ReactNode;
  cta: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
};

export function ChapterShell({
  step,
  total,
  children,
  cta,
  onBack,
  onClose,
}: ChapterShellProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBar} />
      <MandalaBG
        opacity={0.055}
        from={theme.gradientStart}
        via={theme.gradientMid}
        to={theme.gradientEnd}
        stroke={theme.mandalaStroke}
        glowColor={theme.accentSoft}
      />
      <SafeAreaView style={styles.content}>
        <ChapterHeader step={step} total={total} onBack={onBack} onClose={onClose} />
        <View style={styles.body}>{children}</View>
        <View style={[styles.footer, { borderTopColor: theme.cardBorder }]}>{cta}</View>
      </SafeAreaView>
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
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
