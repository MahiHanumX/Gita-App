import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkShell } from '../../components/DarkShell';
import { LightShell } from '../../components/LightShell';
import { CTA } from '../../components/CTA';
import { useOnboardingContent } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Intention'>;

const EMOJIS: Record<string, string> = {
  calm: '🧘',
  habit: '🗓️',
  understand: '📖',
  detach: '🕊️',
  spiritual: '✨',
  grief: '🕯️',
  serve: '🤝',
  purpose: '🧭',
};

export function IntentionScreen({ navigation }: Props) {
  const { data } = useOnboardingContent();
  const t = useTranslation();
  const { resolvedMode, theme } = useTheme();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setSelectedIds(data.intentions.filter((item) => item.selected).map((item) => item.id));
    }
  }, [data]);

  if (!data) return null;

  const Shell = resolvedMode === 'light' ? LightShell : DarkShell;

  const toggleIntention = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Shell glow={false}>
      <View style={styles.header}>
        <Text style={[styles.step, { color: theme.accent }]}>{t.onboarding.step1of2}</Text>
        <Text style={[styles.title, { color: theme.text }]}>{t.onboarding.whyHere}</Text>
        <Text style={[styles.desc, { color: theme.textMuted }]}>{t.onboarding.chooseResonate}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.chips} showsVerticalScrollIndicator={false}>
        <View style={styles.chipRow}>
          {data.intentions.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <Pressable
                key={item.id}
                onPress={() => toggleIntention(item.id)}
                style={[
                  styles.chip,
                  { backgroundColor: theme.surfaceSoft, borderColor: theme.cardBorder },
                  isSelected && [
                    styles.chipSelected,
                    { backgroundColor: theme.accentSoft, borderColor: theme.accentBorder },
                  ],
                ]}
              >
                <Text style={styles.emoji}>{EMOJIS[item.id] || '✨'}</Text>
                <Text
                  style={[
                    styles.chipLabel,
                    { color: theme.text },
                    isSelected && [
                      styles.chipTextSelected,
                      { color: resolvedMode === 'light' ? theme.accentDeep : theme.accentBright },
                    ],
                  ]}
                >
                  {item.en}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CTA
          label={t.common.continue}
          subLabel={t.common.continue}
          onPress={() => navigation.navigate('Commitment')}
          variant={resolvedMode}
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
    lineHeight: 34,
  },
  desc: {
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  chips: { paddingHorizontal: 24, paddingBottom: 16 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderRadius: 16,
    gap: 8,
  },
  chipSelected: {},
  emoji: {
    fontSize: 18,
  },
  chipLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  chipTextSelected: {},
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
});
