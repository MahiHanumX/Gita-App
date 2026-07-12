import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { LightShell } from '../../components/LightShell';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <LightShell glow={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Svg width="14" height="14" viewBox="0 0 24 24">
              <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          <View>
            <Text style={styles.titleEn}>Settings</Text>
            <Text style={styles.titleHi}>सेटिंग्स</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <SettingsGroup title="Practice · अभ्यास">
            <SettingsRow icon="clock" label="Daily reminder" value="7:00 AM · daily" chevron onPress={() => navigation.navigate('Reminder')} />
            <SettingsRow icon="time" label="Session length" value="Steady · 10 min" chevron />
            <SettingsRow icon="pause" label="Rest days" value="Sundays" chevron />
          </SettingsGroup>

          <SettingsGroup title="Language · भाषा">
            <SettingsRow icon="globe" label="Interface language" value="English" chevron />
            <SettingsRow icon="text" label="Show translations" toggle on />
            <SettingsRow icon="script" label="Show Devanagari script" toggle on />
            <SettingsRow icon="script" label="Show transliteration" toggle />
          </SettingsGroup>

          <SettingsGroup title="Appearance">
            <SettingsRow icon="theme" label="Theme" value="Warm dark" chevron />
            <SettingsRow icon="font" label="Text size" value="Regular" chevron />
          </SettingsGroup>
        </ScrollView>
    </LightShell>
  );
}

function SettingsGroup({ title, children }: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.groupWrap}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.groupBox}>
        {children}
      </View>
    </View>
  );
}

function SettingsRow({ icon, label, value, toggle, on: initialOn, chevron, onPress }: any) {
  const [on, setOn] = useState(initialOn);
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Pressable style={styles.rowWrap} onPress={() => { if (toggle) setOn(!on); else if (onPress) onPress(); }}>
      <View style={styles.iconBox}>
        <SettingsIcon name={icon} />
      </View>
      <View style={styles.rowLabelWrap}>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      {toggle && (
        <View style={[styles.toggleTrack, on && styles.toggleTrackOn]}>
          <View style={[styles.toggleThumb, on && styles.toggleThumbOn]} />
        </View>
      )}
      {chevron && (
        <Svg width="7" height="12" viewBox="0 0 8 14">
          <Path d="M1 1 L 7 7 L 1 13" stroke={theme.textMuted} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}
    </Pressable>
  );
}

function SettingsIcon({ name }: { name: string }) {
  const { theme } = useTheme();
  const c = theme.accent;
  const s = 16;
  if (name === 'clock') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" /><Path d="M12 7 V 12 L 15 14" stroke={c} strokeWidth="2" strokeLinecap="round" /></Svg>;
  if (name === 'time') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M6 4 v 4 l -3 4 l 3 4 v 4 h 12 v -4 l 3 -4 l -3 -4 v -4 z" stroke={c} strokeWidth="2" strokeLinejoin="round" /></Svg>;
  if (name === 'pause') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Rect x="7" y="5" width="3" height="14" rx="1" fill={c} /><Rect x="14" y="5" width="3" height="14" rx="1" fill={c} /></Svg>;
  if (name === 'globe') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" /><Path d="M3 12 h 18 M 12 3 c 3 3 3 15 0 18 M 12 3 c -3 3 -3 15 0 18" stroke={c} strokeWidth="1.5" /></Svg>;
  if (name === 'text') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M4 6 h 16 M 12 6 v 14" stroke={c} strokeWidth="2" strokeLinecap="round" /></Svg>;
  if (name === 'script') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M5 4 v 16 M 5 4 h 8 a 4 4 0 0 1 0 8 h -8 M 13 12 l 6 8" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></Svg>;
  if (name === 'theme') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M20 12 A 8 8 0 1 1 12 4 A 6 6 0 0 0 20 12 z" fill={c} /></Svg>;
  return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M6 20 v -3 M 12 20 v -8 M 18 20 v -13 M 3 20 h 18" stroke={c} strokeWidth="2" strokeLinecap="round" /></Svg>;
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.background },
  content: { flex: 1, zIndex: 2 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surfaceSoft,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.06)',
    shadowOpacity: 1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleEn: {
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    color: theme.text,
  },
  titleHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 13,
    color: theme.textMuted,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  groupWrap: {
    marginBottom: 22,
  },
  groupTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  groupBox: {
    backgroundColor: theme.surface,
    borderRadius: 18,
    elevation: 1,
    shadowColor: 'rgba(26,27,58,0.04)',
    shadowOpacity: 1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  rowWrap: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: theme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabelWrap: {
    flex: 1,
  },
  rowLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  rowValue: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
  },
  toggleTrack: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.surfaceSoft,
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackOn: {
    backgroundColor: theme.accent,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.textOnAccent,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  toggleThumbOn: {
    transform: [{ translateX: 18 }],
  },
});
