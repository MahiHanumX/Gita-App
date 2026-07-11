import { useMemo, useState, useRef, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buildPathSvgD } from '../../api_data/mock';
import { usePathJourney } from '../../api_data/hooks';
import type { DayPreview } from '../../api_data/types';
import { useTranslation } from '../../i18n';
import { MandalaBG } from '../../components/MandalaBG';
import { CTA } from '../../components/CTA';
import { DiyaIcon } from '../../components/Icons';
import { PathNode, StreakBadge } from '../../components/SharedUI';
import { RootStackParamList } from '../../navigation/types';
import { PALETTE } from '../../theme/palette';
import { useTheme } from '../../theme';

export function PathScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const { data: journey, refetch } = usePathJourney();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme, resolvedMode } = useTheme();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const pathD = useMemo(() => (journey ? buildPathSvgD(journey.nodes) : ''), [journey]);

  if (!journey) return null;

  const { totalDays, currentDay, streak, headerHi, headerEn, nodes, milestones, activeDayPreview } =
    journey;
  const totalHeight = 260 + totalDays * 108 + 200;
  const activeNode = nodes.find((n) => n.state === 'active') || nodes[0];
  const scrollOffset = activeNode ? Math.max(0, activeNode.y - 360) : 0;

  const lockedPathColor = resolvedMode === 'light' ? theme.progressTrack : '#4a4b6e';
  const completedPathColor = theme.accent;
  const activePathColor = theme.accentBright;

  const moveAnim = useRef(new Animated.ValueXY({ x: activeNode.x, y: activeNode.y })).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const prevDayRef = useRef(currentDay);

  useEffect(() => {
    const targetNode = nodes.find((n) => n.state === 'active') || nodes[0];

    if (prevDayRef.current !== currentDay) {
      Animated.parallel([
        Animated.timing(moveAnim, {
          toValue: { x: targetNode.x, y: targetNode.y },
          duration: 1500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        rotateAnim.setValue(0);
      });
      prevDayRef.current = currentDay;
    } else {
      moveAnim.setValue({ x: targetNode.x, y: targetNode.y });
    }
  }, [currentDay, nodes]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <MandalaBG
        opacity={resolvedMode === 'light' ? 0.03 : 0.055}
        from={theme.gradientStart}
        via={theme.gradientMid}
        to={theme.gradientEnd}
        stroke={theme.mandalaStroke}
        glowColor={theme.accentSoft}
      />
      <View style={[styles.bottomGlow, { backgroundColor: theme.accentSoft }]} />
      <SafeAreaView
        edges={['top']}
        style={[
          styles.header,
          {
            backgroundColor:
              resolvedMode === 'light' ? 'rgba(255,251,252,0.85)' : 'rgba(15,16,43,0.75)',
            borderBottomWidth: resolvedMode === 'light' ? 1 : 0,
            borderBottomColor: theme.cardBorder,
          },
        ]}
      >
        <View>
          <Text style={[styles.headerHi, { color: theme.text }]}>{headerHi}</Text>
          <Text style={[styles.headerEn, { color: theme.textMuted }]}>{headerEn}</Text>
        </View>
        <StreakBadge count={streak} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ height: totalHeight }} showsVerticalScrollIndicator={false}>
        <View style={{ height: totalHeight, marginTop: -scrollOffset }}>
          <Svg width={375} height={totalHeight} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={activePathColor} />
                <Stop offset={`${(currentDay / totalDays) * 100}%`} stopColor={completedPathColor} />
                <Stop offset={`${(currentDay / totalDays) * 100 + 0.01}%`} stopColor={lockedPathColor} />
                <Stop offset="100%" stopColor={lockedPathColor} />
              </LinearGradient>
            </Defs>
            <Path d={pathD} stroke="url(#pathGradient)" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="1 14" />
          </Svg>

          {milestones.map((m) => {
            const node = nodes[m.day - 1];
            if (!node) return null;
            return (
              <MilestoneMarker
                key={m.day}
                top={node.y - 50}
                left={node.x}
                hindi={m.hindi}
                label={m.label}
                reached={m.reached}
                theme={theme}
                resolvedMode={resolvedMode}
              />
            );
          })}

          <Animated.Image
            source={require('../../../assets/rath-wheel.png')}
            style={[
              styles.rathWheel,
              {
                transform: [
                  { translateX: moveAnim.x },
                  { translateY: moveAnim.y },
                  { translateX: -42 }, // Centered offset (half of width 84)
                  { translateY: -42 }, // Centered offset (half of height 84)
                  { rotate: rotation },
                  { rotateX: '35deg' }, // 3D tilt
                  { rotateY: '-15deg' },
                ],
              },
            ]}
            resizeMode="contain"
          />

          {nodes.map((n) => (
            <Pressable
              key={n.day}
              onPress={() => n.state === 'active' && setSheetOpen(true)}
              style={{ position: 'absolute', left: n.x, top: n.y, zIndex: 2 }}
            >
              <PathNode state={n.state} day={n.state === 'active' ? n.day : undefined} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {sheetOpen ? (
        <DaySheet
          preview={activeDayPreview}
          onClose={() => setSheetOpen(false)}
          onStart={() => {
            setSheetOpen(false);
            navigation.navigate('ChapterFlow');
          }}
          theme={theme}
          resolvedMode={resolvedMode}
        />
      ) : null}
    </View>
  );
}

function MilestoneMarker({
  top,
  left,
  label,
  hindi,
  reached,
  theme,
  resolvedMode,
}: {
  top: number;
  left: number;
  label: string;
  hindi: string;
  reached?: boolean;
  theme: any;
  resolvedMode: string;
}) {
  const activeColor = resolvedMode === 'light' ? theme.accentDeep : PALETTE.saffronBright;

  return (
    <View style={[styles.milestone, { top, left }]}>
      <View
        style={[
          styles.milestoneChip,
          {
            backgroundColor: reached ? theme.accentSoft : theme.surfaceSoft,
            borderColor: reached ? theme.accentBorder : theme.cardBorder,
          },
        ]}
      >
        <Text style={[styles.milestoneHi, { color: reached ? activeColor : theme.textMuted }]}>{hindi}</Text>
        <Text style={[styles.milestoneEn, { color: reached ? activeColor : theme.textMuted }]}>{label}</Text>
      </View>
    </View>
  );
}

function DaySheet({
  preview,
  onClose,
  onStart,
  theme,
  resolvedMode,
}: {
  preview: DayPreview;
  onClose: () => void;
  onStart: () => void;
  theme: any;
  resolvedMode: 'light' | 'dark';
}) {
  const t = useTranslation();
  const meta = [
    `${preview.durationMin} ${t.path.min}`,
    `${preview.chapterCount} ${t.path.chapterCount}`,
    preview.includesReflect ? t.path.reflect : null,
  ].filter(Boolean) as string[];

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable style={styles.scrim} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: theme.background, borderColor: theme.cardBorder }]}>
        <View style={[styles.handle, { backgroundColor: theme.progressTrack }]} />
        <View style={styles.sheetHeader}>
          <View style={[styles.sheetIcon, { backgroundColor: theme.accentSoft }]}>
            <DiyaIcon size={30} lit color={theme.accentDeep} flameColor={resolvedMode === 'light' ? theme.accent : '#fff2c9'} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sheetMeta, { color: theme.accentDeep }]}>
              {t.path.day} {preview.day} · {preview.section}
            </Text>
            <Text style={[styles.sheetHindi, { color: theme.text }]}>{preview.hindiTitle}</Text>
          </View>
        </View>
        <Text style={[styles.sheetTitle, { color: theme.text }]}>{preview.title}</Text>
        <Text style={[styles.sheetDesc, { color: theme.textMuted }]}>{preview.description}</Text>
        <View style={styles.metaRow}>
          {meta.map((label) => (
            <View key={label} style={[styles.metaChip, { backgroundColor: theme.surfaceSoft }]}>
              <Text style={[styles.metaText, { color: theme.text }]}>{label}</Text>
            </View>
          ))}
        </View>
        <CTA variant={resolvedMode} label={t.path.startPractice} subLabel={t.path.startPracticeSub} onPress={onStart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bottomGlow: {
    position: 'absolute',
    bottom: -160,
    alignSelf: 'center',
    width: 520,
    height: 380,
    borderRadius: 260,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerHi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 22,
  },
  headerEn: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    marginTop: 2,
  },
  milestone: {
    position: 'absolute',
    transform: [{ translateX: -80 }],
    width: 160,
    alignItems: 'center',
  },
  milestoneChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  milestoneHi: {
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 11,
    textAlign: 'center',
  },
  milestoneEn: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(15,16,43,0.55)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  sheetIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetMeta: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sheetHindi: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 22,
    marginTop: 2,
  },
  sheetTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    marginBottom: 6,
  },
  sheetDesc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
  },
  metaRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  metaChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  metaText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  rathWheel: {
    position: 'absolute',
    width: 84,
    height: 84,
    zIndex: 1,
  },
});
