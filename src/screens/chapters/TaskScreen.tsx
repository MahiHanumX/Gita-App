import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { lightLotusTheme } from '../../theme/themes';

const t = lightLotusTheme;

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Task'>;

export function TaskScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  if (!practice || !ctaLabels) return null;

  const { task } = practice;

  return (
    <ChapterShell
      step={3}
      total={practice.totalSteps}
      tone="light"
      onBack={() => navigation.goBack()}
      onClose={() => navigation.getParent()?.goBack()}
      cta={
        <CTA
          variant="light"
          label={ctaLabels.task.label}
          subLabel={ctaLabels.task.subLabel}
          onPress={() => navigation.navigate('Reflect')}
        />
      }
    >
      <ChapterChip hindi={task.chipHi} english={task.chipEn} variant="light" />
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.hindi}>{task.hindiTitle}</Text>
      <View style={styles.card}>
        {task.steps.map((step) => (
          <TaskStep key={step.n} {...step} />
        ))}
      </View>
      <Text style={styles.note}>{task.note}</Text>
    </ChapterShell>
  );
}

function TaskStep({
  n,
  text,
  done,
  current,
}: {
  n: number;
  text: string;
  done?: boolean;
  current?: boolean;
}) {
  const dotColor = done ? t.accentDeep : current ? t.accent : 'rgba(232, 164, 184, 0.35)';
  return (
    <View style={[styles.stepRow, n < 4 && styles.stepBorder]}>
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
      <Text style={[styles.stepText, done && styles.stepTextDone]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 26,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: t.text,
    textAlign: 'center',
  },
  hindi: {
    marginTop: 8,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 18,
    color: t.accentDeep,
  },
  card: {
    marginTop: 26,
    width: '100%',
    maxWidth: 315,
    backgroundColor: t.surface,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: t.cardBorder,
    shadowColor: '#E8A4B8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 3,
  },
  stepRow: { flexDirection: 'row', gap: 12, paddingVertical: 10 },
  stepBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(232, 164, 184, 0.15)' },
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
    color: t.text,
    lineHeight: 21,
  },
  stepTextDone: {
    fontFamily: 'Poppins_400Regular',
    color: t.textMuted,
  },
  note: {
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    fontStyle: 'italic',
    color: t.textMuted,
    textAlign: 'center',
  },
});
