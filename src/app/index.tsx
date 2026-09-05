import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InfoCard } from '@/components/InfoCard';
import { DateInput } from '@/components/DateInput';
import { PageHeader, Screen } from '@/components/Screen';
import { useApp } from '@/context/AppContext';
import { calculateAge } from '@/utils/ageCalculator';

export default function HomeScreen() {
  const { colors, latestResult, calculate, clearLatestResult } = useApp();
  const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
  const [message, setMessage] = useState('');

  const handleCalculate = () => {
    if (birthDate > new Date()) {
      setMessage('Date of birth cannot be in the future.');
      return;
    }
    const result = calculate(birthDate);
    setMessage(result ? '' : 'Please select a valid date of birth.');
  };

  return (
    <Screen>
      <PageHeader title="Age Calculator" subtitle="Discover your exact age" />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.text }]}>Date of birth</Text>
        <DateInput
          value={birthDate}
          onChange={(date) => {
            setBirthDate(date);
            setMessage('');
          }}
        />

        {message ? <Text style={[styles.error, { color: colors.danger }]}>{message}</Text> : null}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary }, pressed && styles.buttonPressed]}
          onPress={handleCalculate}
          accessibilityRole="button"
          accessibilityLabel="Calculate my age"
        >
          <Text style={styles.primaryText}>Calculate My Age</Text>
        </Pressable>
      </View>

      <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {latestResult ? (
          <>
            <Text style={[styles.eyebrow, { color: colors.mutedText }]}>YOUR CURRENT AGE</Text>
            <Text style={[styles.ageNumber, { color: colors.primary }]}>{latestResult.years}</Text>
            <Text style={[styles.ageLabel, { color: colors.text }]}>
              {latestResult.years === 1 ? 'Year Old' : 'Years Old'}
            </Text>
            <View style={styles.ageDetails}>
              <Metric value={latestResult.months} label="Months" />
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Metric value={latestResult.days} label="Days" />
            </View>
            <Text style={[styles.total, { color: colors.secondaryText }]}>{latestResult.totalDays.toLocaleString()} days old</Text>
            <Pressable onPress={clearLatestResult} accessibilityRole="button" accessibilityLabel="Clear calculation">
              <Text style={[styles.reset, { color: colors.primary }]}>Clear Result</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.emptyEmoji}>🎂</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Your Age</Text>
            <Text style={[styles.emptyText, { color: colors.mutedText }]}>Select your date of birth and calculate your age</Text>
          </>
        )}
      </View>

      {latestResult ? (
        <>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>More about your age</Text>
          <View style={styles.grid}>
            <InfoCard label="Total Months" value={latestResult.totalMonths.toLocaleString()} />
            <InfoCard label="Total Weeks" value={latestResult.totalWeeks.toLocaleString()} />
            <InfoCard label="Total Hours" value={latestResult.totalHours.toLocaleString()} />
            <InfoCard label="Total Minutes" value={latestResult.totalMinutes.toLocaleString()} />
            <InfoCard label="Day You Were Born" value={latestResult.dayOfBirth} />
            <InfoCard label="Zodiac Sign" value={latestResult.zodiacSign} />
          </View>
          <View style={[styles.birthday, { backgroundColor: colors.accentSurface }]}>
            <Text style={styles.birthdayEmoji}>🎉</Text>
            <Text style={[styles.birthdayTitle, { color: colors.text }]}>Your Next Birthday</Text>
            <Text style={[styles.birthdayDays, { color: colors.primary }]}>{latestResult.daysUntilBirthday} days to go</Text>
            <Text style={[styles.birthdayDate, { color: colors.secondaryText }]}>{latestResult.nextBirthday.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
        </>
      ) : null}
      <Text style={[styles.footer, { color: colors.mutedText }]}>Simple · Fast · Accurate</Text>
    </Screen>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  const { colors } = useApp();
  return <View style={styles.metric}><Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text><Text style={[styles.metricLabel, { color: colors.secondaryText }]}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 22, padding: 20, marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  error: { fontSize: 13, marginBottom: 12, fontWeight: '600' },
  primaryButton: { borderRadius: 16, paddingVertical: 17, alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.75 },
  buttonPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  resultCard: { borderWidth: 1, borderRadius: 22, padding: 25, minHeight: 210, alignItems: 'center', justifyContent: 'center' },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  ageNumber: { fontSize: 62, lineHeight: 70, fontWeight: '900' },
  ageLabel: { fontSize: 16, fontWeight: '800' },
  ageDetails: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  metric: { alignItems: 'center', minWidth: 84 },
  metricValue: { fontSize: 24, fontWeight: '800' },
  metricLabel: { fontSize: 12, marginTop: 3 },
  divider: { width: 1, height: 35, marginHorizontal: 12 },
  total: { fontSize: 13, marginTop: 18 },
  reset: { fontSize: 14, fontWeight: '800', marginTop: 16 },
  emptyEmoji: { fontSize: 34, marginBottom: 10 },
  emptyTitle: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  emptyText: { textAlign: 'center', fontSize: 14, lineHeight: 21 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginTop: 24, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  birthday: { borderRadius: 18, padding: 20, marginTop: 8, alignItems: 'center' },
  birthdayEmoji: { fontSize: 28, marginBottom: 7 },
  birthdayTitle: { fontSize: 16, fontWeight: '800' },
  birthdayDays: { fontSize: 21, fontWeight: '900', marginTop: 8 },
  birthdayDate: { fontSize: 13, marginTop: 5 },
  footer: { textAlign: 'center', fontSize: 13, marginTop: 25 },
});
