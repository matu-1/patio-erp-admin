import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { hoursWorkedFilterSchema } from '../../configs/form-schema';
import { hoursWorkedColumns } from '../../configs/table-columns';
import { HoursWorkedDriver } from '../../interface/hours-worked-driver.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-hours-worked',
  templateUrl: './hours-worked.component.html',
  styleUrls: ['./hours-worked.component.scss'],
})
export class HoursWorkedComponent implements OnInit {
  hoursWorkedFilterSchema = hoursWorkedFilterSchema;
  form = buildform(hoursWorkedFilterSchema);
  hoursWorkedColumns = hoursWorkedColumns;
  hoursWorkedDrivers?: HoursWorkedDriver[];

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHoursWorkedDriver();
  }

  async getHoursWorkedDriver() {
    const { start, end } = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getHoursWorkedDrives(start, DateUtils.getMaxHour(end))
    );
    if (res) this.hoursWorkedDrivers = res.data;
  }

  filter() {
    this.getHoursWorkedDriver();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.hoursWorkedDrivers!, hoursWorkedColumns),
      'Hours worked drivers'
    );
  }

  openGenerateConfirmDlg() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      ...DIALOG_CONFIG_XS,
      data: {
        title: 'Confirmar',
        message: '¿Esta seguro de generar los pagos?',
      },
    });
    dialogRef.afterClosed().subscribe((isOk) => {
      if (isOk) this.generatePaymentDrivers();
    });
  }

  generatePaymentDrivers() {
    //TODO: add service
    alert('Ok');
  }
}
