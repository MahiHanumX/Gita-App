import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, getTheme, lightLotusTheme, ThemeMode } from './themes';

export type ThemeSetting = 'system' | 'light' | 'dark';

export type ThemeContextValue = {
  mode: ThemeSetting;
  resolvedMode: ThemeMode;
  theme: typeof darkTheme | typeof lightLotusTheme;
  setMode: (mode: ThemeSetting) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeSetting>('system');

  const resolvedMode = useMemo<ThemeMode>(() => {
    if (mode === 'system') {
      return systemColorScheme === 'light' ? 'light' : 'dark';
    }
    return mode;
  }, [mode, systemColorScheme]);

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      theme: getTheme(resolvedMode),
      setMode,
      toggleMode: () => setMode((m) => {
        const current = m === 'system' ? (systemColorScheme === 'light' ? 'light' : 'dark') : m;
        return current === 'dark' ? 'light' : 'dark';
      }),
    }),
    [mode, resolvedMode, systemColorScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx as {
    mode: ThemeSetting;
    resolvedMode: ThemeMode;
    theme: typeof darkTheme | typeof lightLotusTheme;
    setMode: (mode: ThemeSetting) => void;
    toggleMode: () => void;
  };
}

/** Use lotus light palette on screens that are always light (Library, Task step). */
export function useLightTheme() {
  return lightLotusTheme;
}

export { darkTheme, lightLotusTheme };
