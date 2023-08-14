import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { earningDetailColumns } from '../../configs/table-columns';
import { DriverEarning } from '../../interfaces/driver-earnings.interface';

@Component({
  selector: 'app-earnings-detail',
  templateUrl: './earnings-detail.dialog.html',
})
export class EarningsDetailDialog implements OnInit {
  earningDetailColumns = earningDetailColumns;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DriverEarning) {}

  ngOnInit(): void {}

  download() {
    ExcelUtils.download(this.data.detail, 'earning-detail');
  }
}
