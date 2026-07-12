import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { ChapterFlowNavigator } from './ChapterFlowNavigator';
import { MantraJaapScreen } from '../screens/practice/MantraJaapScreen';
import { MeditationSessionScreen } from '../screens/practice/MeditationSessionScreen';
import { RootStackParamList } from './types';
import { useTheme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { theme, resolvedMode } = useTheme();

  const baseTheme = resolvedMode === 'dark' ? DarkTheme : DefaultTheme;

  const navTheme = {
    ...baseTheme,
    dark: resolvedMode === 'dark',
    colors: {
      ...baseTheme.colors,
      primary: theme.accent,
      background: theme.background,
      card: theme.tabBarBg,
      text: theme.text,
      border: theme.tabBarBorder,
      notification: theme.accentDeep,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="ChapterFlow"
          component={ChapterFlowNavigator}
          options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="MantraJaap"
          component={MantraJaapScreen}
          options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="MeditationSession"
          component={MeditationSessionScreen}
          options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
