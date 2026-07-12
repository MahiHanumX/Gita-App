import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MandalaBG } from './MandalaBG';
import { darkTheme } from '../theme/themes';

type DarkShellProps = {
  children: ReactNode;
  title?: string;
  hindiTitle?: string;
  glow?: boolean;
};

export function DarkShell({ children, title, hindiTitle, glow = true }: DarkShellProps) {
  const t = darkTheme;

  return (
    <View style={[styles.root, { backgroundColor: t.background }]}>
      <StatusBar style="light" />
      <MandalaBG
        opacity={0.055}
        from={t.gradientStart}
        via={t.gradientMid}
        to={t.gradientEnd}
        stroke={t.mandalaStroke}
        glowColor={t.accentSoft}
        showBottomGlow={glow}
      />
      <SafeAreaView style={styles.content}>
        {title ? (
          <View style={styles.header}>
            <View>
              {hindiTitle ? (
                <Text style={[styles.hindiTitle, { color: t.text }]}>{hindiTitle}</Text>
              ) : null}
              <Text style={[styles.title, { color: t.textMuted }]}>{title}</Text>
            </View>
          </View>
        ) : null}
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  hindiTitle: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 26,
    lineHeight: 30,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginTop: 2,
    letterSpacing: 0.3,
  },
});
