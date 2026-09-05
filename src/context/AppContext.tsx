import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { AgeResult, calculateAge } from '@/utils/ageCalculator';

export type ThemeMode = 'system' | 'light' | 'dark';

export type HistoryItem = {
  id: string;
  birthDate: string;
  calculatedAt: string;
  result: AgeResult;
};

type AppContextValue = {
  themeMode: ThemeMode;
  isDark: boolean;
  colors: typeof lightColors;
  latestResult: AgeResult | null;
  history: HistoryItem[];
  calculate: (birthDate: Date) => AgeResult | null;
  clearLatestResult: () => void;
  loadHistoryItem: (item: HistoryItem) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

export const lightColors = {
  background: '#F5F7FB',
  surface: '#FFFFFF',
  backgroundElement: '#E8EEF8',
  control: '#EEF3FB',
  accentSurface: '#EAF2FF',
  primary: '#2563EB',
  text: '#172033',
  secondaryText: '#627087',
  mutedText: '#8A96A8',
  border: '#E2E8F0',
  danger: '#DC2626',
};

export const darkColors = {
  background: '#10141D',
  surface: '#1B2230',
  backgroundElement: '#273244',
  control: '#252E3D',
  accentSurface: '#18345C',
  primary: '#79A7FF',
  text: '#F4F7FB',
  secondaryText: '#B8C1D1',
  mutedText: '#8F9AAD',
  border: '#303B4D',
  danger: '#FF8585',
};

const HISTORY_KEY = '@age-calculator/history';
const THEME_KEY = '@age-calculator/theme';

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [latestResult, setLatestResult] = useState<AgeResult | null>(null);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(HISTORY_KEY), AsyncStorage.getItem(THEME_KEY)])
      .then(([storedHistory, storedTheme]) => {
        if (storedHistory) setHistory(JSON.parse(storedHistory));
        if (storedTheme === 'system' || storedTheme === 'light' || storedTheme === 'dark') {
          setThemeModeState(storedTheme);
        }
      })
      .catch(() => undefined);
  }, []);

  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const saveHistory = (items: HistoryItem[]) => {
    setHistory(items);
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(items)).catch(() => undefined);
  };

  const calculate = (birthDate: Date) => {
    try {
      const result = calculateAge(birthDate);
      const item: HistoryItem = {
        id: `${Date.now()}-${birthDate.getTime()}`,
        birthDate: birthDate.toISOString(),
        calculatedAt: new Date().toISOString(),
        result,
      };
      setLatestResult(result);
      saveHistory([item, ...history.filter((entry) => entry.birthDate !== item.birthDate)].slice(0, 20));
      return result;
    } catch {
      return null;
    }
  };

  const loadHistoryItem = (item: HistoryItem) => setLatestResult(item.result);

  const clearLatestResult = () => setLatestResult(null);

  const deleteHistoryItem = (id: string) => saveHistory(history.filter((item) => item.id !== id));

  const clearHistory = () => saveHistory([]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(THEME_KEY, mode).catch(() => undefined);
  };

  const value = useMemo(
    () => ({
      themeMode,
      isDark,
      colors,
      latestResult,
      history,
      calculate,
      clearLatestResult,
      loadHistoryItem,
      deleteHistoryItem,
      clearHistory,
      setThemeMode,
    }),
    [themeMode, isDark, colors, latestResult, history]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
