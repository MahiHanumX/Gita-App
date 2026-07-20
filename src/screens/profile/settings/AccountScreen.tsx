import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRow } from '../components/SettingsUI';
import { DiyaIcon } from '../../../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function AccountScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SettingsPageFrame title="Account" hi="खाता">
      <View style={styles.headerCard}>
        <LinearGradient
          colors={[theme.accentBright, theme.accentDeep]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>अ</Text>
        </LinearGradient>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ananya Sharma</Text>
          <Text style={styles.userEmail}>ananya.s@icloud.com</Text>
          <View style={styles.subscriptionBadge}>
            <DiyaIcon size={12} color={theme.accentDeep} flameColor={theme.accentDeep} />
            <Text style={styles.subscriptionText}>MALA · $5/MONTH</Text>
          </View>
        </View>
      </View>

      <SettingsGroup title="Profile">
        <SettingsRow label="Name" value="Ananya Sharma" chevron />
        <SettingsRow label="Email" value="ananya.s@icloud.com" chevron />
        <SettingsRow label="Journey started" value="June 25, 2026" />
        <SettingsRow label="Sanskrit name" value="साधिका" chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Support the journey · दान">
        <SettingsRow label="Your contribution" value="Mala · $5 / month" chevron />
        <SettingsRow label="Payment method" value="•••• 4231" chevron />
        <SettingsRow label="Receipts" chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Security">
        <SettingsRow label="Face ID lock" toggle on />
        <SettingsRow label="Change password" chevron />
        <SettingsRow label="Connected accounts" value="Apple, Google" chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup>
        <Pressable style={styles.signOutRow} onPress={() => navigation.navigate('SignOutConfirm')}>
          <Text style={styles.signOutText}>Sign out · लौटें</Text>
          <Svg width="7" height="12" viewBox="0 0 8 14">
            <Path d="M1 1 L 7 7 L 1 13" stroke="#e05252" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  headerCard: {
    marginBottom: 22,
    padding: 20,
    borderRadius: 20,
    backgroundColor: theme.surface,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.04)',
    shadowOpacity: 1,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: theme.accent,
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  avatarText: {
    fontFamily: theme.fonts.serif,
    fontSize: 24,
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: theme.fonts.medium,
    fontSize: 16,
    color: theme.text,
  },
  userEmail: {
    marginTop: 1,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
  },
  subscriptionBadge: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: 'rgba(232,168,56,0.15)',
  },
  subscriptionText: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    color: theme.accentDeep,
    letterSpacing: 0.3,
  },
  signOutRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signOutText: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: '#e05252',
  },
});
