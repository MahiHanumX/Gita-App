import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { PALETTE } from '../../theme/palette';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Shloka'>;

export function ShlokaScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  if (!practice || !ctaLabels) return null;

  const { shloka } = practice;

  return (
    <ChapterShell
      step={1}
      total={practice.totalSteps}
      onClose={() => navigation.getParent()?.goBack()}
      cta={
        <CTA
          label={ctaLabels.shloka.label}
          subLabel={ctaLabels.shloka.subLabel}
          onPress={() => navigation.navigate('Teaching')}
        />
      }
    >
      <ChapterChip hindi={shloka.chipHi} english={shloka.chipEn} />
      <Text style={styles.shloka}>{shloka.lines.join('\n')}</Text>
      <Text style={styles.shlokaSub}>{shloka.subLines.join('\n')}</Text>
      <View style={styles.divider} />
      <Text style={styles.translit}>{shloka.transliteration}</Text>
      <Text style={styles.ref}>{shloka.reference}</Text>
    </ChapterShell>
  );
}

const styles = StyleSheet.create({
  shloka: {
    marginTop: 32,
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 24,
    color: PALETTE.cream,
    textAlign: 'center',
    lineHeight: 38,
  },
  shlokaSub: {
    marginTop: 20,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 19,
    color: PALETTE.cream,
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 32,
  },
  divider: {
    marginTop: 30,
    width: 44,
    height: 1,
    backgroundColor: 'rgba(232,168,56,0.6)',
  },
  translit: {
    marginTop: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    fontStyle: 'italic',
    color: PALETTE.textOnDarkMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  ref: {
    marginTop: 24,
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: PALETTE.saffronBright,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
