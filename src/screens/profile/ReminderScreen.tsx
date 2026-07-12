import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';
import { LightShell } from '../../components/LightShell';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { DiyaIcon } from '../../components/DiyaIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Reminder'>;

const STORAGE_KEY = '@reminder_settings';

const SOUND_OPTIONS = [
  { id: 'temple', label: 'Temple bell', labelHi: 'मंदिर घंटा' },
  { id: 'conch', label: 'Conch shell', labelHi: 'शंख' },
  { id: 'flute', label: 'Krishna flute', labelHi: 'कृष्ण बाँसुरी' },
  { id: 'mantra', label: 'Om mantra', labelHi: 'ॐ मंत्र' },
  { id: 'silent', label: 'Silent', labelHi: 'मौन' },
];

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_FULL = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ReminderScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, false, true]);
  const [preBell, setPreBell] = useState(true);
  const [soundId, setSoundId] = useState('temple');
  const [showSoundModal, setShowSoundModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const s = JSON.parse(raw);
          if (s.hour !== undefined) setHour(s.hour);
          if (s.minute !== undefined) setMinute(s.minute);
          if (s.isAM !== undefined) setIsAM(s.isAM);
          if (s.activeDays) setActiveDays(s.activeDays);
          if (s.preBell !== undefined) setPreBell(s.preBell);
          if (s.soundId) setSoundId(s.soundId);
        }
      } catch (_) {}
    })();
  }, []);

  const adjustHour = (delta: number) => {
    setHour(h => {
      const next = h + delta;
      if (next > 12) return 1;
      if (next < 1) return 12;
      return next;
    });
  };

  const adjustMinute = (delta: number) => {
    setMinute(m => {
      const next = m + delta;
      if (next >= 60) return 0;
      if (next < 0) return 55;
      return next;
    });
  };

  const toggleDay = (i: number) => {
    setActiveDays(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const currentSound = SOUND_OPTIONS.find(s => s.id === soundId) ?? SOUND_OPTIONS[0];

  const [saved, setSaved] = useState(false);
  const savedOpacity = useMemo(() => new Animated.Value(0), []);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ hour, minute, isAM, activeDays, preBell, soundId }),
      );
    } catch (_) {}
    setSaved(true);
    savedOpacity.setValue(1);
    Animated.sequence([
      Animated.delay(800),
      Animated.timing(savedOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      setSaved(false);
      navigation.goBack();
    });
  };

  const displayHour = String(hour).padStart(2, '0');
  const displayMin = String(minute).padStart(2, '0');
  const activeDayNames = DAY_FULL.filter((_, i) => activeDays[i]).join(', ') || 'No days';
  const isBrahmaMuhurta = isAM && (hour === 5 || hour === 6 || (hour === 7 && minute === 0));

  return (
    <LightShell glow={false}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View style={styles.headerTitles}>
          <Text style={styles.titleHi}>दैनिक स्मरण</Text>
          <Text style={styles.titleEn}>Daily Reminder</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Time Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ring the bell at</Text>
          <LinearGradient colors={[theme.accentSoft, theme.surface]} style={styles.timeBox}>
            <View style={styles.timePickerRow}>
              <View style={styles.spinnerCol}>
                <Pressable onPress={() => adjustHour(1)} style={styles.spinArrow}>
                  <ChevronUp color={theme.accent} />
                </Pressable>
                <Text style={styles.timeDigit}>{displayHour}</Text>
                <Pressable onPress={() => adjustHour(-1)} style={styles.spinArrow}>
                  <ChevronDown color={theme.accent} />
                </Pressable>
              </View>
              <Text style={styles.timeSep}>:</Text>
              <View style={styles.spinnerCol}>
                <Pressable onPress={() => adjustMinute(5)} style={styles.spinArrow}>
                  <ChevronUp color={theme.accent} />
                </Pressable>
                <Text style={styles.timeDigit}>{displayMin}</Text>
                <Pressable onPress={() => adjustMinute(-5)} style={styles.spinArrow}>
                  <ChevronDown color={theme.accent} />
                </Pressable>
              </View>
              <View style={styles.ampmCol}>
                <Pressable onPress={() => setIsAM(true)} style={[styles.ampmBtn, isAM && styles.ampmBtnActive]}>
                  <Text style={[styles.ampmText, isAM && styles.ampmTextActive]}>AM</Text>
                </Pressable>
                <Pressable onPress={() => setIsAM(false)} style={[styles.ampmBtn, !isAM && styles.ampmBtnActive]}>
                  <Text style={[styles.ampmText, !isAM && styles.ampmTextActive]}>PM</Text>
                </Pressable>
              </View>
            </View>
            <Text style={styles.timeHint}>
              {isBrahmaMuhurta ? 'brahma muhurta · ब्रह्म मुहूर्त' : `every ${activeDayNames}`}
            </Text>
          </LinearGradient>
        </View>

        {/* Days of week */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Repeat</Text>
          <View style={styles.daysRow}>
            {DAY_LABELS.map((d, i) => {
              const isActive = activeDays[i];
              return (
                <Pressable key={i} style={{ flex: 1 }} onPress={() => toggleDay(i)}>
                  {isActive ? (
                    <LinearGradient
                      colors={[theme.accentBright || '#ffe08a', theme.accentDeep || '#e8a838']}
                      style={[styles.dayCircle, styles.dayCircleActive]}
                    >
                      <Text style={[styles.dayText, styles.dayTextActive]}>{d}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                      <Text style={[styles.dayText, styles.dayTextInactive]}>{d}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
          <View style={styles.presetRow}>
            <Pressable style={styles.presetChip} onPress={() => setActiveDays([true, true, true, true, true, false, false])}>
              <Text style={styles.presetChipText}>Weekdays</Text>
            </Pressable>
            <Pressable style={styles.presetChip} onPress={() => setActiveDays([true, true, true, true, true, true, true])}>
              <Text style={styles.presetChipText}>Every day</Text>
            </Pressable>
            <Pressable style={styles.presetChip} onPress={() => setActiveDays([false, false, false, false, false, true, true])}>
              <Text style={styles.presetChipText}>Weekends</Text>
            </Pressable>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preferences</Text>
          <View style={styles.prefCard}>
            <Pressable style={[styles.optRow, styles.optDivider]} onPress={() => setShowSoundModal(true)}>
              <Text style={styles.optLabel}>Sound</Text>
              <Text style={styles.optValue}>{currentSound.label} · {currentSound.labelHi}</Text>
              <Svg width="7" height="12" viewBox="0 0 8 14">
                <Path d="M1 1 L 7 7 L 1 13" stroke={theme.textMuted} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
            <Pressable style={styles.optRow} onPress={() => setPreBell(v => !v)}>
              <Text style={styles.optLabel}>Gentle 3-min pre-bell</Text>
              <View style={[styles.toggleBg, preBell && styles.toggleBgOn]}>
                <View style={[styles.toggleKnob, preBell && styles.toggleKnobOn]} />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Preview */}
        <View style={[styles.section, { paddingBottom: 40 }]}>
          <Text style={styles.sectionLabel}>Preview</Text>
          <MiniNotif theme={theme} styles={styles} time={`${displayHour}:${displayMin} ${isAM ? 'AM' : 'PM'}`} />
        </View>

      </ScrollView>

      {/* Save CTA */}
      <View style={styles.saveCta}>
        <Pressable
          style={({ pressed }) => [styles.saveBtn, pressed && styles.saveBtnPressed]}
          onPress={saveSettings}
          disabled={saved}
        >
          <LinearGradient
            colors={saved
              ? [theme.accentDeep || '#b8760c', theme.accentDeep || '#b8760c']
              : [theme.accentBright || '#ffe08a', theme.accentDeep || '#e8a838']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtnGradient}
          >
            <Animated.Text style={[styles.saveBtnText, { opacity: saved ? savedOpacity : 1 }]}>
              {saved ? '✓  Saved' : 'Save Reminder'}
            </Animated.Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* Sound modal */}
      <SoundModal
        visible={showSoundModal}
        selectedId={soundId}
        onSelect={(id: string) => { setSoundId(id); setShowSoundModal(false); }}
        onClose={() => setShowSoundModal(false)}
        theme={theme}
        styles={styles}
      />
    </LightShell>
  );
}

function ChevronUp({ color }: { color: string }) {
  return (
    <Svg width="16" height="10" viewBox="0 0 16 10" fill="none">
      <Path d="M1 8 L 8 2 L 15 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronDown({ color }: { color: string }) {
  return (
    <Svg width="16" height="10" viewBox="0 0 16 10" fill="none">
      <Path d="M1 2 L 8 8 L 15 2" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MiniNotif({ theme, styles, time }: any) {
  return (
    <View style={styles.notifCard}>
      <LinearGradient colors={[theme.accentBright || '#f4c257', theme.accentDeep || '#c67a1a']} style={styles.notifIconWrap}>
        <DiyaIcon size={20} color={theme.surface} flameColor="#ffffff" />
      </LinearGradient>
      <View style={styles.notifBody}>
        <View style={styles.notifHeaderRow}>
          <Text style={styles.notifTitle}>Deep</Text>
          <Text style={styles.notifTime}>{time}</Text>
        </View>
        <Text style={styles.notifText}>
          Day 14 is ready — the lamp waits.{'\n'}
          <Text style={styles.notifTextHi}>दीप प्रतीक्षा में है।</Text>
        </Text>
      </View>
    </View>
  );
}

function SoundModal({ visible, selectedId, onSelect, onClose, theme, styles }: any) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Notification Sound</Text>
          <Text style={styles.modalTitleHi}>ध्वनि चुनें</Text>
          <FlatList
            data={SOUND_OPTIONS}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const selected = item.id === selectedId;
              return (
                <Pressable style={[styles.soundRow, selected && styles.soundRowSelected]} onPress={() => onSelect(item.id)}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.soundLabel, selected && styles.soundLabelSelected]}>{item.label}</Text>
                    <Text style={styles.soundLabelHi}>{item.labelHi}</Text>
                  </View>
                  {selected && (
                    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <Path d="M5 12 L 10 17 L 19 7" stroke={theme.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                  )}
                </Pressable>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: { flex: 1 },
  titleHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 13,
    color: theme.textMuted,
  },
  titleEn: {
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    color: theme.text,
  },
  scrollContent: { paddingTop: 8 },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  timeBox: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.accentBorder,
    alignItems: 'center',
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spinnerCol: {
    alignItems: 'center',
    gap: 6,
  },
  spinArrow: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: theme.surfaceSoft,
  },
  timeDigit: {
    fontFamily: theme.fonts.serif,
    fontSize: 56,
    lineHeight: 64,
    color: theme.text,
    letterSpacing: -2,
    minWidth: 72,
    textAlign: 'center',
  },
  timeSep: {
    fontFamily: theme.fonts.serif,
    fontSize: 48,
    color: theme.accent,
    marginBottom: 4,
    marginHorizontal: 2,
  },
  ampmCol: {
    marginLeft: 8,
    gap: 8,
  },
  ampmBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  ampmBtnActive: {
    backgroundColor: theme.accentSoft,
    borderColor: theme.accentBorder,
  },
  ampmText: {
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.textMuted,
  },
  ampmTextActive: { color: theme.accent },
  timeHint: {
    marginTop: 16,
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
    textAlign: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dayCircle: {
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleActive: {
    elevation: 4,
    shadowColor: theme.accent,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  dayCircleInactive: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  dayText: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
  },
  dayTextActive: { color: theme.surface },
  dayTextInactive: { color: theme.textMuted },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  presetChipText: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: theme.textMuted,
  },
  prefCard: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 18,
    overflow: 'hidden',
  },
  optRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  optLabel: {
    flex: 1,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  optValue: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.textMuted,
  },
  toggleBg: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.cardBorder,
    padding: 2,
    justifyContent: 'center',
  },
  toggleBgOn: { backgroundColor: theme.accent },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleKnobOn: { transform: [{ translateX: 18 }] },
  notifCard: {
    backgroundColor: theme.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: { flex: 1 },
  notifHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  notifTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 13,
    color: theme.text,
  },
  notifTime: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
  notifText: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: theme.text,
    lineHeight: 18,
    marginTop: 2,
  },
  notifTextHi: {
    color: theme.accent,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: theme.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingBottom: 36,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: theme.cardBorder,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.cardBorder,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    color: theme.text,
    marginBottom: 2,
  },
  modalTitleHi: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 13,
    color: theme.textMuted,
    marginBottom: 18,
  },
  soundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  soundRowSelected: {},
  soundLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    color: theme.text,
  },
  soundLabelSelected: { color: theme.accent },
  soundLabelHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 13,
    color: theme.textMuted,
    marginTop: 2,
  },
  saveCta: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: theme.cardBorder,
    backgroundColor: theme.background,
  },
  saveBtn: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: theme.accent,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  saveBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  saveBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    color: theme.surface,
    letterSpacing: 0.5,
  },
});
