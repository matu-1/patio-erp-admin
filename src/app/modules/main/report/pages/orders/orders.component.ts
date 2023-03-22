import { Component, OnInit } from '@angular/core';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { ordersFilterSchema } from '../../configs/form-schema';
import { orderColumns } from '../../configs/table-columns';
import { Order } from '../../interfaces/order.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  title = 'Ordenes';
  orders?: Order[];
  form = buildform(ordersFilterSchema);
  ordersFilterSchema = ordersFilterSchema;
  orderColumns = orderColumns;

  constructor(
    private reportService: ReportService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.getCities();
    this.getMerchants();
  }

  async getCities() {
    const res = await handleRequest(() => this.dashboardService.getCities());
    if (res)
      ordersFilterSchema[2].options = [
        { label: 'All', value: undefined },
        ...res.data.map((city) => ({ label: city.name, value: city.id })),
      ];
  }

  async getMerchants() {
    const res = await handleRequest(() => this.dashboardService.getMerchants());
    if (res)
      ordersFilterSchema[3].options = [
        { label: 'All', value: undefined },
        ...res.data.map((merchant) => ({
          label: `${merchant.id} - ${merchant.name}`,
          value: merchant.id,
        })),
      ];
  }

  get isLoadingFilter() {
    return !ordersFilterSchema[2].options || !ordersFilterSchema[3].options;
  }

  async getOrders() {
    this.orders = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getOrders({
        ...value,
        endDate: DateUtils.getMaxHour(value.endDate),
      })
    );
    if (res) this.orders = res.data;
  }

  async filter() {
    this.getOrders();
  }

  download() {
    ExcelUtils.download(parseByColumns(this.orders!, orderColumns), 'orders');
  }
}
