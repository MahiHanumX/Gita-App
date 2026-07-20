import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PracticeHomeScreen } from '../screens/practice/PracticeHomeScreen';
import { MeditationLibraryScreen } from '../screens/practice/libraries/MeditationLibraryScreen';
import { MantraLibraryScreen } from '../screens/practice/libraries/MantraLibraryScreen';
import { BreathworkLibraryScreen } from '../screens/practice/libraries/BreathworkLibraryScreen';
import { YogaNidraLibraryScreen } from '../screens/practice/libraries/YogaNidraLibraryScreen';
import { PracticeHistoryScreen } from '../screens/practice/PracticeHistoryScreen';
import { PracticeSearchScreen } from '../screens/practice/PracticeSearchScreen';
import { PracticeStackParamList } from './types';

const Stack = createNativeStackNavigator<PracticeStackParamList>();

export function PracticeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="PracticeHome" component={PracticeHomeScreen} />
      <Stack.Screen name="MeditationLibrary" component={MeditationLibraryScreen} />
      <Stack.Screen name="MantraLibrary" component={MantraLibraryScreen} />
      <Stack.Screen name="BreathworkLibrary" component={BreathworkLibraryScreen} />
      <Stack.Screen name="YogaNidraLibrary" component={YogaNidraLibraryScreen} />
      <Stack.Screen name="PracticeHistory" component={PracticeHistoryScreen} />
      <Stack.Screen name="PracticeSearch" component={PracticeSearchScreen} />
    </Stack.Navigator>
  );
}
