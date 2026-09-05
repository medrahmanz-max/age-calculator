import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useApp } from '@/context/AppContext';

export function LogoMark({ size = 48 }: { size?: number }) {
  const { colors } = useApp();
  const scale = size / 48;

  return (
    <View style={[styles.tile, { width: size, height: size, borderRadius: 16 * scale, backgroundColor: colors.primary }]}>
      <View style={[styles.orbit, { width: 31 * scale, height: 17 * scale, borderRadius: 18 * scale, transform: [{ rotate: '-32deg' }] }]} />
      <View style={[styles.orbitDot, { width: 5 * scale, height: 5 * scale, borderRadius: 3 * scale, right: 7 * scale, top: 7 * scale, backgroundColor: '#F9C74F' }]} />
      <View style={[styles.hourglass, { transform: [{ scale }] }]}>
        <View style={styles.hourglassTop} />
        <View style={styles.hourglassBottom} />
        <View style={styles.hourglassLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  orbit: { position: 'absolute', borderWidth: 2, borderColor: '#FFFFFF', opacity: 0.9 },
  orbitDot: { position: 'absolute' },
  hourglass: { width: 16, height: 22, alignItems: 'center', justifyContent: 'center' },
  hourglassTop: { position: 'absolute', top: 0, width: 15, height: 9, backgroundColor: '#FFFFFF', borderTopLeftRadius: 4, borderTopRightRadius: 4, transform: [{ skewX: '-18deg' }] },
  hourglassBottom: { position: 'absolute', bottom: 0, width: 15, height: 9, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, transform: [{ skewX: '18deg' }] },
  hourglassLine: { width: 2, height: 18, backgroundColor: '#2563EB' },
});
