import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../../theme';
import { AppTheme } from '../../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRow } from '../components/SettingsUI';

export function NotificationsHubScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <SettingsPageFrame title="Notifications" hi="सूचनाएँ">
      <SettingsGroup title="Practice · अभ्यास">
        <SettingsRow label="Daily reminder" value="7:00 AM · Weekdays + Saturday" toggle on />
        <SettingsRow label="Gentle pre-bell" value="3 min before your reminder" toggle on />
        <SettingsRow label="Streak in danger" value="If you haven't practiced by 9 PM" toggle on divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Milestones · मील का पत्थर">
        <SettingsRow label="Day 7 / 21 / 40" value="When you complete a chapter" toggle on />
        <SettingsRow label="Weekly summary" value="Sundays · your week in numbers" toggle on divider={false} />
      </SettingsGroup>

      <SettingsGroup title="Sangha · सत्संग">
        <SettingsRow label="Replies to your reflections" toggle on />
        <SettingsRow label="Pranams received" value="When someone honors your post" toggle />
        <SettingsRow label="Study circle activity" value="Ravi, Meera, Kabir + 3 others" toggle on />
        <SettingsRow label="Weekly satsang" value="Saturday 8 AM meetup reminder" toggle on divider={false} />
      </SettingsGroup>

      <SettingsGroup footnote="You can silence everything for a day, week, or during a retreat.">
        <View style={styles.actionRow}>
          <View style={styles.actionTextWrap}>
            <Text style={styles.actionTitle}>Silent retreat mode</Text>
            <Text style={styles.actionHi}>मौन साधना</Text>
          </View>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Turn on</Text>
          </Pressable>
        </View>
      </SettingsGroup>
    </SettingsPageFrame>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  actionRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    color: theme.text,
  },
  actionHi: {
    marginTop: 1,
    fontFamily: theme.fonts.hindi,
    fontSize: 12,
    color: theme.textMuted,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(232,168,56,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.35)',
  },
  actionBtnText: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    color: theme.accentDeep,
  },
});
