import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';

import { LightShell } from '../../components/LightShell';
import { useLibraryContent } from '../../api_data/hooks';
import { useLocale, useTranslation } from '../../i18n';
import { useTheme } from '../../theme';
import { LibraryStackParamList } from '../../navigation/types';
import { useSavedVerses } from '../../api_data/SavedVersesContext';

type ChipType = 'All' | 'Chapters' | 'Themes' | 'Saved';

export function LibraryScreen() {
  const { data } = useLibraryContent();
  const tr = useTranslation();
  const { language } = useLocale();
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';
  const { savedVerses } = useSavedVerses();
  
  const navigation = useNavigation<NativeStackNavigationProp<LibraryStackParamList>>();
  const [selectedChip, setSelectedChip] = useState<ChipType>('All');

  if (!data) return null;

  const { title, hindiTitle, verseOfDay, chapters } = data;

  const handleChapterPress = (ch: typeof chapters[0]) => {
    navigation.navigate('ChapterDetail', {
      chapterId: ch.id,
      titleHi: ch.hi,
      titleEn: ch.en,
      verses: ch.verses,
    });
  };

  const renderContent = () => {
    if (selectedChip === 'Themes') {
      return (
        <View style={styles.placeholderWrap}>
          <Text style={[styles.placeholderText, { color: theme.textMuted }]}>
            {language === 'hi' ? 'विषय शीघ्र आ रहे हैं...' : 'Themes coming soon...'}
          </Text>
        </View>
      );
    }
    if (selectedChip === 'Saved') {
      if (savedVerses.length === 0) {
        return (
          <View style={styles.placeholderWrap}>
            <Text style={[styles.placeholderText, { color: theme.textMuted }]}>
              {language === 'hi' ? 'सहेजे गए श्लोक यहाँ दिखाई देंगे।' : 'Saved verses will appear here.'}
            </Text>
          </View>
        );
      }

      return (
        <View style={styles.listContainer}>
          <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
            {savedVerses.length} {language === 'hi' ? 'सहेजे गए श्लोक' : 'Saved Verses'}
          </Text>
          {savedVerses.map((v) => (
            <Pressable
              key={`${v.chapterId}-${v.verseNum}`}
              onPress={() =>
                navigation.navigate('VerseDetail', {
                  chapterId: v.chapterId,
                  verseNum: v.verseNum,
                  hi: v.hi,
                  en: v.en,
                  isKeyVerse: v.isKeyVerse,
                })
              }
              style={({ pressed }) => [
                styles.chapterCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                  shadowColor: isLight ? '#E8A4B8' : '#000000',
                  shadowOpacity: isLight ? 0.12 : 0.45,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <View
                style={[
                  styles.chapterNum,
                  { backgroundColor: theme.accentSoft },
                ]}
              >
                <Text style={[styles.chapterNumText, { color: theme.accentDeep }]}>
                  {v.chapterId}.{v.verseNum}
                </Text>
              </View>
              <View style={styles.chapterBody}>
                <Text numberOfLines={1} style={[styles.chapterHi, { color: theme.text }]}>
                  {v.hi.replace(/\n/g, ' ')}
                </Text>
                <Text numberOfLines={1} style={[styles.chapterEn, { color: theme.textMuted }]}>
                  {v.en}
                </Text>
              </View>
              <Svg width="8" height="14" viewBox="0 0 8 14">
                <Path
                  d="M1 1 L 7 7 L 1 13"
                  stroke={theme.textMuted}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.listContainer}>
        <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
          {chapters.length} {language === 'hi' ? 'अध्याय' : 'Chapters'}
        </Text>
        {chapters.map((ch) => {
          const isActive = ch.tone === 'active';
          const isDone = ch.progress === 100;
          return (
            <Pressable
              key={ch.id}
              onPress={() => handleChapterPress(ch)}
              style={({ pressed }) => [
                styles.chapterCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                  shadowColor: isLight ? '#E8A4B8' : '#000000',
                  shadowOpacity: isLight ? 0.12 : 0.45,
                },
                isActive && [styles.chapterCardActive, { borderColor: theme.accentBorder }],
                pressed && { opacity: 0.8 },
              ]}
            >
              <View
                style={[
                  styles.chapterNum,
                  { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.06)' },
                  isDone
                    ? { backgroundColor: theme.accentBright }
                    : isActive
                    ? { backgroundColor: theme.accentSoft }
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.chapterNumText,
                    { color: theme.textMuted },
                    (isDone || isActive) && [styles.chapterNumTextWhite, { color: theme.textOnAccent }],
                  ]}
                >
                  {ch.id}
                </Text>
              </View>
              <View style={styles.chapterBody}>
                <Text style={[styles.chapterHi, { color: theme.text }]}>{ch.hi}</Text>
                <Text style={[styles.chapterEn, { color: theme.textMuted }]}>
                  {ch.en} · {ch.verses} {tr.common.verses}
                </Text>
                {ch.progress > 0 && ch.progress < 100 && (
                  <View style={[styles.progressTrack, { backgroundColor: theme.progressTrack }]}>
                    <View style={[styles.progressFill, { width: `${ch.progress}%`, backgroundColor: theme.progressFill }]} />
                  </View>
                )}
              </View>
              {isDone ? (
                <View style={[styles.doneCheck, { backgroundColor: theme.accentSoft }]}>
                  <Svg width="12" height="12" viewBox="0 0 12 12">
                    <Path
                      d="M2 6 L 5 9 L 10 3"
                      stroke={theme.accentDeep}
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              ) : (
                <Svg width="8" height="14" viewBox="0 0 8 14">
                  <Path
                    d="M1 1 L 7 7 L 1 13"
                    stroke={theme.textMuted}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <LightShell
      title={title}
      hindiTitle={hindiTitle}
      search={true}
      onSearchPress={() => navigation.navigate('Search')}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Card */}
        {selectedChip === 'All' && (
          <Pressable
            onPress={() =>
              navigation.navigate('VerseDetail', {
                chapterId: 4,
                verseNum: 7,
                hi: verseOfDay.shloka,
                en: verseOfDay.quote,
                isKeyVerse: true,
              })
            }
            style={({ pressed }) => [styles.featuredWrap, pressed && { opacity: 0.95 }]}
          >
            <LinearGradient
              colors={[...theme.featuredGradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.featured, { borderColor: theme.cardBorder }]}
            >
              <Text style={[styles.featuredLabel, { color: theme.accentDeep }]}>{verseOfDay.label}</Text>
              <Text style={[styles.featuredShloka, { color: theme.text }]}>{verseOfDay.shloka}</Text>
              <Text style={[styles.featuredQuote, { color: theme.textMuted }]}>{verseOfDay.quote}</Text>
              <View style={styles.featuredFooter}>
                <View style={[styles.featuredPill, { backgroundColor: theme.accentSoft, borderColor: theme.accentBorder }]}>
                  <Text style={[styles.featuredPillText, { color: theme.accentDeep }]}>{verseOfDay.reference}</Text>
                </View>
                <Text style={[styles.readIndicator, { color: theme.text }]}>Read →</Text>
              </View>
            </LinearGradient>
          </Pressable>
        )}

        {/* Filter Chips */}
        <View style={styles.chipsRow}>
          {(['All', 'Chapters', 'Themes', 'Saved'] as const).map((chip) => {
            const isSelected = selectedChip === chip;
            return (
              <Pressable
                key={chip}
                onPress={() => setSelectedChip(chip)}
                style={[
                  styles.chip,
                  isSelected
                    ? [styles.chipSelected, { backgroundColor: theme.text }]
                    : [styles.chipUnselected, { borderColor: theme.cardBorder }],
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected
                      ? [styles.chipTextSelected, { color: theme.background }]
                      : [styles.chipTextUnselected, { color: theme.text }],
                  ]}
                >
                  {chip}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* List Content */}
        {renderContent()}
      </ScrollView>
    </LightShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  featuredWrap: { paddingHorizontal: 24, paddingBottom: 20 },
  featured: {
    borderRadius: 22,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
  },
  featuredLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  featuredShloka: {
    marginTop: 8,
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 19,
    lineHeight: 28,
  },
  featuredQuote: {
    marginTop: 8,
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 13,
    lineHeight: 20,
  },
  featuredFooter: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredPill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 999,
  },
  featuredPillText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
  },
  readIndicator: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  chipSelected: {},
  chipUnselected: {
    borderWidth: 1,
  },
  chipText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
  },
  chipTextSelected: {},
  chipTextUnselected: {
    opacity: 0.8,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  sectionLabel: {
    marginBottom: 10,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  chapterCard: {
    marginBottom: 10,
    padding: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    elevation: 2,
  },
  chapterCardActive: {
    borderWidth: 1.5,
  },
  chapterNum: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumActive: {},
  chapterNumDone: {},
  chapterNumText: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
  },
  chapterNumTextWhite: {},
  chapterBody: {
    flex: 1,
  },
  chapterHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 15,
    lineHeight: 18,
  },
  chapterEn: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginTop: 2,
  },
  progressTrack: {
    marginTop: 8,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  doneCheck: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderWrap: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  },
});
