import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { PaymentDetailDialog } from '../../../payment-driver/components/payment-detail/payment-detail.dialog';
import { DriverInfoDialog } from '../../components/driver-info/driver-info.dialog';
import { PayDialog } from '../../components/pay/pay.dialog';
import { collectFilterSchema } from '../../configs/form-schema';
import { paymentsDriverColumns } from '../../configs/table-columns';
import { categoryValue, paymentMethod } from '../../constants/payment-method';
import {
  PayDriverDto,
  CollectDriver,
} from '../../interfaces/payment-driver.interface';
import { CollectDriverService } from '../../services/collect-driver.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  title = 'Cobros Driver';
  paymentsDriver?: CollectDriver[];
  paymentsDriverColumns = paymentsDriverColumns;
  paymentMethod = paymentMethod;
  collectFilterSchema = collectFilterSchema;
  form = buildform(collectFilterSchema);
  PAGE_ROUTE = PAGE_ROUTE;
  categoryValue = categoryValue;

  constructor(
    private collectDriverService: CollectDriverService,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPaymentsDriver();
  }

  async getPaymentsDriver() {
    this.paymentsDriver = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.collectDriverService.getPaymentsDriver({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.paymentsDriver = res.data;
  }

  openPaymentDlg(data: CollectDriver) {
    const dialogRef = this.dialog.open(PayDialog, {
      ...DIALOG_CONFIG_XS,
      data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.pay(data.id, res);
    });
  }

  async pay(id: number, data: PayDriverDto) {
    data.amount = -data.amount;
    const res = await handleRequestPg(() =>
      this.collectDriverService.pay(id, data)
    );
    if (res) this.getPaymentsDriver();
  }

  goDetail(data: CollectDriver) {
    const url = this.location.prepareExternalUrl(
      `${PAGE_ROUTE.REPORT.ORDERS_RECEIVED}?start=${DateUtils.getMinHour(
        data.startDate + ' '
      ).toISOString()}&end=${DateUtils.getMaxHour(
        data.endDate + ' '
      ).toISOString()}&driver=${data.name}`
    );
    window.open(url, '_blank');
  }

  async block(data: CollectDriver) {
    const res = await handleRequestPg(
      () => this.collectDriverService.blockDriver(data.driverId),
      true
    );
    if (res) this.getPaymentsDriver();
  }

  openConfirmBlockDlg(data: CollectDriver) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      ...DIALOG_CONFIG_XS,
      data: {
        message: `Esta seguro de bloquear a "${data.name}"?`,
      },
    });
    dialogRef.afterClosed().subscribe((ok) => {
      if (ok) this.block(data);
    });
  }

  openDriverInfoDlg(data: CollectDriver) {
    this.dialog.open(DriverInfoDialog, {
      ...DIALOG_CONFIG_XS,
      data,
    });
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.paymentsDriver!, paymentsDriverColumns),
      'collect driver'
    );
  }

  filter() {
    this.getPaymentsDriver();
  }

  openRevertConfirmDlg(data: CollectDriver) {
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
      () => this.collectDriverService.revert(id),
      true
    );
    if (res) this.getPaymentsDriver();
  }

  openPaymentsDlg(data: CollectDriver) {
    this.dialog.open(PaymentDetailDialog, {
      ...DIALOG_CONFIG_XS,
      data,
    });
  }
}
