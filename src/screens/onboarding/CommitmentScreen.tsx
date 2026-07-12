import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { DarkShell } from '../../components/DarkShell';
import { LightShell } from '../../components/LightShell';
import { CTA } from '../../components/CTA';
import { useOnboardingContent } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Commitment'>;

export function CommitmentScreen({ navigation }: Props) {
  const { data } = useOnboardingContent();
  const t = useTranslation();
  const { resolvedMode, theme } = useTheme();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const initial = data.commitments.find((item) => item.selected)?.id || data.commitments[0]?.id;
      setSelectedId(initial);
    }
  }, [data]);

  if (!data) return null;

  const Shell = resolvedMode === 'light' ? LightShell : DarkShell;

  return (
    <Shell glow={false}>
      <View style={styles.header}>
        <Text style={[styles.step, { color: theme.accent }]}>{t.onboarding.step2of2}</Text>
        <Text style={[styles.title, { color: theme.text }]}>{t.onboarding.timeQuestion}</Text>
      </View>
      <View style={styles.list}>
        {data.commitments.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setSelectedId(item.id)}
              style={[
                styles.card,
                { backgroundColor: theme.surfaceSoft, borderColor: theme.cardBorder },
                isSelected && [
                  styles.cardSelected,
                  { backgroundColor: theme.accentSoft, borderColor: theme.accentBorder },
                ],
              ]}
            >
              <LinearGradient
                colors={
                  isSelected
                    ? [...theme.ctaGradient]
                    : [theme.backgroundAlt, theme.backgroundAlt]
                }
                style={styles.minCircle}
              >
                <Text style={[styles.minNum, { color: isSelected ? theme.ctaText : theme.text }]}>
                  {item.min}
                </Text>
                <Text style={[styles.minUnit, { color: isSelected ? theme.ctaText : theme.text, marginTop: 6 }]}>
                  m
                </Text>
              </LinearGradient>
              <View style={styles.cardBody}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.text },
                    isSelected && [
                      styles.labelSelected,
                      { color: resolvedMode === 'light' ? theme.accentDeep : theme.accentBright },
                    ],
                  ]}
                >
                  {item.label}
                </Text>
                <Text style={[styles.desc, { color: theme.textMuted }]}>{item.desc}</Text>
              </View>
              {isSelected ? (
                <View style={[styles.check, { backgroundColor: theme.accent }]}>
                  <Svg width={12} height={12} viewBox="0 0 12 12">
                    <Path
                      d="M2 6 L 5 9 L 10 3"
                      stroke={theme.textOnAccent}
                      strokeWidth={2.2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.footer}>
        <CTA
          label={t.onboarding.lightLamp}
          subLabel={t.onboarding.lightLamp}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </Shell>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 28, paddingTop: 8, paddingBottom: 20 },
  step: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 12,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
  },
  list: { paddingHorizontal: 24, gap: 12, flex: 1 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderWidth: 1.5,
    borderRadius: 20,
  },
  cardSelected: {},
  minCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  minNum: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 22,
  },
  minUnit: { fontFamily: 'Poppins_500Medium', fontSize: 11 },
  minNumSelected: {},
  cardBody: { flex: 1 },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
  },
  labelSelected: {},
  desc: {
    marginTop: 3,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
});
