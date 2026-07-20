import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRadioRow } from '../components/SettingsUI';

export function LanguagePickerScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [activeLang, setActiveLang] = useState('English');

  const langs = [
    { name: 'English', native: 'English', greet: 'Welcome, seeker', coverage: '100%' },
    { name: 'Hindi', native: 'हिन्दी', greet: 'स्वागत है, साधक', coverage: '100%' },
    { name: 'Sanskrit', native: 'संस्कृतम्', greet: 'स्वागतम्, साधक', coverage: '86%' },
    { name: 'Bengali', native: 'বাংলা', greet: 'স্বাগতম, সাধक', coverage: '78%' },
    { name: 'Marathi', native: 'मराठी', greet: 'स्वागत आहे, साधक', coverage: '72%' },
    { name: 'Tamil', native: 'தமிழ்', greet: 'வரவேற்கிறோம், சாதகா', coverage: '65%' },
    { name: 'Gujarati', native: 'ગુજરાતી', greet: 'સ્વાગત, સાધક', coverage: '58%' },
    { name: 'Telugu', native: 'తెలుగు', greet: 'స్వాగతం, సాధకా', coverage: '54%' },
    { name: 'Kannada', native: 'ಕನ್ನಡ', greet: 'ಸ್ವಾಗತ, ಸಾಧಕ', coverage: '46%' },
  ];

  return (
    <SettingsPageFrame 
      title="Language" 
      hi="भाषा"
    >
      <SettingsGroup 
        footnote="Partial coverage means some daily readings will fall back to English. Sanskrit verses always appear in Devanagari regardless of interface language."
      >
        {langs.map((l, i) => {
          const isFull = l.coverage === '100%';
          return (
            <SettingsRadioRow
              key={l.name}
              title={l.name}
              hi={l.native}
              subtitle={l.greet}
              active={l.name === activeLang}
              onPress={() => setActiveLang(l.name)}
              divider={i < langs.length - 1}
              right={
                <View style={[
                  styles.badge, 
                  isFull ? styles.badgeFull : styles.badgePartial
                ]}>
                  <Text style={[
                    styles.badgeText,
                    isFull ? styles.badgeTextFull : styles.badgeTextPartial
                  ]}>{l.coverage}</Text>
                </View>
              }
            />
          );
        })}
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeFull: {
    backgroundColor: theme.accentSoft,
  },
  badgePartial: {
    backgroundColor: theme.surfaceSoft,
  },
  badgeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    letterSpacing: 0.3,
  },
  badgeTextFull: {
    color: theme.accentDeep,
  },
  badgeTextPartial: {
    color: theme.textMuted,
  },
});
