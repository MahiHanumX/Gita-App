import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { useChapterTheme } from '../../theme';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Task'>;

export function TaskScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  const { theme, isLight, chapterColors } = useChapterTheme();
  const { refColor, surfaceBg, stepBorder, shadowColor } = chapterColors;

  const [showAlert, setShowAlert] = useState(false);
  const [steps, setSteps] = useState([
    { n: 1, text: 'Choose one task on your list today — small or large.', done: true },
    {
      n: 2,
      text: "Before starting, breathe once and silently offer the work: 'This is not for me alone.'",
      done: true,
    },
    {
      n: 3,
      text: 'Do it with full attention. Notice the pull toward the outcome — return to the doing.',
      current: true,
      done: false,
    },
    { n: 4, text: 'When finished, do not check what came of it. Move on.', done: false },
  ]);

  if (!practice || !ctaLabels) return null;
  const { task } = practice;

  const handleToggleStep = (stepNum: number) => {
    setSteps((prevSteps) => {
      return prevSteps.map((step) => {
        if (step.n === stepNum) {
          const updatedDone = !step.done;
          return {
            ...step,
            done: updatedDone,
            current: updatedDone ? false : step.current,
          };
        }
        return step;
      });
    });
  };
  const allDone = steps.every((s) => s.done);

  const warningColor = isLight ? '#D9363E' : '#FF4A6B';
  const warningBg = isLight ? 'rgba(217, 54, 62, 0.05)' : 'rgba(255, 74, 107, 0.08)';
  const warningBorder = isLight ? 'rgba(217, 54, 62, 0.2)' : 'rgba(255, 74, 107, 0.25)';
  const modalTextCol = isLight ? 'rgba(92, 61, 74, 0.85)' : '#FFCCD5';
  const modalOverlayBg = isLight ? 'rgba(92, 61, 74, 0.4)' : 'rgba(15, 16, 43, 0.85)';

  return (
    <>
      <ChapterShell
        step={3}
        total={practice.totalSteps}
        onBack={() => navigation.goBack()}
        onClose={() => navigation.getParent()?.goBack()}
        cta={
          <CTA
            label={ctaLabels.task.label}
            subLabel={ctaLabels.task.subLabel}
            onPress={() => {
              if (allDone) {
                navigation.navigate('Reflect');
              } else {
                setShowAlert(true);
              }
            }}
          />
        }
      >
        <ChapterChip hindi={task.chipHi} english={task.chipEn} />
        <Text style={[styles.title, { color: theme.text }]}>{task.title}</Text>
        <Text style={[styles.hindi, { color: refColor }]}>{task.hindiTitle}</Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: surfaceBg,
              borderColor: theme.cardBorder,
              shadowColor,
            },
          ]}
        >
          {steps.map((step) => (
            <TaskStep
              key={step.n}
              {...step}
              total={steps.length}
              isLight={isLight}
              accentDone={refColor}
              accentCurrent={theme.accent}
              stepBorder={stepBorder}
              textColor={theme.text}
              textMuted={theme.textMuted}
              onPress={() => handleToggleStep(step.n)}
            />
          ))}
        </View>

        {!allDone && (
          <View
            style={[
              styles.inlineErrorContainer,
              {
                backgroundColor: warningBg,
                borderColor: warningBorder,
              },
            ]}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                stroke={warningColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={[styles.inlineErrorText, { color: warningColor }]}>
              Be honest with yourself and complete all tasks first.
            </Text>
          </View>
        )}

        <Text style={[styles.note, { color: theme.textMuted }]}>{task.note}</Text>
      </ChapterShell>

      <Modal
        visible={showAlert}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: modalOverlayBg }]}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowAlert(false)} />
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: isLight ? theme.surface : '#1E1E38',
                borderColor: warningColor,
                shadowColor: warningColor,
              },
            ]}
          >
            <View style={[styles.modalGlowBar, { backgroundColor: warningColor }]} />
            <View
              style={[
                styles.modalIconContainer,
                {
                  backgroundColor: isLight ? 'rgba(217, 54, 62, 0.1)' : 'rgba(255, 74, 107, 0.15)',
                  borderColor: isLight ? 'rgba(217, 54, 62, 0.25)' : 'rgba(255, 74, 107, 0.3)',
                },
              ]}
            >
              <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  stroke={warningColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={[styles.modalTitle, { color: warningColor }]}>Be Honest with Yourself</Text>
            <Text style={[styles.modalText, { color: modalTextCol }]}>
              To truly grow, we must practice with complete sincerity. Please complete all tasks before moving to reflection.
            </Text>
            <Pressable
              onPress={() => setShowAlert(false)}
              style={({ pressed }) => [
                styles.modalButton,
                { backgroundColor: warningColor },
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text style={styles.modalButtonText}>I will complete them</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

  function TaskStep({
    n,
    text,
    done,
    current,
    total,
    isLight,
    accentDone,
    accentCurrent,
    stepBorder,
    textColor,
    textMuted,
    onPress,
  }: {
    n: number;
    text: string;
    done?: boolean;
    current?: boolean;
    total: number;
    isLight: boolean;
    accentDone: string;
    accentCurrent: string;
    stepBorder: string;
    textColor: string;
    textMuted: string;
    onPress: () => void;
  }) {
    const dotColor = done ? accentDone : current ? accentCurrent : 'rgba(180,180,200,0.3)';
    const isLast = n === total;

    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.stepRow,
          !isLast && { borderBottomWidth: 1, borderBottomColor: stepBorder },
          pressed && { opacity: 0.7 },
        ]}
      >
        <View
          style={[
            styles.stepDot,
            { borderColor: dotColor, backgroundColor: done ? dotColor : 'transparent' },
          ]}
        >
          {done ? (
            <Svg width={12} height={12} viewBox="0 0 12 12">
              <Path d="M2 6 L 5 9 L 10 3" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" />
            </Svg>
          ) : current ? (
            <View style={[styles.stepInnerDot, { backgroundColor: dotColor }]} />
          ) : null}
        </View>
        <Text
          style={[
            styles.stepText,
            { color: textColor },
            done && { color: textMuted, fontFamily: 'Poppins_400Regular', textDecorationLine: 'line-through' },
          ]}
        >
          {text}
        </Text>
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
    title: {
      marginTop: 26,
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 24,
      textAlign: 'center',
    },
    hindi: {
      marginTop: 8,
      fontFamily: 'NotoSansDevanagari_400Regular',
      fontSize: 18,
    },
    card: {
      marginTop: 26,
      width: '100%',
      maxWidth: 315,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 18,
      borderWidth: 1,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 3,
    },
    stepRow: { flexDirection: 'row', gap: 12, paddingVertical: 10 },
    stepDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    stepInnerDot: { width: 8, height: 8, borderRadius: 4 },
    stepText: {
      flex: 1,
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      lineHeight: 21,
    },
    note: {
      marginTop: 20,
      fontFamily: 'Poppins_400Regular',
      fontSize: 13,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    inlineErrorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 16,
      backgroundColor: 'rgba(255, 74, 107, 0.08)',
      borderColor: 'rgba(255, 74, 107, 0.25)',
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      maxWidth: 315,
      width: '100%',
    },
    inlineErrorText: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 12.5,
      color: '#FF4A6B',
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(15, 16, 43, 0.85)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
      width: '100%',
      maxWidth: 320,
      backgroundColor: '#1E1E38',
      borderRadius: 24,
      borderWidth: 1.5,
      borderColor: '#FF4A6B',
      padding: 28,
      alignItems: 'center',
      shadowColor: '#FF4A6B',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 8,
      overflow: 'hidden',
    },
    modalGlowBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: '#FF4A6B',
    },
    modalIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'rgba(255, 74, 107, 0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 74, 107, 0.3)',
    },
    modalTitle: {
      fontFamily: 'PlayfairDisplay_600SemiBold',
      fontSize: 22,
      color: '#FF4A6B',
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: 0.5,
    },
    modalText: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
      color: '#FFCCD5',
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 26,
    },
    modalButton: {
      backgroundColor: '#FF4A6B',
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 14,
      width: '100%',
      alignItems: 'center',
      shadowColor: '#FF4A6B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3,
    },
    modalButtonText: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 15,
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
  });
