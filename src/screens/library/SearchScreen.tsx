import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PALETTE } from '../../theme/palette';
import { LibraryStackParamList } from '../../navigation/types';
import { useLocale, useTranslation } from '../../i18n';
import { useTheme } from '../../theme';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Search'>;

import { RECENT_SEARCHES_MOCK, SUGGESTED_SEARCHES_MOCK } from '../../api_data/mock/library.mock';

const RECENT_SEARCHES = RECENT_SEARCHES_MOCK;
const SUGGESTED_SEARCHES = SUGGESTED_SEARCHES_MOCK;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const tr = useTranslation();
  const { language } = useLocale();
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';

  const handleRecentPress = (term: string) => {
    setQuery(term);
  };

  const handleClear = () => {
    setQuery('');
  };

  const filteredSuggestions = SUGGESTED_SEARCHES.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.hi.toLowerCase().includes(q) ||
      item.en.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        {/* Search Bar Input Row */}
        <View style={styles.searchRow}>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: isLight ? '#ffffff' : theme.surface,
                borderColor: theme.cardBorder,
                borderWidth: isLight ? 0 : 1,
              },
            ]}
          >
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Circle cx="11" cy="11" r="7" stroke={theme.textMuted} strokeWidth="2" />
              <Path d="M16 16 L 21 21" stroke={theme.textMuted} strokeWidth="2" strokeLinecap="round" />
            </Svg>
            
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={query}
              onChangeText={setQuery}
              placeholder={language === 'hi' ? 'खोजें...' : 'Search...'}
              placeholderTextColor={theme.textMuted}
              autoFocus
              autoCorrect={false}
            />

            {query.length > 0 && (
              <Pressable onPress={handleClear} style={styles.clearBtn}>
                <Svg width="14" height="14" viewBox="0 0 24 24">
                  <Path
                    d="M5 5 L 19 19 M 19 5 L 5 19"
                    stroke={theme.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </Svg>
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.cancelBtn,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Text style={[styles.cancelText, { color: theme.accentDeep }]}>
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </Text>
          </Pressable>
        </View>

        {/* Content Scroll */}
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Recent searches section (only show if query is empty) */}
          {query.length === 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
                {language === 'hi' ? 'हाल ही में' : 'Recent'}
              </Text>
              <View style={styles.recentsRow}>
                {RECENT_SEARCHES.map((r) => (
                  <Pressable
                    key={r}
                    onPress={() => handleRecentPress(r)}
                    style={({ pressed }) => [
                      styles.recentTag,
                      { backgroundColor: isLight ? 'rgba(26,27,58,0.06)' : 'rgba(245,236,216,0.06)' },
                      pressed && { opacity: 0.7 }
                    ]}
                  >
                    <Text style={[styles.recentTagText, { color: theme.text }]}>{r}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Suggested searches section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
              {language === 'hi' ? 'सुझाए गए' : 'Suggested'}
            </Text>
            {filteredSuggestions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                  {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
                </Text>
              </View>
            ) : (
              <View style={styles.suggestionsList}>
                {filteredSuggestions.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.suggestionCard,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.cardBorder,
                        shadowColor: isLight ? '#1A1B3A' : '#000000',
                      },
                    ]}
                  >
                    <View style={[styles.suggestionIconWrap, { backgroundColor: theme.accentSoft }]}>
                      <Text style={[styles.suggestionIconText, { color: theme.accentDeep }]}>
                        {item.hi.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.suggestionBody}>
                      <Text style={[styles.suggestionHi, { color: theme.text }]}>
                        {item.hi}
                      </Text>
                      <Text style={[styles.suggestionEn, { color: theme.textMuted }]}>
                        {item.en}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tagBadge,
                        { backgroundColor: isLight ? 'rgba(26,27,58,0.05)' : 'rgba(245,236,216,0.05)' },
                      ]}
                    >
                      <Text style={[styles.tagBadgeText, { color: theme.textMuted }]}>
                        {item.tag}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    shadowColor: '#1A1B3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },
  cancelBtn: {
    paddingVertical: 8,
  },
  cancelText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  recentsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentTag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  recentTagText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionCard: {
    padding: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    borderWidth: 1,
  },
  suggestionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionIconText: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 14,
  },
  suggestionBody: {
    flex: 1,
  },
  suggestionHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  suggestionEn: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginTop: 1,
  },
  tagBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  tagBadgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
});
