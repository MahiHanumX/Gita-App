import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { JourneyScreen } from '../screens/profile/JourneyScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { ReminderScreen } from '../screens/profile/ReminderScreen';
import { PathOverviewScreen } from '../screens/profile/PathOverviewScreen';
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
    </Stack.Navigator>
  );
}
