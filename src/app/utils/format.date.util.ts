import { formatDate } from '@angular/common';
import { FORMAT_DATE, FORMAT_SHORT_DATE } from 'src/app/constants/format-date';

export abstract class FormatDate {
  static date(date: Date | string) {
    return formatDate(date, FORMAT_DATE, 'es');
  }
  static short(date: Date | string) {
    return formatDate(date, FORMAT_SHORT_DATE, 'es');
  }
}
