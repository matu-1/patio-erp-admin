import { Component, OnInit } from '@angular/core';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { OrderCashDto } from '../../interfaces/orders-cash.interface';
import { ReportService } from '../../services/report.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { ordersCashFilterSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { orderCashColumns } from '../../configs/table-columns';
import { ExcelUtils } from 'src/app/utils/excel.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';

@Component({
  selector: 'app-orders-cash',
  templateUrl: './orders-cash.component.html',
  styleUrls: ['./orders-cash.component.scss'],
})
export class OrdersCashComponent implements OnInit {
  title = 'Orders Cash';
  orders?: OrderCashDto[];
  ordersCashFilterSchema = ordersCashFilterSchema;
  form = buildform(ordersCashFilterSchema);
  orderCashColumns = orderCashColumns;

  constructor(
    private reportService: ReportService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getOrders();
  }

  async getOrders() {
    this.orders = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getOrdersCash({
        ...value,
        end: DateUtils.getMaxHour(value.endDate),
      })
    );
    if (res) this.orders = res.data;
  }

  async getCities() {
    const res = await handleRequest(() => this.dashboardService.getCities());
    if (res)
      ordersCashFilterSchema[2].options = [
        { label: 'All', value: undefined },
        ...res.data.map((city) => ({ label: city.name, value: city.id })),
      ];
  }

  get isLoadingFilter() {
    return !ordersCashFilterSchema[2].options;
  }

  filter() {
    this.getOrders();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.orders!, orderCashColumns),
      'orders'
    );
  }
}
