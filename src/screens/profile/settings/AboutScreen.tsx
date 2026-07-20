import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRow } from '../components/SettingsUI';
import { DiyaIcon } from '../../../components/Icons';

export function AboutScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SettingsPageFrame title="About" hi="परिचय">
      <View style={styles.appCard}>
        <View style={styles.logoWrap}>
          <LinearGradient
            colors={['#ffe08a', '#c67a1a']}
            style={styles.logoBox}
          >
            <DiyaIcon size={40} color={theme.background} flameColor="#c67a1a" />
          </LinearGradient>
        </View>
        <Text style={styles.appName}>Deep</Text>
        <Text style={styles.appHi}>दीप</Text>
        <Text style={styles.appVersion}>Version 2.4.1 · Built with reverence</Text>
      </View>

      <SettingsGroup title="Credits · कृतज्ञता">
        <SettingsRow label="Translations by" value="Eknath Easwaran" chevron />
        <SettingsRow label="Sanskrit recitation" value="Pandit R. Iyer" chevron />
        <SettingsRow label="Guided meditations" value="Vidya R. + 3 others" chevron />
        <SettingsRow label="Illustrations & mandalas" value="Meena K." chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Community">
        <SettingsRow label="Rate on the App Store" chevron />
        <SettingsRow label="Share Deep with a friend" chevron />
        <SettingsRow label="Community guidelines" chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Legal & help">
        <SettingsRow label="Contact us" value="hello@deep.app" chevron />
        <SettingsRow label="Terms of service" chevron />
        <SettingsRow label="Open source licenses" chevron divider={false} />
      </SettingsGroup>

      <View style={styles.quoteArea}>
        <Text style={styles.quoteText}>
          "यदा यदा हि धर्मस्य…"{'\n'}
          Whenever there is a decline in dharma — the lamp is lit again.
        </Text>
      </View>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  appCard: {
    marginBottom: 22,
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: theme.surface,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.04)',
    shadowOpacity: 1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  logoWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#c67a1a',
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  appName: {
    marginTop: 16,
    fontFamily: theme.fonts.serif,
    fontSize: 26,
    color: theme.text,
  },
  appHi: {
    marginTop: 2,
    fontFamily: theme.fonts.hindi,
    fontSize: 15,
    color: theme.accentDeep,
  },
  appVersion: {
    marginTop: 8,
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 0.5,
  },
  quoteArea: {
    paddingHorizontal: 8,
    paddingTop: 18,
    paddingBottom: 30,
    alignItems: 'center',
  },
  quoteText: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 12,
    lineHeight: 18,
    color: theme.textMuted,
    textAlign: 'center',
  },
});
