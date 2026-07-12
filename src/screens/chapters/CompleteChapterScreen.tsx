import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { DiyaIcon } from '../../components/Icons';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { advancePathJourneyDay } from '../../api_data/services';
import { ChapterFlowParamList } from '../../navigation/types';
import { useChapterTheme } from '../../theme';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Complete'>;

export function CompleteChapterScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  const { theme, isLight, chapterColors } = useChapterTheme();
  const { refColor } = chapterColors;

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  if (!practice || !ctaLabels) return null;

  const { complete } = practice;

  const flameColor = isLight ? '#D9869A' : '#ffe08a';

  // Soft gold vibrating glow animation
  const glowScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.25],
  });

  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <ChapterShell
      step={5}
      total={practice.totalSteps}
      onBack={() => navigation.goBack()}
      onClose={() => navigation.getParent()?.goBack()}
      cta={
        <CTA
          label={ctaLabels.complete.label}
          subLabel={ctaLabels.complete.subLabel}
          onPress={async () => {
            const completedDay = practice.dayId;
            await advancePathJourneyDay();
            navigation.navigate('MilestoneComplete', { day: completedDay });
          }}
        />
      }
    >
      <ChapterChip hindi={complete.chipHi} english={complete.chipEn} />
      <View style={styles.lampWrap}>
        {/* Pulsing Gold Glow Circle */}
        <Animated.View
          style={[
            styles.vibratingGlow,
            {
              transform: [{ scale: glowScale }],
              opacity: glowOpacity,
            },
          ]}
        />
        {/* Deepak Image */}
        <Image
          source={require('../../../assets/deepak.png')}
          style={styles.deepakImage}
          resizeMode="contain"
        />
        {/* DiyaIcon on top, outer layer color transparent to keep only the flame */}
        <View style={styles.diyaOverlay}>
          <DiyaIcon size={80} lit color="transparent" flameColor={flameColor} />
        </View>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{complete.title}</Text>
      <Text style={[styles.hindi, { color: refColor }]}>{complete.hindiTitle}</Text>
      <Text style={[styles.body, { color: theme.textMuted }]}>{complete.body}</Text>
    </ChapterShell>
  );
}

const styles = StyleSheet.create({
  lampWrap: {
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 180,
    width: 180,
  },
  deepakImage: {
    width: 140,
    height: 140,
    zIndex: 2,
  },
  diyaOverlay: {
    position: 'absolute',
    top: 15,
    zIndex: 3,
  },
  vibratingGlow: {
    position: 'absolute',
    top: 25,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffd670',
    shadowColor: '#f4c257',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    shadowOpacity: 0.8,
    elevation: 6,
    zIndex: 1,
  },
  title: {
    marginTop: 34,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    textAlign: 'center',
  },
  hindi: {
    marginTop: 8,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 22,
  },
  body: {
    marginTop: 18,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 290,
  },
});
