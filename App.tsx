import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import {
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_500Medium,
} from '@expo-google-fonts/noto-sans-devanagari';
import {
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_600SemiBold,
} from '@expo-google-fonts/playfair-display';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/theme';
import { LocaleProvider } from './src/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SavedVersesProvider } from './src/api_data/SavedVersesContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_500Medium,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_500Medium_Italic,
    PlayfairDisplay_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <ThemeProvider>
          <SavedVersesProvider>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <StatusBar style="light" />
              <RootNavigator />
            </View>
          </SavedVersesProvider>
        </ThemeProvider>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
