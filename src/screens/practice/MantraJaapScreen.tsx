import React, { useState, useRef, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, Vibration, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme';
import { MandalaBG } from '../../components/MandalaBG';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MantraJaap'>;

export function MantraJaapScreen({ navigation }: Props) {
  const { theme, resolvedMode } = useTheme();
  const [beadCount, setBeadCount] = useState(0);
  const [roundCount, setRoundCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const isDark = resolvedMode === 'dark';

  // Animation values
  const countScale = useRef(new Animated.Value(1)).current;
  const beadPulse = useRef(new Animated.Value(1)).current;

  // Pulse animation for the active bead
  useEffect(() => {
    let anim: Animated.CompositeAnimation | null = null;
    if (isPlaying) {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(beadPulse, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(beadPulse, {
            toValue: 1.0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      anim.start();
    } else {
      beadPulse.setValue(1.0);
    }
    return () => {
      if (anim) anim.stop();
    };
  }, [isPlaying, beadPulse]);

  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(10); // soft vibration
    } else {
      Vibration.vibrate(20);
    }
  };

  const handleTapScreen = () => {
    if (!isPlaying) return;

    triggerHaptic();

    // Animate the central counter scale
    Animated.sequence([
      Animated.timing(countScale, {
        toValue: 1.15,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(countScale, {
        toValue: 1.0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    setBeadCount((prev) => {
      const next = prev + 1;
      if (next >= 108) {
        setRoundCount((r) => r + 1);
        return 0;
      }
      return next;
    });
  };

  const handleReset = () => {
    triggerHaptic();
    setBeadCount(0);
    setRoundCount(1);
  };

  // Generate bead positions along the circle
  const totalBeads = 36;
  const beads = [];
  const completedBeadCount = Math.floor((beadCount / 108) * totalBeads);

  for (let i = 0; i < totalBeads; i++) {
    // Start at top (-90 degrees) and rotate clockwise
    const angle = (i * 360) / totalBeads - 90;
    const rad = (angle * Math.PI) / 180;
    const r = 108; // circle radius
    const cx = 135; // svg center x
    const cy = 135; // svg center y
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    beads.push({ x, y, isSumeru: i === 0, index: i });
  }

  // Determine bead colors based on completion and theme
  const getBeadColor = (index: number) => {
    if (index === 0) {
      // Sumeru (Guru) bead - special color
      return isDark ? theme.accentBright : theme.accentDeep;
    }
    if (index <= completedBeadCount) {
      // Completed beads
      return isDark ? theme.accentBright : theme.accentDeep;
    }
    // Remaining beads
    return isDark ? 'rgba(245, 236, 216, 0.22)' : 'rgba(92, 61, 74, 0.18)';
  };

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Pressable style={[styles.root, { backgroundColor: theme.background }]} onPress={handleTapScreen}>
      {/* Background */}
      <MandalaBG />

      <SafeAreaView style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Pressable style={[styles.headerBtn, { backgroundColor: theme.iconButtonBg }]} onPress={() => navigation.goBack()}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M15 19l-7-7 7-7" stroke={theme.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>

          <Text style={[styles.headerTitle, { color: theme.text }]}>MANTRA JAAP</Text>

          <Pressable style={[styles.headerBtn, { backgroundColor: theme.iconButtonBg }]} onPress={() => {}}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M4 6h16M4 12h16M4 18h16" stroke={theme.text} strokeWidth={2} strokeLinecap="round" />
            </Svg>
          </Pressable>
        </View>

        {/* Central Content */}
        <View style={styles.centerContent}>
          {/* Mantra Text */}
          <View style={styles.mantraContainer}>
            <Text style={[styles.mantraDev, { color: isDark ? theme.accentBright : theme.accentDeep }]}>
              ॐ नमः शिवाय
            </Text>
            <Text style={[styles.mantraEn, { color: theme.text }]}>
              Om Namah Shivaya
            </Text>
          </View>

          {/* Interactive Malabead Circle with Embedded Sacred Mandala */}
          <View style={styles.circleContainer}>
            {/* SVG Beads Ring & Sacred Mandala */}
            <Svg width={270} height={270} viewBox="0 0 270 270" style={styles.svgOverlay}>
              {/* Central Sacred Mandala Geometry matching global MandalaBG */}
              <G stroke={theme.mandalaStroke} fill="none" opacity={isDark ? 0.35 : 0.45}>
                <Circle cx={135} cy={135} r={95} stroke={theme.mandalaStroke} strokeWidth={0.8} />
                <Circle cx={135} cy={135} r={86} stroke={theme.mandalaStroke} strokeWidth={0.4} />
                <Circle cx={135} cy={135} r={66} stroke={theme.mandalaStroke} strokeWidth={0.6} />
                <Circle cx={135} cy={135} r={44} stroke={theme.mandalaStroke} strokeWidth={0.6} />
                <Circle cx={135} cy={135} r={20} stroke={theme.mandalaStroke} strokeWidth={0.6} />
                {Array.from({ length: 12 }, (_, i) => {
                  const a = (i * 30 * Math.PI) / 180;
                  return (
                    <Line
                      key={i}
                      x1={135 + Math.cos(a) * 20}
                      y1={135 + Math.sin(a) * 20}
                      x2={135 + Math.cos(a) * 86}
                      y2={135 + Math.sin(a) * 86}
                      stroke={theme.mandalaStroke}
                      strokeWidth={0.4}
                      opacity={0.6}
                    />
                  );
                })}
                {Array.from({ length: 8 }, (_, i) => {
                  const a = ((i * 45 + 22.5) * Math.PI) / 180;
                  return (
                    <Circle
                      key={i}
                      cx={135 + Math.cos(a) * 66}
                      cy={135 + Math.sin(a) * 66}
                      r={2.5}
                      fill={theme.mandalaStroke}
                    />
                  );
                })}
              </G>

              {/* Outer guide track */}
              <Circle cx={135} cy={135} r={108} stroke={isDark ? 'rgba(245, 236, 216, 0.12)' : 'rgba(92, 61, 74, 0.15)'} strokeWidth={1} fill="none" />

              {/* Render 36 mala beads */}
              {beads.map((b) => {
                const isCurrentActive = b.index === completedBeadCount;
                const beadColor = getBeadColor(b.index);

                if (isCurrentActive) {
                  return (
                    <G key={b.index}>
                      {/* Pulse ring for active bead */}
                      <Animated.View style={{ opacity: beadPulse }}>
                        <Circle cx={b.x} cy={b.y} r={11} fill={beadColor} opacity={0.25} />
                      </Animated.View>
                      <Circle cx={b.x} cy={b.y} r={7.5} fill={beadColor} />
                    </G>
                  );
                }

                return (
                  <Circle
                    key={b.index}
                    cx={b.x}
                    cy={b.y}
                    r={b.isSumeru ? 7 : 4.5}
                    fill={beadColor}
                  />
                );
              })}
            </Svg>

            {/* Center Counter Display Card */}
            <Animated.View
              style={[
                styles.innerCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.accentBorder,
                  transform: [{ scale: countScale }],
                },
              ]}
            >
              <Text style={[styles.roundLabel, { color: theme.textMuted }]}>
                ROUND {roundCount}
              </Text>
              <Text style={[styles.counterText, { color: theme.text }]}>
                {beadCount}
              </Text>
              <Text style={[styles.limitLabel, { color: isDark ? theme.accentBright : theme.accentDeep }]}>
                / 108 BEADS
              </Text>
            </Animated.View>
          </View>

          {/* User Prompt */}
          <Text style={[styles.prompt, { color: theme.textMuted }]}>
            Tap anywhere to count 1 bead
          </Text>
        </View>

        {/* Bottom Control Bar */}
        <View style={styles.bottomBar}>
          {/* Reset Button */}
          <Pressable
            style={[
              styles.btnReset,
              {
                backgroundColor: theme.surfaceSoft,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={handleReset}
          >
            <Text style={[styles.btnResetText, { color: theme.text }]}>Reset</Text>
          </Pressable>

          {/* Pause / Resume Button */}
          <Pressable
            style={[
              styles.btnPlayPause,
              {
                backgroundColor: isDark ? theme.accent : theme.accentDeep,
              },
            ]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <View style={styles.btnPlayPauseContent}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill={theme.textOnAccent}>
                {isPlaying ? (
                  <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <Path d="M8 5v14l11-7z" />
                )}
              </Svg>
              <Text style={[styles.btnPlayPauseText, { color: theme.textOnAccent }]}>
                {isPlaying ? 'Pause Guide' : 'Resume Guide'}
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    letterSpacing: 1.5,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  mantraContainer: {
    alignItems: 'center',
    gap: 12,
  },
  mantraDev: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40,
  },
  mantraEn: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 17,
    textAlign: 'center',
    opacity: 0.85,
  },
  circleContainer: {
    width: 270,
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  innerCard: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  roundLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    letterSpacing: 1.5,
  },
  counterText: {
    fontFamily: theme.fonts.serif,
    fontSize: 60,
    lineHeight: 68,
    marginVertical: 4,
  },
  limitLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  prompt: {
    fontFamily: theme.fonts.body,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.75,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingBottom: Platform.OS === 'ios' ? 12 : 20,
  },
  btnReset: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnResetText: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
  },
  btnPlayPause: {
    flex: 2.2,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  btnPlayPauseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnPlayPauseText: {
    fontFamily: theme.fonts.heading,
    fontSize: 15.5,
  },
});
