import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRow } from '../components/SettingsUI';

export function TextSizeScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [size, setSize] = useState(2); // 0 to 4
  const labels = ['Small', 'Comfy', 'Regular', 'Large', 'X-Large'];

  return (
    <SettingsPageFrame title="Text size" hi="अक्षर आकार">
      {/* Live Preview Card */}
      <View style={styles.previewCard}>
        <Text style={styles.previewTag}>Live preview · श्लोक २.४७</Text>
        
        <Text style={[styles.previewHi, { fontSize: 20 + size * 2 }]}>
          कर्मण्येवाधिकारस्ते
        </Text>
        
        <Text style={[styles.previewTransl, { fontSize: 13 + size * 1.5 }]}>
          karmaṇy-evādhikāras te
        </Text>
        
        <Text style={[styles.previewEn, { fontSize: 13 + size * 2 }]}>
          You have the right to work only — never to the fruit of that work.
        </Text>
      </View>

      <SettingsGroup title="Adjust">
        <View style={styles.sliderArea}>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderA}>अ</Text>
            
            <View style={styles.trackWrap}>
              <View style={styles.trackBg} />
              <LinearGradient
                colors={[theme.accentBright, theme.accentDeep]}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                style={[styles.trackFill, { width: `${(size / 4) * 100}%` }]}
              />
              
              {[0,1,2,3,4].map((i) => (
                <View 
                  key={i} 
                  style={[
                    styles.tick, 
                    { left: `${(i / 4) * 100}%` },
                    i <= size ? { backgroundColor: theme.accentDeep } : { backgroundColor: theme.cardBorder }
                  ]} 
                />
              ))}
              
              <View style={[styles.thumb, { left: `${(size / 4) * 100}%` }]}>
                <LinearGradient
                  colors={[theme.accentSoft, theme.accentDeep]}
                  style={styles.thumbInner}
                />
              </View>
            </View>
            
            <Text style={styles.sliderABig}>अ</Text>
          </View>
          
          <View style={styles.labelsRow}>
            {labels.map((l, i) => (
              <Text key={l} style={[
                styles.labelText,
                i === size && styles.labelTextActive
              ]}>{l}</Text>
            ))}
          </View>
        </View>
      </SettingsGroup>

      <SettingsGroup title="Related">
        <SettingsRow label="Bold Devanagari" value="Heavier weight for Sanskrit verses" toggle />
        <SettingsRow label="High contrast" value="Deeper black on cream" toggle divider={false} />
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  previewCard: {
    marginBottom: 22,
    padding: 22,
    backgroundColor: theme.surface,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'rgba(26,27,58,0.04)',
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  previewTag: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    color: theme.accentDeep,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  previewHi: {
    marginTop: 14,
    fontFamily: theme.fonts.hindi,
    color: theme.accentDeep,
    textAlign: 'center',
  },
  previewTransl: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: theme.fonts.serifItalic,
    color: theme.textMuted,
  },
  previewEn: {
    marginTop: 14,
    fontFamily: theme.fonts.serif,
    color: theme.text,
  },
  sliderArea: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderA: {
    fontFamily: theme.fonts.hindi,
    fontSize: 14,
    color: theme.textMuted,
  },
  sliderABig: {
    fontFamily: theme.fonts.hindi,
    fontSize: 22,
    color: theme.accentDeep,
  },
  trackWrap: {
    flex: 1,
    height: 26,
    justifyContent: 'center',
  },
  trackBg: {
    position: 'absolute',
    left: 0, right: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.cardBorder,
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 4,
    borderRadius: 2,
  },
  tick: {
    position: 'absolute',
    width: 3,
    height: 12,
    borderRadius: 2,
    transform: [{ translateX: -1.5 }, { translateY: -6 }],
    top: '50%',
  },
  thumb: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.background,
    transform: [{ translateX: -13 }, { translateY: -13 }],
    top: '50%',
    padding: 3,
    elevation: 4,
    shadowColor: theme.accent,
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
  thumbInner: {
    flex: 1,
    borderRadius: 99,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  labelText: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
    opacity: 0.8,
  },
  labelTextActive: {
    fontFamily: theme.fonts.heading,
    color: theme.accentDeep,
    opacity: 1,
  },
});
