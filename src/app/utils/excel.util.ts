import { formatDate } from '@angular/common';
import { utils, writeFile } from 'xlsx';

export class ExcelUtils {
  static download(data: any[], title: string) {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, title);
    writeFile(
      workbook,
      `${title.replace(/\s+/g, '-')}_${formatDate(
        new Date(),
        'ddMMyyyyHHmmss',
        'es'
      )}.xlsx`
    );
  }
}
