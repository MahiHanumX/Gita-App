import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme, AppTheme } from '../../../theme';
import { MandalaBG } from '../../../components/MandalaBG';
import { useNavigation } from '@react-navigation/native';

export const MeditationIcon = ({ size = 22, color = '#fff' }: { size?: number, color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="3" fill={color} opacity="0.9" />
    <Path d="M4 20 c 0 -5, 4 -8, 8 -8 s 8 3 8 8" fill={color} opacity="0.9" />
    <Circle cx="7" cy="14" r="1.5" fill={color} opacity="0.85" />
    <Circle cx="17" cy="14" r="1.5" fill={color} opacity="0.85" />
  </Svg>
);

export const MantraBeadIcon = ({ size = 22, color = '#fff' }: { size?: number, color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.6" opacity="0.9" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * 30) * Math.PI / 180;
      return <Circle key={i} cx={12 + Math.cos(a) * 7} cy={12 + Math.sin(a) * 7} r="1.4" fill={color} opacity="0.9" />;
    })}
    <Circle cx="12" cy="4.5" r="1.8" fill={color} />
  </Svg>
);

export const BreathIcon = ({ size = 22, color = '#fff' }: { size?: number, color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" opacity="0.9" />
    <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" opacity="0.75" />
    <Circle cx="12" cy="12" r="2" fill={color} opacity="0.95" />
  </Svg>
);

export const NidraIcon = ({ size = 22, color = '#fff' }: { size?: number, color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 14 A 8 8 0 1 1 10 6 a 6 6 0 0 0 8 8 z" fill={color} opacity="0.9" />
    <Circle cx="18" cy="6" r="0.8" fill={color} opacity="0.6" />
    <Circle cx="20" cy="9" r="0.6" fill={color} opacity="0.5" />
  </Svg>
);

interface SessionRowProps {
  hi: string;
  en: string;
  teacher?: string;
  duration: string;
  tag?: string;
  icon: React.ReactNode;
  accent: readonly [string, string, ...string[]];
  isNew?: boolean;
  isPlaying?: boolean;
  isFav?: boolean;
  onPress?: () => void;
}

export function SessionRow({ hi, en, teacher, duration, tag, icon, accent, isNew, isPlaying, isFav, onPress }: SessionRowProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => getRowStyles(theme), [theme]);

  const isLight = theme.mode === 'light';
  const activeAccent = isLight ? theme.accentDeep : theme.accentBright;

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]} onPress={onPress}>
      <LinearGradient colors={accent} style={styles.iconContainer}>
        {icon}
        {isPlaying && <View style={styles.playingRing} />}
      </LinearGradient>
      
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.titleEn} numberOfLines={1}>{en}</Text>
          {isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>
        <Text style={styles.titleHi}>{hi}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{duration}</Text>
          {teacher && (
            <>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>{teacher}</Text>
            </>
          )}
          {tag && (
            <>
              <Text style={styles.metaDot}>·</Text>
              <Text style={[styles.metaText, { color: activeAccent }]}>{tag}</Text>
            </>
          )}
        </View>
      </View>
      
      <Pressable style={styles.favButton}>
        <Svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? activeAccent : 'none'}>
          <Path d="M12 4 C 8 4, 6 7, 6 10 c 0 4 6 8 6 8 s 6 -4 6 -8 c 0 -3 -2 -6 -6 -6 z" stroke={isFav ? activeAccent : theme.textMuted} strokeWidth="1.6" />
        </Svg>
      </Pressable>
    </Pressable>
  );
}

interface LibraryFrameProps {
  hi: string;
  en: string;
  count: string;
  tint?: string;
  glow?: string;
  subtitle?: string;
  filters?: { label: string; active: boolean }[];
  children: React.ReactNode;
}

export function LibraryFrame({ hi, en, count, tint, glow, subtitle, filters, children }: LibraryFrameProps) {
  const { theme, resolvedMode } = useTheme();
  const navigation = useNavigation();
  const styles = useMemo(() => getFrameStyles(theme), [theme]);

  const isLight = resolvedMode === 'light';
  const headerTint = tint || (isLight ? theme.accentDeep : theme.accentBright);

  return (
    <View style={styles.container}>
      <MandalaBG glowColor={glow} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Svg width="14" height="14" viewBox="0 0 24 24">
              <Path d="M15 5 L 8 12 L 15 19" stroke={theme.text} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          <Pressable style={styles.headerBtn}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Circle cx="11" cy="11" r="7" stroke={theme.text} strokeWidth="1.8" />
              <Path d="M16 16 l 5 5" stroke={theme.text} strokeWidth="1.8" strokeLinecap="round" />
            </Svg>
          </Pressable>
        </View>

        {/* Title */}
        <View style={styles.titleArea}>
          <Text style={[styles.hiText, { color: headerTint }]}>{hi}</Text>
          <Text style={styles.enText}>
            {en} <Text style={styles.countText}>· {count}</Text>
          </Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>

        {/* Filters */}
        {filters && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filtersScroll}
            style={styles.filtersWrapper}
          >
            {filters.map((f, i) => (
              <LinearGradient
                key={i}
                colors={f.active ? theme.ctaGradient : [theme.surfaceSoft, theme.surfaceSoft]}
                style={[styles.filterChip, !f.active && styles.filterChipInactive]}
              >
                <Text style={[styles.filterChipText, f.active ? { color: theme.ctaText } : { color: theme.text }]}>
                  {f.label}
                </Text>
              </LinearGradient>
            ))}
          </ScrollView>
        )}

        {/* List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

const getRowStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    padding: 12,
    paddingRight: 14,
    backgroundColor: theme.surfaceSoft,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playingRing: {
    position: 'absolute',
    inset: -3,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.mode === 'light' ? theme.accentDeep : theme.accentBright,
  },
  infoContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  titleEn: {
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.text,
  },
  newBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: theme.accentSoft,
  },
  newBadgeText: {
    color: theme.mode === 'light' ? theme.accentDeep : theme.accentBright,
    fontFamily: theme.fonts.heading,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  titleHi: {
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.mode === 'light' ? theme.accentDeep : theme.accentBright,
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  metaText: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
  metaDot: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
    opacity: 0.5,
  },
  favButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getFrameStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.iconButtonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  hiText: {
    fontFamily: theme.fonts.hindiMedium,
    fontSize: 32,
    lineHeight: 36,
  },
  enText: {
    marginTop: 4,
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    color: theme.text,
    letterSpacing: 0.3,
  },
  countText: {
    fontFamily: theme.fonts.body,
    color: theme.textMuted,
  },
  subtitleText: {
    marginTop: 8,
    fontFamily: theme.fonts.serifItalic,
    fontSize: 13,
    lineHeight: 20,
    color: theme.textMuted,
    maxWidth: 300,
  },
  filtersWrapper: {
    flexGrow: 0,
    marginTop: 18,
    marginBottom: 4,
  },
  filtersScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipInactive: {
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  filterChipText: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 40,
  }
});
