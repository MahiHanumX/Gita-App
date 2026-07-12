import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { useLocale } from '../i18n';
import { useTheme } from '../theme';
import type { AppTheme } from '../theme/themes';
import type { AppLanguage } from '../i18n/types';

export function LanguagePicker() {
  const { language, setLanguage, languages, t } = useLocale();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

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

const getStyles = (theme: AppTheme) => StyleSheet.create({
  section: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionHint: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
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
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1.5,
    borderColor: theme.cardBorder,
  },
  chipSelected: {
    backgroundColor: theme.accentSoft,
    borderColor: theme.accentBorder,
  },
  chipNative: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 16,
    color: theme.text,
  },
  chipName: {
    marginTop: 2,
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
  chipTextSelected: { color: theme.accent },
});
