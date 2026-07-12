import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, Vibration, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme';
import { MandalaBG } from '../../components/MandalaBG';
import { PALETTE } from '../../theme/palette';
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

  return (
    <Pressable style={[styles.root, { backgroundColor: theme.background }]} onPress={handleTapScreen}>
      {/* Background */}
      <MandalaBG
        opacity={isDark ? 0.055 : 0.03}
        from={theme.gradientStart}
        via={theme.gradientMid}
        to={theme.gradientEnd}
        stroke={theme.mandalaStroke}
        glowColor={theme.accentSoft}
      />

      <SafeAreaView style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M15 19l-7-7 7-7" stroke={theme.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>

          <Text style={[styles.headerTitle, { color: theme.text }]}>MANTRA JAAP</Text>

          <Pressable style={styles.headerBtn} onPress={() => {}}>
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
              ॐ नमो भगवते वासुदेवाय
            </Text>
            <Text style={[styles.mantraEn, { color: theme.text }]}>
              Om Namo Bhagavate Vāsudevāya
            </Text>
          </View>

          {/* Bead circular counter */}
          <View style={styles.circleContainer}>
            <Svg width={270} height={270} viewBox="0 0 270 270" style={styles.svgOverlay}>
              <G>
                {beads.map((bead) => {
                  const beadColor = getBeadColor(bead.index);
                  const isCurrentActive = bead.index === completedBeadCount + 1 && isPlaying;

                  if (isCurrentActive) {
                    // Glowing/pulsing bead representation
                    return (
                      <Circle
                        key={bead.index}
                        cx={bead.x}
                        cy={bead.y}
                        r={8.5}
                        fill={theme.accentBright}
                      />
                    );
                  }

                  return (
                    <Circle
                      key={bead.index}
                      cx={bead.x}
                      cy={bead.y}
                      r={bead.isSumeru ? 9.5 : 5.5}
                      fill={beadColor}
                    />
                  );
                })}
              </G>
            </Svg>

            {/* Inner Ring Card (Glassmorphism / Card overlay) */}
            <Animated.View
              style={[
                styles.innerCard,
                {
                  backgroundColor: isDark ? 'rgba(26, 27, 58, 0.72)' : 'rgba(255, 245, 248, 0.85)',
                  borderColor: isDark ? 'rgba(245, 236, 216, 0.12)' : 'rgba(92, 61, 74, 0.12)',
                  transform: [{ scale: countScale }],
                },
              ]}
            >
              <Text style={[styles.roundLabel, { color: theme.textMuted }]}>
                ROUND {roundCount} OF 3
              </Text>
              <Text style={[styles.counterText, { color: theme.text }]}>
                {beadCount}
              </Text>
              <Text style={[styles.limitLabel, { color: theme.textMuted }]}>
                of 108 · माला
              </Text>
            </Animated.View>
          </View>

          {/* Action Prompt */}
          <Text style={[styles.prompt, { color: theme.textMuted }]}>
            {isPlaying ? 'Tap anywhere to advance a bead' : 'Chanting is paused'}
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomBar}>
          <Pressable
            style={[
              styles.btnReset,
              {
                borderColor: isDark ? 'rgba(245, 236, 216, 0.18)' : 'rgba(92, 61, 74, 0.22)',
                backgroundColor: isDark ? 'rgba(26, 27, 58, 0.4)' : 'rgba(255, 255, 255, 0.6)',
              },
            ]}
            onPress={handleReset}
          >
            <Text style={[styles.btnResetText, { color: theme.text }]}>Reset</Text>
          </Pressable>

          <Pressable
            style={[
              styles.btnPlayPause,
              {
                backgroundColor: isDark ? theme.accent : theme.accentDeep,
              },
            ]}
            onPress={() => {
              triggerHaptic();
              setIsPlaying(!isPlaying);
            }}
          >
            <View style={styles.btnPlayPauseContent}>
              {isPlaying ? (
                <>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill={isDark ? theme.background : '#fff'}>
                    <Rect x={4} y={3} width={4} height={18} rx={1} />
                    <Rect x={16} y={3} width={4} height={18} rx={1} />
                  </Svg>
                  <Text style={[styles.btnPlayPauseText, { color: isDark ? theme.background : '#fff' }]}>
                    Pause · विराम
                  </Text>
                </>
              ) : (
                <>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill={isDark ? theme.background : '#fff'}>
                    <Path d="M8 5v14l11-7z" />
                  </Svg>
                  <Text style={[styles.btnPlayPauseText, { color: isDark ? theme.background : '#fff' }]}>
                    Resume · आरंभ
                  </Text>
                </>
              )}
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
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
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40,
  },
  mantraEn: {
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
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
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  counterText: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 60,
    lineHeight: 68,
    marginVertical: 4,
  },
  limitLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  prompt: {
    fontFamily: 'Poppins_400Regular',
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
    fontFamily: 'Poppins_600SemiBold',
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
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15.5,
  },
});
