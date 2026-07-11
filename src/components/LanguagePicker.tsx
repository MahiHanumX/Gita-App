import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocale } from '../i18n';
import { PALETTE } from '../theme/palette';
import type { AppLanguage } from '../i18n/types';

export function LanguagePicker() {
  const { language, setLanguage, languages, t } = useLocale();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{t.common.currentLanguage}</Text>
      <Text style={styles.sectionHint}>{t.common.selectLanguage}</Text>
      <View style={styles.grid}>
        {languages.map((option) => {
          const selected = language === option.code;
          return (
            <Pressable
              key={option.code}
              onPress={() => setLanguage(option.code as AppLanguage)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipNative, selected && styles.chipTextSelected]}>{option.nativeName}</Text>
              <Text style={[styles.chipName, selected && styles.chipTextSelected]}>{option.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: PALETTE.textOnDarkMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionHint: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: PALETTE.textOnDarkMuted,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    width: '47%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(245,236,216,0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(245,236,216,0.12)',
  },
  chipSelected: {
    backgroundColor: 'rgba(232,168,56,0.18)',
    borderColor: 'rgba(232,168,56,0.55)',
  },
  chipNative: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 16,
    color: PALETTE.cream,
  },
  chipName: {
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: PALETTE.textOnDarkMuted,
  },
  chipTextSelected: { color: PALETTE.saffronBright },
});
