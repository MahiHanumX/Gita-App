import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { useNavigation } from '@react-navigation/native';
import { LightShell } from '../../../components/LightShell';

export function SettingsPageFrame({ title, hi, right, children, footer }: any) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <LightShell glow={false}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="14" height="14" viewBox="0 0 24 24">
            <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.titleEn}>{title}</Text>
          {hi && <Text style={styles.titleHi}>{hi}</Text>}
        </View>
        {right && <View style={styles.headerRight}>{right}</View>}
      </View>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      {footer}
    </LightShell>
  );
}

export function SettingsGroup({ title, footnote, children }: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.groupWrap}>
      {title && <Text style={styles.groupTitle}>{title}</Text>}
      <View style={styles.groupBox}>
        {children}
      </View>
      {footnote && <Text style={styles.groupFootnote}>{footnote}</Text>}
    </View>
  );
}

export function SettingsRow({ icon, label, value, toggle, on: initialOn, chevron, onPress }: any) {
  const [on, setOn] = useState(initialOn);
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Pressable style={styles.rowWrap} onPress={() => { if (toggle) { setOn(!on); if(onPress) onPress(!on); } else if (onPress) onPress(); }}>
      {icon && (
        <View style={styles.iconBox}>
          <SettingsIcon name={icon} />
        </View>
      )}
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

export function SettingsRadioRow({ title, hi, subtitle, right, active, divider = true, onPress }: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <Pressable style={[styles.radioRowWrap, divider && styles.radioRowDivider, active && styles.radioRowActive]} onPress={onPress}>
      <View style={[styles.radioCircle, active && styles.radioCircleActive]}>
        {active && (
          <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M5 12 l 5 5 l 9 -11" stroke={theme.background} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
      </View>
      <View style={styles.radioLabelWrap}>
        <View style={styles.radioTitleRow}>
          <Text style={styles.radioTitle}>{title}</Text>
          {hi && <Text style={styles.radioHi}>{hi}</Text>}
        </View>
        {subtitle && <Text style={styles.radioSub}>{subtitle}</Text>}
      </View>
      {right}
    </Pressable>
  );
}

export function SettingsIcon({ name }: { name: string }) {
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
  if (name === 'heart') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M12 21 L 10.55 19.72 C 5.4 15.09 2 12.05 2 8.5 C 2 5.42 4.42 3 7.5 3 C 9.24 3 10.91 3.81 12 5.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 C 22 12.05 18.6 15.09 13.45 19.73 L 12 21 Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
  if (name === 'bell') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M18 8 A 6 6 0 0 0 6 8 c 0 7 -3 9 -3 9 h 18 s -3 -2 -3 -9 M 13.73 21 a 2 2 0 0 1 -3.46 0" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
  if (name === 'user') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M20 21 v -2 a 4 4 0 0 0 -4 -4 H 8 a 4 4 0 0 0 -4 4 v 2 M 12 11 a 4 4 0 1 0 0 -8 a 4 4 0 0 0 0 8 z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
  if (name === 'lock') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><Path d="M7 11 V 7 a 5 5 0 0 1 10 0 v 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
  if (name === 'info') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2" /><Path d="M12 16 v -4 M 12 8 h 0.01" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
  if (name === 'log-out') return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M9 21 H 5 a 2 2 0 0 1 -2 -2 V 5 a 2 2 0 0 1 2 -2 h 4 M 16 17 l 5 -5 l -5 -5 M 21 12 H 9" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
  return <Svg width={s} height={s} viewBox="0 0 24 24" fill="none"><Path d="M6 20 v -3 M 12 20 v -8 M 18 20 v -13 M 3 20 h 18" stroke={c} strokeWidth="2" strokeLinecap="round" /></Svg>;
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.background },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
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
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOpacity: 1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
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
  headerRight: {
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
  groupFootnote: {
    marginTop: 8,
    paddingHorizontal: 6,
    fontFamily: theme.fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: theme.textMuted,
  },
  groupBox: {
    backgroundColor: theme.surface,
    borderRadius: 18,
    elevation: 1,
    shadowColor: 'rgba(0,0,0,0.06)',
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
  radioRowWrap: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  radioRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  radioRowActive: {
    backgroundColor: theme.accentSoft,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderWidth: 0,
    backgroundColor: theme.accent,
  },
  radioLabelWrap: {
    flex: 1,
  },
  radioTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  radioTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  radioHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.textMuted,
  },
  radioSub: {
    marginTop: 2,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
    lineHeight: 16,
  },
});
