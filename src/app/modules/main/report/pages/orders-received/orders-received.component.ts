import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { ArrayUtils } from 'src/app/utils/array.utils';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { ordersReceivedFilterSchema } from '../../configs/form-schema';
import { ordersReceivedColumns } from '../../configs/table-columns';
import { OrderReceived } from '../../interface/order-received.interface';
import { CreatePaymentDriverDto } from '../../interface/payment-detail.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-orders-received',
  templateUrl: './orders-received.component.html',
  styleUrls: ['./orders-received.component.scss'],
})
export class OrdersReceivedComponent implements OnInit {
  title = 'Ordenes Recibidas';
  ordersReceivedFilterSchema = ordersReceivedFilterSchema;
  form = buildform(ordersReceivedFilterSchema);
  ordersReceivedColumns = ordersReceivedColumns;
  ordersReceived?: OrderReceived[];

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrdersReveived();
  }

  async getOrdersReveived() {
    this.ordersReceived = undefined;
    const { start, end, paymentModeId } = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getOrdersReceivedDriver(
        start,
        DateUtils.getMaxHour(end),
        paymentModeId
      )
    );
    if (res) this.ordersReceived = res.data;
  }

  filter() {
    this.getOrdersReveived();
  }

  download() {
    ExcelUtils.download(this.ordersReceived!, 'Orders Received Driver');
  }

  openGenerateConfirmDlg() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      ...DIALOG_CONFIG_XS,
      data: {
        title: 'Confirmar',
        message:
          '¿Esta seguro de generar los pagos, esta acción no es reversible?',
      },
    });
    dialogRef.afterClosed().subscribe((isOk) => {
      if (isOk) this.generatePaymentDrivers();
    });
  }

  async generatePaymentDrivers() {
    const dataByDriver = ArrayUtils.group(this.ordersReceived!, 'driver_id');
    const parseDrivers = Object.values(dataByDriver).map((values) => {
      return {
        driverId: values[0].driver_id,
        name: values[0].driver,
        amount: values.reduce((acc, cur) => acc + cur.moneyToReturn, 0),
      };
    });
    const body: CreatePaymentDriverDto = {
      startDate: this.form.value.start,
      endDate: this.form.value.end,
      drivers: parseDrivers,
    };
    await handleRequestPg(
      () => this.reportService.generatePayments(body),
      true
    );
  }
}
