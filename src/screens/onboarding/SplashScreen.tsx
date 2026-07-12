import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkShell } from '../../components/DarkShell';
import { LightShell } from '../../components/LightShell';
import { useOnboardingContent } from '../../api_data/hooks';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { data } = useOnboardingContent();
  const { theme, resolvedMode } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => navigation.replace('Welcome'), data.splash.autoAdvanceMs);
    return () => clearTimeout(timer);
  }, [data, navigation]);

  if (!data) return null;

  const { splash } = data;
  const Shell = resolvedMode === 'light' ? LightShell : DarkShell;

  return (
    <Shell>
      <View style={styles.center}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/begin-logo.jpg')} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.hindi}>{splash.hindiTitle}</Text>
        <Text style={styles.brand}>{splash.englishTitle}</Text>
        <Text style={styles.tagline}>{splash.tagline}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.footerText}>{splash.footerText}</Text>
      </View>
    </Shell>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.accentBright,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  hindi: {
    marginTop: 40,
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 36,
    color: theme.text,
  },
  brand: {
    marginTop: 4,
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
    fontSize: 32,
    color: theme.accentBright,
  },
  tagline: {
    marginTop: 12,
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: theme.textMuted,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  divider: {
    width: 32,
    height: 2,
    backgroundColor: theme.accentBright,
    opacity: 0.6,
    marginBottom: 14,
  },
  footerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: theme.textMuted,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
