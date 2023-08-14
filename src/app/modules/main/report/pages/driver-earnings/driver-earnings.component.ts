import { Component, OnInit } from '@angular/core';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { DriverEarning } from '../../interfaces/driver-earnings.interface';
import { driverEarningColumns } from '../../configs/table-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { driverEarningFilterSchema } from '../../configs/form-schema';
import { ReportService } from '../../services/report.service';
import { handleRequest } from 'src/app/utils/handle-request';
import { DateUtils } from 'src/app/utils/date.util';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { EarningsDetailDialog } from '../../components/earnings-detail/earnings-detail.dialog';
import { DIALOG_CONFIG_MD } from 'src/app/constants/dialog.constant';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-earnings',
  templateUrl: './driver-earnings.component.html',
  styleUrls: ['./driver-earnings.component.scss'],
})
export class DriverEarningsComponent implements OnInit {
  title = 'Ganancias Driver';
  earnings?: DriverEarning[];
  driverEarningColumns = driverEarningColumns;
  driverEarningFilterSchema = driverEarningFilterSchema;
  form = buildform(driverEarningFilterSchema);

  constructor(
    private reportService: ReportService,
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getDriverEarnings();
  }

  async getDriverEarnings() {
    this.earnings = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getDriverEarnings({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.earnings = res.data;
  }

  async getCities() {
    const res = await handleRequest(() => this.dashboardService.getCities());
    if (res)
      driverEarningFilterSchema[2].options = [
        { label: 'All', value: undefined },
        ...res.data.map((city) => ({ label: city.name, value: city.id })),
      ];
  }

  get isLoadingFilter() {
    return !driverEarningFilterSchema[2].options;
  }

  filter() {
    this.getDriverEarnings();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.earnings!, driverEarningColumns),
      'driver-earnings'
    );
  }

  showDetailsDlg(value: DriverEarning) {
    this.dialog.open(EarningsDetailDialog, {
      ...DIALOG_CONFIG_MD,
      data: value,
    });
  }
}
