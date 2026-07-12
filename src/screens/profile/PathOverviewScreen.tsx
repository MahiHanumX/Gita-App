import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { DiyaIcon } from '../../components/DiyaIcon';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PathOverview'>;

const SCREEN_W = Dimensions.get('window').width;

export function PathOverviewScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const cols = 5;
  const total = 40;
  
  // Responsive math
  const cellW = (SCREEN_W - 80) / (cols - 1); // 40px padding on each side
  const cellH = 76;
  const startX = 40;
  const startY = 40; // Relative to the path container
  const currentDay = 13;

  // build node positions in a boustrophedon (snake) pattern
  const nodes = [];
  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / cols);
    const colIdx = row % 2 === 0 ? i % cols : cols - 1 - (i % cols);
    const x = startX + colIdx * cellW;
    const y = startY + row * cellH;
    let state = 'locked';
    if (i + 1 < currentDay) state = 'completed';
    else if (i + 1 === currentDay) state = 'active';
    nodes.push({ day: i + 1, x, y, state });
  }

  // Generate SVG path string
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1];
    const c = nodes[i];
    const midY = (p.y + c.y) / 2;
    d += ` C ${p.x} ${midY}, ${c.x} ${midY}, ${c.x} ${c.y}`;
  }

  const svgHeight = startY + (Math.ceil(total / cols) * cellH) + 60;

  return (
    <View style={styles.root}>
      {/* Radial Gradient Mock */}
      <View style={styles.radialGlow} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View style={styles.headerTitles}>
          <Text style={styles.titleEn}>The 40-Day Path</Text>
          <Text style={styles.titleHi}>चालीस दिन की यात्रा</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path d="M12 4 v 12 M 7 11 l 5 5 l 5 -5" stroke={theme.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M4 20 h 16" stroke={theme.text} strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </Pressable>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Text style={styles.statBig}>13</Text>
          <Text style={styles.statSmall}>/ 40</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 12</Text>
          </View>
        </View>
        <Text style={styles.statsHint}>27 days remain · 67% of the way begun</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ width: SCREEN_W, height: svgHeight, position: 'relative', marginTop: 20 }}>
          <Svg width={SCREEN_W} height={svgHeight} style={StyleSheet.absoluteFillObject}>
            <Defs>
              <SvgLinearGradient id="pathG-overview" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#f4c257" />
                <Stop offset={`${(currentDay / total) * 100}%`} stopColor="#e8a838" />
                <Stop offset={`${(currentDay / total) * 100 + 0.01}%`} stopColor={theme.cardBorder} />
                <Stop offset="100%" stopColor={theme.cardBorder} />
              </SvgLinearGradient>
            </Defs>
            <Path
              d={d}
              stroke="url(#pathG-overview)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="1 10"
              opacity="0.85"
            />
          </Svg>

          {nodes.map((n) => (
            <View
              key={n.day}
              style={[
                styles.nodeBase,
                { left: n.x - (n.state === 'active' ? 20 : 16), top: n.y - (n.state === 'active' ? 20 : 16) },
                n.state === 'active' && styles.nodeActive,
                n.state === 'completed' && styles.nodeCompleted,
                n.state === 'locked' && styles.nodeLocked,
              ]}
            >
              <LinearGradient
                colors={
                  n.state === 'locked'
                    ? [theme.surfaceSoft, theme.surface]
                    : n.state === 'active'
                    ? ['#ffe08a', '#e8a838']
                    : ['#f4c257', '#c67a1a']
                }
                style={StyleSheet.absoluteFillObject}
              />
              {n.state === 'completed' ? (
                <DiyaIcon size={14} color="#1a1b3a" flameColor="#c67a1a" />
              ) : n.state === 'active' ? (
                <DiyaIcon size={18} color="#1a1b3a" flameColor="#c67a1a" />
              ) : (
                <Text style={styles.nodeText}>{n.day}</Text>
              )}
            </View>
          ))}

          {/* Milestone flags */}
          <FlagMark x={nodes[6].x + 18} y={nodes[6].y - 8} label="7" earned theme={theme} styles={styles} />
          <FlagMark x={nodes[20].x + 18} y={nodes[20].y - 8} label="21" theme={theme} styles={styles} />
          <FlagMark x={nodes[39].x + 18} y={nodes[39].y - 8} label="40" theme={theme} styles={styles} />
        </View>
      </ScrollView>
    </View>
  );
}

function FlagMark({ x, y, label, earned, theme, styles }: any) {
  return (
    <View style={[styles.flagBase, { left: x, top: y }, earned ? styles.flagEarned : styles.flagLocked]}>
      {earned && (
        <LinearGradient
          colors={['#f4c257', '#c67a1a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <Text style={[styles.flagText, earned ? styles.flagTextEarned : styles.flagTextLocked]}>★ {label}</Text>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.background,
  },
  radialGlow: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: theme.accentSoft,
    transform: [{ translateX: -250 }, { translateY: -250 }],
    opacity: 0.15,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    alignItems: 'center',
  },
  titleEn: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
    color: theme.text,
  },
  titleHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.textMuted,
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  statBig: {
    fontFamily: theme.fonts.serif,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -2,
    color: theme.text,
  },
  statSmall: {
    fontFamily: theme.fonts.medium,
    fontSize: 22,
    color: theme.textMuted,
    marginBottom: 8,
  },
  streakBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.accentSoft,
    marginBottom: 8,
  },
  streakText: {
    fontFamily: theme.fonts.heading,
    fontSize: 13,
    color: theme.accent,
  },
  statsHint: {
    marginTop: 6,
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
    letterSpacing: 0.3,
  },
  nodeBase: {
    position: 'absolute',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  nodeLocked: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: theme.cardBorder,
  },
  nodeActive: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#fff4d6',
    elevation: 6,
    shadowColor: theme.accent,
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  nodeCompleted: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#fff4d6',
    elevation: 2,
    shadowColor: theme.accent,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nodeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
  },
  flagBase: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagLocked: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  flagEarned: {
    elevation: 4,
    shadowColor: theme.accent,
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  flagText: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    letterSpacing: 0.4,
    zIndex: 2,
  },
  flagTextLocked: {
    color: theme.textMuted,
  },
  flagTextEarned: {
    color: '#1a1b3a',
  },
});
