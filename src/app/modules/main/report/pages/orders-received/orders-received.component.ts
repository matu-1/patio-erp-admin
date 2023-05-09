import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { ArrayUtils } from 'src/app/utils/array.utils';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { ordersReceivedFilterSchema } from '../../configs/form-schema';
import { ordersReceivedColumns } from '../../configs/table-columns';
import { OrderReceived } from '../../interfaces/order-received.interface';
import { CreatePaymentDriverDto } from '../../interfaces/payment-detail.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-orders-received',
  templateUrl: './orders-received.component.html',
})
export class OrdersReceivedComponent implements OnInit {
  title = 'Ordenes Recibidas';
  ordersReceivedFilterSchema = ordersReceivedFilterSchema;
  form = buildform(ordersReceivedFilterSchema);
  ordersReceivedColumns = ordersReceivedColumns;
  ordersReceived?: OrderReceived[];
  driver = '';

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.parseFormFromQuery();
    this.getOrdersReveived();
  }

  parseFormFromQuery() {
    const query = this.activatedRoute.snapshot.queryParams;
    const value = this.form.value;
    this.driver = query.driver ?? '';
    const start = query.start ? new Date(query.start) : value.start;
    const end = query.end ? new Date(query.end) : value.end;
    const paymentModeId = query.start ? undefined : value.paymentModeId;
    this.form.patchValue({ start, end, paymentModeId });
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
    const body: CreatePaymentDriverDto = {
      startDate: this.form.value.start,
      endDate: DateUtils.getMaxHour(this.form.value.end),
      type: 0,
    };
    await handleRequestPg(
      () => this.reportService.generatePayments(body),
      true
    );
  }

  showConfirmRefreshDlg(value: OrderReceived) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { message: '¿Está seguro? si no existe el pago se creara!' },
    });
    dialogRef.afterClosed().subscribe((ok) => ok && this.refresh(value));
  }

  async refresh(value: OrderReceived) {
    const { start, end } = this.form.value;
    const res = await handleRequestPg(() =>
      this.reportService.refresh({
        driverId: value.driver_id,
        type: 0,
        startDate: start,
        endDate: DateUtils.getMaxHour(end),
      })
    );
    if (res) this.filter();
  }
}
