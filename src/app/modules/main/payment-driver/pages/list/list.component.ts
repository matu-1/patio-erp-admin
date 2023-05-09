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
import { WeekType } from 'src/app/utils/utils';
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
import { BankAccount } from '../../../report/interfaces/hours-worked-driver.interface';
import { EditDialog } from '../../components/edit/edit.dialog';

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
    const { start, end } = this.form.value.week as WeekType;
    this.form.patchValue({ start, end });
    this.form.get('week')?.valueChanges.subscribe(({ start, end }) => {
      this.form.patchValue({ start, end });
    });
    this.setTimeZone(this.form.value.cityId);
  }

  resetFromQuery() {
    const params = this.activatedRoute.snapshot.queryParams;
    const week = weeksOptions.find((item) => item.label == params.week)?.value;
    if (week)
      this.form.patchValue({
        week: week,
        start: week.start,
        end: week.end,
      });
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

  async getCities() {
    const res = await handleRequest(() => this.reportService.getCities());
    if (res)
      this.paymentFilterSchema[4].options = [
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
    ExcelUtils.download(this.paymentsDriver!, 'payment driver');
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
    this.router.navigate([routes[type]], {
      queryParams: {
        driverId: value.driverId,
        start: start.toISOString(),
        end: end.toISOString(),
        date: value.detail?.timings[0].startFinal,
      },
    });
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
}
