import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useApp } from '@/context/AppContext';

type DateInputProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function DateInput({ value, onChange }: DateInputProps) {
  const { colors } = useApp();
  const [showPicker, setShowPicker] = useState(false);
  const formattedDate = value.toLocaleDateString('en-GB');

  if (Platform.OS === 'web') {
    const webDateProps = {
      type: 'date',
      max: new Date().toISOString().slice(0, 10),
    } as Record<string, string>;

    return (
      <View style={[styles.webInput, { backgroundColor: colors.control }]}>
        <Text style={styles.emoji}>📅</Text>
        <View style={styles.dateCopy}>
          <Text style={[styles.smallText, { color: colors.mutedText }]}>Your birthday</Text>
          <TextInput
            {...webDateProps}
            value={value.toISOString().slice(0, 10)}
            onChangeText={(text) => {
              const date = new Date(`${text}T00:00:00`);
              if (!Number.isNaN(date.getTime())) onChange(date);
            }}
            accessibilityLabel="Date of birth"
            style={[styles.webDateInput, { color: colors.text }]}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.nativeInput, { backgroundColor: colors.control }, pressed && styles.pressed]}
        onPress={() => setShowPicker(true)}
        accessibilityRole="button"
        accessibilityLabel="Choose your date of birth"
      >
        <Text style={styles.emoji}>📅</Text>
        <View style={styles.dateCopy}>
          <Text style={[styles.smallText, { color: colors.mutedText }]}>Your birthday</Text>
          <Text style={[styles.date, { color: colors.text }]}>{formattedDate}</Text>
        </View>
        <Text style={[styles.arrow, { color: colors.mutedText }]}>›</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(_event, date) => {
            setShowPicker(false);
            if (date) onChange(date);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  nativeInput: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 14, marginBottom: 16 },
  webInput: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 14, marginBottom: 16 },
  emoji: { fontSize: 24 },
  dateCopy: { flex: 1, marginLeft: 12 },
  smallText: { fontSize: 12, marginBottom: 4 },
  date: { fontSize: 17, fontWeight: '800' },
  webDateInput: { fontSize: 17, fontWeight: '800', padding: 0, borderWidth: 0 },
  arrow: { fontSize: 30 },
  pressed: { opacity: 0.75 },
});
