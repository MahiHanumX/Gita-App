import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MandalaBG } from '../../components/MandalaBG';
import { CTA } from '../../components/CTA';
import { PALETTE } from '../../theme/palette';
import { ChapterFlowParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { useTranslation } from '../../i18n';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'MilestoneComplete'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Small marigold petal SVG — teardrop with warm gradient
function MarigoldPetal({ size = 14, hue = 0 }) {
  const gradId = `petal-${hue}`;
  return (
    <Svg width={size} height={size * 1.4} viewBox="0 0 14 20">
      <Defs>
        <RadialGradient id={gradId} cx="50%" cy="30%" rx="80%" ry="80%">
          <Stop offset="0%" stopColor="#ffe08a" />
          <Stop offset="45%" stopColor="#f4c257" />
          <Stop offset="100%" stopColor="#c67a1a" />
        </RadialGradient>
      </Defs>
      <Path
        d="M7 0 C 2 5, 0 12, 3 17 C 5 19, 9 19, 11 17 C 14 12, 12 5, 7 0 Z"
        fill={`url(#${gradId})`}
      />
      <Path
        d="M7 4 C 4 8, 3 13, 5 16"
        stroke="rgba(198,122,26,0.4)"
        strokeWidth="0.5"
        fill="none"
      />
    </Svg>
  );
}

// Deterministic pseudo-random for stable positions
function petalSeed(i: number) {
  const s = Math.sin(i * 47.813) * 43758.5453;
  return s - Math.floor(s);
}

function Petal({
  x,
  size,
  rot,
  delay,
  dur,
  drift,
  index,
}: {
  x: number;
  size: number;
  rot: number;
  delay: number;
  dur: number;
  drift: number;
  index: number;
}) {
  const startProgress = delay < 0 ? Math.min(0.9, Math.abs(delay) / dur) : 0;
  const progress = useRef(new Animated.Value(startProgress)).current;

  useEffect(() => {
    let anim: Animated.CompositeAnimation;
    const runAnim = (fromVal = 0) => {
      progress.setValue(fromVal);
      anim = Animated.timing(progress, {
        toValue: 1,
        duration: dur * (1 - fromVal) * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      });
      anim.start((finished) => {
        if (finished.finished) {
          runAnim(0);
        }
      });
    };
    runAnim(startProgress);

    return () => {
      if (anim) anim.stop();
    };
  }, [progress, dur, startProgress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, SCREEN_HEIGHT + 50],
  });

  const translateX = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, drift, 0],
  });

  const rotation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [`${rot}deg`, `${rot + 360}deg`],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 0.75, 0.75, 0],
  });

  return (
    <Animated.View
      style={[
        styles.petalContainer,
        {
          left: `${x}%`,
          transform: [{ translateY }, { translateX }, { rotate: rotation }],
          opacity,
        },
      ]}
    >
      <MarigoldPetal size={size} hue={index} />
    </Animated.View>
  );
}

function PetalField({ count = 24 }) {
  const petals = Array.from({ length: count }).map((_, i) => {
    const x = petalSeed(i) * 100;
    const size = 10 + petalSeed(i + 200) * 14;
    const rot = petalSeed(i + 300) * 360;
    const delay = petalSeed(i + 400) * -12;
    const dur = 8 + petalSeed(i + 500) * 6;
    const drift = 20 + petalSeed(i + 600) * 40;
    return { i, x, size, rot, delay, dur, drift };
  });

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {petals.map((p) => (
        <Petal
          key={p.i}
          x={p.x}
          size={p.size}
          rot={p.rot}
          delay={p.delay}
          dur={p.dur}
          drift={p.drift}
          index={p.i}
        />
      ))}
    </View>
  );
}

function Medallion({ day = 7, label = 'Karma Yoga', hindi = 'कर्मयोग' }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 25000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.medallionOuter}>
      {/* outer halo */}
      <View style={styles.haloWrap}>
        <Svg width="320" height="320" viewBox="0 0 320 320">
          <Defs>
            <RadialGradient id="haloGrad" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#f4c257" stopOpacity={0.4} />
              <Stop offset="100%" stopColor="#f4c257" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="160" cy="160" r="160" fill="url(#haloGrad)" />
        </Svg>
      </View>

      {/* rays */}
      <Animated.View
        style={[
          styles.raysWrap,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Svg width="220" height="220" viewBox="0 0 220 220">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15) * Math.PI / 180;
            const r1 = 110;
            const r2 = 100;
            const x1 = 110 + Math.cos(a) * r2;
            const y1 = 110 + Math.sin(a) * r2;
            const x2 = 110 + Math.cos(a) * r1;
            const y2 = 110 + Math.sin(a) * r1;
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f4c257"
                strokeWidth={i % 2 === 0 ? 2.5 : 1.2}
                strokeLinecap="round"
                opacity={i % 2 === 0 ? 0.85 : 0.5}
              />
            );
          })}
        </Svg>
      </Animated.View>

      {/* medallion body */}
      <View style={styles.medallionBody}>
        <LinearGradient
          colors={['#ffe08a', '#f4c257', '#c67a1a']}
          style={styles.medallionGrad}
        >
          {/* petal ring inside */}
          <View style={styles.petalRing}>
            <Svg width="140" height="140" viewBox="0 0 140 140">
              <G fill="none" stroke="rgba(26,27,58,0.18)" strokeWidth="1">
                <Circle cx="70" cy="70" r="60" />
                <Circle cx="70" cy="70" r="50" strokeDasharray="1 4" />
              </G>
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * 45) * Math.PI / 180;
                const x = 70 + Math.cos(a) * 55;
                const y = 70 + Math.sin(a) * 55;
                return <Circle key={i} cx={x} cy={y} r="2" fill="rgba(26,27,58,0.35)" />;
              })}
            </Svg>
          </View>

          <Text style={styles.medallionDayLabel}>Day</Text>
          <Text style={styles.medallionDayNum}>{day}</Text>
          <Text style={styles.medallionHindi}>{hindi}</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

export function MilestoneCompleteScreen({ route, navigation }: Props) {
  const { day } = route.params;
  const t = useTranslation();
  const { theme, resolvedMode } = useTheme();

  const isLight = resolvedMode === 'light';
  const loc = t.milestones;
  const content = day === 7 ? loc.d7 : day === 21 ? loc.d21 : day === 40 ? loc.d40 : loc.default;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${loc.unlocked}: Day ${day} (${content.label}) - "${content.quote}" 🕉️`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = () => {
    navigation.getParent()?.goBack();
  };

  const activeColor = isLight ? theme.accentDeep : theme.accentBright;
  const shareBg = isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.08)';
  const shareBorder = isLight ? 'rgba(92,61,74,0.12)' : 'rgba(245,236,216,0.18)';

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <MandalaBG
        opacity={isLight ? 0.03 : 0.055}
        from={theme.gradientStart}
        via={theme.gradientMid}
        to={theme.gradientEnd}
        stroke={theme.mandalaStroke}
        glowColor={theme.accentSoft}
      />

      {/* Saffron Glow Background */}
      <View style={styles.saffronGlowContainer} pointerEvents="none">
        <Svg width="480" height="480" viewBox="0 0 480 480">
          <Defs>
            <RadialGradient id="saffronGlow" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#e8a838" stopOpacity={isLight ? 0.16 : 0.28} />
              <Stop offset="100%" stopColor="#e8a838" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect width="480" height="480" fill="url(#saffronGlow)" />
        </Svg>
      </View>

      {/* Falling Marigold Petals */}
      <PetalField count={22} />

      <SafeAreaView style={styles.safeArea}>
        {/* Top Titles */}
        <Animated.View style={[styles.topSection, { opacity: fadeAnim }]}>
          <Text style={[styles.topLabel, { color: activeColor }]}>
            {loc.unlocked}
          </Text>
          <Text style={[styles.topHindi, { color: theme.textMuted }]}>
            पड़ाव पूर्ण
          </Text>
        </Animated.View>

        {/* Medallion & Central Content */}
        <View style={styles.centerSection}>
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim,
            }}
          >
            <Medallion day={day} label={content.label} hindi={content.hindi} />
          </Animated.View>

          <Animated.View style={[styles.textSection, { opacity: fadeAnim }]}>
            <Text style={[styles.quoteEn, { color: theme.text }]}>
              {content.quote}
            </Text>
            <Text style={[styles.quoteHi, { color: activeColor }]}>
              {content.quoteHindi}
            </Text>
            <Text style={[styles.descText, { color: theme.textMuted }]}>
              {content.desc}
            </Text>
          </Animated.View>
        </View>

        {/* Action Buttons */}
        <Animated.View style={[styles.buttonRow, { opacity: fadeAnim }]}>
          <Pressable
            style={[
              styles.shareButton,
              {
                backgroundColor: shareBg,
                borderColor: shareBorder,
              },
            ]}
            onPress={handleShare}
          >
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 12 v 7 a 1 1 0 0 0 1 1 h 14 a 1 1 0 0 0 1 -1 v -7"
                stroke={theme.text}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <Path
                d="M12 4 v 12 M 7 9 l 5 -5 l 5 5"
                stroke={theme.text}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={[styles.shareText, { color: theme.text }]}>
              {loc.share}
            </Text>
          </Pressable>

          <View style={styles.ctaWrap}>
            <CTA
              label={loc.continue}
              subLabel={loc.continueSub}
              onPress={handleContinue}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  saffronGlowContainer: {
    position: 'absolute',
    top: '15%',
    left: '50%',
    marginLeft: -240,
    width: 480,
    height: 480,
  },
  petalContainer: {
    position: 'absolute',
    top: 0,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
    zIndex: 5,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  topLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  topHindi: {
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 14,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginVertical: 16,
  },
  medallionOuter: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  haloWrap: {
    position: 'absolute',
    width: 320,
    height: 320,
  },
  raysWrap: {
    position: 'absolute',
    width: 220,
    height: 220,
  },
  medallionBody: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#fff4d6',
    shadowColor: '#f4c257',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 8,
  },
  medallionGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petalRing: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
  medallionDayLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#1a1b3a',
    opacity: 0.65,
  },
  medallionDayNum: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 62,
    lineHeight: 64,
    marginTop: 2,
    color: '#1a1b3a',
  },
  medallionHindi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 14,
    marginTop: 4,
    color: '#1a1b3a',
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  quoteEn: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 34,
  },
  quoteHi: {
    marginTop: 8,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  descText: {
    marginTop: 18,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 310,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  shareButton: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shareText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  },
  ctaWrap: {
    flex: 1,
  },
});
