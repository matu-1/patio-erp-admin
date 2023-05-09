import * as moment from 'moment-timezone';
import { CONFIG } from '../constants/config.constant';

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

  static diff(
    end: Date | string,
    start: Date | string,
    type: 's' | 'm' | 'h' = 's'
  ) {
    const endDate = new Date(end).getTime();
    const startDate = new Date(start).getTime();
    const time = endDate - startDate;
    const res = {
      s: time / 1000,
      m: time / (1000 * 60),
      h: time / (1000 * 60 * 60),
    };
    return res[type];
  }

  static getMaxHourMoment(date: Date | string = new Date()) {
    return moment(new Date(date))
      .hours(23)
      .minutes(59)
      .seconds(59)
      .milliseconds(999);
  }

  static getMinHourMoment(date: Date | string = new Date()) {
    return moment(new Date(date))
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0);
  }

  static getMoment(date: Date | string, city: number) {
    return moment.tz(
      date,
      city == CONFIG.CITY_EEUU ? CONFIG.TZ.EE_UU : CONFIG.TZ.BOLIVIA
    );
  }
}
