import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SavedVerse {
  chapterId: number;
  verseNum: number;
  hi: string;
  en: string;
  isKeyVerse?: boolean;
}

interface SavedVersesContextType {
  savedVerses: SavedVerse[];
  saveVerse: (verse: SavedVerse) => void;
  unsaveVerse: (chapterId: number, verseNum: number) => void;
  isVerseSaved: (chapterId: number, verseNum: number) => boolean;
}

const SavedVersesContext = createContext<SavedVersesContextType | undefined>(undefined);

export function SavedVersesProvider({ children }: { children: ReactNode }) {
  const [savedVerses, setSavedVerses] = useState<SavedVerse[]>([]);

  const saveVerse = (verse: SavedVerse) => {
    setSavedVerses((prev) => {
      const exists = prev.some((v) => v.chapterId === verse.chapterId && v.verseNum === verse.verseNum);
      if (exists) return prev;
      return [...prev, verse];
    });
  };

  const unsaveVerse = (chapterId: number, verseNum: number) => {
    setSavedVerses((prev) =>
      prev.filter((v) => !(v.chapterId === chapterId && v.verseNum === verseNum))
    );
  };

  const isVerseSaved = (chapterId: number, verseNum: number) => {
    return savedVerses.some((v) => v.chapterId === chapterId && v.verseNum === verseNum);
  };

  return (
    <SavedVersesContext.Provider value={{ savedVerses, saveVerse, unsaveVerse, isVerseSaved }}>
      {children}
    </SavedVersesContext.Provider>
  );
}

export function useSavedVerses() {
  const context = useContext(SavedVersesContext);
  if (!context) {
    throw new Error('useSavedVerses must be used within a SavedVersesProvider');
  }
  return context;
}
