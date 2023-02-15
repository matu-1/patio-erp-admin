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
import { paymentFilterSchema } from '../../configs/form-schema';
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

  constructor(
    private paymentDriverService: PaymentDriverService,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
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
    const url = this.location.prepareExternalUrl(
      `${PAGE_ROUTE.REPORT.HOURS_WORKED}?start=${DateUtils.getMinHour(
        data.startDate + ' '
      ).toISOString()}&end=${DateUtils.getMaxHour(
        data.endDate + ' '
      ).toISOString()}&driver=${data.name}`
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
}
