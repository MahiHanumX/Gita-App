import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { PALETTE } from '../../theme/palette';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Reflect'>;

export function ReflectScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  if (!practice || !ctaLabels) return null;

  const { reflect } = practice;

  return (
    <ChapterShell
      step={4}
      total={practice.totalSteps}
      onBack={() => navigation.goBack()}
      onClose={() => navigation.getParent()?.goBack()}
      cta={
        <CTA
          label={ctaLabels.reflect.label}
          subLabel={ctaLabels.reflect.subLabel}
          onPress={() => navigation.navigate('Complete')}
        />
      }
    >
      <ChapterChip hindi={reflect.chipHi} english={reflect.chipEn} />
      <Text style={styles.title}>{reflect.question}</Text>
      <Text style={styles.hindi}>{reflect.questionHi}</Text>
      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{reflect.sampleText}</Text>
        <View style={styles.chips}>
          {reflect.feelings.map((feeling) => (
            <FeelingChip key={feeling.id} label={feeling.label} active={feeling.active} />
          ))}
        </View>
      </View>
      <Text style={styles.private}>{reflect.privacyNote}</Text>
    </ChapterShell>
  );
}

function FeelingChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 26,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: PALETTE.cream,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 300,
  },
  hindi: {
    marginTop: 12,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 16,
    color: PALETTE.saffronBright,
    textAlign: 'center',
  },
  inputBox: {
    marginTop: 30,
    width: '100%',
    backgroundColor: 'rgba(245,236,216,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(245,236,216,0.14)',
    borderRadius: 20,
    padding: 18,
    minHeight: 190,
  },
  inputText: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 16,
    color: PALETTE.cream,
    lineHeight: 26,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(245,236,216,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245,236,216,0.15)',
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: 'rgba(232,168,56,0.22)',
    borderColor: 'rgba(232,168,56,0.5)',
  },
  chipText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: PALETTE.cream,
  },
  chipTextActive: { color: PALETTE.saffronBright },
  private: {
    marginTop: 14,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: PALETTE.textOnDarkMuted,
  },
});
