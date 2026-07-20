import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';
import { MandalaBG } from '../../components/MandalaBG';
import { CTA } from '../../components/CTA';
import { DiyaIcon } from '../../components/DiyaIcon';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Support'>;

export function SupportScreen({ navigation }: Props) {
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(theme, isLight, insets), [theme, isLight, insets]);

  const tiers = [
    { hi: 'दीप', label: 'A Lamp', price: '$2 / month', desc: 'Keeps the app free for a student', popular: false },
    { hi: 'माला', label: 'A Mala', price: '$5 / month', desc: 'One month of new audio content', popular: true },
    { hi: 'गुरुदक्षिणा', label: 'Gurudakshina', price: '$12 / month', desc: 'Sponsor a full 40-day cohort', popular: false },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1); // Default to "A Mala"

  const activeTier = tiers[selectedIndex];

  // CTA Text updates dynamically based on the selected tier
  const ctaLabel = useMemo(() => {
    const cleanPrice = activeTier.price.split(' ')[0]; // E.g., "$2", "$5", "$12"
    if (activeTier.hi === 'दीप') {
      return `Offer a Lamp · ${cleanPrice}`;
    } else if (activeTier.hi === 'माला') {
      return `Offer a Mala · ${cleanPrice}`;
    } else {
      return `Offer Gurudakshina · ${cleanPrice}`;
    }
  }, [activeTier]);

  const ctaSubLabel = useMemo(() => {
    return `${activeTier.hi} अर्पण`;
  }, [activeTier]);

  const handleSupportOffer = () => {
    Alert.alert(
      "Sponsorship Offered",
      `Thank you for choosing to support with "${activeTier.label}" (${activeTier.price})! Your kindness keeps the journey open for all.`,
      [{ text: "Gratitude · आभार", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={isLight ? 'dark' : 'light'} />
      <MandalaBG
        opacity={isLight ? 0.03 : 0.055}
        from={theme.gradientStart}
        via={theme.gradientMid}
        to={theme.gradientEnd}
        stroke={theme.mandalaStroke}
        glowColor={theme.accentSoft}
        showBottomGlow={true}
      />
      {/* Top glowing radial background decoration */}
      <View style={styles.topGlowContainer} pointerEvents="none">
        <LinearGradient
          colors={isLight ? ['rgba(232, 164, 184, 0.22)', 'transparent'] : ['rgba(232, 168, 56, 0.16)', 'transparent']}
          style={styles.topGlowDecor}
        />
      </View>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}
            accessibilityLabel="Close"
          >
            <Svg width="12" height="12" viewBox="0 0 24 24">
              <Path
                d="M18 6L6 18M6 6l12 12"
                stroke={theme.text}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>
          <Text style={styles.headerTitle}>Support · दान</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Scroll Content */}
        <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.topSection}>
            <View style={styles.diyaOuterCircle}>
              <LinearGradient
                colors={isLight ? [theme.accentBright, theme.accentDeep] : ['#ffe08a', '#e8a838']}
                style={styles.diyaInnerCircle}
              >
                <DiyaIcon size={32} color={isLight ? '#5C3D4A' : '#0f102b'} flameColor={isLight ? '#E8A4B8' : '#c67a1a'} />
              </LinearGradient>
            </View>

            <Text style={styles.mainTitle}>
              Deep is free.{"\n"}And will stay free.
            </Text>

            <Text style={styles.description}>
              No subscriptions. No paywalls at Day 21. If you've found value here, help another soul begin their journey.
            </Text>
          </View>

          {/* Tiers List */}
          <View style={styles.tiersSection}>
            {tiers.map((t, i) => {
              const isSelected = selectedIndex === i;
              return (
                <Pressable
                  key={i}
                  onPress={() => setSelectedIndex(i)}
                  style={[
                    styles.tierCard,
                    isSelected ? styles.tierCardSelected : styles.tierCardUnselected,
                  ]}
                >
                  {/* Background gradient for selected item */}
                  {isSelected && (
                    <LinearGradient
                      colors={
                        isLight
                          ? ['rgba(232, 164, 184, 0.12)', 'rgba(232, 164, 184, 0.03)']
                          : ['rgba(232, 168, 56, 0.14)', 'rgba(232, 168, 56, 0.03)']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFillObject}
                    />
                  )}

                  {t.popular && (
                    <View style={styles.popularBadge}>
                      <LinearGradient
                        colors={isLight ? [theme.accentBright, theme.accentDeep] : ['#f4c257', '#c67a1a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.popularBadgeGradient}
                      >
                        <Text style={styles.popularBadgeText}>Most loved</Text>
                      </LinearGradient>
                    </View>
                  )}

                  {/* Hindi Letter Icon */}
                  <View style={styles.tierIconWrapper}>
                    {isSelected ? (
                      <LinearGradient
                        colors={isLight ? [theme.accentBright, theme.accentDeep] : ['#ffe08a', '#e8a838']}
                        style={styles.tierIconContainerSelected}
                      >
                        <Text style={[styles.tierIconText, { color: theme.textOnAccent }]}>
                          {t.hi}
                        </Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.tierIconContainerUnselected}>
                        <Text style={[styles.tierIconText, { color: theme.accent }]}>
                          {t.hi}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Tier text details */}
                  <View style={styles.tierInfo}>
                    <View style={styles.tierHeaderRow}>
                      <Text style={styles.tierLabel}>{t.label}</Text>
                      <Text style={[styles.tierPrice, { color: theme.accent }]}>{t.price}</Text>
                    </View>
                    <Text style={styles.tierDesc}>{t.desc}</Text>
                  </View>

                  {/* Radio Selection Indicator */}
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && (
                      <Svg width="10" height="10" viewBox="0 0 24 24">
                        <Path
                          d="M5 12 l 5 5 l 9 -11"
                          stroke={isLight ? theme.textOnAccent : '#0f102b'}
                          strokeWidth="3.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Bar with CTA */}
        <View style={styles.bottomSection}>
          <CTA
            label={ctaLabel}
            subLabel={ctaSubLabel}
            onPress={handleSupportOffer}
          />
          <Text style={styles.disclaimer}>Cancel anytime · Nothing is locked</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme, isLight: boolean, insets: any) => StyleSheet.create({
  root: {
    flex: 1,
  },
  topGlowContainer: {
    position: 'absolute',
    top: -120,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  topGlowDecor: {
    width: 500,
    height: 380,
    borderRadius: 250,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: insets.top > 0 ? insets.top + 8 : 16,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: isLight ? 'rgba(92, 61, 74, 0.08)' : 'rgba(245, 236, 216, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: theme.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  diyaOuterCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: isLight ? 'rgba(232, 164, 184, 0.3)' : 'rgba(255, 244, 214, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    marginBottom: 16,
  },
  diyaInnerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontFamily: theme.fonts.serif,
    fontSize: 26,
    color: theme.text,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontFamily: theme.fonts.serifItalic,
    fontSize: 14,
    lineHeight: 20,
    color: theme.textMuted,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  tiersSection: {
    marginTop: 10,
  },
  tierCard: {
    position: 'relative',
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    overflow: 'hidden',
  },
  tierCardUnselected: {
    backgroundColor: isLight ? 'rgba(92, 61, 74, 0.02)' : 'rgba(245, 236, 216, 0.04)',
    borderColor: theme.cardBorder,
  },
  tierCardSelected: {
    backgroundColor: isLight ? 'rgba(232, 164, 184, 0.08)' : 'rgba(232, 168, 56, 0.06)',
    borderColor: theme.accentBorder,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 14,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: 'hidden',
  },
  popularBadgeGradient: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularBadgeText: {
    fontFamily: theme.fonts.heading,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: isLight ? theme.textOnAccent : '#0f102b',
  },
  tierIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tierIconContainerSelected: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierIconContainerUnselected: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: isLight ? 'rgba(92, 61, 74, 0.04)' : 'rgba(245, 236, 216, 0.08)',
    borderWidth: 1,
    borderColor: theme.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierIconText: {
    fontFamily: theme.fonts.hindi,
    fontSize: 15,
  },
  tierInfo: {
    flex: 1,
  },
  tierHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  tierLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 15,
    color: theme.text,
  },
  tierPrice: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
  },
  tierDesc: {
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.textMuted,
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: 'transparent',
    backgroundColor: theme.accent,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20,
    borderTopWidth: 1,
    borderTopColor: theme.cardBorder,
    backgroundColor: theme.background,
  },
  disclaimer: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.textMuted,
  },
});
