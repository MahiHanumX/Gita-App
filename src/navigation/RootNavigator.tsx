import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { ChapterFlowNavigator } from './ChapterFlowNavigator';
import { RootStackParamList } from './types';
import { PALETTE } from '../theme/palette';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: PALETTE.indigoDeep,
    card: PALETTE.indigoDeep,
    primary: PALETTE.saffronBright,
    text: PALETTE.cream,
    border: 'rgba(245,236,216,0.08)',
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="ChapterFlow"
          component={ChapterFlowNavigator}
          options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
