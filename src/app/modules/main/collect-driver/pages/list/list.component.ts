import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { DriverInfoDialog } from '../../components/driver-info/driver-info.dialog';
import { PayDialog } from '../../components/pay/pay.dialog';
import { paymentsDriverColumns } from '../../configs/table-columns';
import { paymentMethod } from '../../constants/payment-method';
import {
  PayDriverDto,
  PaymentDriver,
} from '../../interfaces/payment-driver.interface';
import { CollectDriverService } from '../../services/collect-driver.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  title = 'Cobros Driver';
  paymentsDriver?: PaymentDriver[];
  paymentsDriverColumns = paymentsDriverColumns;
  paymentMethod = paymentMethod;

  constructor(
    private collectDriverService: CollectDriverService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPaymentsDriver();
  }

  async getPaymentsDriver() {
    this.paymentsDriver = undefined;
    const res = await handleRequest(() =>
      this.collectDriverService.getPaymentsDriver()
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
    data.amount = -data.amount;
    const res = await handleRequestPg(() =>
      this.collectDriverService.pay(id, data)
    );
    if (res) this.getPaymentsDriver();
  }

  goDetail(data: PaymentDriver) {
    this.router.navigateByUrl(
      `${PAGE_ROUTE.REPORT.ORDERS_RECEIVED}?start=${DateUtils.getMinHour(
        data.startDate + ' '
      ).toISOString()}&end=${DateUtils.getMaxHour(
        data.endDate + ' '
      ).toISOString()}&driver=${data.name}`
    );
  }

  async block(data: PaymentDriver) {
    const res = await handleRequestPg(
      () => this.collectDriverService.blockDriver(data.driverId),
      true
    );
    if (res) this.getPaymentsDriver();
  }

  openConfirmBlockDlg(data: PaymentDriver) {
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

  openDriverInfoDlg(data: PaymentDriver) {
    const dialogRef = this.dialog.open(DriverInfoDialog, {
      ...DIALOG_CONFIG_XS,
      data,
    });
  }
}
