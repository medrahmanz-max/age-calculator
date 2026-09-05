import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { PageHeader, Screen } from '@/components/Screen';
import { ThemeMode, useApp } from '@/context/AppContext';

const modes: { label: string; value: ThemeMode; icon: string }[] = [
  { label: 'System default', value: 'system', icon: '⚙️' },
  { label: 'Light mode', value: 'light', icon: '☀️' },
  { label: 'Dark mode', value: 'dark', icon: '🌙' },
];

export default function SettingsScreen() {
  const { colors, themeMode, setThemeMode, clearHistory } = useApp();
  const handleClearHistory = () => {
    Alert.alert('Clear history', 'Delete all saved calculations?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear all', style: 'destructive', onPress: clearHistory },
    ]);
  };

  return (
    <Screen>
      <PageHeader title="Settings" subtitle="Make the app yours" />
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
      <View style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {modes.map((mode) => (
          <Pressable key={mode.value} onPress={() => setThemeMode(mode.value)} style={styles.option} accessibilityRole="radio" accessibilityState={{ selected: themeMode === mode.value }}>
            <Text style={styles.icon}>{mode.icon}</Text>
            <Text style={[styles.optionLabel, { color: colors.text }]}>{mode.label}</Text>
            <View style={[styles.radio, { borderColor: themeMode === mode.value ? colors.primary : colors.border }]}>{themeMode === mode.value ? <View style={[styles.radioDot, { backgroundColor: colors.primary }]} /> : null}</View>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Data & privacy</Text>
      <View style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Pressable style={styles.action} onPress={handleClearHistory} accessibilityRole="button" accessibilityLabel="Clear calculation history">
          <Text style={styles.icon}>🧹</Text>
          <View style={styles.actionCopy}><Text style={[styles.optionLabel, { color: colors.text }]}>Clear calculation history</Text><Text style={[styles.caption, { color: colors.secondaryText }]}>Remove all locally saved dates</Text></View>
        </Pressable>
        <View style={styles.action}><Text style={styles.icon}>🔒</Text><View style={styles.actionCopy}><Text style={[styles.optionLabel, { color: colors.text }]}>Privacy</Text><Text style={[styles.caption, { color: colors.secondaryText }]}>Your calculations stay on this device.</Text></View></View>
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
      <View style={[styles.about, { backgroundColor: colors.accentSurface }]}><Text style={styles.aboutEmoji}>🧮</Text><Text style={[styles.aboutTitle, { color: colors.text }]}>Age Calculator</Text><Text style={[styles.caption, { color: colors.secondaryText }]}>Version 1.0.0 · Built with Expo</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 17, fontWeight: '800', marginTop: 4, marginBottom: 10 },
  panel: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 16, marginBottom: 20 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  icon: { fontSize: 20, width: 34 },
  optionLabel: { flex: 1, fontSize: 15, fontWeight: '700' },
  radio: { width: 21, height: 21, borderWidth: 2, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 11, height: 11, borderRadius: 6 },
  action: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  actionCopy: { flex: 1 },
  caption: { fontSize: 12, marginTop: 3 },
  about: { borderRadius: 18, padding: 22, alignItems: 'center' },
  aboutEmoji: { fontSize: 32, marginBottom: 8 },
  aboutTitle: { fontSize: 18, fontWeight: '800' },
});
