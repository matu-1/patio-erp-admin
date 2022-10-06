import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { DateUtils } from 'src/app/utils/date.util';
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

  constructor(
    private paymentDriverService: PaymentDriverService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPaymentsDriver();
  }

  async getPaymentsDriver() {
    this.paymentsDriver = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.paymentDriverService.getPaymentsDriver({
        ...value,
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
    this.router.navigateByUrl(
      `${PAGE_ROUTE.REPORT.HOURS_WORKED}?start=${DateUtils.getMinHour(
        data.startDate + ' '
      ).toISOString()}&end=${DateUtils.getMaxHour(
        data.endDate + ' '
      ).toISOString()}&driver=${data.name}`
    );
  }

  filter() {
    this.getPaymentsDriver();
  }
}
