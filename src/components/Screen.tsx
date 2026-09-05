import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useApp } from '@/context/AppContext';
import { LogoMark } from '@/components/LogoMark';

export function Screen({ children }: { children: React.ReactNode }) {
  const { colors } = useApp();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useApp();
  return (
    <View style={styles.header}>
      <LogoMark />
      <View style={styles.headerCopy}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  content: { flexGrow: 1, padding: 20, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  headerCopy: { marginLeft: 13 },
  title: { fontSize: 25, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 3 },
});
