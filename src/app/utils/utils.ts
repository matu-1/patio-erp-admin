import { FormatDate } from './format.date.util';

export function generateYears(start: number = 2020) {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = 0; i <= currentYear - start; i++) {
    years.push(start + i);
  }
  return years;
}

export function meterToMile(meters: number, decimals = 2) {
  const mileByMeters = 0.000621371;
  return Number((Number(meters) * mileByMeters).toFixed(decimals));
}

export function formatToNumber(num: string | number, decimals = 2) {
  return Number(Number(num).toFixed(decimals));
}

export type WeekType = {
  start: Date;
  end: Date;
  name: string;
};

export function getWeeks(count = 10) {
  let today = new Date();
  const dates: WeekType[] = [];
  for (let i = 0; i < count; i++) {
    const dayWeek = (today.getDay() || 7) - 1;
    const mondayDate = new Date(
      today.setHours(today.getHours() - 24 * dayWeek)
    );
    const sundayDate = new Date(today.setHours(today.getHours() + 24 * 6));
    dates.push({
      start: mondayDate,
      end: sundayDate,
      name: `${FormatDate.shortMoment(mondayDate)} - ${FormatDate.shortMoment(
        sundayDate
      )}`,
    });
    today = new Date(today.setDate(today.getDate() - 7));
  }
  return dates;
}

export function titleCase(title: string) {
  return `${title[0].toUpperCase()}${title.slice(1).toLowerCase()}`;
}
