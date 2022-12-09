import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { CONFIG } from 'src/app/constants/config.constant';
import { DIALOG_CONFIG_SM } from 'src/app/constants/dialog.constant';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
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
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setTimeZone(); //limpia si ya se tiene seteado la TZ
    this.parseFormFromQuery();
    this.getHoursWorkedDriver();
    this.getCities();
    this.changeValues();
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
        start: DateUtils.getMinHourMoment(DateUtils.getMaxHour(value.start)),
        end: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(value.end)),
      })
    );
    if (res) this.hoursWorkedDrivers = res.data;
  }

  filter() {
    this.getHoursWorkedDriver();
  }

  setTimeZone(cityId?: number) {
    const timeZone =
      cityId == CONFIG.CITY_EEUU ? 'America/New_York' : 'America/La_Paz';
    moment.tz.setDefault(timeZone);
  }

  changeValues() {
    this.form.get('cityId')?.valueChanges.subscribe((value) => {
      this.setTimeZone(value);
    });
  }

  download() {
    const { start, end } = ObjectUtils.clear(this.form.value);
    ExcelUtils.download(
      parseByColumns(this.hoursWorkedDrivers!, hoursWorkedColumns),
      `hours ${formatDate(start, 'dd-MM-yyyy', 'es')} al ${formatDate(
        end,
        'dd-MM-yyyy',
        'es'
      )}`
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

  goDiscounts(value: HoursWorkedDriver) {
    //TODO: Redirect to collect driver
    const url = this.location.prepareExternalUrl(
      `${PAGE_ROUTE.COLLECT_DRIVER.LIST}?isPayment=0&driver=${value.name}`
    );
    window.open(url, '_bank');
  }
}
