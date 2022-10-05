import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_SM } from 'src/app/constants/dialog.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import { DetailDialog } from '../../components/detail/detail.dialog';
import { hoursWorkedFilterSchema } from '../../configs/form-schema';
import { hoursWorkedColumns } from '../../configs/table-columns';
import { HoursWorkedDriver } from '../../interfaces/hours-worked-driver.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-hours-worked',
  templateUrl: './hours-worked.component.html',
})
export class HoursWorkedComponent implements OnInit {
  hoursWorkedFilterSchema = hoursWorkedFilterSchema;
  form = buildform(hoursWorkedFilterSchema);
  hoursWorkedColumns = hoursWorkedColumns;
  hoursWorkedDrivers?: HoursWorkedDriver[];
  driver = '';

  constructor(
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.parseFormFromQuery();
    this.getHoursWorkedDriver();
    this.getCities();
  }

  parseFormFromQuery() {
    const query = this.activatedRoute.snapshot.queryParams;
    const value = this.form.value;
    this.driver = query.driver ?? '';
    const start = query.start ? new Date(query.start) : value.start;
    const end = query.end ? new Date(query.end) : value.end;
    this.form.patchValue({ start, end });
  }

  async getHoursWorkedDriver() {
    this.hoursWorkedDrivers = undefined;
    const value = ObjectUtils.clear(this.form.value);
    const res = await handleRequest(() =>
      this.reportService.getHoursWorkedDrives({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
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

  showDetails(value: HoursWorkedDriver) {
    this.dialog.open(DetailDialog, {
      ...DIALOG_CONFIG_SM,
      data: value,
    });
  }

  async getCities() {
    const res = await handleRequest(() => this.reportService.getCities());
    if (res)
      this.hoursWorkedFilterSchema[2].options = [
        { value: undefined, label: 'All' },
        ...res.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];
  }

  get isLoadingFilter() {
    return !Boolean(this.hoursWorkedFilterSchema[2].options);
  }
}
