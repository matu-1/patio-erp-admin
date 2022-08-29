export function generateYears(start: number = 2020) {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i <= currentYear - start; i++) {
      years.push(start + i);
    }
    return years;
  }
