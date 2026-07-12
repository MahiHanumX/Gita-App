import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LibraryScreen } from '../screens/library/LibraryScreen';
import { ChapterDetailScreen } from '../screens/library/ChapterDetailScreen';
import { SearchScreen } from '../screens/library/SearchScreen';
import { LibraryStackParamList } from './types';

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export function LibraryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LibraryHome" component={LibraryScreen} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
