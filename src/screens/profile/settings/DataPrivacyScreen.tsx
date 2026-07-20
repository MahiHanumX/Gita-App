import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRow } from '../components/SettingsUI';

export function DataPrivacyScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const items = [
    { c: '#8a5eb8', l: 'Meditation audio', v: '118 MB' },
    { c: '#e8a838', l: 'Mantra recordings', v: '48 MB' },
    { c: '#4fb59f', l: 'Yoga Nidra', v: '30 MB' },
    { c: 'rgba(26,27,58,0.3)', l: 'Your reflections', v: '12 MB' },
  ];

  return (
    <SettingsPageFrame title="Data & Privacy" hi="डेटा और गोपनीयता">
      <View style={styles.storageCard}>
        <View style={styles.storageHeader}>
          <Text style={styles.storageTitle}>On your phone</Text>
          <Text style={styles.storageSize}><Text style={styles.storageSizeBold}>247 MB</Text> of 500 MB</Text>
        </View>
        
        <View style={styles.storageBar}>
          <LinearGradient colors={['#8a5eb8', '#6a4a9c']} start={{x:0, y:0}} end={{x:1, y:0}} style={[styles.storageSegment, { width: '48%' }]} />
          <LinearGradient colors={['#e8a838', '#c67a1a']} start={{x:0, y:0}} end={{x:1, y:0}} style={[styles.storageSegment, { width: '20%' }]} />
          <LinearGradient colors={['#4fb59f', '#2d5f5a']} start={{x:0, y:0}} end={{x:1, y:0}} style={[styles.storageSegment, { width: '12%' }]} />
          <View style={[styles.storageSegment, { width: '5%', backgroundColor: 'rgba(26,27,58,0.3)' }]} />
        </View>
        
        <View style={styles.legendWrap}>
          {items.map((r, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: r.c }]} />
              <Text style={styles.legendLabel}>{r.l}</Text>
              <Text style={styles.legendValue}>{r.v}</Text>
            </View>
          ))}
        </View>
      </View>

      <SettingsGroup title="Offline · अपांतर">
        <SettingsRow label="Auto-download today's practice" toggle on />
        <SettingsRow label="Download over Wi-Fi only" toggle on />
        <SettingsRow label="Manage downloaded audio" value="8 files" chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Your data">
        <SettingsRow label="Download my reflections" value=".pdf · 47 entries" chevron />
        <SettingsRow label="Export practice history" value=".csv" chevron />
        <SettingsRow label="Share anonymously with sangha" toggle on divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Privacy">
        <SettingsRow label="Privacy policy" chevron />
        <SettingsRow label="Analytics" value="Off" chevron divider={false} />
      </SettingsGroup>

      <SettingsGroup>
        <Pressable style={styles.deleteRow}>
          <Text style={styles.deleteText}>Delete my account & all data</Text>
          <Svg width="7" height="12" viewBox="0 0 8 14">
            <Path d="M1 1 L 7 7 L 1 13" stroke="#e05252" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  storageCard: {
    marginBottom: 22,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: theme.surface,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.04)',
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  storageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  storageTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.accentDeep,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  storageSize: {
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
  },
  storageSizeBold: {
    fontFamily: theme.fonts.medium,
    color: theme.text,
  },
  storageBar: {
    marginTop: 12,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(26,27,58,0.06)',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  storageSegment: {
    height: '100%',
  },
  legendWrap: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendLabel: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.text,
  },
  legendValue: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
  deleteRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteText: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: '#e05252',
  },
});
