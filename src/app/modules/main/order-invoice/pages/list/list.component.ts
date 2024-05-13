import { Component, OnInit } from '@angular/core';
import { orderInvoiceFilterSchema } from '../../config/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { OrderInvoice } from '../../interfaces/order-invoice.interface';
import { orderInvoiceColumns } from '../../config/table-columns';
import { OrderInvoiceService } from '../../services/order-invoice.service';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { PageEvent } from '@angular/material/paginator';
import { CLIENT_STATUS, PAID, STATUS } from '../../constants/constants';
import { BULLETS } from '../../../factura/constants/bullets.constant';
import { routeParams } from 'src/app/utils/route-params';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Location } from '@angular/common';
import { ObjectUtils } from 'src/app/utils/object.util';
import { ExcelUtils } from 'src/app/utils/excel.util';

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
  paginated: PaginationDto = { page: 0, limit: 20, length: 0 };
  paid = PAID;
  status = STATUS;
  bullets = BULLETS;

  constructor(
    private dashBoardService: DashboardService,
    private orderInvoiceService: OrderInvoiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getOrderInvoices();
  }

  filter() {
    this.getOrderInvoices();
  }

  async getCities() {
    const res = await handleRequest(() => this.dashBoardService.getCities());
    if (res)
      orderInvoiceFilterSchema[3].options = res.data.map((city) => ({
        value: city.name,
        label: city.name,
      }));
  }

  async getOrderInvoices() {
    this.orderInvoices = undefined;
    const res = await handleRequest(() =>
      this.orderInvoiceService.getPaginated({
        ...this.paginated,
        ...this.form.value,
      })
    );
    if (res) {
      this.orderInvoices = res.data.records;
      this.paginated.length = res.data.totalRecords;
    }
  }

  get isLoading() {
    return !orderInvoiceFilterSchema[3].options;
  }

  changePage(event: PageEvent) {
    this.paginated.limit = event.pageSize;
    this.paginated.page = event.pageIndex;
    this.filter();
  }

  hasPayment(value: OrderInvoice) {
    return value.paid != 0 || value.uncollectible == 1;
  }

  isDisable(value: OrderInvoice) {
    return (value.paid != 0 && value.paid != 2) || value.uncollectible == 1;
  }

  getRowClass(value: OrderInvoice) {
    return `bg-${value.collectionStatus} bg-${
      CLIENT_STATUS[value.clientStatus]
    }`;
  }

  generateCode(invoice: OrderInvoice) {
    return window.btoa(
      `${invoice.management}-${invoice.month}-${invoice.id}-${invoice.clientId}`
    );
  }

  openRevertPaymentDlg(value: OrderInvoice) {}

  recalculateInvoice(value: OrderInvoice) {}

  openEditDlg(value: OrderInvoice) {}

  openPayDlg(value: OrderInvoice) {}

  openSchedulePaymentDlg(value: OrderInvoice) {}

  goDetail(value: OrderInvoice) {
    const url = routeParams(PAGE_ROUTE.PUBLIC.ORDER_INVOICE_DETAIL, {
      code: this.generateCode(value),
    });
    window.open(this.location.prepareExternalUrl(url), '_blank');
  }

  sendMessageEmail(value: OrderInvoice) {}

  sendMessageWhatsApp(value: OrderInvoice) {}

  async download() {
    const params = ObjectUtils.clear(this.form.value);
    const paginated: PaginationDto = {
      page: 0,
      limit: 1000000000000,
      length: 0,
    };
    const res = await handleRequestPg(
      () => this.orderInvoiceService.getPaginated({ ...params, ...paginated }),
      true
    );
    if (res) ExcelUtils.download(res.data.records, `order-invoice`);
  }
}
