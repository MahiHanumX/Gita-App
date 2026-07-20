import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup } from '../components/SettingsUI';

export function TranslationSourceScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [activeSource, setActiveSource] = useState('Modern · Deep');

  const sources = [
    { name: 'Modern · Deep', hi: 'आधुनिक', sub: "Contemporary voice, plain English. Written for today's reader.", badge: 'Default' },
    { name: 'Eknath Easwaran', sub: 'Warm, poetic, universal. From Blue Mountain Center of Meditation.', year: '1985' },
    { name: 'Swami Sivananda', sub: 'Direct and devotional. Rooted in the traditional Vedantic reading.', year: '1942' },
    { name: 'A.C. Bhaktivedanta Swami', sub: 'Purport-heavy. The ISKCON tradition. Extensive commentary.', year: '1968' },
    { name: 'Winthrop Sargeant', sub: 'Word-by-word Sanskrit lexicon. For serious scholarship.', year: '1979' },
  ];

  return (
    <SettingsPageFrame title="Translation" hi="अनुवाद स्रोत">
      <View style={styles.quoteArea}>
        <Text style={styles.quoteText}>
          Choose the voice that speaks to you. The Sanskrit is unchanging — the English rendering shapes how it lands.
        </Text>
      </View>

      <SettingsGroup>
        {sources.map((s, i) => {
          const isActive = s.name === activeSource;
          return (
            <Pressable 
              key={s.name} 
              onPress={() => setActiveSource(s.name)}
              style={[
                styles.rowWrap, 
                isActive && styles.rowActive,
                i < sources.length - 1 && styles.rowDivider
              ]}
            >
              <View style={[styles.radioCircle, isActive && styles.radioCircleActive]}>
                {isActive && (
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path d="M5 12 l 5 5 l 9 -11" stroke={theme.background} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              )}
            </View>
            <View style={styles.rowContent}>
              <View style={styles.titleRow}>
                <Text style={styles.nameText}>{s.name}</Text>
                {s.hi && <Text style={styles.hiText}>{s.hi}</Text>}
                {s.badge && (
                  <View style={styles.badgeWrap}>
                    <Text style={styles.badgeText}>{s.badge.toUpperCase()}</Text>
                  </View>
                )}
                {s.year && <Text style={styles.yearText}>· {s.year}</Text>}
              </View>
              <Text style={styles.subText}>{s.sub}</Text>
            </View>
          </Pressable>
          );
        })}
      </SettingsGroup>

      <SettingsGroup title="Preview · श्लोक २.४७">
        <View style={styles.previewCard}>
          <Text style={styles.previewHi}>कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।</Text>
          <Text style={styles.previewEn}>
            "You have the right to work only, never to the fruit of that work. Do not be motivated by results — but do not be attached to inaction either."
          </Text>
        </View>
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  quoteArea: {
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
  quoteText: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 13.5,
    lineHeight: 21,
    color: theme.textMuted,
  },
  rowWrap: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  rowActive: {
    backgroundColor: theme.accentSoft,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioCircleActive: {
    borderWidth: 0,
    backgroundColor: theme.accent,
  },
  rowContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  nameText: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  hiText: {
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.textMuted,
  },
  badgeWrap: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: theme.accentSoft,
  },
  badgeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 9,
    color: theme.accentDeep,
    letterSpacing: 0.5,
  },
  yearText: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: theme.textMuted,
  },
  subText: {
    marginTop: 4,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: theme.textMuted,
  },
  previewCard: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  previewHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 15,
    lineHeight: 24,
    color: theme.accentDeep,
    textAlign: 'center',
  },
  previewEn: {
    marginTop: 14,
    fontFamily: theme.fonts.serifItalic,
    fontSize: 14,
    lineHeight: 22,
    color: theme.text,
    textAlign: 'center',
  },
});
