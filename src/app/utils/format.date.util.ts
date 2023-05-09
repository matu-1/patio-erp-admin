import { formatDate } from '@angular/common';
import * as moment from 'moment-timezone';
import { FORMAT_DATE, FORMAT_HOUR, FORMAT_SHORT_DATE } from 'src/app/constants/format-date';

export abstract class FormatDate {
  static date(date: Date | string) {
    return formatDate(date, FORMAT_DATE, 'es');
  }

  static short(date: Date | string) {
    return formatDate(date, FORMAT_SHORT_DATE, 'es');
  }

  static hour(date: Date | string) {
    return formatDate(date, FORMAT_HOUR, 'es');
  }

  static dateMoment(date: Date | string) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

  static shortMoment(date: Date | string) {
    return moment(date).format('DD/MM/YYYY');
  }

  static hourMoment(date: Date | string) {
    return moment(date).format('HH:mm:ss');
  }
}
