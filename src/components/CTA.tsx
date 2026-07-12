import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme';

export type CTAProps = {
  label: string;
  subLabel?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function CTA({ label, subLabel, onPress, disabled }: CTAProps) {
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';

  const gradient = disabled
    ? isLight
      ? (['#F0E0E6', '#E8D0DA'] as const)
      : (['#d9c9a2', '#b8a37a'] as const)
    : (theme.ctaGradient as unknown as [string, string, string]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [pressed && !disabled && { opacity: 0.92 }]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={[styles.label, { color: theme.ctaText }]}>{label}</Text>
        {subLabel ? (
          <Text style={[styles.subLabel, { color: theme.ctaText }]}>{subLabel}</Text>
        ) : null}
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
