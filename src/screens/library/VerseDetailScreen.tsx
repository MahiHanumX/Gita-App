import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Share, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { LightShell } from '../../components/LightShell';
import { useSavedVerses } from '../../api_data/SavedVersesContext';
import { useTheme } from '../../theme';
import { LibraryStackParamList } from '../../navigation/types';
import { useLocale, useTranslation } from '../../i18n';
import { DiyaIcon } from '../../components/Icons';

type Props = NativeStackScreenProps<LibraryStackParamList, 'VerseDetail'>;

export function VerseDetailScreen({ route, navigation }: Props) {
  const { chapterId, verseNum, hi, en, isKeyVerse } = route.params;
  const { theme, resolvedMode } = useTheme();
  const { saveVerse, unsaveVerse, isVerseSaved } = useSavedVerses();
  const { language } = useLocale();
  const tr = useTranslation();

  const isLight = resolvedMode === 'light';
  const saved = isVerseSaved(chapterId, verseNum);

  const handleToggleSave = () => {
    if (saved) {
      unsaveVerse(chapterId, verseNum);
    } else {
      saveVerse({ chapterId, verseNum, hi, en, isKeyVerse });
    }
  };

  const handleShare = async () => {
    const shareMessage = `Gita ${chapterId}.${verseNum}\n\n${hi}\n\n${en}\n\nShared from Gita Journey App 🕉️`;
    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      Alert.alert('Error', 'Unable to share this verse');
    }
  };

  return (
    <LightShell glow={true}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.06)' }]}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View style={styles.headerTitles}>
          <Text style={[styles.headerHi, { color: theme.text }]}>अध्याय {chapterId}, श्लोक {verseNum}</Text>
          <Text style={[styles.headerEn, { color: theme.textMuted }]}>Chapter {chapterId}, Verse {verseNum}</Text>
        </View>
        <Pressable onPress={handleShare} style={[styles.actionBtn, { backgroundColor: isLight ? 'rgba(92,61,74,0.06)' : 'rgba(245,236,216,0.06)' }]}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke={theme.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Shloka Container Card */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          {isKeyVerse && (
            <View style={[styles.keyBadge, { backgroundColor: theme.accentSoft }]}>
              <Text style={[styles.keyBadgeText, { color: theme.accentDeep }]}>{tr.common.keyVerse}</Text>
            </View>
          )}

          <View style={styles.diyaContainer}>
            <DiyaIcon size={32} lit color={theme.accentDeep} flameColor={isLight ? theme.accent : '#fff2c9'} />
          </View>

          <Text style={[styles.shlokaDev, { color: theme.text }]}>{hi}</Text>
          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
          <Text style={[styles.shlokaEn, { color: theme.textMuted }]}>{en}</Text>
        </View>

        {/* Action Button: Bookmark/Save */}
        <Pressable
          onPress={handleToggleSave}
          style={({ pressed }) => [
            styles.saveBtn,
            {
              backgroundColor: saved ? theme.accentSoft : 'transparent',
              borderColor: theme.accentBorder,
            },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={styles.saveIcon}>
            <Path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill={saved ? theme.accentDeep : 'none'}
              stroke={saved ? theme.accentDeep : theme.text}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={[styles.saveBtnText, { color: saved ? theme.accentDeep : theme.text }]}>
            {saved 
              ? (language === 'hi' ? 'सहेजा गया' : 'Saved to Library') 
              : (language === 'hi' ? 'पुस्तकालय में सहेजें' : 'Save to Library')}
          </Text>
        </Pressable>

        {/* Short Spiritual Commentary / Reflection Prompt */}
        <View style={[styles.commentaryCard, { backgroundColor: theme.surfaceSoft, borderColor: theme.cardBorder }]}>
          <Text style={[styles.commentaryLabel, { color: theme.accentDeep }]}>
            {language === 'hi' ? 'चिन्तन' : 'Reflection'}
          </Text>
          <Text style={[styles.commentaryText, { color: theme.text }]}>
            {language === 'hi'
              ? 'इस श्लोक को ध्यानपूर्वक पढ़ें और अपने जीवन में इसे लागू करने का प्रयास करें। कृष्ण अर्जुन को कर्तव्य और अनासक्ति का उपदेश दे रहे हैं।'
              : 'Ponder on this wisdom today. Let go of expectations and attachments, performing your duties with a pure, quiet mind in service of the divine.'}
          </Text>
        </View>
      </ScrollView>
    </LightShell>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 16,
  },
  headerEn: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  diyaContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  shlokaDev: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
    marginVertical: 10,
  },
  divider: {
    width: 60,
    height: 1,
    marginVertical: 20,
  },
  shlokaEn: {
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  keyBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  keyBadgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  saveBtn: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  saveIcon: {
    marginRight: 10,
  },
  saveBtnText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
  commentaryCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 8,
  },
  commentaryLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  commentaryText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.9,
  },
});
