export abstract class DateUtils {
  static getMinHour(date: Date | string = new Date()) {
    const today = new Date(date);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
  }

  static getMaxHour(date: Date | string = new Date()) {
    const today = new Date(date);
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    today.setMilliseconds(999);
    return today;
  }

  static isDate(date: string | Date) {
    const parseDate = new Date(date);
    return !isNaN(parseDate.getTime());
  }

  static formatToTimer(hour: number) {
    const minutes = (hour * 60) % 60;
    const seconds = (minutes * 60) % 60;
    return `${Math.floor(hour)}:${Math.floor(minutes)}:${Math.round(seconds)}`;
  }
}
