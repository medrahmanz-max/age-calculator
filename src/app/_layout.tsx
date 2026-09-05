import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { AppProvider, useApp } from '@/context/AppContext';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <AppProvider>
      <RootLayout />
    </AppProvider>
  );
}

function RootLayout() {
  const colorScheme = useColorScheme();
  const { isDark } = useApp();

  return (
    <ThemeProvider value={isDark || colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
    </ThemeProvider>
  );
}
