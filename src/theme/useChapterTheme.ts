/**
 * useChapterTheme
 *
 * Extends the global theme with chapter-screen-specific derived colors.
 * Import this instead of useTheme in any chapter screen so the color
 * derivations are computed in one place and stay consistent.
 *
 * Usage:
 *   const { theme, isLight, chapterColors } = useChapterTheme();
 */
import { useTheme } from './ThemeContext';
import type { ThemeMode } from './themes';

export type ChapterColors = {
  // ── Shloka carousel ────────────────────────────────────────────────
  /** Accent color for reference text / italic titles */
  refColor: string;
  /** Transliteration / italic text color */
  translitColor: string;
  /** Horizontal divider line */
  dividerColor: string;
  /** Glass shloka card background */
  cardBg: string;
  /** Glass shloka card border */
  cardBorder: string;
  /** Active carousel dot */
  dotActive: string;
  /** Already-read carousel dot */
  dotRead: string;
  /** Unread/future carousel dot */
  dotIdle: string;
  /** Reference badge background tint */
  badgeBg: string;
  /** Reference badge border tint */
  badgeBorder: string;

  // ── Teaching / Reflect box ─────────────────────────────────────────
  /** Soft tinted box background (reflect prompt, info boxes) */
  boxBg: string;
  /** Soft tinted box border */
  boxBorder: string;

  // ── Task card ──────────────────────────────────────────────────────
  /** Opaque surface background for list/task cards */
  surfaceBg: string;
  /** Step separator line color */
  stepBorder: string;
  /** Box shadow tint color */
  shadowColor: string;
};

export function useChapterTheme() {
  const { theme, resolvedMode } = useTheme();
  const isLight = resolvedMode === 'light';
  const tone: ThemeMode = isLight ? 'light' : 'dark';

  const chapterColors: ChapterColors = {
    // Shloka carousel
    refColor: isLight ? theme.accentDeep : theme.accentBright,
    translitColor: isLight ? theme.textMuted : 'rgba(245,236,216,0.62)',
    dividerColor: isLight ? 'rgba(217,134,154,0.45)' : 'rgba(232,168,56,0.55)',
    cardBg: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.04)',
    cardBorder: isLight ? 'rgba(232,164,184,0.40)' : 'rgba(245,236,216,0.10)',
    dotActive: isLight ? theme.accentDeep : theme.accentBright,
    dotRead: isLight ? theme.accent : theme.accentBright,
    dotIdle: isLight ? 'rgba(217,134,154,0.22)' : 'rgba(244,194,87,0.18)',
    badgeBg: isLight ? 'rgba(217,134,154,0.12)' : 'rgba(232,168,56,0.12)',
    badgeBorder: isLight ? 'rgba(217,134,154,0.28)' : 'rgba(232,168,56,0.28)',

    // Teaching / Reflect box
    boxBg: isLight ? 'rgba(217,134,154,0.08)' : 'rgba(232,168,56,0.09)',
    boxBorder: isLight ? 'rgba(217,134,154,0.25)' : 'rgba(232,168,56,0.25)',

    // Task card
    surfaceBg: isLight ? theme.surface : 'rgba(255,255,255,0.04)',
    stepBorder: isLight ? 'rgba(232,164,184,0.15)' : 'rgba(245,236,216,0.08)',
    shadowColor: isLight ? '#E8A4B8' : '#f4c257',
  };

  return { theme, resolvedMode, isLight, tone, chapterColors };
}
