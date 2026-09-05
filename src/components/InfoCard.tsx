import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useApp } from '@/context/AppContext';

export function InfoCard({ label, value }: { label: string; value: string }) {
  const { colors } = useApp();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.secondaryText }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', borderWidth: 1, borderRadius: 16, padding: 15, marginBottom: 10 },
  value: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  label: { fontSize: 12, marginTop: 5, textAlign: 'center' },
});
