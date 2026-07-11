import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { IntentionScreen } from '../screens/onboarding/IntentionScreen';
import { CommitmentScreen } from '../screens/onboarding/CommitmentScreen';
import { SignInScreen } from '../screens/onboarding/SignInScreen';
import { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#0f102b' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Intention" component={IntentionScreen} />
      <Stack.Screen name="Commitment" component={CommitmentScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
