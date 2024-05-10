import { Component, OnInit } from '@angular/core';
import { orderInvoiceFilterSchema } from '../../config/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { handleRequest } from 'src/app/utils/handle-request';
import { OrderInvoice } from '../../interfaces/order-invoice.interface';
import { orderInvoiceColumns } from '../../config/table-columns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'Order Invoices';
  orderInvoiceFilterSchema = orderInvoiceFilterSchema;
  form = buildform(orderInvoiceFilterSchema);
  orderInvoices?: OrderInvoice[];
  orderInvoiceColumns = orderInvoiceColumns;

  constructor(private dashBoardService: DashboardService) {}

  ngOnInit(): void {
    this.getCities();
  }

  filter() {
    const value = this.form.value;
    console.log('value', value);
  }

  async getCities() {
    const res = await handleRequest(() => this.dashBoardService.getCities());
    if (res)
      orderInvoiceFilterSchema[3].options = res.data.map((city) => ({
        value: city.name,
        label: city.name,
      }));
  }

  get isLoading() {
    return !orderInvoiceFilterSchema[3].options;
  }
}
