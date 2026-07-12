import React from 'react';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle, Path } from 'react-native-svg';
import { MandalaBG } from './MandalaBG';
import { useTheme } from '../theme';

type LightShellProps = {
  children: ReactNode;
  title?: string;
  hindiTitle?: string;
  glow?: boolean;
  search?: boolean;
  onSearchPress?: () => void;
  rightSlot?: ReactNode;
};

export function LightShell({
  children,
  title,
  hindiTitle,
  glow = true,
  search = false,
  onSearchPress,
  rightSlot,
}: LightShellProps) {
  const { theme: t, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';

  return (
    <View style={[styles.root, { backgroundColor: t.background }]}>
      <StatusBar style={isLight ? 'dark' : 'light'} />
      <MandalaBG
        opacity={isLight ? 0.03 : 0.055}
        from={t.gradientStart}
        via={t.gradientMid}
        to={t.gradientEnd}
        stroke={t.mandalaStroke}
        glowColor={t.accentSoft}
        showBottomGlow={glow}
      />
      <SafeAreaView style={styles.content}>
        {(title || rightSlot) ? (
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              {hindiTitle ? (
                <Text style={[styles.hindiTitle, { color: t.text }]}>{hindiTitle}</Text>
              ) : null}
              {title ? (
                <Text style={[styles.title, { color: t.textMuted }]}>{title}</Text>
              ) : null}
            </View>
            {rightSlot ? rightSlot : null}
            {search ? (
              <Pressable
                onPress={onSearchPress}
                style={({ pressed }) => [
                  styles.searchBtn,
                  {
                    backgroundColor: isLight ? '#ffffff' : t.backgroundAlt,
                    borderColor: t.cardBorder,
                    borderWidth: isLight ? 0 : 1,
                  },
                  pressed && { opacity: 0.7 }
                ]}
              >
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <Circle cx="11" cy="11" r="7" stroke={t.text} strokeWidth="2.2" />
                  <Path d="M16 16 L 21 21" stroke={t.text} strokeWidth="2.2" strokeLinecap="round" />
                </Svg>
              </Pressable>
            ) : null}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1B3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
