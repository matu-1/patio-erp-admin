import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
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
import {
  BankAccount,
  UpdateBankAccount,
} from '../../../report/interfaces/payment-detail.interface';
import { EditBankAccountDialog } from '../../../report/components/edit-bank-account/edit-bank-account.dialog';
import { ReportService } from '../../../report/services/report.service';

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
  }

  resetForm() {
    const { start, end } = this.form.value.week as WeekType;
    this.form.patchValue({ start, end });
    this.form.get('week')?.valueChanges.subscribe(({ start, end }) => {
      this.form.patchValue({ start, end });
    });
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

  async getPaymentsDriver() {
    this.paymentsDriver = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.paymentDriverService.getPaymentsDriver({
        ...value,
        start: DateUtils.getMinHour(value.start),
        end: DateUtils.getMaxHour(value.end),
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
      ...DIALOG_CONFIG_XS,
      data,
    });
  }

  goPaymentDriver(value: PaymentDriver) {
    const start = new Date(value.startDate + ' 00:00:00');
    const end = new Date(value.endDate + ' 23:59:59');
    if (!DateUtils.isTimezoneNewYork() && value.cityId == CONFIG.CITY_EEUU) {
      start.setHours(start.getHours() + 1);
      end.setHours(end.getHours() + 1);
    }
    this.router.navigate([PAGE_ROUTE.COLLECT_DRIVER.CREATE], {
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

  onSelect(item: any){
    console.log('select', item)
  }
}
