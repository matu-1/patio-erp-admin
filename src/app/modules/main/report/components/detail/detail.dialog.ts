import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  bonusColumns,
  ordersColumns,
  timingsColumns,
} from '../../configs/table-columns';
import { HoursWorkedDriver } from '../../interfaces/hours-worked-driver.interface';
import { ExcelUtils } from 'src/app/utils/excel.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { ordersColumnsExport } from '../../configs/export-columns';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.dialog.html',
  styleUrls: ['./detail.dialog.scss'],
})
export class DetailDialog implements OnInit {
  ordersColumns = ordersColumns;
  timingsColumns = timingsColumns;
  bonusColumns = bonusColumns;

  constructor(@Inject(MAT_DIALOG_DATA) public data: HoursWorkedDriver) {}

  ngOnInit(): void {}

  ordersDownload() {
    ExcelUtils.download(
      parseByColumns(this.data.orders, ordersColumnsExport),
      `orders`
    );
  }

  timingsDownload() {
    ExcelUtils.download(
      parseByColumns(this.data.timings, timingsColumns),
      `timings`
    );
  }

  bonusDownload() {
    ExcelUtils.download(parseByColumns(this.data.bonus, bonusColumns), `bonus`);
  }
}
