import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HistoryItem as HistoryEntry, useApp } from '@/context/AppContext';

export function HistoryItem({ item, onDelete, onOpen }: { item: HistoryEntry; onDelete: () => void; onOpen: () => void }) {
  const { colors } = useApp();
  const birthDate = new Date(item.birthDate).toLocaleDateString('en-GB');
  const calculatedAt = new Date(item.calculatedAt).toLocaleDateString('en-GB');
  return (
    <Pressable onPress={onOpen} accessibilityRole="button" accessibilityLabel={`Open calculation for ${birthDate}`} style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.icon, { backgroundColor: colors.accentSurface }]}><Text>🎂</Text></View>
      <View style={styles.copy}>
        <Text style={[styles.date, { color: colors.text }]}>{birthDate}</Text>
        <Text style={[styles.age, { color: colors.primary }]}>{item.result.years} years, {item.result.months} months, {item.result.days} days</Text>
        <Text style={[styles.meta, { color: colors.mutedText }]}>Calculated {calculatedAt}</Text>
      </View>
      <Pressable onPress={onDelete} accessibilityRole="button" accessibilityLabel={`Delete calculation for ${birthDate}`} hitSlop={10}>
        <Text style={[styles.delete, { color: colors.danger }]}>×</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 10 },
  icon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, marginHorizontal: 12 },
  date: { fontSize: 15, fontWeight: '800' },
  age: { fontSize: 13, fontWeight: '700', marginTop: 3 },
  meta: { fontSize: 11, marginTop: 4 },
  delete: { fontSize: 28, fontWeight: '300' },
});
