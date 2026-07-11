import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import Svg, { Path, Rect } from 'react-native-svg';
import { DarkShell } from '../../components/DarkShell';
import { LightShell } from '../../components/LightShell';
import { useTheme } from '../../theme';
import { useAuthContent } from '../../api_data/hooks';
import { useTranslation } from '../../i18n';
import { signIn } from '../../api_data/services';
import type { AuthProvider } from '../../api_data/types';
import { OnboardingStackParamList, RootStackParamList } from '../../navigation/types';
import { PALETTE } from '../../theme/palette';

type Props = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, 'SignIn'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function SignInScreen({ navigation }: Props) {
  const { data } = useAuthContent();
  const t = useTranslation();
  const { resolvedMode, theme } = useTheme();
  
  if (!data) return null;

  const enterApp = async (provider: AuthProvider) => {
    await signIn(provider);
    navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  const Shell = resolvedMode === 'light' ? LightShell : DarkShell;

  return (
    <Shell glow={false}>
      <View style={styles.center}>
        <Image
          source={require('../../../assets/welcome-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.text }]}>{data.title}</Text>
        <Text style={[styles.desc, { color: theme.textMuted }]}>{data.description}</Text>
      </View>
      <View style={styles.actions}>
        {data.providers.map((option) => (
          <AuthButton
            key={option.provider}
            icon={option.provider}
            label={option.label}
            onPress={() => enterApp(option.provider)}
            theme={theme}
            resolvedMode={resolvedMode}
          />
        ))}
        <View style={styles.orRow}>
          <View style={[styles.line, { backgroundColor: theme.cardBorder }]} />
          <Text style={[styles.or, { color: theme.textMuted }]}>{t.common.or}</Text>
          <View style={[styles.line, { backgroundColor: theme.cardBorder }]} />
        </View>
        <Pressable
          style={[styles.guestBtn, { borderColor: theme.cardBorder }]}
          onPress={() => enterApp('guest')}
        >
          <Text style={[styles.guestText, { color: theme.text }]}>{data.guestLabel}</Text>
        </Pressable>
      </View>
    </Shell>
  );
}

function AuthButton({
  icon,
  label,
  onPress,
  theme,
  resolvedMode,
}: {
  icon: AuthProvider;
  label: string;
  onPress: () => void;
  theme: any;
  resolvedMode: string;
}) {
  const buttonBgColor = resolvedMode === 'light' ? theme.surfaceSoft : PALETTE.cream;
  const buttonTextColor = resolvedMode === 'light' ? theme.text : PALETTE.indigoDeep;

  return (
    <Pressable
      style={[
        styles.authBtn,
        {
          backgroundColor: buttonBgColor,
          borderColor: theme.cardBorder,
          borderWidth: resolvedMode === 'light' ? 1.5 : 0,
        },
      ]}
      onPress={onPress}
    >
      <AuthIcon name={icon} color={buttonTextColor} />
      <Text style={[styles.authLabel, { color: buttonTextColor }]}>{label}</Text>
    </Pressable>
  );
}

function AuthIcon({ name, color }: { name: AuthProvider; color: string }) {
  if (name === 'apple') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          fill={color}
          d="M17.05 12.04a4.8 4.8 0 012.29-4.03 4.92 4.92 0 00-3.87-2.09c-1.63-.17-3.19.96-4.02.96-.84 0-2.12-.94-3.49-.91a5.16 5.16 0 00-4.35 2.65c-1.86 3.22-.47 7.98 1.34 10.59.88 1.29 1.94 2.73 3.32 2.68 1.34-.05 1.85-.86 3.47-.86 1.62 0 2.08.86 3.5.83 1.45-.02 2.36-1.3 3.24-2.6a11.6 11.6 0 001.48-3.02 4.66 4.66 0 01-2.91-4.2zM14.55 4.28a4.55 4.55 0 001.05-3.28 4.64 4.64 0 00-3-1.55 4.34 4.34 0 00-1.08 3.15c1.15.1 2.32-.58 3.03-1.42z"
        />
      </Svg>
    );
  }
  if (name === 'google') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
        <Path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 010-4.22V7.05H2.18a11 11 0 000 9.9l3.66-2.84z" />
        <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.29 9.14 5.38 12 5.38z" />
      </Svg>
    );
  }
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={14} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M3.5 6 L 12 13 L 20.5 6" stroke={color} strokeWidth={1.8} fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  title: {
    marginTop: 30,
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
    fontSize: 30,
    textAlign: 'center',
  },
  hindi: {
    marginTop: 6,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 18,
    color: PALETTE.saffronBright,
  },
  desc: {
    marginTop: 14,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  actions: { paddingHorizontal: 24, paddingBottom: 24, gap: 10 },
  authBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  authLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 10 },
  line: { flex: 1, height: 1 },
  or: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  guestBtn: {
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
  },
  guestText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
});
