export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  dayOfBirth: string;
  nextBirthday: Date;
  daysUntilBirthday: number;
  zodiacSign: string;
};

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function birthdayForYear(birthDate: Date, year: number) {
  const month = birthDate.getMonth();
  const day = Math.min(birthDate.getDate(), daysInMonth(year, month));
  return new Date(year, month, day);
}

function getZodiacSign(month: number, day: number) {
  const signs = [
    ['Capricorn', 20], ['Aquarius', 19], ['Pisces', 20],
    ['Aries', 20], ['Taurus', 21], ['Gemini', 21],
    ['Cancer', 22], ['Leo', 23], ['Virgo', 23],
    ['Libra', 23], ['Scorpio', 22], ['Sagittarius', 21],
    ['Capricorn', 31],
  ] as const;

  return day < signs[month][1] ? signs[month][0] : signs[month + 1][0];
}

export function calculateAge(
  birthDate: Date,
  today: Date = new Date()
): AgeResult {
  if (Number.isNaN(birthDate.getTime())) {
    throw new Error('Please select a valid date of birth.');
  }

  const birthDay = startOfDay(birthDate);
  const todayDay = startOfDay(today);

  if (birthDay > todayDay) {
    throw new Error('Date of birth cannot be in the future.');
  }

  let years = todayDay.getFullYear() - birthDay.getFullYear();
  let months = todayDay.getMonth() - birthDay.getMonth();
  let days = todayDay.getDate() - birthDay.getDate();

  if (days < 0) {
    months -= 1;
    days += daysInMonth(todayDay.getFullYear(), todayDay.getMonth() - 1);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor(
    (todayDay.getTime() - birthDay.getTime()) / MILLISECONDS_PER_DAY
  );
  const thisYearBirthday = birthdayForYear(birthDay, todayDay.getFullYear());
  const nextBirthday = thisYearBirthday < todayDay
    ? birthdayForYear(birthDay, todayDay.getFullYear() + 1)
    : thisYearBirthday;

  return {
    years,
    months,
    days,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    dayOfBirth: birthDay.toLocaleDateString('en-US', { weekday: 'long' }),
    nextBirthday,
    daysUntilBirthday: Math.round(
      (nextBirthday.getTime() - todayDay.getTime()) / MILLISECONDS_PER_DAY
    ),
    zodiacSign: getZodiacSign(birthDay.getMonth(), birthDay.getDate()),
  };
}