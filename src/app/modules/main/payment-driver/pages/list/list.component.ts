import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { PayDialog } from '../../components/pay/pay.dialog';
import { paymentsDriverColumns } from '../../configs/table-columns';
import { paymentMethod } from '../../constants/payment-method';
import {
  PayDriverDto,
  PaymentDriver,
} from '../../interfaces/payment-driver.interface';
import { PaymentDriverService } from '../../services/payment-driver.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'Pagos Driver';
  paymentsDriver?: PaymentDriver[];
  paymentsDriverColumns = paymentsDriverColumns;
  paymentMethod = paymentMethod;

  constructor(
    private paymentDriverService: PaymentDriverService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPaymentsDriver();
  }

  async getPaymentsDriver() {
    this.paymentsDriver = undefined;
    const res = await handleRequest(() =>
      this.paymentDriverService.getPaymentsDriver()
    );
    if (res) this.paymentsDriver = res.data;
  }

  openPaymentDlg(data: PaymentDriver) {
    console.log(data);
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
}
