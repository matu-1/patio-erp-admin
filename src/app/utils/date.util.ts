export abstract class DateUtils {
  static isDate(date: string | Date) {
    const parseDate = new Date(date);
    return !isNaN(parseDate.getTime());
  }
}