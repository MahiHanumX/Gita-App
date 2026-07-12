# Gita Journey — Project Context & Architecture

## Project Overview
- **App Name**: Gita Journey (Deep)
- **Stack**: Expo (SDK 57), React Native, TypeScript
- **Entry**: `App.tsx` → `src/navigation/`
- **State**: No global state library — data via custom hooks in `src/api_data/hooks.ts`
- **Fonts**: Poppins, NotoSansDevanagari, PlayfairDisplay (loaded in App.tsx via expo-google-fonts)

---

## Theme System (FULLY IMPLEMENTED — 100% coverage as of July 2026)

### Theme Files (`src/theme/`)
| File | Purpose |
|------|---------|
| `themes.ts` | `darkTheme` + `lightLotusTheme` — all color tokens defined here |
| `ThemeContext.tsx` | `useTheme()` hook + `ThemeProvider` — wraps app in `App.tsx` |
| `useChapterTheme.ts` | Chapter-specific color overrides (used inside ChapterFlow screens) |
| `palette.ts` | Raw PALETTE constants — **DO NOT use in screens**, use `theme.*` tokens instead |
| `index.ts` | Re-exports all theme utilities |

### Key Token Names (change these in `themes.ts` to restyle entire app)
```
accent / accentBright / accentDeep     → Primary accent color (saffron/gold in dark, blush pink in light)
accentSoft / accentBorder / blush      → Tinted accent variants
background / backgroundAlt             → Page background
gradientStart / gradientMid / gradientEnd → Background gradient stops
text / textMuted / textOnAccent        → Typography colors
surface / surfaceSoft / cardBorder     → Card/surface colors
progressTrack / progressFill           → Progress bar colors
ctaGradient / ctaText                  → Call-to-action button gradient + text
tabBarBg / tabActive / tabInactive     → Bottom tab bar
mandalaStroke                          → Background mandala decoration
fonts.*                                → Typed font family names
```

### Theme Hook Usage Pattern
```tsx
// Standard pattern used in most screens
const { theme, resolvedMode } = useTheme();
const styles = useMemo(() => getStyles(theme), [theme]);

// Chapter screens only
const { theme, isLight, chapterColors } = useChapterTheme();

// Always light (library/task screens)
const theme = useLightTheme();
```

### ⚠️ PALETTE is BANNED in screens
All `PALETTE.*` usages have been removed from screens (completed July 2026).
`PALETTE` is only used in `theme/palette.ts` itself and possibly `themes.ts`.
If you see `PALETTE.saffronBright` in a screen → replace with `theme.accentBright`.
If you see `PALETTE.indigoDeep` → replace with `theme.background`.
If you see `PALETTE.cream` → replace with `theme.text` or `theme.surface`.

---

## Screen Architecture

### Navigation Structure
```
RootStack
  ├── Onboarding (stack)
  │   ├── Splash → Welcome → Intention → Commitment → SignIn
  ├── Main (bottom tabs)
  │   ├── Path (tab) → PathScreen
  │   ├── Library (tab) → LibraryScreen → ChapterDetail, Search
  │   ├── Practice (tab) → PracticeHomeScreen → MeditationSession, MantraJaap
  │   ├── Profile (tab, stack)
  │       ├── ProfileScreen → Settings → Reminder, Journey, PathOverview
  ├── ChapterFlow (stack, modal-style)
      ├── Teaching → Task → Reflect → Shloka → Complete → MilestoneComplete
```

### Shell Components (layout wrappers)
| Component | Usage |
|-----------|-------|
| `DarkShell` | Dark theme full-page wrapper (Onboarding only) |
| `LightShell` | Light theme full-page wrapper (most screens) |
| `ChapterShell` | Chapter step wrapper with progress bar + CTA |

### Screens by folder
```
src/screens/
  onboarding/   SplashScreen, WelcomeScreen, IntentionScreen, CommitmentScreen, SignInScreen
  chapters/     TeachingScreen, TaskScreen, ReflectScreen, ShlokaScreen, CompleteChapterScreen
  path/         PathScreen, MilestoneCompleteScreen
  library/      LibraryScreen, SearchScreen, ChapterDetailScreen
  practice/     PracticeHomeScreen, MeditationSessionScreen, MantraJaapScreen
  profile/      ProfileScreen, SettingsScreen, ReminderScreen, JourneyScreen, PathOverviewScreen
```

---

## Key Patterns

### Dynamic StyleSheet (preferred for themed screens)
```tsx
const getStyles = (theme: AppTheme) => StyleSheet.create({ ... });
// In component:
const styles = useMemo(() => getStyles(theme), [theme]);
```

### Static StyleSheet with inline theme props (also common)
```tsx
const styles = StyleSheet.create({ title: { fontFamily: 'Poppins_600SemiBold' } });
// In JSX:
<Text style={[styles.title, { color: theme.text }]}>...</Text>
```

### Mode-conditional colors
```tsx
const isDark = resolvedMode === 'dark';
const isLight = resolvedMode === 'light';
color: isDark ? theme.accentBright : theme.accentDeep
```

---

## Data Layer

### Hooks (`src/api_data/hooks.ts`)
- `useDailyPractice()` → chapter content for today
- `usePathJourney()` → path screen nodes, streaks, milestones
- `useUserProfile()` → stats, heatmap, journey entries
- `usePracticeHub()` → practice tiles and suggestion
- `useLibraryContent()` → chapters, verse of the day
- `useOnboardingContent()` → splash/welcome/intention/commitment content
- `useAuthContent()` → sign-in providers
- `useChapterCtaLabels()` → CTA button labels per chapter step

### Data Files (`src/api_data/`)
- `mock/` → JSON mock data (app currently uses mocks)
- `services.ts` → `advancePathJourneyDay()`, `signIn()` etc.
- `types.ts` → TypeScript types for all data shapes

---

## Internationalization
- `src/i18n/` → `useTranslation()` hook + `useLocale()` hook
- Languages: `en`, `hi`, `mr`, `gu`, `ta`, `te`
- Most content comes from API data (already localized); UI strings use `useTranslation()`

---

## Notable Files
- `src/components/SharedUI.tsx` → `ChapterChip`, `PathNode`, `StreakBadge`
- `src/components/ChapterShell.tsx` → Shell + CTA for chapter steps
- `src/components/MandalaBG.tsx` → Animated mandala background
- `src/components/DiyaIcon.tsx` → Diya/lamp SVG icon
- `src/components/Icons.tsx` → General icon set
- `src/components/CTA.tsx` → Primary gradient CTA button
- `src/components/LanguagePicker.tsx` → Language selector in ProfileScreen

---

## ReminderScreen Special Behavior
ReminderScreen hides the bottom tab bar when focused using `useFocusEffect`:
```tsx
useFocusEffect(useCallback(() => {
  const parent = navigation.getParent();
  parent?.setOptions({ tabBarStyle: { display: 'none' } });
  return () => { parent?.setOptions({ tabBarStyle: undefined }); };
}, [navigation]));
```
This is intentional — do NOT remove it.

---

## How to Change App Colors (Quick Reference)
Edit ONLY `src/theme/themes.ts`. Change `darkTheme` and/or `lightLotusTheme` tokens.
The cascade is automatic — 100% of screens read from `useTheme()`.

**Dark theme accent** (currently saffron gold):
`accent: '#e8a838'`, `accentBright: '#f4c257'`, `accentDeep: '#c67a1a'`

**Dark theme background** (currently deep indigo):
`background: '#0f102b'`, `backgroundAlt: '#1a1b3a'`, `surface: '#1a1b3a'`

**Light theme accent** (currently blush pink):
`accent: '#E8A4B8'`, `accentBright: '#F0B8C8'`, `accentDeep: '#D9869A'`
