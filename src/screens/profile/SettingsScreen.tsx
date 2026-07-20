import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/themes';
import { SettingsPageFrame, SettingsGroup, SettingsRow } from './components/SettingsUI';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const { theme } = useTheme();


  return (
    <SettingsPageFrame title="Settings" hi="सेटिंग्स">
      <SettingsGroup title="Practice · अभ्यास">
        <SettingsRow icon="clock" label="Daily reminder" value="7:00 AM · daily" chevron onPress={() => navigation.navigate('Reminder')} />
        <SettingsRow icon="time" label="Session length" value="Steady · 10 min" chevron onPress={() => navigation.navigate('SessionLength')} />
        <SettingsRow icon="pause" label="Rest days" value="Sundays" chevron onPress={() => navigation.navigate('RestDays')} />
      </SettingsGroup>

      <SettingsGroup title="Language · भाषा">
        <SettingsRow icon="globe" label="Interface language" value="English" chevron onPress={() => navigation.navigate('LanguagePicker')} />
        <SettingsRow icon="text" label="Translation source" value="Swami Sivananda" chevron onPress={() => navigation.navigate('TranslationSource')} />
        <SettingsRow icon="script" label="Show Devanagari script" toggle on />
        <SettingsRow icon="script" label="Show transliteration" toggle />
      </SettingsGroup>

      <SettingsGroup title="Appearance">
        <SettingsRow icon="theme" label="Theme" value="Warm dark" chevron onPress={() => navigation.navigate('ThemePicker')} />
        <SettingsRow icon="font" label="Text size" value="Regular" chevron onPress={() => navigation.navigate('TextSize')} />
      </SettingsGroup>
      
      <SettingsGroup title="Account & Privacy">
        <SettingsRow icon="bell" label="Notifications" chevron onPress={() => navigation.navigate('NotificationsHub')} />
        <SettingsRow icon="user" label="Account" chevron onPress={() => navigation.navigate('Account')} />
        <SettingsRow icon="lock" label="Data & Privacy" chevron onPress={() => navigation.navigate('DataPrivacy')} />
      </SettingsGroup>

      <SettingsGroup title="Support · दान">
        <SettingsRow icon="heart" label="Support Deep" value="Sponsor the journey" chevron onPress={() => navigation.navigate('Support')} />
        <SettingsRow icon="info" label="About" chevron onPress={() => navigation.navigate('About')} />
        <SettingsRow icon="log-out" label="Sign out" chevron onPress={() => navigation.navigate('SignOutConfirm')} />
      </SettingsGroup>
    </SettingsPageFrame>
  );
}
