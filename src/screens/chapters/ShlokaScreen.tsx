import { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { ChapterChip } from '../../components/SharedUI';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { useChapterTheme } from '../../theme';
import type { ShlokaCard } from '../../api_data/types';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Shloka'>;

const { width: SCREEN_W } = Dimensions.get('window');
// ChapterShell body has paddingHorizontal: 28. We escape it with -28 margin
// so the ScrollView spans full screen width, then pad the content ourselves.
const SHELL_PAD = 28; // must match ChapterShell body paddingHorizontal
const SIDE_PEEK = 20; // how much of adjacent card peeks in
const CARD_GAP = 14; // gap between cards
const CARD_W = SCREEN_W - SIDE_PEEK * 2 - CARD_GAP;
const SNAP_W = CARD_W + CARD_GAP;

export function ShlokaScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  const { theme, isLight, chapterColors } = useChapterTheme();
  const { refColor, translitColor, dividerColor, cardBg, cardBorder,
    dotActive, dotRead, dotIdle } = chapterColors;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  if (!practice || !ctaLabels) return null;

  const { shloka } = practice;
  const total = shloka.shlokas.length;

  const isLast = currentIndex === total - 1;


  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SNAP_W);
    const clamped = Math.max(0, Math.min(idx, total - 1));
    if (clamped !== currentIndex) setCurrentIndex(clamped);
  };

  const handleCta = () => {
    if (isLast) {
      navigation.navigate('Teaching');
    } else {
      const next = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: next * SNAP_W, animated: true });
      setCurrentIndex(next);
    }
  };

  return (
    <ChapterShell
      step={1}
      total={practice.totalSteps}
      onClose={() => navigation.getParent()?.goBack()}
      cta={
        <CTA
          label={isLast ? ctaLabels.shloka.label : 'Next Shloka'}
          subLabel={isLast ? ctaLabels.shloka.subLabel : `${currentIndex + 1} of ${total}`}
          onPress={handleCta}
        />
      }
    >
      <ChapterChip hindi={shloka.chipHi} english={shloka.chipEn} />

      {/* ─── Carousel ─── */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={SNAP_W}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        // Negative margin breaks out of ChapterShell padding so cards
        // span full screen width without being clipped
        style={[styles.scroll, { marginHorizontal: -SHELL_PAD }]}
        contentContainerStyle={{
          paddingHorizontal: SIDE_PEEK,
          gap: CARD_GAP,
        }}
      >
        {shloka.shlokas.map((item, i) => (
          <ShlokaSlide
            key={i}
            item={item}
            index={i}
            total={total}
            isLight={isLight}
            textColor={theme.text}
            translitColor={translitColor}
            dividerColor={dividerColor}
            refColor={refColor}
            cardBg={cardBg}
            cardBorder={cardBorder}
            badgeBg={chapterColors.badgeBg}
            badgeBorder={chapterColors.badgeBorder}
          />
        ))}
      </ScrollView>

      {/* ─── Dot indicators ─── */}
      <View style={styles.dotsRow}>
        {shloka.shlokas.map((_, i) => {
          const isActive = i === currentIndex;
          const isRead = i < currentIndex;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                isActive
                  ? { backgroundColor: dotActive, width: 22, borderRadius: 4 }
                  : isRead
                    ? { backgroundColor: dotRead, opacity: 0.8 }
                    : { backgroundColor: dotIdle },
              ]}
            />
          );
        })}
      </View>

      <Text style={[styles.counter, { color: theme.textMuted }]}>
        {currentIndex + 1} / {total}
      </Text>
    </ChapterShell>
  );
}

/* ─── Single Shloka Slide ─── */
function ShlokaSlide({
  item,
  index,
  total,
  isLight: _isLight,
  textColor,
  translitColor,
  dividerColor,
  refColor,
  cardBg,
  cardBorder,
  badgeBg,
  badgeBorder,
}: {
  item: ShlokaCard;
  index: number;
  total: number;
  isLight: boolean;
  textColor: string;
  translitColor: string;
  dividerColor: string;
  refColor: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeBorder: string;
}) {
  return (
    <View
      style={[
        styles.card,
        {
          width: CARD_W,
          backgroundColor: cardBg,
          borderColor: cardBorder,
          // Add right margin except last card so last card aligns flush
          marginRight: index < total - 1 ? 0 : 0,
        },
      ]}
    >
      {/* Sanskrit verse */}
      <Text style={[styles.shloka, { color: textColor }]}>
        {item.lines.join('\n')}
      </Text>

      {/* Pada B */}
      <Text style={[styles.shlokaSub, { color: textColor }]}>
        {item.subLines.join('\n')}
      </Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: dividerColor }]} />

      {/* Transliteration */}
      <Text style={[styles.translit, { color: translitColor }]}>
        {item.transliteration}
      </Text>

      <View
        style={[
          styles.refBadge,
          { backgroundColor: badgeBg, borderColor: badgeBorder },
        ]}
      >
        <Text style={[styles.ref, { color: refColor }]}>{item.reference}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 18,
    flexGrow: 0,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  shloka: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 36,
  },
  shlokaSub: {
    marginTop: 16,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 18,
    opacity: 0.88,
    textAlign: 'center',
    lineHeight: 30,
  },
  divider: {
    marginTop: 24,
    width: 40,
    height: 1,
    borderRadius: 1,
  },
  translit: {
    marginTop: 18,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  refBadge: {
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  ref: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  counter: {
    marginTop: 8,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  hint: {
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 10,
    opacity: 0.8,
  },
});
