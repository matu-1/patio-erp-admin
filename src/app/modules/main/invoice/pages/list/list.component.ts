import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { InvoiceService } from '../../services/invoice.service';
import { invoiceColumns } from '../../configs/table-columns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  title = 'Invoices';
  PAGE_ROUTE = PAGE_ROUTE;
  invoices?: any[];
  invoiceColumns = invoiceColumns;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  async getInvoices() {
    const res = await handleRequest(() => this.invoiceService.getAll());
    if (res) this.invoices = res.data;
  }

  filter(){
    this.getInvoices();
  }

  download() {
    ExcelUtils.download(this.invoices!, 'invoices');
  }
}
