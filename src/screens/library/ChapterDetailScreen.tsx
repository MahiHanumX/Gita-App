import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PALETTE } from '../../theme/palette';
import { LibraryStackParamList } from '../../navigation/types';
import { useLocale, useTranslation } from '../../i18n';
import { useLibraryContent } from '../../api_data/hooks';
import { useTheme } from '../../theme';
import { MandalaBG } from '../../components/MandalaBG';

type Props = NativeStackScreenProps<LibraryStackParamList, 'ChapterDetail'>;

import { CHAPTER_VERSES_MOCK, DEFAULT_VERSES_MOCK } from '../../api_data/mock/library.mock';

const CHAPTER_VERSES = CHAPTER_VERSES_MOCK;
const DEFAULT_VERSES = DEFAULT_VERSES_MOCK;

export function ChapterDetailScreen({ route, navigation }: Props) {
  const { chapterId, titleHi, titleEn, verses } = route.params;
  const { data } = useLibraryContent();
  const tr = useTranslation();
  const { language } = useLocale();
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';

  const chapter = data?.chapters.find((c) => c.id === chapterId);
  const progress = chapter?.progress ?? 0;
  const readTime = Math.round(verses * 0.4);

  const listVerses = CHAPTER_VERSES[chapterId] ?? DEFAULT_VERSES;

  const gradientColors = (isLight
    ? [theme.gradientMid, theme.gradientEnd]
    : [theme.gradientStart, theme.gradientEnd]) as [string, string];

  const strokeColor = isLight ? theme.mandalaStroke : theme.accentBright;
  const backIconColor = isLight ? theme.text : theme.text;

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
      {/* Dark-gradient Header */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={gradientColors}
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Subtle Mandala SVG Pattern Overlay */}
        <View style={styles.mandalaOverlay} pointerEvents="none">
          <Svg width="320" height="320" viewBox="0 0 320 320">
            <Circle cx="160" cy="160" r="140" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.2" />
            <Circle cx="160" cy="160" r="110" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.2" />
            <Circle cx="160" cy="160" r="80" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.2" />
            <Circle cx="160" cy="160" r="50" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.2" />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5) * Math.PI / 180;
              return (
                <Line
                  key={i}
                  x1={160 + Math.cos(a) * 30}
                  y1={160 + Math.sin(a) * 30}
                  x2={160 + Math.cos(a) * 140}
                  y2={160 + Math.sin(a) * 140}
                  stroke={strokeColor}
                  strokeWidth="0.8"
                  opacity={isLight ? 0.25 : 0.15}
                />
              );
            })}
          </Svg>
        </View>

        <SafeAreaView style={styles.headerSafe} edges={['top', 'left', 'right']}>
          {/* Top navigation actions */}
          <View style={styles.topActions}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [
                styles.navBtn,
                { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.15)' },
                pressed && { opacity: 0.7 }
              ]}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24">
                <Path
                  d="M15 5 L 8 12 L 15 19"
                  stroke={backIconColor}
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>

            <Text style={[styles.headerChapterLabel, { color: theme.text }]}>
              {`${tr.common.chapterPrefix} ${chapterId}`}
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.navBtn,
                { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.15)' },
                pressed && { opacity: 0.7 }
              ]}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M6 3 h12 v18 l-6 -4 l-6 4 Z"
                  stroke={backIconColor}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          </View>

          {/* Chapter titles */}
          <View style={styles.titlesWrap}>
            <Text style={[styles.titleHi, { color: theme.text }]}>{titleHi}</Text>
            <Text style={[styles.titleEn, { color: isLight ? theme.accentDeep : theme.accentBright }]}>{titleEn}</Text>

            {/* Metadata pills */}
            <View style={styles.pillsRow}>
              <View style={[styles.pill, { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.12)' }]}>
                <Text style={[styles.pillText, { color: theme.text }]}>
                  {verses} {tr.common.verses}
                </Text>
              </View>
              <View style={[styles.pill, { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.12)' }]}>
                <Text style={[styles.pillText, { color: theme.text }]}>
                  ~{readTime} {tr.path.min}
                </Text>
              </View>
              {progress > 0 && (
                <View style={[styles.pill, { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.12)' }]}>
                  <Text style={[styles.pillText, { color: theme.text }]}>{progress}% {tr.common.done}</Text>
                </View>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Verses list body */}
      <View style={[styles.body, { backgroundColor: 'transparent' }]}>
        <Text style={[styles.bodyHeaderLabel, { color: theme.textMuted }]}>
          {tr.common.verses}
        </Text>
        
        <FlatList
          data={listVerses}
          keyExtractor={(item) => item.n.toString()}
          contentContainerStyle={styles.listScroll}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('VerseDetail', {
                  chapterId,
                  verseNum: item.n,
                  hi: item.hi,
                  en: item.en,
                  isKeyVerse: item.key,
                })
              }
              style={({ pressed }) => [
                styles.verseCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                  shadowColor: isLight ? '#E8A4B8' : '#000000',
                  shadowOpacity: isLight ? 0.05 : 0.4,
                },
                item.key && [styles.verseCardKey, { borderColor: theme.accentBorder }],
                pressed && { opacity: 0.8 },
              ]}
            >
              <View style={styles.verseNumWrap}>
                <Text
                  style={[
                    styles.verseNum,
                    { color: theme.textMuted },
                    item.key && [styles.verseNumKey, { color: theme.accentDeep }],
                  ]}
                >
                  {item.n}
                </Text>
              </View>
              <View style={styles.verseContent}>
                <Text style={[styles.verseHi, { color: theme.text }]}>{item.hi}</Text>
                <Text style={[styles.verseEn, { color: theme.textMuted }]}>{item.en}</Text>
              </View>
              {item.key && (
                <View style={[styles.keyBadge, { backgroundColor: theme.accentSoft }]}>
                  <Text style={[styles.keyBadgeText, { color: theme.accentDeep }]}>{tr.common.keyVerse}</Text>
                </View>
              )}
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: {
    height: 250,
    position: 'relative',
    overflow: 'hidden',
  },
  mandalaOverlay: {
    position: 'absolute',
    top: -60,
    right: -60,
  },
  headerSafe: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerChapterLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  titlesWrap: {
    marginTop: 10,
  },
  titleHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 30,
    lineHeight: 34,
  },
  titleEn: {
    marginTop: 4,
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
    fontSize: 18,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  pill: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  pillText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  bodyHeaderLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  listScroll: {
    paddingBottom: 24,
  },
  verseCard: {
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 1,
  },
  verseCardKey: {
    borderWidth: 1.5,
  },
  verseNumWrap: {
    minWidth: 30,
    alignItems: 'center',
  },
  verseNum: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 16,
  },
  verseNumKey: {},
  verseContent: {
    flex: 1,
  },
  verseHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 15,
    lineHeight: 20,
  },
  verseEn: {
    marginTop: 6,
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 13,
    lineHeight: 18,
  },
  keyBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyBadgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
