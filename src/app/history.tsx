import React from 'react';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { HistoryItem } from '@/components/HistoryItem';
import { PageHeader, Screen } from '@/components/Screen';
import { useApp } from '@/context/AppContext';

export default function HistoryScreen() {
  const { colors, history, clearHistory, loadHistoryItem, deleteHistoryItem } = useApp();
  const handleClear = () => {
    Alert.alert('Clear history', 'Delete all saved calculations?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear all', style: 'destructive', onPress: clearHistory },
    ]);
  };

  return (
    <Screen>
      <View style={styles.headingRow}>
        <PageHeader title="History" subtitle="Your recent calculations" />
        {history.length > 0 ? <Pressable onPress={handleClear} accessibilityRole="button"><Text style={[styles.clear, { color: colors.danger }]}>Clear all</Text></Pressable> : null}
      </View>
      {history.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.emoji}>🗂️</Text>
          <Text style={[styles.title, { color: colors.text }]}>No calculations yet</Text>
          <Text style={[styles.copy, { color: colors.secondaryText }]}>Your saved age calculations will appear here.</Text>
        </View>
      ) : history.map((item) => (
        <HistoryItem key={item.id} item={item} onOpen={() => { loadHistoryItem(item); router.push('/'); }} onDelete={() => {
          Alert.alert('Delete calculation', 'Remove this item from history?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deleteHistoryItem(item.id) },
          ]);
        }} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headingRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  clear: { fontSize: 13, fontWeight: '800', marginTop: 8 },
  empty: { alignItems: 'center', borderWidth: 1, borderRadius: 20, padding: 28, marginTop: 8 },
  emoji: { fontSize: 38, marginBottom: 12 },
  title: { fontSize: 19, fontWeight: '800' },
  copy: { textAlign: 'center', fontSize: 14, lineHeight: 21, marginTop: 7 },
});
