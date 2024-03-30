import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import {
  DIALOG_CONFIG_MD,
  DIALOG_CONFIG_XS,
} from 'src/app/constants/dialog.constant';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { PayDialog } from '../../components/pay/pay.dialog';
import { paymentFilterSchema, weeksOptions } from '../../configs/form-schema';
import { paymentsDriverColumns } from '../../configs/table-columns';
import { paymentMethod } from '../../constants/payment-method';
import {
  PayDriverDto,
  PaymentDriver,
} from '../../interfaces/payment-driver.interface';
import { PaymentDriverService } from '../../services/payment-driver.service';
import { PaymentDetailDialog } from '../../components/payment-detail/payment-detail.dialog';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryValue } from '../../../collect-driver/constants/payment-method';
import { CONFIG } from 'src/app/constants/config.constant';
import { UpdateBankAccount } from '../../../report/interfaces/payment-detail.interface';
import { EditBankAccountDialog } from '../../../report/components/edit-bank-account/edit-bank-account.dialog';
import { ReportService } from '../../../report/services/report.service';
import { SnackBar } from 'src/app/utils/snackbar';
import { PayMultipleDialog } from '../../components/pay-multiple/pay-multiple.dialog';
import { PaymentDriverType } from '../../constants/payment-driver-type';
import * as moment from 'moment-timezone';
import {
  BankAccount,
  TimingDto,
} from '../../../report/interfaces/hours-worked-driver.interface';
import { EditDialog } from '../../components/edit/edit.dialog';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { paymentsDriverExportColumns } from '../../configs/export-columns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  title = 'Pagos Driver';
  paymentsDriver?: PaymentDriver[];
  paymentsDriverColumns = paymentsDriverColumns;
  paymentMethod = paymentMethod;
  form = buildform(paymentFilterSchema);
  paymentFilterSchema = paymentFilterSchema;
  PAGE_ROUTE = PAGE_ROUTE;
  categoryValue = categoryValue;
  selectedPayment = new Set<PaymentDriver>();
  driver = '';

  constructor(
    private paymentDriverService: PaymentDriverService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.resetFromQuery();
    this.resetForm();
    this.getPaymentsDriver();
    this.getCities();
    this.changeValues();
  }

  resetForm() {
    // const { start, end } = this.form.value.week as WeekType;
    const { start, end } = this.form.value;
    this.form.patchValue({ start, end });
    this.form.get('week')?.valueChanges.subscribe(({ start, end }) => {
      this.form.patchValue({ start, end });
    });
    this.setTimeZone(this.form.value.cityId);
  }

  resetFromQuery() {
    //si tiene query lo resetea
    const params = this.activatedRoute.snapshot.queryParams;
    const week = weeksOptions.find((item) => item.label == params.week)?.value;
    if (week)
      this.form.patchValue({
        week: week,
        start: week.start,
        end: week.end,
      });
    if (params.start && params.end && params.driver) {
      this.driver = params.driver;
      this.form.patchValue({
        start: params.start,
        end: params.end,
        category: params.category ? Number(params.category) : undefined,
        cityId: Number(params.cityId),
      });
    }
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

  async getCities() {
    const res = await handleRequest(() => this.reportService.getCities());
    if (res)
      this.paymentFilterSchema[5].options = [
        // { value: undefined, label: 'All' },
        ...res.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];
  }

  async getPaymentsDriver() {
    this.selectedPayment.clear();
    this.paymentsDriver = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.paymentDriverService.getPaymentsDriver({
        ...value,
        // start: DateUtils.getMinHour(value.start),
        // end: DateUtils.getMaxHour(value.end),
        start: DateUtils.getMinHourMoment(DateUtils.getMaxHour(value.start)),
        end: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(value.end)),
      })
    );
    if (res) this.paymentsDriver = res.data;
    this.router.navigate([PAGE_ROUTE.PAYMENT_DRIVER.LIST], {
      queryParams: { week: value.week.name },
    });
  }

  openPaymentDlg(data: PaymentDriver) {
    const dialogRef = this.dialog.open(PayDialog, {
      ...DIALOG_CONFIG_XS,
      data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.pay(data.id, res);
    });
  }

  async pay(id: number, data: PayDriverDto) {
    const res = await handleRequestPg(() =>
      this.paymentDriverService.pay(id, data)
    );
    if (res) this.getPaymentsDriver();
  }

  goDetail(data: PaymentDriver) {
    const start = new Date(data.startDate + ' 00:00:00');
    const end = new Date(data.endDate + ' 23:59:59');
    // if (data.cityId == CONFIG.CITY_EEUU) {
    //   start.setHours(start.getHours() + 1);
    //   end.setHours(end.getHours() + 1);
    // }
    const url = this.location.prepareExternalUrl(
      `${
        PAGE_ROUTE.REPORT.HOURS_WORKED
      }?start=${start.toISOString()}&end=${end.toISOString()}&driver=${
        data.name
      }&cityId=${data.cityId}`
    );
    window.open(url, '_blank');
  }

  filter() {
    this.getPaymentsDriver();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.paymentsDriver!, paymentsDriverExportColumns),
      'payment driver'
    );
  }

  openRevertConfirmDlg(data: PaymentDriver) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      ...DIALOG_CONFIG_XS,
      data: {
        title: 'Confirmar',
        message: `¿Esta seguro de revertir el ultimo pago de ${data.name}?`,
      },
    });
    dialogRef.afterClosed().subscribe((isOk) => {
      if (isOk) this.revert(data.id);
    });
  }

  async revert(id: number) {
    const res = await handleRequestPg(
      () => this.paymentDriverService.revert(id),
      true
    );
    if (res) this.getPaymentsDriver();
  }

  openPaymentsDlg(data: PaymentDriver) {
    this.dialog.open(PaymentDetailDialog, {
      ...DIALOG_CONFIG_MD,
      data,
    });
  }

  goPaymentDriver(value: PaymentDriver, type: PaymentDriverType) {
    const start = DateUtils.getMoment(
      value.startDate + ' 00:00:00',
      value.cityId
    );
    const end = DateUtils.getMoment(value.endDate + ' 23:59:59', value.cityId);
    const routes = {
      [PaymentDriverType.Cobro]: PAGE_ROUTE.COLLECT_DRIVER.CREATE,
      [PaymentDriverType.Pago]: PAGE_ROUTE.PAYMENT_DRIVER.CREATE,
    };
    if (!value.detail) {
      SnackBar.show(
        'Click al boton *Ver Detalle* (te redireccionara a horas trabajadas) y hacer ahi la operacion',
        { variant: 'warning' }
      );
      return;
    }
    this.router.navigate([routes[type]], {
      queryParams: {
        driverId: value.driverId,
        start: start.toISOString(),
        end: end.toISOString(),
        date: this.getDateForCreate(value.detail!.timings[0], start),
      },
    });
  }

  getDateForCreate(timing: TimingDto, start: Date | any) {
    return new Date(timing.startFinal) < start
      ? timing.endFinal
      : timing.startFinal;
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

  getRowClass(item: any) {
    return this.selectedPayment?.has(item) ? 'bg-selected' : '';
  }

  onSelect(item: any) {
    if (item == 0) return;
    if (this.selectedPayment.has(item)) this.selectedPayment.delete(item);
    else this.selectedPayment.add(item);
  }

  showPayMultipleDlg() {
    if (this.selectedPayment.size < 2)
      return SnackBar.show('Debe seleccionar al menos 2 items');
    const dialogRef = this.dialog.open(PayMultipleDialog, {
      ...DIALOG_CONFIG_XS,
      data: Array.from(this.selectedPayment),
    });
    dialogRef.afterClosed().subscribe((data) => data && this.payMultiple(data));
  }

  async payMultiple(data: any) {
    const paymentAmounts = [...this.selectedPayment].map((item) => ({
      id: item.id,
      amount: item.balance,
    }));
    const res = await handleRequestPg(() =>
      this.paymentDriverService.payMultiple({ ...data, paymentAmounts })
    );
    if (res) {
      this.filter();
      this.selectedPayment.clear();
    }
  }

  showEditDlg(value: PaymentDriver) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: value,
      ...DIALOG_CONFIG_XS,
    });
    dialogRef
      .afterClosed()
      .subscribe((data) => data && this.edit(value.id, data));
  }

  async edit(id: number, value: any) {
    const res = await handleRequestPg(() =>
      this.paymentDriverService.update(id, value)
    );
    if (res) this.filter();
  }

  goDiscountsOrBonus(
    value: PaymentDriver,
    type: PaymentDriverType = PaymentDriverType.Cobro
  ) {
    //TODO: Redirect to collect driver
    let { start, end } = this.form.value;
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
      }&cityId=${value.cityId}`
    );
    window.open(url, '_bank');
  }

  showConfirmRefreshDlg(value: PaymentDriver) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        message: '¿Está seguro de realizar esta acción?',
      },
    });
    dialogRef.afterClosed().subscribe((ok) => ok && this.refresh(value));
  }

  async refresh(value: PaymentDriver) {
    const { start, end } = this.form.value;
    const res = await handleRequestPg(
      () =>
        this.reportService.refresh({
          driverId: value.driverId,
          type: 1,
          startDate: DateUtils.getMinHourMoment(DateUtils.getMaxHour(start)),
          endDate: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(end)),
        }),
      true
    );
    if (res) this.filter();
  }
}
