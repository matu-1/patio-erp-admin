import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { CONFIG } from 'src/app/constants/config.constant';
import {
  DIALOG_CONFIG_MD,
  DIALOG_CONFIG_XS,
} from 'src/app/constants/dialog.constant';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import { DetailDialog } from '../../components/detail/detail.dialog';
import { EditBankAccountDialog } from '../../components/edit-bank-account/edit-bank-account.dialog';
import { hoursWorkedColumnsExport } from '../../configs/export-columns';
import { hoursWorkedFilterSchema } from '../../configs/form-schema';
import { hoursWorkedColumns } from '../../configs/table-columns';
import {
  BankAccount,
  HoursWorkedDriver,
} from '../../interfaces/hours-worked-driver.interface';
import { UpdateBankAccount } from '../../interfaces/payment-detail.interface';
import { ReportService } from '../../services/report.service';
import { PaymentDriverType } from '../../../payment-driver/constants/payment-driver-type';
import { TimingDto } from '../../interfaces/hours-worked-driver.interface';
import { categoryValue } from '../../../collect-driver/constants/payment-method';
import { SnackBar } from 'src/app/utils/snackbar';

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
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    const cityId = query.cityId ? Number(query.cityId) : value.cityId;
    this.form.patchValue({ start, end, cityId });
    this.setTimeZone(cityId); //limpia si ya se tiene seteado la TZ
  }

  async getHoursWorkedDriver() {
    this.hoursWorkedDrivers = undefined;
    const value = ObjectUtils.clear(this.form.value);
    console.log('value', this.form.value);
    const res = await handleRequest(() =>
      this.reportService.getHoursWorkedDrives({
        ...value,
        start: DateUtils.getMinHourMoment(DateUtils.getMaxHour(value.start)),
        end: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(value.end)),
      })
    );
    if (res) this.hoursWorkedDrivers = res.data;
  }

  get totalHours() {
    return this.hoursWorkedDrivers?.reduce(
      (acc, curr) => acc + curr.hoursWorked,
      0
    );
  }

  filter() {
    this.getHoursWorkedDriver();
  }

  setTimeZone(cityId = CONFIG.CITY_EEUU) {
    const timeZone = DateUtils.getTimeZone(cityId);
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
      parseByColumns(this.hoursWorkedDrivers!, hoursWorkedColumnsExport),
      `hours ${formatDate(start, 'dd-MM-yyyy', 'es')} al ${formatDate(
        end,
        'dd-MM-yyyy',
        'es'
      )}`
    );
  }

  showDetailsDlg(value: HoursWorkedDriver) {
    this.dialog.open(DetailDialog, {
      ...DIALOG_CONFIG_MD,
      data: value,
    });
  }

  async getCities() {
    const res = await handleRequest(() => this.reportService.getCities());
    if (res)
      this.hoursWorkedFilterSchema[2].options = [
        // { value: undefined, label: 'All' },
        ...res.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];
  }

  get isLoadingFilter() {
    return !Boolean(this.hoursWorkedFilterSchema[2].options);
  }

  goDiscountsOrBonus(
    value: HoursWorkedDriver,
    type: PaymentDriverType = PaymentDriverType.Cobro
  ) {
    //TODO: Redirect to collect driver
    let { start, end, cityId } = this.form.value;
    start = DateUtils.getMinHour(start);
    end = DateUtils.getMaxHour(end);
    const routes = {
      [PaymentDriverType.Cobro]: PAGE_ROUTE.COLLECT_DRIVER.LIST,
      [PaymentDriverType.Pago]: PAGE_ROUTE.PAYMENT_DRIVER.LIST,
    };
    const url = this.location.prepareExternalUrl(
      `${routes[type]}?isPayment=0&driver=${
        value.name
      }&start=${start.toISOString()}&end=${end.toISOString()}&category=${
        categoryValue.other
      }&cityId=${cityId}`
    );
    window.open(url, '_bank');
  }

  showConfirmRefreshDlg(value: HoursWorkedDriver) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        message: '¿Está seguro? si no existe el pago se creara!',
      },
    });
    dialogRef.afterClosed().subscribe((ok) => ok && this.refresh(value));
  }

  async refresh(value: HoursWorkedDriver) {
    const { start, end } = this.form.value;
    const res = await handleRequestPg(
      () =>
        this.reportService.refresh({
          driverId: value.id,
          type: 1,
          startDate: DateUtils.getMinHourMoment(DateUtils.getMaxHour(start)),
          endDate: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(end)),
        }),
      true
    );
    if (res) this.filter();
  }

  showEditBankAccountDlg(driverId: number, value: BankAccount) {
    const dialogRef = this.dialog.open(EditBankAccountDialog, {
      ...DIALOG_CONFIG_XS,
      data: value,
    });
    dialogRef
      .afterClosed()
      .subscribe(
        (data) =>
          data &&
          this.createOrUpdateBankAccount({ ...data, driverId }, value?.id)
      );
  }

  async createOrUpdateBankAccount(dto: UpdateBankAccount, id: number) {
    const res = await handleRequestPg(
      () => this.reportService.createOrUpdateBankAccount(dto, id),
      true
    );
    if (res) this.filter();
  }

  goPaymentDriver(item: HoursWorkedDriver, type: PaymentDriverType) {
    const value = this.form.value;
    const start = DateUtils.getMinHourMoment(DateUtils.getMaxHour(value.start));
    const end = DateUtils.getMaxHourMoment(DateUtils.getMaxHour(value.end));
    const routes = {
      [PaymentDriverType.Cobro]: PAGE_ROUTE.COLLECT_DRIVER.CREATE,
      [PaymentDriverType.Pago]: PAGE_ROUTE.PAYMENT_DRIVER.CREATE,
    };
    this.router.navigate([routes[type]], {
      queryParams: {
        driverId: item.id,
        start: start.toISOString(),
        end: end.toISOString(),
        date: this.getDateForCreate(item.timings[0], start),
        isNotRefresh: 1,
      },
    });
  }

  getDateForCreate(timing: TimingDto, start: Date | any) {
    return new Date(timing.startFinal) < start
      ? timing.endFinal
      : timing.startFinal;
  }

  async generatePayments() {
    const value = this.form.value;
    const cityId = value.cityId;
    const start = DateUtils.getMinHourMoment(
      DateUtils.getMaxHour(value.start)
    ) as any;
    const end = DateUtils.getMaxHourMoment(
      DateUtils.getMaxHour(value.end)
    ) as any;
    const days = DateUtils.getDiffHours(end, start) / 24;
    if (Math.round(days) != 7) {
      SnackBar.show('Tiene que ser una semana el rango de fechas', {
        variant: 'warning',
      });
      return;
    }
    const [res] = await Promise.all([
      handleRequestPg(
        () =>
          this.reportService.generatePayments({
            type: 1,
            startDate: start as any,
            endDate: end as any,
            cityId,
          }),
        true
      ),
      handleRequestPg(() =>
        this.reportService.generateBonusForPoints({
          start: start as any,
          end: end as any,
          cityId,
        })
      ),
    ]);
    if (res) this.filter();
  }
}
