import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { DiyaIcon } from '../../../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';

export function SignOutConfirmScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.scrim} />
      
      <View style={styles.modalCard}>
        <View style={styles.iconWrap}>
          <LinearGradient
            colors={['#3d3f65', '#2d2b5f']}
            style={styles.iconBox}
          >
            <DiyaIcon size={38} lit={false} color="rgba(245,236,216,0.7)" flameColor="#c67a1a" />
          </LinearGradient>
        </View>
        
        <View style={styles.textArea}>
          <Text style={styles.titleEn}>Sign out for now?</Text>
          <Text style={styles.titleHi}>अभी लौटें?</Text>
        </View>

        <Text style={styles.descText}>
          Your Day 13 progress, streak, and reflections all stay safe. The lamp will be waiting when you return.
        </Text>

        <View style={styles.warningBox}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
             <Path d="M12 4 L 12 12 M 12 16 h 0.01" stroke={theme.accentDeep} strokeWidth="2" strokeLinecap="round" />
          </Svg>
          <View style={styles.warningTextWrap}>
            <Text style={styles.warningTitle}>12-day streak paused, not lost</Text>
            <Text style={styles.warningSub}>Return within 2 days to keep it alive</Text>
          </View>
        </View>

        <View style={styles.actionsBox}>
          <Pressable style={styles.signOutBtn} onPress={() => navigation.navigate('Main')}>
            <Text style={styles.signOutBtnText}>Sign out</Text>
          </Pressable>
          <Pressable style={styles.stayBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.stayBtnText}>Stay signed in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,16,43,0.5)',
  },
  modalCard: {
    backgroundColor: theme.surface,
    borderRadius: 24,
    paddingTop: 32,
    paddingHorizontal: 26,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: 'rgba(15,16,43,0.35)',
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  iconWrap: {
    alignItems: 'center',
  },
  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: 'rgba(245,236,216,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleEn: {
    fontFamily: theme.fonts.serif,
    fontSize: 22,
    color: theme.text,
  },
  titleHi: {
    marginTop: 4,
    fontFamily: theme.fonts.hindi,
    fontSize: 14,
    color: theme.textMuted,
  },
  descText: {
    marginTop: 16,
    fontFamily: theme.fonts.serifItalic,
    fontSize: 14,
    lineHeight: 22,
    color: theme.textMuted,
    textAlign: 'center',
  },
  warningBox: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(232,168,56,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.28)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  warningTextWrap: {
    flex: 1,
  },
  warningTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: theme.accentDeep,
  },
  warningSub: {
    marginTop: 1,
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
  actionsBox: {
    marginTop: 24,
    gap: 10,
  },
  signOutBtn: {
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: theme.text,
    alignItems: 'center',
  },
  signOutBtnText: {
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    color: theme.background,
  },
  stayBtn: {
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
  },
  stayBtnText: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
});
