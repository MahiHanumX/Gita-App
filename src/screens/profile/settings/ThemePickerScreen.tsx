import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRadioRow, SettingsRow } from '../components/SettingsUI';
import { DiyaIcon } from '../../../components/Icons';

export function ThemePickerScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const themes = [
    { name: 'Warm dark', hi: 'रात्रि', sub: 'Deep indigo with saffron warmth', active: true, colors: ['#0f102b', '#2d2b5f', '#e8a838'] },
    { name: 'Deep night', hi: 'गहरा अंधकार', sub: 'Pure black — for the dedicated pre-dawn practitioner', active: false, colors: ['#000000', '#1a1a1a', '#c67a1a'] },
    { name: 'Parchment', hi: 'पाण्डुलिपि', sub: 'Cream and ink — a physical book feel', active: false, colors: ['#faf5eb', '#f5ecd8', '#c67a1a'] },
    { name: 'Sunrise', hi: 'उषा', sub: 'Rose-gold gradients — the color of morning practice', active: false, colors: ['#fce4ce', '#f2a679', '#c67a1a'] },
    { name: 'Temple', hi: 'मन्दिर', sub: 'Deep maroon and gold — traditional', active: false, colors: ['#3a1420', '#5c1e33', '#f4c257'] },
  ];

  return (
    <SettingsPageFrame title="Theme" hi="रंग विषय">
      <View style={styles.quoteArea}>
        <Text style={styles.quoteText}>
          Follow system theme is on — the app switches to <Text style={styles.quoteBold}>Warm dark</Text> at sunset, <Text style={styles.quoteBold}>Parchment</Text> at sunrise.
        </Text>
      </View>

      {/* Preview Card */}
      <View style={styles.previewCardWrap}>
        <LinearGradient
          colors={['#0f102b', '#2d2b5f']}
          style={styles.previewBg}
        >
          <View style={styles.previewContent}>
            <Text style={styles.previewHi}>दिन १३</Text>
            <Text style={styles.previewEn}>The Steadfast Mind</Text>
            <View style={styles.previewBadge}>
              <DiyaIcon size={16} color="#e8a838" flameColor="#fff4d6" />
              <Text style={styles.previewBadgeText}>Live preview</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <SettingsGroup>
        {themes.map((t, i) => (
          <SettingsRadioRow
            key={t.name}
            title={t.name}
            hi={t.hi}
            subtitle={t.sub}
            active={t.active}
            divider={i < themes.length - 1}
            right={
              <View style={styles.swatchWrap}>
                {t.colors.map((c, j) => (
                  <View 
                    key={j} 
                    style={[
                      styles.swatch, 
                      { backgroundColor: c, marginLeft: j === 0 ? 0 : -8, zIndex: 3 - j }
                    ]} 
                  />
                ))}
              </View>
            }
          />
        ))}
      </SettingsGroup>

      <SettingsGroup>
        <SettingsRow label="Follow system theme" value="Dark after sunset, light at sunrise" toggle on divider={false} />
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  quoteArea: {
    paddingHorizontal: 4,
    paddingBottom: 18,
  },
  quoteText: {
    fontFamily: theme.fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: theme.textMuted,
  },
  quoteBold: {
    color: theme.accentDeep,
    fontFamily: theme.fonts.medium,
  },
  previewCardWrap: {
    marginBottom: 22,
    height: 200,
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'rgba(26,27,58,0.15)',
    shadowOpacity: 1,
    shadowRadius: 24,
  },
  previewBg: {
    flex: 1,
    padding: 20,
  },
  previewContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  previewHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 18,
    color: '#faf5eb',
  },
  previewEn: {
    marginTop: 4,
    fontFamily: theme.fonts.serif,
    fontSize: 22,
    color: '#faf5eb',
  },
  previewBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(232,168,56,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  previewBadgeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    color: '#f4c257',
  },
  swatchWrap: {
    flexDirection: 'row',
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.background,
    elevation: 1,
  },
});
