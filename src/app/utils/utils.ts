import { formatNumber } from '@angular/common';

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
  return formatNumber(Number(meters) * mileByMeters, 'es', `.0-${decimals}`);
}
