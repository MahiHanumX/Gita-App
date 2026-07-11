import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darkTheme, lightLotusTheme } from '../theme/themes';
import type { ThemeMode } from '../theme/themes';

export type CTAProps = {
  label: string;
  subLabel?: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: ThemeMode;
};

export function CTA({ label, subLabel, onPress, disabled, variant = 'dark' }: CTAProps) {
  const t = variant === 'light' ? lightLotusTheme : darkTheme;

  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [pressed && !disabled && { opacity: 0.92 }]}>
      <LinearGradient
        colors={
          disabled
            ? variant === 'light'
              ? ['#F0E0E6', '#E8D0DA']
              : ['#d9c9a2', '#b8a37a']
            : [...t.ctaGradient]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={[styles.label, { color: t.ctaText }]}>{label}</Text>
        {subLabel ? <Text style={[styles.subLabel, { color: t.ctaText }]}>{subLabel}</Text> : null}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    letterSpacing: 0.2,
  },
  subLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    opacity: 0.75,
  },
});
