import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { JourneyScreen } from '../screens/profile/JourneyScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { ReminderScreen } from '../screens/profile/ReminderScreen';
import { PathOverviewScreen } from '../screens/profile/PathOverviewScreen';
import { SupportScreen } from '../screens/profile/SupportScreen';
import { SessionLengthScreen } from '../screens/profile/settings/SessionLengthScreen';
import { RestDaysScreen } from '../screens/profile/settings/RestDaysScreen';
import { LanguagePickerScreen } from '../screens/profile/settings/LanguagePickerScreen';
import { TranslationSourceScreen } from '../screens/profile/settings/TranslationSourceScreen';
import { ThemePickerScreen } from '../screens/profile/settings/ThemePickerScreen';
import { TextSizeScreen } from '../screens/profile/settings/TextSizeScreen';
import { NotificationsHubScreen } from '../screens/profile/settings/NotificationsHubScreen';
import { AccountScreen } from '../screens/profile/settings/AccountScreen';
import { DataPrivacyScreen } from '../screens/profile/settings/DataPrivacyScreen';
import { AboutScreen } from '../screens/profile/settings/AboutScreen';
import { SignOutConfirmScreen } from '../screens/profile/settings/SignOutConfirmScreen';
import { useTheme } from '../theme';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="Journey" component={JourneyScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Reminder" component={ReminderScreen} />
      <Stack.Screen name="PathOverview" component={PathOverviewScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="SessionLength" component={SessionLengthScreen} />
      <Stack.Screen name="RestDays" component={RestDaysScreen} />
      <Stack.Screen name="LanguagePicker" component={LanguagePickerScreen} />
      <Stack.Screen name="TranslationSource" component={TranslationSourceScreen} />
      <Stack.Screen name="ThemePicker" component={ThemePickerScreen} />
      <Stack.Screen name="TextSize" component={TextSizeScreen} />
      <Stack.Screen name="NotificationsHub" component={NotificationsHubScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="DataPrivacy" component={DataPrivacyScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen 
        name="SignOutConfirm" 
        component={SignOutConfirmScreen} 
        options={{ presentation: 'transparentModal', animation: 'fade' }} 
      />
    </Stack.Navigator>
  );
}
