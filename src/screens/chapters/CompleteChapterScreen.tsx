import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { DiyaIcon } from '../../components/Icons';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { advancePathJourneyDay } from '../../api_data/services';
import { ChapterFlowParamList } from '../../navigation/types';
import { PALETTE } from '../../theme/palette';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Complete'>;

export function CompleteChapterScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  if (!practice || !ctaLabels) return null;

  const { complete } = practice;

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
            await advancePathJourneyDay();
            navigation.getParent()?.goBack();
          }}
        />
      }
    >
      <ChapterChip hindi={complete.chipHi} english={complete.chipEn} />
      <View style={styles.lampWrap}>
        <View style={styles.halo} />
        <LinearGradient colors={['#ffe08a', '#f4c257', '#c67a1a']} style={styles.lamp}>
          <DiyaIcon size={68} lit color={PALETTE.indigoDeep} flameColor="#c67a1a" />
        </LinearGradient>
      </View>
      <Text style={styles.title}>{complete.title}</Text>
      <Text style={styles.hindi}>{complete.hindiTitle}</Text>
      <Text style={styles.body}>{complete.body}</Text>
    </ChapterShell>
  );
}

const styles = StyleSheet.create({
  lampWrap: { marginTop: 28, alignItems: 'center', justifyContent: 'center' },
  halo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(244,194,87,0.35)',
  },
  lamp: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#fff4d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 34,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 26,
    color: PALETTE.cream,
    textAlign: 'center',
  },
  hindi: {
    marginTop: 8,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 22,
    color: PALETTE.saffronBright,
  },
  body: {
    marginTop: 18,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: PALETTE.textOnDarkMuted,
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 290,
  },
});
