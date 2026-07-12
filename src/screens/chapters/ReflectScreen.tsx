import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChapterChip } from '../../components/SharedUI';
import { ChapterShell, CTA } from '../../components/ChapterShell';
import { useChapterCtaLabels, useDailyPractice } from '../../api_data/hooks';
import { ChapterFlowParamList } from '../../navigation/types';
import { useChapterTheme } from '../../theme';

type Props = NativeStackScreenProps<ChapterFlowParamList, 'Reflect'>;

export function ReflectScreen({ navigation }: Props) {
  const { data: practice } = useDailyPractice();
  const { data: ctaLabels } = useChapterCtaLabels();
  const { theme, isLight, chapterColors } = useChapterTheme();
  const { refColor, cardBg, cardBorder, badgeBg, badgeBorder } = chapterColors;

  const [reflectionText, setReflectionText] = useState('');
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>(['softer']);
  const [customFeelings, setCustomFeelings] = useState<{ id: string; label: string }[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newFeelingText, setNewFeelingText] = useState('');

  if (!practice || !ctaLabels) return null;

  const { reflect } = practice;

  const handleChipPress = (id: string) => {
    if (id === 'add') {
      setIsAdding(true);
      return;
    }
    setSelectedFeelings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveCustomFeeling = () => {
    const trimmed = newFeelingText.trim();
    if (trimmed) {
      const parts = trimmed
        .split(/[,，\u0964]+/)
        .map((p) => p.trim())
        .filter(Boolean);

      setCustomFeelings((prev) => {
        let currentCustoms = [...prev];
        const newIds: string[] = [];

        for (const part of parts) {
          if (currentCustoms.length < 8) {
            if (!currentCustoms.some((c) => c.label.toLowerCase() === part.toLowerCase())) {
              const newId = `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
              currentCustoms.push({ id: newId, label: part });
              newIds.push(newId);
            }
          }
        }

        if (newIds.length > 0) {
          setSelectedFeelings((selected) => [...selected, ...newIds]);
        }

        return currentCustoms;
      });
    }
    setNewFeelingText('');
    setIsAdding(false);
  };

  const baseFeelings = reflect.feelings.filter((f) => f.id !== 'add');
  const addChip = reflect.feelings.find((f) => f.id === 'add') || { id: 'add', label: '+ Add' };
  const allFeelings = [
    ...baseFeelings,
    ...customFeelings,
    ...(customFeelings.length < 8 ? [addChip] : []),
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
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
        <ScrollView
          style={{ width: '100%', flex: 1 }}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ChapterChip hindi={reflect.chipHi} english={reflect.chipEn} />
          <Text style={[styles.title, { color: theme.text }]}>{reflect.question}</Text>
          <Text style={[styles.hindi, { color: refColor }]}>{reflect.questionHi}</Text>
          <View style={[styles.inputBox, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <TextInput
              style={[styles.inputText, { color: theme.text }]}
              value={reflectionText}
              onChangeText={setReflectionText}
              placeholder={reflect.sampleText}
              placeholderTextColor={theme.textMuted}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.chipsContainer}>
            <View style={styles.chips}>
              {allFeelings.map((feeling) => {
                if (feeling.id === 'add') {
                  if (isAdding) {
                    return (
                      <View
                        key="add-input-container"
                        style={[
                          styles.chipInputContainer,
                          {
                            backgroundColor: isLight ? 'rgba(92, 61, 74, 0.05)' : 'rgba(245,236,216,0.06)',
                            borderColor: refColor,
                          },
                        ]}
                      >
                        <TextInput
                          style={[styles.chipTextInput, { color: theme.text }]}
                          placeholder="..."
                          placeholderTextColor={theme.textMuted}
                          value={newFeelingText}
                          onChangeText={setNewFeelingText}
                          onSubmitEditing={handleSaveCustomFeeling}
                          autoFocus
                          blurOnSubmit
                          onBlur={() => {
                            if (newFeelingText.trim()) {
                              handleSaveCustomFeeling();
                            } else {
                              setIsAdding(false);
                            }
                          }}
                        />
                        <Pressable onPress={handleSaveCustomFeeling} style={styles.checkButton}>
                          <Text style={{ color: refColor, fontWeight: 'bold', fontSize: 12 }}>✓</Text>
                        </Pressable>
                      </View>
                    );
                  }

                  return (
                    <FeelingChip
                      key={feeling.id}
                      label={feeling.label}
                      active={false}
                      isLight={isLight}
                      themeTextMuted={theme.textMuted}
                      activeText={refColor}
                      activeBg={badgeBg}
                      activeBorder={badgeBorder}
                      onPress={() => handleChipPress(feeling.id)}
                    />
                  );
                }

                const isActive = selectedFeelings.includes(feeling.id);
                return (
                  <FeelingChip
                    key={feeling.id}
                    label={feeling.label}
                    active={isActive}
                    isLight={isLight}
                    themeTextMuted={theme.textMuted}
                    activeText={refColor}
                    activeBg={badgeBg}
                    activeBorder={badgeBorder}
                    onPress={() => handleChipPress(feeling.id)}
                  />
                );
              })}
            </View>
          </View>
          <Text style={[styles.private, { color: theme.textMuted }]}>{reflect.privacyNote}</Text>
        </ScrollView>
      </ChapterShell>
    </KeyboardAvoidingView>
  );
}

function FeelingChip({
  label,
  active,
  isLight,
  themeTextMuted,
  activeText,
  activeBg,
  activeBorder,
  onPress,
}: {
  label: string;
  active?: boolean;
  isLight: boolean;
  themeTextMuted: string;
  activeText: string;
  activeBg: string;
  activeBorder: string;
  onPress: () => void;
}) {
  const inactiveBg = isLight ? 'rgba(92, 61, 74, 0.05)' : 'rgba(245,236,216,0.06)';
  const inactiveBorder = isLight ? 'rgba(92, 61, 74, 0.12)' : 'rgba(245,236,216,0.1)';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active
          ? { backgroundColor: activeBg, borderColor: activeBorder }
          : { backgroundColor: inactiveBg, borderColor: inactiveBorder },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          active ? { color: activeText } : { color: themeTextMuted },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 26,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 300,
  },
  hindi: {
    marginTop: 12,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  inputBox: {
    marginTop: 30,
    width: '100%',
    maxWidth: 315,
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    minHeight: 190,
  },
  inputText: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 16,
    lineHeight: 26,
    flex: 1,
    minHeight: 130,
    textAlignVertical: 'top',
  },
  chipsContainer: {
    width: '100%',
    maxWidth: 315,
    marginTop: 20,
    marginBottom: 10,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 999,
  },
  chipText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  private: {
    marginTop: 14,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  chipInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 999,
    minWidth: 80,
    height: 28,
  },
  chipTextInput: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    padding: 0,
    height: '100%',
  },
  checkButton: {
    paddingHorizontal: 6,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});
