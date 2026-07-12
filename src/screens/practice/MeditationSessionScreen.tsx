import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useTheme } from '../../theme';
import { MandalaBG } from '../../components/MandalaBG';
import { PALETTE } from '../../theme/palette';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MeditationSession'>;

type BreathState = 'inhale' | 'hold_in' | 'exhale' | 'hold_out';

export function MeditationSessionScreen({ navigation, route }: Props) {
  const { theme, resolvedMode } = useTheme();
  const isDark = resolvedMode === 'dark';

  // Get session info or use default values from mockup
  const titleEn = route.params?.titleEn || 'Stillness of the River';
  const titleHi = route.params?.titleHi || 'नदी की शांति';

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(252); // 4:12 in seconds
  const totalDuration = 720; // 12:00 in seconds

  // Breathing State
  const [breathState, setBreathState] = useState<BreathState>('inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  // Animations
  const breathAnim = useRef(new Animated.Value(1.0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  // Audio Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Breathing Guide Loop (independent of play state or linked)
  // Let's run it continuously or when playing. Linking it makes sense, but breathing apps often let it pulse always. Let's run it whenever the screen is active.
  useEffect(() => {
    const timer = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          // Switch state
          setBreathState((currentState) => {
            let nextState: BreathState = 'inhale';
            let nextSeconds = 4;

            if (currentState === 'inhale') {
              nextState = 'hold_in';
              nextSeconds = 4;
              // Hold state: keep it large and glowing
              Animated.parallel([
                Animated.timing(breathAnim, { toValue: 1.25, duration: 200, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0.9, duration: 200, useNativeDriver: true }),
              ]).start();
            } else if (currentState === 'hold_in') {
              nextState = 'exhale';
              nextSeconds = 4;
              // Exhale state: shrink circle and lower glow
              Animated.parallel([
                Animated.timing(breathAnim, { toValue: 0.9, duration: 4000, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0.35, duration: 4000, useNativeDriver: true }),
              ]).start();
            } else if (currentState === 'exhale') {
              nextState = 'hold_out';
              nextSeconds = 4;
              // Hold out: keep it small
              Animated.parallel([
                Animated.timing(breathAnim, { toValue: 0.9, duration: 200, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0.2, duration: 200, useNativeDriver: true }),
              ]).start();
            } else if (currentState === 'hold_out') {
              nextState = 'inhale';
              nextSeconds = 4;
              // Inhale state: expand circle and increase glow
              Animated.parallel([
                Animated.timing(breathAnim, { toValue: 1.25, duration: 4000, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0.8, duration: 4000, useNativeDriver: true }),
              ]).start();
            }

            return nextState;
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    // Initial animation triggers
    Animated.parallel([
      Animated.timing(breathAnim, { toValue: 1.25, duration: 4000, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 0.8, duration: 4000, useNativeDriver: true }),
    ]).start();

    return () => clearInterval(timer);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Skip handlers
  const handleRewind15 = () => {
    setCurrentTime((prev) => Math.max(0, prev - 15));
  };

  const handleForward15 = () => {
    setCurrentTime((prev) => Math.min(totalDuration, prev + 15));
  };

  const getBreathLabel = () => {
    switch (breathState) {
      case 'inhale':
        return { en: 'BREATHE IN', hi: 'श्वास लें' };
      case 'hold_in':
        return { en: 'HOLD', hi: 'सांस रोकें' };
      case 'exhale':
        return { en: 'BREATHE OUT', hi: 'श्वास छोड़ें' };
      case 'hold_out':
        return { en: 'HOLD', hi: 'सांस रोकें' };
    }
  };

  const labels = getBreathLabel();

  // Progress Bar Ratio
  const progressRatio = currentTime / totalDuration;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Background Mandala */}
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
              <Path d="M6 9l6 6 6-6" stroke={theme.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>

          <Text style={[styles.headerTitle, { color: theme.text }]}>MEDITATION</Text>

          <Pressable style={styles.headerBtn} onPress={() => {}}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={5} r={2} fill={theme.text} />
              <Circle cx={12} cy={12} r={2} fill={theme.text} />
              <Circle cx={12} cy={19} r={2} fill={theme.text} />
            </Svg>
          </Pressable>
        </View>

        {/* Dynamic Breathing Guide Ring */}
        <View style={styles.centerSection}>
          <View style={styles.breatherOuter}>
            {/* Animated Halo Glow */}
            <Animated.View
              style={[
                styles.breatherGlow,
                {
                  opacity: glowAnim,
                  transform: [{ scale: breathAnim }],
                  backgroundColor: isDark ? theme.accent : theme.accentDeep,
                },
              ]}
            />
            {/* Main breathing circle */}
            <Animated.View
              style={[
                styles.breatherCircle,
                {
                  backgroundColor: isDark ? '#1a1b3a' : '#FFF9FB',
                  borderColor: isDark ? 'rgba(244, 194, 87, 0.4)' : 'rgba(217, 134, 154, 0.4)',
                  transform: [{ scale: breathAnim }],
                },
              ]}
            >
              <Text style={[styles.breathInstruction, { color: theme.textMuted }]}>
                {labels.en}
              </Text>
              <Text style={[styles.breathTimer, { color: theme.text }]}>
                {breathSeconds}
              </Text>
              <Text style={[styles.breathInstructionHi, { color: isDark ? theme.accentBright : theme.accentDeep }]}>
                {labels.hi}
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* Info & Progress Player Controls */}
        <View style={styles.playerSection}>
          {/* Track Info */}
          <View style={styles.infoWrapper}>
            <Text style={[styles.titleEn, { color: theme.text }]}>
              {titleEn}
            </Text>
            <Text style={[styles.titleHi, { color: isDark ? theme.accentBright : theme.accentDeep }]}>
              {titleHi}
            </Text>
          </View>

          {/* Progress Timeline Slider */}
          <View style={styles.timelineWrapper}>
            <View style={styles.progressBarWrapper}>
              <View style={[styles.progressBarTrack, { backgroundColor: theme.progressTrack }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${progressRatio * 100}%`,
                      backgroundColor: isDark ? theme.accentBright : theme.accentDeep,
                    },
                  ]}
                />
                {/* Custom Thumb */}
                <View
                  style={[
                    styles.progressThumb,
                    {
                      left: `${progressRatio * 100}%`,
                      backgroundColor: isDark ? '#fff2c9' : theme.accentDeep,
                      borderColor: isDark ? theme.accentDeep : '#FFF9FB',
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.timeCounterRow}>
              <Text style={[styles.timeLabel, { color: theme.textMuted }]}>
                {formatTime(currentTime)}
              </Text>
              <Text style={[styles.timeLabel, { color: theme.textMuted }]}>
                {formatTime(totalDuration)}
              </Text>
            </View>
          </View>

          {/* Playback Button Row */}
          <View style={styles.controlRow}>
            {/* Rewind 15 */}
            <Pressable style={styles.controlBtnSecondary} onPress={handleRewind15}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M12.5 3a9 9 0 1 0 7 3.5M19.5 3v4.5H15" stroke={theme.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={[styles.skipCounterText, { color: theme.text }]}>15</Text>
            </Pressable>

            {/* Skip Back */}
            <Pressable style={styles.controlBtnSecondary} onPress={() => setCurrentTime(0)}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M19 20L9 12l10-8v16zM5 19V5" stroke={theme.text} strokeWidth={2.5} fill={theme.text} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>

            {/* Play/Pause */}
            <Pressable
              style={({ pressed }) => [
                styles.btnPlay,
                {
                  backgroundColor: isDark ? theme.accent : theme.accentDeep,
                  opacity: pressed ? 0.9 : 1.0,
                },
              ]}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={isDark ? theme.background : '#fff'}>
                  <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </Svg>
              ) : (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={isDark ? theme.background : '#fff'} style={{ marginLeft: 3 }}>
                  <Path d="M8 5v14l11-7z" />
                </Svg>
              )}
            </Pressable>

            {/* Skip Next */}
            <Pressable style={styles.controlBtnSecondary} onPress={() => setCurrentTime(totalDuration)}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M5 4l10 8-10 8V4zm14 15V5" stroke={theme.text} strokeWidth={2.5} fill={theme.text} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>

            {/* Forward 15 */}
            <Pressable style={styles.controlBtnSecondary} onPress={handleForward15}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M11.5 3a9 9 0 1 1-7 3.5M4.5 3v4.5H9" stroke={theme.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={[styles.skipCounterText, { color: theme.text }]}>15</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
    paddingBottom: Platform.OS === 'ios' ? 20 : 32,
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
  centerSection: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breatherOuter: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  breatherCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 2,
  },
  breatherGlow: {
    position: 'absolute',
    width: 216,
    height: 216,
    borderRadius: 108,
    zIndex: 1,
  },
  breathInstruction: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.8,
  },
  breathTimer: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 66,
    marginVertical: 4,
  },
  breathInstructionHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  playerSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 32,
  },
  infoWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  titleEn: {
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
    fontSize: 27,
    textAlign: 'center',
  },
  titleHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.85,
  },
  timelineWrapper: {
    width: '100%',
  },
  progressBarWrapper: {
    height: 18,
    justifyContent: 'center',
  },
  progressBarTrack: {
    height: 3.5,
    borderRadius: 2,
    width: '100%',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    top: -4,
    transform: [{ translateX: -6 }],
  },
  timeCounterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11.5,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  controlBtnSecondary: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  skipCounterText: {
    position: 'absolute',
    fontSize: 7.5,
    fontFamily: 'Poppins_600SemiBold',
    top: 17,
  },
  btnPlay: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
});
