import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { ordersReceivedFilterSchema } from '../../configs/form-schema';
import { ordersReceivedColumns } from '../../configs/table-columns';
import { OrderReceived } from '../../interface/order-received.interface';
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

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getOrdersReveived();
  }

  async getOrdersReveived() {
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
}
