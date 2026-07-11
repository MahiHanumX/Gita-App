import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { PALETTE } from '../../theme/palette';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Teaching'>;

export function TeachingScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  if (!practice || !ctaLabels) return null;

  const { teaching } = practice;

  return (
    <ChapterShell
      step={2}
      total={practice.totalSteps}
      onBack={() => navigation.goBack()}
      onClose={() => navigation.getParent()?.goBack()}
      cta={
        <CTA
          label={ctaLabels.teaching.label}
          subLabel={ctaLabels.teaching.subLabel}
          onPress={() => navigation.navigate('Task')}
        />
      }
    >
      <ChapterChip hindi={teaching.chipHi} english={teaching.chipEn} />
      <Text style={styles.title}>{teaching.title}</Text>
      <Text style={styles.italic}>{teaching.titleItalic}</Text>
      <Text style={styles.body}>{teaching.body}</Text>
      <View style={styles.reflectBox}>
        <Text style={styles.reflectLabel}>Reflect</Text>
        <Text style={styles.reflectText}>{teaching.reflectPrompt}</Text>
      </View>
    </ChapterShell>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 26,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    color: PALETTE.cream,
    textAlign: 'center',
    lineHeight: 32,
  },
  italic: {
    marginTop: 8,
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 26,
    color: PALETTE.saffronBright,
    textAlign: 'center',
    lineHeight: 32,
  },
  body: {
    marginTop: 28,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: PALETTE.textOnDarkMuted,
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 300,
  },
  reflectBox: {
    marginTop: 26,
    padding: 14,
    backgroundColor: 'rgba(232,168,56,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.25)',
    borderRadius: 16,
    maxWidth: 300,
  },
  reflectLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: PALETTE.saffronBright,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  reflectText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: PALETTE.cream,
    lineHeight: 21,
    textAlign: 'center',
  },
});
